export type AdminRole = "owner" | "finance" | "operations" | "viewer";

export type AdminAccessScope =
  | "admin:overview"
  | "admin:enquiries"
  | "admin:invoices"
  | "admin:payments"
  | "admin:registrations";

export type PrototypeAdminAccessDecision = {
  allowed: false;
  mode: "prototype";
  requiredRoles: AdminRole[];
  roles: AdminRole[];
  scope: AdminAccessScope;
  statusLabel: string;
  notice: string;
};

export type AuthorizedAdminAccessDecision = {
  allowed: true;
  mode: "authorized";
  requiredRoles: AdminRole[];
  roles: AdminRole[];
  scope: AdminAccessScope;
  statusLabel: string;
  notice: string;
};

export type AdminAccessDecision =
  | PrototypeAdminAccessDecision
  | AuthorizedAdminAccessDecision;

export const adminAccessRequirements: Record<AdminAccessScope, AdminRole[]> = {
  "admin:overview": ["owner", "finance", "operations", "viewer"],
  "admin:enquiries": ["owner", "operations"],
  "admin:invoices": ["owner", "finance"],
  "admin:payments": ["owner", "finance"],
  "admin:registrations": ["owner", "operations"],
};

export async function getAdminAccessDecision(
  scope: AdminAccessScope,
): Promise<AdminAccessDecision> {
  return {
    allowed: false,
    mode: "prototype",
    requiredRoles: adminAccessRequirements[scope],
    roles: [],
    scope,
    statusLabel: "Prototype/static shell",
    notice:
      "No admin authentication provider is configured. This route is a non-operational planning surface, not a secure admin area.",
  };
}

export function assertAuthorizedAdmin(
  decision: AdminAccessDecision,
): asserts decision is AuthorizedAdminAccessDecision {
  if (!decision.allowed) {
    throw new Error(
      "Admin authorization is not configured. Add a real server-side auth check before enabling live admin actions.",
    );
  }
}
