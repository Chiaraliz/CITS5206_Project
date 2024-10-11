export const searchMembers = (members, searchTerm) => {
  if (!searchTerm) return members;

  const lowercasedTerm = searchTerm.trim().toLowerCase();
  return members.filter(
    (member) =>
      (member.first_name &&
        member.first_name.toLowerCase().includes(lowercasedTerm)) ||
      (member.last_name &&
        member.last_name.toLowerCase().includes(lowercasedTerm)) ||
      (member.email && member.email.toLowerCase().includes(lowercasedTerm)) ||
      (member.id && member.id.toString().includes(lowercasedTerm))
  );
};
