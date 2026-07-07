/**
 * bcg-license-verify — Cloudflare Worker (canonical source)
 * ============================================================================
 * License verification + fail-closed export authorization for the Bingo Card
 * Generator. Deployed at WORKER_URL in index.html.
 *
 * Endpoints (POST JSON, `action` field selects the operation):
 *   { action: 'activate', license_key, instance_name }
 *       -> { valid:boolean, instance_id?:string, error?:string }
 *   { action: 'validate', license_key, instance_id? }
 *       -> { valid:boolean, error?:string }
 *   { action: 'export_token', license_key, instance_id?, device_id }
 *       -> { valid:boolean, token?:string, exp?:number }   // fail closed
 *
 * The `export_token` action is the security-critical one: it verifies the
 * license live with Lemon Squeezy and, only on success, returns a short-lived
 * ECDSA P-256 signed token that the browser verifies before producing a
 * clean/unlimited export. The signing PRIVATE key never leaves this Worker.
 *
 * There is intentionally NO beta/promo bypass. Do not add one — bypass codes
 * shipped in client source are trivially extracted.
 *
 * ---------------------------------------------------------------------------
 * SECRETS / VARS to configure (wrangler secret put ... , or dashboard):
 *   EXPORT_SIGNING_JWK   ECDSA P-256 PRIVATE key as a JWK JSON string (secret).
 *   ALLOWED_ORIGIN       e.g. "https://bingocardgenerator.com" (var; optional,
 *                        defaults to "*"). Set it to lock down CORS.
 *
 * ---------------------------------------------------------------------------
 * ONE-TIME KEY GENERATION (run locally with Node 18+):
 *
 *   const { webcrypto } = require('crypto');
 *   (async () => {
 *     const kp = await webcrypto.subtle.generateKey(
 *       { name:'ECDSA', namedCurve:'P-256' }, true, ['sign','verify']);
 *     const jwk = await webcrypto.subtle.exportKey('jwk', kp.privateKey);
 *     const spki = await webcrypto.subtle.exportKey('spki', kp.publicKey);
 *     const b64 = Buffer.from(spki).toString('base64');
 *     console.log('EXPORT_SIGNING_JWK (Worker secret):\n' + JSON.stringify(jwk));
 *     console.log('\nEXPORT_TOKEN_PUBKEY_SPKI_B64 (paste into index.html):\n' + b64);
 *   })();
 *
 *   Then:  wrangler secret put EXPORT_SIGNING_JWK   (paste the JWK JSON)
 *   And paste the SPKI base64 into index.html's EXPORT_TOKEN_PUBKEY_SPKI_B64.
 * ============================================================================
 */

const LS_API = 'https://api.lemonsqueezy.com/v1/licenses';
const TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default {
  async fetch(request, env) {
    const cors = corsHeaders(env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400, cors); }
    const action = body && body.action;

    try {
      if (action === 'activate') return json(await activate(body), 200, cors);
      if (action === 'validate') return json(await validate(body), 200, cors);
      if (action === 'export_token') return json(await exportToken(body, env), 200, cors);
      return json({ error: 'Unknown action' }, 400, cors);
    } catch (e) {
      // Never leak internals; the client treats anything non-valid as free.
      return json({ valid: false, error: 'Verification failed' }, 200, cors);
    }
  }
};

// ---- Lemon Squeezy license operations --------------------------------------

async function activate({ license_key, instance_name }) {
  if (!license_key) return { valid: false, error: 'Missing license key' };
  const r = await lsPost('activate', { license_key, instance_name: instance_name || 'BCG Device' });
  const d = await r.json().catch(() => ({}));
  if (d && d.activated) {
    return { valid: true, instance_id: d.instance && d.instance.id ? d.instance.id : null };
  }
  return { valid: false, error: (d && d.error) || 'License not valid' };
}

async function validate({ license_key, instance_id }) {
  if (!license_key) return { valid: false, error: 'Missing license key' };
  const payload = { license_key };
  if (instance_id) payload.instance_id = instance_id;
  const r = await lsPost('validate', payload);
  const d = await r.json().catch(() => ({}));
  // Lemon Squeezy returns { valid:true, license_key:{ status:'active', ... } }.
  const active = d && d.valid && (!d.license_key || d.license_key.status === 'active');
  return { valid: !!active, error: active ? undefined : ((d && d.error) || 'License not active') };
}

// Fail closed: only a live-valid license yields a signed token.
async function exportToken({ license_key, instance_id, device_id }, env) {
  const v = await validate({ license_key, instance_id });
  if (!v.valid) return { valid: false };
  if (!env.EXPORT_SIGNING_JWK) return { valid: false }; // misconfigured → deny
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = { device_id: device_id || null, exp };
  const token = await signToken(payload, env.EXPORT_SIGNING_JWK);
  return { valid: true, token, exp };
}

// ---- Token signing (ECDSA P-256 / SHA-256, IEEE P1363) ---------------------

let _signKey = null;
async function getSignKey(jwkStr) {
  if (_signKey) return _signKey;
  const jwk = typeof jwkStr === 'string' ? JSON.parse(jwkStr) : jwkStr;
  _signKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  return _signKey;
}

async function signToken(payload, jwkStr) {
  const key = await getSignKey(jwkStr);
  const seg = b64url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(seg));
  return seg + '.' + b64url(new Uint8Array(sig));
}

// ---- helpers ---------------------------------------------------------------

function lsPost(path, obj) {
  const form = new URLSearchParams();
  for (const k of Object.keys(obj)) if (obj[k] != null) form.set(k, obj[k]);
  return fetch(`${LS_API}/${path}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString()
  });
}

function b64url(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function corsHeaders(env) {
  const origin = (env && env.ALLOWED_ORIGIN) || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors }
  });
}
