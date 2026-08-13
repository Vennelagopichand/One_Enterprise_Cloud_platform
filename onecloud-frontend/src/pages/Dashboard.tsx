import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CalendarDays,
  Clock3,
  Handshake,
  Landmark,
  Plus,
  UserCheck,
  UserPlus,
  Users,
  WalletCards
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import AttendanceOverview
  from "../components/dashboard/AttendanceOverview";

import LeaveOverview
  from "../components/dashboard/LeaveOverview";

import ModuleCard
  from "../components/dashboard/ModuleCard";

import QuickAction
  from "../components/dashboard/QuickAction";

import RecentLeaveRequests
  from "../components/dashboard/RecentLeaveRequests";

import StatCard
  from "../components/dashboard/StatCard";

import WorkforceOverview
  from "../components/dashboard/WorkforceOverview";

import {
  ROUTES
} from "../constants/routes";

import {
  useAppContext
} from "../hooks/useAppContext";

import {
  useAuth
} from "../hooks/useAuth";

import {
  getTodayDateString
} from "../utils/date";


function Dashboard() {

  /* ========================================
     AUTHENTICATED USER
  ======================================== */

  const {
    user
  } = useAuth();


  /* ========================================
     SHARED APPLICATION DATA
  ======================================== */

  const {
    employees,
    leaveRequests,
    getAttendanceStatus
  } = useAppContext();


  /* ========================================
     USER INFORMATION
  ======================================== */

  const userName =
    user?.name ??
    "Admin User";


  const firstName =
    userName
      .trim()
      .split(/\s+/)[0];


  /* ========================================
     CURRENT DATE
  ======================================== */

  const currentDate =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    ).format(
      new Date()
    );


  const today =
    getTodayDateString();


  /* ========================================
     EMPLOYEE STATISTICS
  ======================================== */

  const totalEmployees =
    employees.length;


  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status ===
        "Active"
    ).length;


  const totalDepartments =
    new Set(
      employees
        .map(
          (employee) =>
            employee.department
              .trim()
        )
        .filter(Boolean)
    ).size;


  /* ========================================
     TODAY'S ATTENDANCE
  ======================================== */

  const presentToday =
    employees.filter(
      (employee) => {

        const status =
          getAttendanceStatus(
            employee.id,
            today
          );


        return (
          status === "Present" ||
          status === "WFH" ||
          status === "Half Day"
        );
      }
    ).length;


  /* ========================================
     PENDING LEAVE
  ======================================== */

  const pendingLeave =
    leaveRequests.filter(
      (request) =>
        request.status ===
        "Pending"
    ).length;


  return (

    <div
      className="
        space-y-7
      "
    >

      {/* =====================================
          WELCOME BANNER
      ====================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-indigo-950
          px-6
          py-8
          text-white
          shadow-xl
          sm:px-8
          lg:px-10
        "
      >

        {/* Decorative Background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-32
            h-80
            w-80
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-1/3
            h-72
            w-72
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />


        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-7
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.18em]
                text-blue-300
              "
            >
              OneCloud HR Dashboard
            </p>


            <h1
              className="
                mt-3
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Welcome back, {firstName}
            </h1>


            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-300
              "
            >
              Monitor your workforce,
              attendance, employee records
              and leave requests from one
              centralized HR dashboard.
            </p>


            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-xs
                font-semibold
                text-slate-300
                backdrop-blur
              "
            >

              <Clock3
                size={14}
                className="
                  text-blue-300
                "
              />

              {currentDate}

            </div>

          </div>


          {/* Actions */}

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >

            <Link
              to={
                ROUTES.EMPLOYEE_MANAGEMENT
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-black
                text-white
                shadow-lg
                transition
                hover:bg-blue-500
              "
            >

              <Plus size={17} />

              Add Employee

            </Link>


            <Link
              to={
                ROUTES.LEAVE_APPROVAL
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/15
                bg-white/5
                px-5
                py-3
                text-sm
                font-black
                text-white
                transition
                hover:bg-white/10
              "
            >

              Review Leave

              <ArrowRight
                size={17}
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================
          LIVE HR STATISTICS
      ====================================== */}

      <section>

        <div
          className="
            mb-5
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-blue-600
              "
            >
              Live HR Data
            </p>


            <h2
              className="
                mt-1
                text-xl
                font-black
                text-slate-950
              "
            >
              Organization Overview
            </h2>

          </div>


          <p
            className="
              text-xs
              text-slate-500
            "
          >
            Updated automatically from
            OneCloud HRMS
          </p>

        </div>


        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatCard
            title="Total Employees"
            value={totalEmployees}
            description={`${totalDepartments} departments`}
            icon={Users}
            variant="blue"
          />


          <StatCard
            title="Active Employees"
            value={activeEmployees}
            description="Active workforce records"
            icon={UserCheck}
            variant="green"
          />


          <StatCard
            title="Available Today"
            value={presentToday}
            description="Present, WFH or half day"
            icon={CalendarCheck2}
            variant="cyan"
          />


          <StatCard
            title="Pending Leave"
            value={pendingLeave}
            description="Waiting for HR review"
            icon={CalendarDays}
            variant="orange"
          />

        </div>

      </section>


      {/* =====================================
          HR ANALYTICS
      ====================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >

        <AttendanceOverview />

        <LeaveOverview />

      </div>


      {/* =====================================
          DEPARTMENTS + RECENT LEAVE
      ====================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[1.1fr_0.9fr]
        "
      >

        <WorkforceOverview />

        <RecentLeaveRequests />

      </div>


      {/* =====================================
          ENTERPRISE MODULES
      ====================================== */}

      <section>

        <div
          className="
            mb-5
          "
        >

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.16em]
              text-blue-600
            "
          >
            Enterprise Applications
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            OneCloud Modules
          </h2>

        </div>


        <div
          className="
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          <ModuleCard
            title="Employee Management"
            description="Create, update and manage employee records."
            path={
              ROUTES.EMPLOYEE_MANAGEMENT
            }
            icon={Users}
            color="blue"
          />


          <ModuleCard
            title="Attendance"
            description="Track daily employee attendance and status."
            path={
              ROUTES.ATTENDANCE
            }
            icon={CalendarCheck2}
            color="green"
          />


          <ModuleCard
            title="Leave Management"
            description="Apply and manage employee leave requests."
            path={
              ROUTES.LEAVE
            }
            icon={CalendarDays}
            color="purple"
          />


          <ModuleCard
            title="Payroll"
            description="Manage salaries and employee compensation."
            path={
              ROUTES.PAYROLL
            }
            icon={WalletCards}
            color="orange"
          />


          <ModuleCard
            title="CRM"
            description="Manage customers, leads and sales."
            path={
              ROUTES.CRM
            }
            icon={Handshake}
            color="cyan"
          />


          <ModuleCard
            title="Finance"
            description="Manage expenses, budgets and accounting."
            path={
              ROUTES.FINANCE
            }
            icon={Landmark}
            color="rose"
          />

        </div>

      </section>


      {/* =====================================
          QUICK ACTIONS
      ====================================== */}

      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <div
          className="
            mb-5
          "
        >

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.16em]
              text-blue-600
            "
          >
            HR Shortcuts
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Quick Actions
          </h2>

        </div>


        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <QuickAction
            title="Add Employee"
            description="Create employee record"
            path={
              ROUTES.EMPLOYEE_MANAGEMENT
            }
            icon={UserPlus}
          />


          <QuickAction
            title="Employee Directory"
            description="Search workforce records"
            path={
              ROUTES.EMPLOYEES
            }
            icon={Users}
          />


          <QuickAction
            title="Mark Attendance"
            description="Manage today's attendance"
            path={
              ROUTES.ATTENDANCE
            }
            icon={CalendarCheck2}
          />


          <QuickAction
            title="Review Leave"
            description={`${pendingLeave} pending requests`}
            path={
              ROUTES.LEAVE_APPROVAL
            }
            icon={CalendarDays}
          />

        </div>

      </section>


      {/* =====================================
          ORGANIZATION INFORMATION
      ====================================== */}

      <section
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-blue-100
          bg-blue-50/60
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div
          className="
            flex
            items-start
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              text-blue-600
            "
          >
            <Building2
              size={18}
            />
          </div>


          <div>

            <p
              className="
                text-sm
                font-black
                text-blue-950
              "
            >
              OneCloud HRMS Live Dashboard
            </p>


            <p
              className="
                mt-1
                text-xs
                leading-5
                text-blue-700
              "
            >
              Employee, attendance and
              leave information shown here
              is connected to the same
              AppContext data.
            </p>

          </div>

        </div>


        <span
          className="
            shrink-0
            rounded-full
            bg-emerald-100
            px-4
            py-2
            text-[10px]
            font-black
            uppercase
            tracking-wide
            text-emerald-700
          "
        >
          Live Data
        </span>

      </section>

    </div>
  );
}


export default Dashboard;
