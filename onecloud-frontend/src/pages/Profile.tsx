import {
  useMemo,
  type ReactNode
} from "react";

import {
  AlertCircle,
  ArrowRight,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2
} from "lucide-react";

import {
  Link,
  useSearchParams
} from "react-router-dom";

import ProfileAttendance
  from "../components/profile/ProfileAttendance";

import ProfileHero
  from "../components/profile/ProfileHero";

import ProfileInformation
  from "../components/profile/ProfileInformation";

import ProfileLeaveHistory
  from "../components/profile/ProfileLeaveHistory";

import ProfileStats
  from "../components/profile/ProfileStats";

import {
  ROUTES
} from "../constants/routes";

import {
  useAppContext
} from "../hooks/useAppContext";


/* ==========================================
   DEFAULT ANNUAL LEAVE ALLOWANCE
========================================== */

const ANNUAL_LEAVE_ALLOWANCE =
  24;


/* ==========================================
   PROFILE PAGE
========================================== */

function Profile() {

  /* ========================================
     SHARED APPLICATION DATA
  ======================================== */

  const {
    employees,
    attendanceRecords,
    leaveRequests
  } = useAppContext();


  /* ========================================
     URL SEARCH PARAMETER

     Example:
     /profile?employee=EMP101
  ======================================== */

  const [
    searchParams,
    setSearchParams
  ] =
    useSearchParams();


  /* ========================================
     REQUESTED EMPLOYEE ID
  ======================================== */

  const requestedEmployeeId =
    searchParams.get(
      "employee"
    );


  /* ========================================
     SELECTED EMPLOYEE

     If employee parameter exists:
     select that employee.

     Otherwise:
     select first employee.
  ======================================== */

  const selectedEmployee =
    useMemo(
      () => {

        if (
          requestedEmployeeId
        ) {

          const matchingEmployee =
            employees.find(
              (employee) =>
                employee.id ===
                requestedEmployeeId
            );


          if (
            matchingEmployee
          ) {
            return matchingEmployee;
          }
        }


        return employees[0];

      },
      [
        employees,
        requestedEmployeeId
      ]
    );


  /* ========================================
     EMPLOYEE ATTENDANCE RECORDS

     This calculation is safe even when
     no employee exists.
  ======================================== */

  const employeeAttendance =
    useMemo(
      () => {

        if (
          !selectedEmployee
        ) {
          return [];
        }


        return attendanceRecords.filter(
          (record) =>
            record.employeeId ===
            selectedEmployee.id
        );

      },
      [
        attendanceRecords,
        selectedEmployee
      ]
    );


  /* ========================================
     MARKED ATTENDANCE
  ======================================== */

  const markedAttendance =
    useMemo(
      () => {

        return employeeAttendance.filter(
          (record) =>
            record.status !==
            "Not Marked"
        );

      },
      [
        employeeAttendance
      ]
    );


  /* ========================================
     ATTENDANCE COUNTS
  ======================================== */

  const presentCount =
    employeeAttendance.filter(
      (record) =>
        record.status ===
        "Present"
    ).length;


  const wfhCount =
    employeeAttendance.filter(
      (record) =>
        record.status ===
        "WFH"
    ).length;


  const halfDayCount =
    employeeAttendance.filter(
      (record) =>
        record.status ===
        "Half Day"
    ).length;


  /* ========================================
     ATTENDANCE PERCENTAGE

     Present  = 1
     WFH      = 1
     Half Day = 0.5
     Absent   = 0
  ======================================== */

  const attendancePercentage =
    markedAttendance.length > 0
      ? Math.round(
          (
            (
              presentCount +
              wfhCount +
              halfDayCount * 0.5
            ) /
            markedAttendance.length
          ) *
          100
        )
      : 0;


  /* ========================================
     EMPLOYEE LEAVE REQUESTS
  ======================================== */

  const employeeLeaveRequests =
    useMemo(
      () => {

        if (
          !selectedEmployee
        ) {
          return [];
        }


        return leaveRequests.filter(
          (request) =>
            request.employeeId ===
            selectedEmployee.id
        );

      },
      [
        leaveRequests,
        selectedEmployee
      ]
    );


  /* ========================================
     APPROVED LEAVE DAYS
  ======================================== */

  const approvedLeaveDays =
    employeeLeaveRequests
      .filter(
        (request) =>
          request.status ===
          "Approved"
      )
      .reduce(
        (
          total,
          request
        ) =>
          total +
          request.totalDays,
        0
      );


  /* ========================================
     REMAINING LEAVE
  ======================================== */

  const remainingLeaveDays =
    Math.max(
      0,
      ANNUAL_LEAVE_ALLOWANCE -
      approvedLeaveDays
    );


  /* ========================================
     PENDING LEAVE REQUESTS
  ======================================== */

  const pendingLeaveRequests =
    employeeLeaveRequests.filter(
      (request) =>
        request.status ===
        "Pending"
    ).length;


  /* ========================================
     EMPLOYEE SELECT HANDLER
  ======================================== */

  function handleEmployeeChange(
    employeeId: string
  ) {

    setSearchParams({
      employee:
        employeeId
    });
  }


  /* ========================================
     NO EMPLOYEES AVAILABLE
  ======================================== */

  if (
    !selectedEmployee
  ) {

    return (

      <section
        className="
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-6
          py-16
          text-center
          shadow-sm
        "
      >

        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-400
          "
        >

          <AlertCircle
            size={30}
          />

        </div>


        <h1
          className="
            mt-5
            text-xl
            font-black
            text-slate-900
          "
        >
          No employees available
        </h1>


        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          Add an employee to OneCloud
          HRMS before opening an employee
          profile.
        </p>


        <Link
          to={
            ROUTES.EMPLOYEE_MANAGEMENT
          }
          className="
            mt-6
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
            shadow-md
            transition
            hover:bg-blue-700
          "
        >

          Add Employee

          <ArrowRight
            size={16}
          />

        </Link>

      </section>
    );
  }


  return (

    <div
      className="
        space-y-7
      "
    >

      {/* =====================================
          PROFILE HERO
      ====================================== */}

      <ProfileHero
        employee={
          selectedEmployee
        }
        employees={
          employees
        }
        onEmployeeChange={
          handleEmployeeChange
        }
      />


      {/* =====================================
          PROFILE STATISTICS
      ====================================== */}

      <ProfileStats
        attendancePercentage={
          attendancePercentage
        }
        totalAttendanceDays={
          markedAttendance.length
        }
        approvedLeaveDays={
          approvedLeaveDays
        }
        remainingLeaveDays={
          remainingLeaveDays
        }
      />


      {/* =====================================
          EMPLOYEE INFORMATION
          + ATTENDANCE
      ====================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >

        <ProfileInformation
          employee={
            selectedEmployee
          }
        />


        <ProfileAttendance
          records={
            employeeAttendance
          }
        />

      </div>


      {/* =====================================
          LEAVE BALANCE SECTION
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
            Employee Leave
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Leave Balance
          </h2>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Current annual leave usage
            and remaining balance.
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

          <LeaveBalanceCard
            title="Annual Allowance"
            value={
              ANNUAL_LEAVE_ALLOWANCE
            }
            description="Total allocated leave"
            icon={
              <CalendarDays
                size={20}
              />
            }
            styleName="blue"
          />


          <LeaveBalanceCard
            title="Leave Used"
            value={
              approvedLeaveDays
            }
            description="Approved leave days"
            icon={
              <CalendarCheck2
                size={20}
              />
            }
            styleName="orange"
          />


          <LeaveBalanceCard
            title="Leave Remaining"
            value={
              remainingLeaveDays
            }
            description="Available leave days"
            icon={
              <CheckCircle2
                size={20}
              />
            }
            styleName="green"
          />


          <LeaveBalanceCard
            title="Pending Requests"
            value={
              pendingLeaveRequests
            }
            description="Waiting for HR review"
            icon={
              <CalendarDays
                size={20}
              />
            }
            styleName="purple"
          />

        </div>

      </section>


      {/* =====================================
          LEAVE HISTORY
      ====================================== */}

      <ProfileLeaveHistory
        requests={
          employeeLeaveRequests
        }
      />


      {/* =====================================
          PROFILE INFORMATION MESSAGE
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

        <div>

          <p
            className="
              text-sm
              font-black
              text-blue-950
            "
          >
            Dynamic Employee Profile
          </p>


          <p
            className="
              mt-1
              max-w-3xl
              text-xs
              leading-5
              text-blue-700
            "
          >
            Employee information,
            attendance statistics and leave
            records on this page are
            calculated directly from the
            shared OneCloud application
            data.
          </p>

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


/* ==========================================
   LEAVE BALANCE CARD PROPS

   TypeScript 6 compatible:
   ReactNode imported directly.
========================================== */

interface LeaveBalanceCardProps {

  title: string;

  value: number;

  description: string;

  icon: ReactNode;

  styleName:
    | "blue"
    | "orange"
    | "green"
    | "purple";
}


/* ==========================================
   LEAVE CARD STYLES
========================================== */

const leaveCardStyles = {

  blue:
    "bg-blue-50 text-blue-600",

  orange:
    "bg-orange-50 text-orange-600",

  green:
    "bg-emerald-50 text-emerald-600",

  purple:
    "bg-purple-50 text-purple-600"

};


/* ==========================================
   LEAVE BALANCE CARD
========================================== */

function LeaveBalanceCard({
  title,
  value,
  description,
  icon,
  styleName
}: LeaveBalanceCardProps) {

  return (

    <article
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div>

        <p
          className="
            text-xs
            font-bold
            text-slate-500
          "
        >
          {title}
        </p>


        <p
          className="
            mt-2
            text-3xl
            font-black
            tracking-tight
            text-slate-950
          "
        >
          {value}
        </p>


        <p
          className="
            mt-1
            text-[10px]
            text-slate-400
          "
        >
          {description}
        </p>

      </div>


      <div
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${leaveCardStyles[styleName]}
        `}
      >
        {icon}
      </div>

    </article>
  );
}


export default Profile;
