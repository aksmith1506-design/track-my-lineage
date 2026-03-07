export function createSlug(person) {
  const first = person.firstName.toLowerCase();
  const last = person.lastName.toLowerCase();
  const year = person.birthYear || "unknown";

  return `${first}${last}${year}-${person.id}`;
}