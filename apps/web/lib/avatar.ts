export function getInitials(organization: string) {
  const words = organization.trim().split(/\s+/);
  const initials =
    words.length === 1
      ? (words[0] ?? "").slice(0, 2)
      : (words[0]?.[0] ?? "") + (words[1]?.[0] ?? "");
  return initials.toUpperCase();
}
