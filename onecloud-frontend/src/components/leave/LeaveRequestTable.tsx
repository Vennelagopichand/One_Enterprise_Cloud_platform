import type {
  ReactNode
} from "react";

import {
  Ban,
  CalendarDays,
  MessageSquareText,
  Users
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import type {
  LeaveRequest,
  LeaveStatus
} from "../../types/leave";

import {
  formatLeaveDate
} from "../../utils/leave";

import EmployeeAvatar
  from "../employee/EmployeeAvatar";


/* ==========================================
   COMPONENT PROPS
========================================== */

interface LeaveRequestTableProps {

  requests:
    LeaveRequest[];

  employees:
    EmployeeRecord[];

  onCancel:
    (
      leaveId: string
    ) => void;
}


/* ==========================================
   LEAVE REQUEST TABLE
========================================== */

function LeaveRequestTable({
  requests,
  employees,
  onCancel
}: LeaveRequestTableProps) {

  /* ========================================
     FIND EMPLOYEE
  ======================================== */

  function findEmployee(
    employeeId: string
  ) {

    return employees.find(
      (employee) =>
        employee.id ===
        employeeId
    );
  }


  return (

    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      {/* =====================================
          TABLE HEADER
      ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-100
          px-6
          py-5
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
              tracking-[0.16em]
              text-blue-600
            "
          >
            Leave Requests
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            Leave History
          </h2>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Review employee leave
            request history and status.
          </p>

        </div>


        <div
          className="
            rounded-xl
            bg-blue-50
            px-4
            py-2.5
            text-xs
            font-black
            text-blue-700
          "
        >
          {requests.length}{" "}
          {
            requests.length === 1
              ? "Request"
              : "Requests"
          }
        </div>

      </div>


      {/* =====================================
          TABLE
      ====================================== */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            min-w-[1180px]
            border-collapse
          "
        >

          {/* =================================
              TABLE HEAD
          ================================== */}

          <thead>

            <tr
              className="
                bg-slate-950
                text-left
                text-white
              "
            >

              <Heading>
                Request ID
              </Heading>

              <Heading>
                Employee
              </Heading>

              <Heading>
                Leave Type
              </Heading>

              <Heading>
                Leave Dates
              </Heading>

              <Heading>
                Days
              </Heading>

              <Heading>
                Reason
              </Heading>

              <Heading>
                Status
              </Heading>

              <Heading>
                Action
              </Heading>

            </tr>

          </thead>


          {/* =================================
              TABLE BODY
          ================================== */}

          <tbody>

            {
              requests.length > 0
                ? (

                  requests.map(
                    (request) => {

                      const employee =
                        findEmployee(
                          request.employeeId
                        );


                      return (

                        <tr
                          key={
                            request.id
                          }
                          className="
                            border-b
                            border-slate-100
                            transition
                            hover:bg-blue-50/30
                          "
                        >

                          {/* ===================
                              REQUEST ID
                          ==================== */}

                          <td
                            className="
                              whitespace-nowrap
                              px-5
                              py-4
                            "
                          >

                            <span
                              className="
                                rounded-lg
                                bg-blue-50
                                px-2.5
                                py-1.5
                                font-mono
                                text-[11px]
                                font-black
                                text-blue-700
                              "
                            >
                              {request.id}
                            </span>

                          </td>


                          {/* ===================
                              EMPLOYEE
                          ==================== */}

                          <td
                            className="
                              min-w-64
                              px-5
                              py-4
                            "
                          >

                            {
                              employee
                                ? (

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-3
                                    "
                                  >

                                    <EmployeeAvatar
                                      name={
                                        employee.name
                                      }
                                      photo={
                                        employee.photo
                                      }
                                      size="sm"
                                    />


                                    <div
                                      className="
                                        min-w-0
                                      "
                                    >

                                      <p
                                        className="
                                          truncate
                                          text-sm
                                          font-black
                                          text-slate-900
                                        "
                                      >
                                        {
                                          employee.name
                                        }
                                      </p>


                                      <p
                                        className="
                                          mt-1
                                          text-[11px]
                                          text-slate-400
                                        "
                                      >
                                        {
                                          employee.id
                                        }
                                      </p>


                                      <p
                                        className="
                                          mt-0.5
                                          text-[10px]
                                          text-slate-400
                                        "
                                      >
                                        {
                                          employee.department
                                        }
                                      </p>

                                    </div>

                                  </div>

                                )
                                : (

                                  <div>

                                    <p
                                      className="
                                        text-sm
                                        font-black
                                        text-slate-700
                                      "
                                    >
                                      Employee unavailable
                                    </p>

                                    <p
                                      className="
                                        mt-1
                                        text-xs
                                        text-slate-400
                                      "
                                    >
                                      {
                                        request.employeeId
                                      }
                                    </p>

                                  </div>

                                )
                            }

                          </td>


                          {/* ===================
                              LEAVE TYPE
                          ==================== */}

                          <td
                            className="
                              whitespace-nowrap
                              px-5
                              py-4
                            "
                          >

                            <span
                              className="
                                inline-flex
                                rounded-lg
                                bg-indigo-50
                                px-3
                                py-2
                                text-xs
                                font-black
                                text-indigo-700
                              "
                            >
                              {
                                request.leaveType
                              }
                            </span>

                          </td>


                          {/* ===================
                              DATES
                          ==================== */}

                          <td
                            className="
                              min-w-56
                              px-5
                              py-4
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
                                gap-2
                              "
                            >

                              <CalendarDays
                                size={15}
                                className="
                                  mt-0.5
                                  shrink-0
                                  text-blue-500
                                "
                              />


                              <div>

                                <p
                                  className="
                                    text-xs
                                    font-bold
                                    text-slate-700
                                  "
                                >
                                  {
                                    formatLeaveDate(
                                      request.startDate
                                    )
                                  }
                                </p>


                                <p
                                  className="
                                    mt-1
                                    text-[10px]
                                    font-semibold
                                    text-slate-400
                                  "
                                >
                                  to
                                </p>


                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    font-bold
                                    text-slate-700
                                  "
                                >
                                  {
                                    formatLeaveDate(
                                      request.endDate
                                    )
                                  }
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ===================
                              TOTAL DAYS
                          ==================== */}

                          <td
                            className="
                              whitespace-nowrap
                              px-5
                              py-4
                            "
                          >

                            <div
                              className="
                                inline-flex
                                flex-col
                                items-center
                                rounded-xl
                                bg-slate-100
                                px-3
                                py-2
                              "
                            >

                              <span
                                className="
                                  text-base
                                  font-black
                                  text-slate-900
                                "
                              >
                                {
                                  request.totalDays
                                }
                              </span>


                              <span
                                className="
                                  text-[9px]
                                  font-black
                                  uppercase
                                  text-slate-400
                                "
                              >
                                {
                                  request.totalDays ===
                                  1
                                    ? "Day"
                                    : "Days"
                                }
                              </span>

                            </div>

                          </td>


                          {/* ===================
                              REASON
                          ==================== */}

                          <td
                            className="
                              max-w-72
                              px-5
                              py-4
                            "
                          >

                            <p
                              className="
                                line-clamp-3
                                text-xs
                                leading-5
                                text-slate-600
                              "
                              title={
                                request.reason
                              }
                            >
                              {request.reason}
                            </p>

                          </td>


                          {/* ===================
                              STATUS
                          ==================== */}

                          <td
                            className="
                              whitespace-nowrap
                              px-5
                              py-4
                            "
                          >

                            <LeaveBadge
                              status={
                                request.status
                              }
                            />


                            {
                              request.reviewerComment && (

                                <div
                                  className="
                                    mt-2
                                    flex
                                    max-w-44
                                    items-start
                                    gap-1.5
                                    text-[10px]
                                    leading-4
                                    text-slate-400
                                  "
                                >

                                  <MessageSquareText
                                    size={11}
                                    className="
                                      mt-0.5
                                      shrink-0
                                    "
                                  />


                                  <span>
                                    {
                                      request.reviewerComment
                                    }
                                  </span>

                                </div>

                              )
                            }

                          </td>


                          {/* ===================
                              ACTION
                          ==================== */}

                          <td
                            className="
                              whitespace-nowrap
                              px-5
                              py-4
                            "
                          >

                            {
                              request.status ===
                              "Pending"
                                ? (

                                  <button
                                    type="button"
                                    onClick={() =>
                                      onCancel(
                                        request.id
                                      )
                                    }
                                    className="
                                      inline-flex
                                      items-center
                                      justify-center
                                      gap-2
                                      rounded-lg
                                      border
                                      border-red-100
                                      bg-red-50
                                      px-3
                                      py-2
                                      text-xs
                                      font-black
                                      text-red-600
                                      transition-all
                                      duration-200
                                      hover:border-red-600
                                      hover:bg-red-600
                                      hover:text-white
                                    "
                                  >

                                    <Ban
                                      size={14}
                                    />

                                    Cancel

                                  </button>

                                )
                                : (

                                  <span
                                    className="
                                      text-xs
                                      font-semibold
                                      text-slate-300
                                    "
                                  >
                                    No Action
                                  </span>

                                )
                            }

                          </td>

                        </tr>

                      );
                    }
                  )

                )
                : (

                  /* ===========================
                     EMPTY STATE
                  ============================ */

                  <tr>

                    <td
                      colSpan={8}
                      className="
                        px-6
                        py-16
                        text-center
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

                        <Users
                          size={27}
                        />

                      </div>


                      <h3
                        className="
                          mt-4
                          text-lg
                          font-black
                          text-slate-900
                        "
                      >
                        No leave requests found
                      </h3>


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
                        There are no leave
                        requests matching your
                        current filters.
                      </p>

                    </td>

                  </tr>

                )
            }

          </tbody>

        </table>

      </div>

    </section>
  );
}


/* ==========================================
   TABLE HEADING

   TypeScript 6 compatible ReactNode
========================================== */

interface HeadingProps {
  children: ReactNode;
}


function Heading({
  children
}: HeadingProps) {

  return (

    <th
      className="
        whitespace-nowrap
        px-5
        py-4
        text-[11px]
        font-black
        uppercase
        tracking-[0.1em]
        text-slate-300
      "
    >
      {children}
    </th>
  );
}


/* ==========================================
   LEAVE STATUS BADGE
========================================== */

interface LeaveBadgeProps {
  status: LeaveStatus;
}


function LeaveBadge({
  status
}: LeaveBadgeProps) {

  const styles:
    Record<
      LeaveStatus,
      string
    > = {

      Pending:
        `
          bg-orange-50
          text-orange-700
        `,

      Approved:
        `
          bg-emerald-50
          text-emerald-700
        `,

      Rejected:
        `
          bg-red-50
          text-red-700
        `,

      Cancelled:
        `
          bg-slate-100
          text-slate-600
        `
    };


  const dots:
    Record<
      LeaveStatus,
      string
    > = {

      Pending:
        "bg-orange-500",

      Approved:
        "bg-emerald-500",

      Rejected:
        "bg-red-500",

      Cancelled:
        "bg-slate-400"
    };


  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-[11px]
        font-black
        ${styles[status]}
      `}
    >

      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${dots[status]}
        `}
      />


      {status}

    </span>
  );
}


export default LeaveRequestTable;
