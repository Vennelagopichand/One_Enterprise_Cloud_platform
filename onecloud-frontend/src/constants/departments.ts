export const DEPARTMENTS = [
  "Development",
  "Human Resources",
  "Finance",
  "CRM",
  "Marketing",
  "Sales",
  "Operations"
] as const;

export type Department =
  (typeof DEPARTMENTS)[number];
  