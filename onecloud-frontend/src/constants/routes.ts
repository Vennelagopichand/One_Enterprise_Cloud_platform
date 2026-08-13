export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  DASHBOARD: "/dashboard",

  EMPLOYEE_MANAGEMENT:
    "/employee-management",

  EMPLOYEES:
    "/employees",

  EMPLOYEE_DETAILS:
    "/employees/:id",

  ATTENDANCE:
    "/attendance",

  LEAVE:
    "/leave",

  LEAVE_APPROVAL:
    "/leave/approval",

  PROFILE:
    "/profile",

  PAYROLL:
    "/payroll",

  CRM:
    "/crm",

  FINANCE:
    "/finance",

  REPORTS:
    "/reports",

  SETTINGS:
    "/settings",

  NOT_FOUND:
    "*"
} as const;
