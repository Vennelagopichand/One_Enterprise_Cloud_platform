import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import {
  ROUTES
} from "../constants/routes";


/* ==========================================
   LAYOUTS
========================================== */

import AuthLayout
  from "../layouts/AuthLayout";

import DashboardLayout
  from "../layouts/DashboardLayout";

import PublicLayout
  from "../layouts/PublicLayout";


/* ==========================================
   PAGES
========================================== */

import Attendance
  from "../pages/Attendance";

import Dashboard
  from "../pages/Dashboard";

import EmployeeDetailsPage
  from "../pages/EmployeeDetailsPage";

import EmployeeManagement
  from "../pages/EmployeeManagement";

import Employees
  from "../pages/Employees";

import LandingPage
  from "../pages/LandingPage";

import Leave
  from "../pages/Leave";

import LeaveApproval
  from "../pages/LeaveApproval";

import Login
  from "../pages/Login";

import Profile
  from "../pages/Profile";

import Register
  from "../pages/Register";

import Reports
  from "../pages/Reports";

import RoutePlaceholder
  from "../pages/RoutePlaceholder";


/* ==========================================
   PROTECTED ROUTE
========================================== */

import ProtectedRoute
  from "./ProtectedRoute";


/* ==========================================
   APP ROUTES
========================================== */

function AppRoutes() {

  return (

    <Routes>

      {/* =====================================
          PUBLIC WEBSITE
      ====================================== */}

      <Route
        element={
          <PublicLayout />
        }
      >

        <Route
          path={
            ROUTES.HOME
          }
          element={
            <LandingPage />
          }
        />

      </Route>


      {/* =====================================
          AUTHENTICATION
      ====================================== */}

      <Route
        element={
          <AuthLayout />
        }
      >

        {/* Login */}

        <Route
          path={
            ROUTES.LOGIN
          }
          element={
            <Login />
          }
        />


        {/* Register */}

        <Route
          path={
            ROUTES.REGISTER
          }
          element={
            <Register />
          }
        />

      </Route>


      {/* =====================================
          PROTECTED APPLICATION
      ====================================== */}

      <Route
        element={
          <ProtectedRoute />
        }
      >

        {/* ===================================
            DASHBOARD LAYOUT

            All routes inside this layout
            receive:

            Sidebar
            Header
            Main Content
            Footer
        ==================================== */}

        <Route
          element={
            <DashboardLayout />
          }
        >

          {/* =================================
              DASHBOARD
          ================================== */}

          <Route
            path={
              ROUTES.DASHBOARD
            }
            element={
              <Dashboard />
            }
          />


          {/* =================================
              EMPLOYEE MANAGEMENT
          ================================== */}

          <Route
            path={
              ROUTES.EMPLOYEE_MANAGEMENT
            }
            element={
              <EmployeeManagement />
            }
          />


          {/* =================================
              EMPLOYEE DIRECTORY
          ================================== */}

          <Route
            path={
              ROUTES.EMPLOYEES
            }
            element={
              <Employees />
            }
          />


          {/* =================================
              EMPLOYEE DETAILS

              Example:
              /employees/EMP101
          ================================== */}

          <Route
            path={
              ROUTES.EMPLOYEE_DETAILS
            }
            element={
              <EmployeeDetailsPage />
            }
          />


          {/* =================================
              ATTENDANCE MANAGEMENT
          ================================== */}

          <Route
            path={
              ROUTES.ATTENDANCE
            }
            element={
              <Attendance />
            }
          />


          {/* =================================
              LEAVE MANAGEMENT
          ================================== */}

          <Route
            path={
              ROUTES.LEAVE
            }
            element={
              <Leave />
            }
          />


          {/* =================================
              LEAVE APPROVAL
          ================================== */}

          <Route
            path={
              ROUTES.LEAVE_APPROVAL
            }
            element={
              <LeaveApproval />
            }
          />


          {/* =================================
              EMPLOYEE PROFILE
              PART 13

              Examples:

              /profile

              /profile?employee=EMP101
          ================================== */}

          <Route
            path={
              ROUTES.PROFILE
            }
            element={
              <Profile />
            }
          />


          {/* =================================
              PAYROLL
              PART 15
          ================================== */}

          <Route
            path={
              ROUTES.PAYROLL
            }
            element={
              <RoutePlaceholder
                title="Payroll"
                description="
                  Employee salary,
                  allowances,
                  deductions,
                  payroll processing,
                  payslips and
                  compensation management
                  will be implemented later.
                "
              />
            }
          />


          {/* =================================
              CRM
          ================================== */}

          <Route
            path={
              ROUTES.CRM
            }
            element={
              <RoutePlaceholder
                title="CRM"
                description="
                  Customer relationship
                  management including
                  customers, leads,
                  opportunities and
                  sales management
                  will be implemented later.
                "
              />
            }
          />


          {/* =================================
              FINANCE
          ================================== */}

          <Route
            path={
              ROUTES.FINANCE
            }
            element={
              <RoutePlaceholder
                title="Finance"
                description="
                  Enterprise finance,
                  accounting,
                  budgets,
                  expenses and
                  financial reporting
                  will be implemented later.
                "
              />
            }
          />


          {/* =================================
              REPORTS & ANALYTICS
              PART 14
          ================================== */}

          <Route
            path={
              ROUTES.REPORTS
            }
            element={
              <Reports />
            }
          />


          {/* =================================
              SETTINGS
          ================================== */}

          <Route
            path={
              ROUTES.SETTINGS
            }
            element={
              <RoutePlaceholder
                title="Settings"
                description="
                  Manage OneCloud
                  application preferences,
                  account settings,
                  user preferences and
                  enterprise configuration.
                "
              />
            }
          />

        </Route>

      </Route>


      {/* =====================================
          UNKNOWN / INVALID ROUTES
      ====================================== */}

      <Route
        path={
          ROUTES.NOT_FOUND
        }
        element={
          <Navigate
            to={
              ROUTES.HOME
            }
            replace
          />
        }
      />

    </Routes>
  );
}


export default AppRoutes;
