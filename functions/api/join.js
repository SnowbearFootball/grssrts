/*
 * Join form → MailerLite (Cloudflare Pages Function, served at /api/join).
 * Needs the secret MAILERLITE_API_KEY (Cloudflare: Workers & Pages > grssrts > Settings > Variables and Secrets).
 * MailerLite custom field keys: role, qualification, age_groups, club. Club trial sign-ups go into a group.
 */
const CLUB_GROUPS = { bhtfc: '205014604942673731' };   // Club trial: Burgess Hill
const ROLES = ['Coach', 'Parent', 'Player (16+)'];

const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  if (!env.MAILERLITE_API_KEY) return reply(503, { ok: false, error: 'not-set-up' });
  let d;
  try { d = await request.json(); } catch (e) { return reply(400, { ok: false, error: 'bad-request' }); }
  if (d.website) return reply(200, { ok: true });            // hidden trap box: only bots fill it in
  const email = clean(d.email, 200).toLowerCase();
  const name = clean(d.name, 60);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { ok: false, error: 'check-details' });
  if (d.consent !== true) return reply(400, { ok: false, error: 'consent' });
  const role = ROLES.includes(d.role) ? d.role : '';
  const groups = CLUB_GROUPS[clean(d.clubCode, 20).toLowerCase()] ? [CLUB_GROUPS[clean(d.clubCode, 20).toLowerCase()]] : [];
  const body = {
    email,
    fields: {
      name,
      role,
      qualification: role === 'Coach' ? clean(d.qualification, 80) : '',
      age_groups: clean(d.ageGroups, 120),
      club: clean(d.club, 80),
    },
    groups,
    status: 'unconfirmed',   // MailerLite sends the confirm-your-email message (double opt-in)
    opted_in_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    optin_ip: request.headers.get('cf-connecting-ip') || undefined,
  };
  const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json', authorization: 'Bearer ' + env.MAILERLITE_API_KEY },
    body: JSON.stringify(body),
  });
  if (r.ok) return reply(200, { ok: true });
  return reply(502, { ok: false, error: 'mailerlite', status: r.status });
}

export const onRequest = () => reply(405, { ok: false, error: 'post-only' });
