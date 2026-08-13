import { ROUTES } from "../constants/routes";

export type RouteIconName =
  | "dashboard"
  | "employees"
  | "attendance"
  | "leave"
  | "payroll"
  | "crm"
  | "finance"
  | "reports"
  | "settings"
  | "profile";

export interface AppRouteConfig {
  name: string;

  path: string;

  protected: boolean;

  showInSidebar: boolean;

  icon?: RouteIconName;
}

export const routeConfig: AppRouteConfig[] = [
  {
    name: "Landing Page",
    path: ROUTES.HOME,
    protected: false,
    showInSidebar: false
  },

  {
    name: "Login",
    path: ROUTES.LOGIN,
    protected: false,
    showInSidebar: false
  },

  {
    name: "Register",
    path: ROUTES.REGISTER,
    protected: false,
    showInSidebar: false
  },

  {
    name: "Dashboard",
    path: ROUTES.DASHBOARD,
    protected: true,
    showInSidebar: true,
    icon: "dashboard"
  },

  {
    name: "Employees",
    path: ROUTES.EMPLOYEES,
    protected: true,
    showInSidebar: true,
    icon: "employees"
  },

  {
    name: "Employee Management",
    path: ROUTES.EMPLOYEE_MANAGEMENT,
    protected: true,
    showInSidebar: false,
    icon: "employees"
  },

  {
    name: "Attendance",
    path: ROUTES.ATTENDANCE,
    protected: true,
    showInSidebar: true,
    icon: "attendance"
  },

  {
    name: "Leave Management",
    path: ROUTES.LEAVE,
    protected: true,
    showInSidebar: true,
    icon: "leave"
  },

  {
    name: "Payroll",
    path: ROUTES.PAYROLL,
    protected: true,
    showInSidebar: true,
    icon: "payroll"
  },

  {
    name: "CRM",
    path: ROUTES.CRM,
    protected: true,
    showInSidebar: true,
    icon: "crm"
  },

  {
    name: "Finance",
    path: ROUTES.FINANCE,
    protected: true,
    showInSidebar: true,
    icon: "finance"
  },

  {
    name: "Reports",
    path: ROUTES.REPORTS,
    protected: true,
    showInSidebar: true,
    icon: "reports"
  },

  {
    name: "Settings",
    path: ROUTES.SETTINGS,
    protected: true,
    showInSidebar: true,
    icon: "settings"
  },

  {
    name: "Profile",
    path: ROUTES.PROFILE,
    protected: true,
    showInSidebar: false,
    icon: "profile"
  }
];

export const sidebarRoutes =
  routeConfig.filter(
    (route) =>
      route.showInSidebar
  );
  