import {
  BarChart3,
  Download,
  FileSpreadsheet,
  RefreshCcw
} from "lucide-react";

import {
  useMemo
} from "react";

import AttendanceAnalytics
  from "../components/reports/AttendanceAnalytics";

import DepartmentAnalytics
  from "../components/reports/DepartmentAnalytics";

import LeaveAnalytics
  from "../components/reports/LeaveAnalytics";

import ReportSummary
  from "../components/reports/ReportSummary";

import {
  useAppContext
} from "../hooks/useAppContext";


function Reports() {

  const {
    employees,
    attendanceRecords,
    leaveRequests
  } = useAppContext();


  /* ========================================
     EMPLOYEE STATISTICS
  ======================================== */

  const totalEmployees =
    employees.length;


  const activeEmployees =
    useMemo(
      () =>
        employees.filter(
          (employee) =>
            employee.status ===
            "Active"
        ).length,
      [employees]
    );


  const inactiveEmployees =
    totalEmployees -
    activeEmployees;


  const totalDepartments =
    useMemo(
      () =>
        new Set(
          employees
            .map(
              (employee) =>
                employee.department.trim()
            )
            .filter(Boolean)
        ).size,
      [employees]
    );


  /* ========================================
     ATTENDANCE RATE
  ======================================== */

  const attendanceRate =
    useMemo(
      () => {

        const marked =
          attendanceRecords.filter(
            (record) =>
              record.status !==
              "Not Marked"
          );


        if (
          marked.length === 0
        ) {
          return 0;
        }


        const present =
          marked.filter(
            (record) =>
              record.status ===
              "Present"
          ).length;


        const wfh =
          marked.filter(
            (record) =>
              record.status ===
              "WFH"
          ).length;


        const halfDay =
          marked.filter(
            (record) =>
              record.status ===
              "Half Day"
          ).length;


        return Math.round(
          (
            (
              present +
              wfh +
              halfDay * 0.5
            ) /
            marked.length
          ) *
          100
        );

      },
      [
        attendanceRecords
      ]
    );


  /* ========================================
     LEAVE
  ======================================== */

  const pendingLeave =
    leaveRequests.filter(
      (request) =>
        request.status ===
        "Pending"
    ).length;


  /* ========================================
     CSV EXPORT
  ======================================== */

  function exportEmployeeReport() {

    const header = [
      "Employee ID",
      "Name",
      "Department",
      "Designation",
      "Email",
      "Phone",
      "Joining Date",
      "Status"
    ];


    const rows =
      employees.map(
        (employee) => [

          employee.id,

          employee.name,

          employee.department,

          employee.designation,

          employee.email,

          employee.phone,

          employee.joiningDate,

          employee.status

        ]
      );


    const csvRows = [
      header,
      ...rows
    ]
      .map(
        (row) =>
          row
            .map(
              (value) =>
                `"${String(value)
                  .replace(
                    /"/g,
                    '""'
                  )}"`
            )
            .join(",")
      )
      .join("\n");


    const blob =
      new Blob(
        [csvRows],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );


    link.href = url;

    link.download =
      "onecloud-employee-report.csv";


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );
  }


  /* ========================================
     REFRESH
  ======================================== */

  function handleRefresh() {

    window.location.reload();
  }


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
              Reports & Analytics
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
              Analyze workforce,
              attendance and leave
              information using live
              OneCloud HRMS data.
            </p>

          </div>


          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >

            <button
              type="button"
              onClick={
                handleRefresh
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

              <RefreshCcw
                size={16}
              />

              Refresh

            </button>


            <button
              type="button"
              onClick={
                exportEmployeeReport
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

              <Download
                size={16}
              />

              Export CSV

            </button>

          </div>

        </div>

      </section>


      {/* =====================================
          SUMMARY
      ====================================== */}

      <ReportSummary
        totalEmployees={
          totalEmployees
        }
        activeEmployees={
          activeEmployees
        }
        totalDepartments={
          totalDepartments
        }
        attendanceRate={
          attendanceRate
        }
        pendingLeave={
          pendingLeave
        }
      />


      {/* =====================================
          EMPLOYEE STATUS SUMMARY
      ====================================== */}

      <section
        className="
          grid
          gap-4
          md:grid-cols-3
        "
      >

        <WorkforceCard
          title="Total Workforce"
          value={
            totalEmployees
          }
          description="All employee records"
          variant="blue"
        />


        <WorkforceCard
          title="Active Workforce"
          value={
            activeEmployees
          }
          description="Currently active employees"
          variant="green"
        />


        <WorkforceCard
          title="Inactive Workforce"
          value={
            inactiveEmployees
          }
          description="Inactive employee records"
          variant="red"
        />

      </section>


      {/* =====================================
          DEPARTMENT + LEAVE
      ====================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >

        <DepartmentAnalytics
          employees={
            employees
          }
        />


        <LeaveAnalytics
          requests={
            leaveRequests
          }
        />

      </div>


      {/* =====================================
          ATTENDANCE ANALYTICS
      ====================================== */}

      <AttendanceAnalytics
        records={
          attendanceRecords
        }
      />


      {/* =====================================
          REPORT INFORMATION
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

            <BarChart3
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
              Dynamic HR Analytics
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
              Reports are calculated
              directly from employees,
              attendance records and leave
              requests stored in the shared
              OneCloud AppContext.
            </p>

          </div>

        </div>


        <div
          className="
            inline-flex
            items-center
            gap-2
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

          <FileSpreadsheet
            size={13}
          />

          Live Report

        </div>

      </section>

    </div>
  );
}


/* ==========================================
   WORKFORCE CARD
========================================== */

interface WorkforceCardProps {

  title: string;

  value: number;

  description: string;

  variant:
    | "blue"
    | "green"
    | "red";
}


const workforceStyles = {

  blue:
    "bg-blue-50 text-blue-600",

  green:
    "bg-emerald-50 text-emerald-600",

  red:
    "bg-red-50 text-red-600"
};


function WorkforceCard({
  title,
  value,
  description,
  variant
}: WorkforceCardProps) {

  return (

    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div
        className={`
          inline-flex
          rounded-lg
          px-3
          py-1.5
          text-[10px]
          font-black
          uppercase
          tracking-wide
          ${workforceStyles[variant]}
        `}
      >
        {title}
      </div>


      <p
        className="
          mt-4
          text-3xl
          font-black
          text-slate-950
        "
      >
        {value}
      </p>


      <p
        className="
          mt-1
          text-xs
          text-slate-500
        "
      >
        {description}
      </p>

    </article>
  );
}


export default Reports;
