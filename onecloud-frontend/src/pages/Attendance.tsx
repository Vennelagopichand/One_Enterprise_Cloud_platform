import {
  CalendarCheck2
} from "lucide-react";

import {
  useMemo,
  useState
} from "react";

import AttendanceFilters, {
  type AttendanceStatusFilter
} from "../components/attendance/AttendanceFilters";

import AttendanceSummary
  from "../components/attendance/AttendanceSummary";

import AttendanceTable
  from "../components/attendance/AttendanceTable";

import {
  useAppContext
} from "../hooks/useAppContext";

import type {
  AttendanceStatus
} from "../types/attendance";

import {
  formatDisplayDate,
  getTodayDateString
} from "../utils/date";


function Attendance() {

  /* ========================================
     SHARED APPLICATION DATA
  ======================================== */

  const {
    employees,
    getAttendanceStatus,
    setAttendanceStatus
  } = useAppContext();


  /* ========================================
     SELECTED DATE
  ======================================== */

  const [
    selectedDate,
    setSelectedDate
  ] = useState(
    getTodayDateString()
  );


  /* ========================================
     SEARCH
  ======================================== */

  const [
    search,
    setSearch
  ] = useState("");


  /* ========================================
     DEPARTMENT FILTER
  ======================================== */

  const [
    department,
    setDepartment
  ] = useState("All");


  /* ========================================
     ATTENDANCE STATUS FILTER
  ======================================== */

  const [
    statusFilter,
    setStatusFilter
  ] =
    useState<AttendanceStatusFilter>(
      "All"
    );


  /* ========================================
     UNIQUE DEPARTMENTS
  ======================================== */

  const departments =
    useMemo(
      () => {

        return Array.from(
          new Set(
            employees
              .map(
                (employee) =>
                  employee.department
                    .trim()
              )
              .filter(Boolean)
          )
        ).sort(
          (a, b) =>
            a.localeCompare(b)
        );

      },
      [
        employees
      ]
    );


  /* ========================================
     ATTENDANCE SUMMARY
  ======================================== */

  const attendanceSummary =
    useMemo(
      () => {

        const summary = {
          present: 0,
          absent: 0,
          wfh: 0,
          halfDay: 0,
          notMarked: 0
        };


        employees.forEach(
          (employee) => {

            const status =
              getAttendanceStatus(
                employee.id,
                selectedDate
              );


            switch (status) {

              case "Present":

                summary.present += 1;

                break;


              case "Absent":

                summary.absent += 1;

                break;


              case "WFH":

                summary.wfh += 1;

                break;


              case "Half Day":

                summary.halfDay += 1;

                break;


              case "Not Marked":
              default:

                summary.notMarked += 1;

                break;
            }

          }
        );


        return summary;

      },
      [
        employees,
        selectedDate,
        getAttendanceStatus
      ]
    );


  /* ========================================
     FILTERED EMPLOYEES
  ======================================== */

  const filteredEmployees =
    useMemo(
      () => {

        const query =
          search
            .trim()
            .toLowerCase();


        return employees.filter(
          (employee) => {

            const attendance =
              getAttendanceStatus(
                employee.id,
                selectedDate
              );


            /*
              Search by:

              Employee Name
              Employee ID
              Department
              Designation
              Email
            */

            const matchesSearch =
              !query ||

              employee.name
                .toLowerCase()
                .includes(query)

              ||

              employee.id
                .toLowerCase()
                .includes(query)

              ||

              employee.department
                .toLowerCase()
                .includes(query)

              ||

              employee.designation
                .toLowerCase()
                .includes(query)

              ||

              employee.email
                .toLowerCase()
                .includes(query);


            /*
              Department filter
            */

            const matchesDepartment =
              department === "All"

              ||

              employee.department ===
                department;


            /*
              Attendance status filter
            */

            const matchesStatus =
              statusFilter === "All"

              ||

              attendance ===
                statusFilter;


            return (
              matchesSearch &&
              matchesDepartment &&
              matchesStatus
            );

          }
        );

      },
      [
        employees,
        search,
        department,
        statusFilter,
        selectedDate,
        getAttendanceStatus
      ]
    );


  /* ========================================
     UPDATE ATTENDANCE
  ======================================== */

  function handleStatusChange(
    employeeId: string,
    status: AttendanceStatus
  ) {

    setAttendanceStatus(
      employeeId,
      selectedDate,
      status
    );
  }


  /* ========================================
     RESET FILTERS
  ======================================== */

  function resetFilters() {

    setSearch("");

    setDepartment("All");

    setStatusFilter("All");

    setSelectedDate(
      getTodayDateString()
    );
  }


  /* ========================================
     TOTAL MARKED
  ======================================== */

  const totalMarked =
    attendanceSummary.present +
    attendanceSummary.absent +
    attendanceSummary.wfh +
    attendanceSummary.halfDay;


  /* ========================================
     ATTENDANCE PERCENTAGE
  ======================================== */

  const attendancePercentage =
    employees.length > 0
      ? Math.round(
          (
            (
              attendanceSummary.present +
              attendanceSummary.wfh +
              attendanceSummary.halfDay
            ) /
            employees.length
          ) *
          100
        )
      : 0;


  return (

    <div
      className="
        space-y-7
      "
    >

      {/* =====================================
          PAGE HEADER
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

        {/* Decorative Circle */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
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
            -bottom-28
            left-1/3
            h-72
            w-72
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />


        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* Left Content */}

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
              OneCloud HRMS
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
              Attendance Management
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
              Monitor and manage daily employee
              attendance across your organization.
              Update attendance status, search
              employees and review workforce
              availability from one place.
            </p>


            {/* Selected Date */}

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
                font-bold
                text-blue-200
                backdrop-blur
              "
            >

              <CalendarCheck2
                size={14}
              />

              {
                formatDisplayDate(
                  selectedDate
                )
              }

            </div>

          </div>


          {/* Right Summary */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              lg:min-w-[360px]
            "
          >

            {/* Employees */}

            <HeaderStat
              label="Employees"
              value={
                employees.length
              }
            />


            {/* Marked */}

            <HeaderStat
              label="Marked"
              value={
                totalMarked
              }
            />


            {/* Attendance Percentage */}

            <HeaderStat
              label="Attendance"
              value={
                `${attendancePercentage}%`
              }
            />

          </div>

        </div>

      </section>


      {/* =====================================
          ATTENDANCE SUMMARY
      ====================================== */}

      <AttendanceSummary
        present={
          attendanceSummary.present
        }
        absent={
          attendanceSummary.absent
        }
        wfh={
          attendanceSummary.wfh
        }
        halfDay={
          attendanceSummary.halfDay
        }
        notMarked={
          attendanceSummary.notMarked
        }
      />


      {/* =====================================
          FILTERS
      ====================================== */}

      <AttendanceFilters
        search={
          search
        }
        department={
          department
        }
        status={
          statusFilter
        }
        date={
          selectedDate
        }
        departments={
          departments
        }
        onSearchChange={
          setSearch
        }
        onDepartmentChange={
          setDepartment
        }
        onStatusChange={
          setStatusFilter
        }
        onDateChange={
          setSelectedDate
        }
        onReset={
          resetFilters
        }
      />


      {/* =====================================
          RESULTS INFORMATION
      ====================================== */}

      <section
        className="
          flex
          flex-col
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-4
          shadow-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.15em]
              text-blue-600
            "
          >
            Attendance Records
          </p>


          <h2
            className="
              mt-1
              text-lg
              font-black
              text-slate-900
            "
          >
            Daily Employee Attendance
          </h2>

        </div>


        <p
          className="
            text-xs
            font-semibold
            text-slate-500
          "
        >

          Showing{" "}

          <span
            className="
              font-black
              text-blue-600
            "
          >
            {
              filteredEmployees.length
            }
          </span>

          {" "}of{" "}

          <span
            className="
              font-black
              text-slate-800
            "
          >
            {
              employees.length
            }
          </span>

          {" "}employees

        </p>

      </section>


      {/* =====================================
          ATTENDANCE TABLE
      ====================================== */}

      <AttendanceTable
        employees={
          filteredEmployees
        }
        getStatus={
          (
            employeeId
          ) =>
            getAttendanceStatus(
              employeeId,
              selectedDate
            )
        }
        onStatusChange={
          handleStatusChange
        }
      />


      {/* =====================================
          PAGE INFORMATION
      ====================================== */}

      <section
        className="
          rounded-2xl
          border
          border-blue-100
          bg-blue-50/60
          px-5
          py-4
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
              mt-0.5
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              text-blue-600
            "
          >

            <CalendarCheck2
              size={17}
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
              Attendance records are saved automatically
            </p>


            <p
              className="
                mt-1
                text-xs
                leading-5
                text-blue-700
              "
            >
              When you change an employee's attendance
              status, OneCloud stores the record for the
              selected date. You can switch dates and
              maintain separate attendance records for
              each employee.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}


/* ==========================================
   HEADER STAT
========================================== */

interface HeaderStatProps {
  label: string;
  value: string | number;
}


function HeaderStat({
  label,
  value
}: HeaderStatProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-4
        py-4
        backdrop-blur
      "
    >

      <p
        className="
          text-2xl
          font-black
          tracking-tight
          text-white
        "
      >
        {value}
      </p>


      <p
        className="
          mt-1
          text-[10px]
          font-black
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {label}
      </p>

    </div>
  );
}


export default Attendance;
