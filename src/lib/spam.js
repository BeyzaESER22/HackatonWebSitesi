export function isSpamSubmission(body) {
  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
  if (honeypot) return true;

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';

  if (fullName.length > 0 && /^https?:\/\//i.test(fullName)) return true;

  return false;
}
