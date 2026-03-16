export const appRoles = ["admin", "advisor", "client"] as const;

export type AppRole = (typeof appRoles)[number];

export function isAppRole(value: string): value is AppRole {
  return appRoles.includes(value as AppRole);
}

export function isAdminRole(role: AppRole) {
  return role === "admin";
}

export function isAdvisorRole(role: AppRole) {
  return role === "advisor" || role === "admin";
}

export function isClientRole(role: AppRole) {
  return role === "client";
}
