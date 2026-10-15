// ================================================================
// BingoCardGenerator.Online — LemonSqueezy License Verifier
// Deploy to Cloudflare Workers (free tier)
//
// SETUP:
// 1. Worker named "bcg-license-verify" in Cloudflare dashboard
// 2. Paste this code into the worker editor
// 3. Settings → Variables and Secrets → add TWO secrets:
//      Name: LS_API_KEY           Value: your LemonSqueezy API key
//      Name: EXPORT_SIGNING_JWK   Value: the PRIVATE JWK (ECDSA P-256), see below
// 4. Deploy.
//
// The matching PUBLIC key (SPKI base64) is embedded in index.html as
// EXPORT_TOKEN_PUBKEY_SPKI_B64 so the browser can verify export tokens.
//
// KEY GENERATION (run once, locally with Node 18+; save to genkey.js and run):
//   const { webcrypto } = require("crypto");
//   (async () => {
//     const kp = await webcrypto.subtle.generateKey(
//       { name:"ECDSA", namedCurve:"P-256" }, true, ["sign","verify"]);
//     const jwk  = await webcrypto.subtle.exportKey("jwk", kp.privateKey);
//     const spki = await webcrypto.subtle.exportKey("spki", kp.publicKey);
//     console.log("PRIVATE (EXPORT_SIGNING_JWK secret):\n" + JSON.stringify(jwk));
//     console.log("\nPUBLIC (index.html EXPORT_TOKEN_PUBKEY_SPKI_B64):\n"
//       + Buffer.from(spki).toString("base64"));
//   })();
// ================================================================

const ALLOWED_ORIGINS = [
  'https://bingocardgenerator.online',
  'https://tooniebuckerooni.github.io', // GitHub Pages testing URL
];

const TOKEN_TTL_MS = 5 * 60 * 1000; // export token valid for 5 minutes

function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  return ALLOWED_ORIGINS.find(o => origin.startsWith(o)) || ALLOWED_ORIGINS[0];
}

export default {
  async fetch(request, env) {

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': getAllowedOrigin(request),
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': getAllowedOrigin(request),
    };

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ valid: false, error: 'Method not allowed' }), { status: 405, headers });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ valid: false, error: 'Invalid request body' }), { status: 400, headers });
    }

    const { license_key, instance_id, action } = body;

    if (!license_key) {
      return new Response(JSON.stringify({ valid: false, error: 'No license key provided' }), { status: 400, headers });
    }

    // --- EXPORT TOKEN (fail CLOSED: authorizes clean/unlimited exports) ---
    // Handled before the shared try/catch so it can NEVER fall into the
    // fail-open path below. A license outage means no token, full stop.
    if (action === 'export_token') {
      try {
        if (!env.EXPORT_SIGNING_JWK) {
          return new Response(JSON.stringify({ valid: false, error: 'Signing key not configured' }), { headers });
        }
        const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.LS_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ license_key, instance_id: instance_id || undefined }),
        });
        const data = await res.json();
        const isActive = data.valid === true && data.license_key?.status === 'active';
        if (!isActive) {
          return new Response(JSON.stringify({ valid: false }), { headers });
        }
        const exp = Date.now() + TOKEN_TTL_MS;
        const token = await signExportToken({ device_id: body.device_id || null, exp }, env.EXPORT_SIGNING_JWK);
        return new Response(JSON.stringify({ valid: true, token, exp }), { headers });
      } catch (e) {
        // FAIL CLOSED — any error means no clean export.
        return new Response(JSON.stringify({ valid: false }), { headers });
      }
    }

    try {
      // --- ACTIVATE (first use on a device) ---
      if (action === 'activate') {
        const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.LS_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            license_key,
            instance_name: body.instance_name || 'BCG Device',
          }),
        });

        const data = await res.json();

        // LS returns activated: true on success
        if (data.activated) {
          return new Response(JSON.stringify({
            valid: true,
            instance_id: data.instance?.id || null,
            status: data.license_key?.status || 'active',
          }), { headers });
        }

        return new Response(JSON.stringify({
          valid: false,
          error: data.error || 'Activation failed — check your license key and try again.',
        }), { headers });
      }

      // --- VALIDATE (periodic re-check, on every page load if Pro active) ---
      const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.LS_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          license_key,
          instance_id: instance_id || undefined,
        }),
      });

      const data = await res.json();

      // Active status means subscription is paid and current
      const isActive = data.valid === true && data.license_key?.status === 'active';

      return new Response(JSON.stringify({
        valid: isActive,
        status: data.license_key?.status || 'unknown',
        error: isActive ? null : (
          data.license_key?.status === 'inactive'
            ? 'Subscription has been cancelled or expired.'
            : data.error || 'License not valid.'
        ),
      }), { headers });

    } catch (e) {
      // If LS API is down, fail open (don't lock out valid users).
      // NOTE: this only affects the UI unlock (activate/validate). Clean exports
      // are gated separately by export_token above, which fails CLOSED.
      console.error('LS API error:', e.message);
      return new Response(JSON.stringify({
        valid: true,
        status: 'unverified',
        warning: 'Could not reach verification server — access temporarily granted.',
      }), { headers });
    }
  }
};

// ---- Export-token signing (ECDSA P-256 / SHA-256) --------------------------
// Token = base64url(payloadJSON) + "." + base64url(signature). payload =
// { device_id, exp(ms) }. Signature is over the UTF-8 bytes of the payload
// segment string; WebCrypto emits IEEE P1363 (r||s), which index.html verifies.
let _signKey = null;
async function getSignKey(jwkStr) {
  if (_signKey) return _signKey;
  const jwk = typeof jwkStr === 'string' ? JSON.parse(jwkStr) : jwkStr;
  _signKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  return _signKey;
}
function b64url(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function signExportToken(payload, jwkStr) {
  const key = await getSignKey(jwkStr);
  const seg = b64url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(seg));
  return seg + '.' + b64url(new Uint8Array(sig));
}
