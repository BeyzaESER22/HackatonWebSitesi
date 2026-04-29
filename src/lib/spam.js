export function isSpamSubmission(body) {
  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
  if (honeypot) return true;

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const projectIdea = typeof body.projectIdea === 'string' ? body.projectIdea.trim() : '';

  if (fullName.length > 0 && /^https?:\/\//i.test(fullName)) return true;
  if (projectIdea.length > 0 && projectIdea.length < 3 && /https?:\/\//i.test(projectIdea)) return true;

  return false;
}
