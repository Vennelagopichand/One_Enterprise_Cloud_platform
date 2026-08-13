import type {
  ReactNode
} from "react";

import {
  Check,
  Clock3,
  X
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import type {
  LeaveRequest
} from "../../types/leave";

import {
  formatLeaveDate
} from "../../utils/leave";

import EmployeeAvatar
  from "../employee/EmployeeAvatar";


/* ==========================================
   COMPONENT PROPS
========================================== */

interface LeaveApprovalTableProps {

  requests:
    LeaveRequest[];

  employees:
    EmployeeRecord[];

  onApprove:
    (
      leaveId: string
    ) => void;

  onReject:
    (
      leaveId: string
    ) => void;
}


/* ==========================================
   LEAVE APPROVAL TABLE
========================================== */

function LeaveApprovalTable({
  requests,
  employees,
  onApprove,
  onReject
}: LeaveApprovalTableProps) {

  return (

    <div
      className="
        space-y-4
      "
    >

      {
        requests.length > 0
          ? (

            requests.map(
              (request) => {

                const employee =
                  employees.find(
                    (item) =>
                      item.id ===
                      request.employeeId
                  );


                return (

                  <article
                    key={request.id}
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                  >

                    {/* =================================
                        TOP STATUS BAR
                    ================================== */}

                    <div
                      className="
                        h-1
                        bg-gradient-to-r
                        from-orange-400
                        via-amber-400
                        to-yellow-400
                      "
                    />


                    <div
                      className="
                        p-5
                        sm:p-6
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          gap-6
                          xl:flex-row
                          xl:items-center
                          xl:justify-between
                        "
                      >

                        {/* ==============================
                            EMPLOYEE + REQUEST INFO
                        =============================== */}

                        <div
                          className="
                            flex
                            min-w-0
                            flex-1
                            items-start
                            gap-4
                          "
                        >

                          <EmployeeAvatar
                            name={
                              employee?.name ??
                              request.employeeId
                            }
                            photo={
                              employee?.photo
                            }
                            size="md"
                          />


                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >

                            {/* Employee Name + Status */}

                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                gap-2
                              "
                            >

                              <h3
                                className="
                                  text-base
                                  font-black
                                  text-slate-950
                                  sm:text-lg
                                "
                              >
                                {
                                  employee?.name ??
                                  "Unknown Employee"
                                }
                              </h3>


                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  bg-orange-50
                                  px-3
                                  py-1.5
                                  text-[10px]
                                  font-black
                                  text-orange-700
                                "
                              >

                                <span
                                  className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-orange-500
                                  "
                                />

                                Pending

                              </span>

                            </div>


                            {/* Employee Details */}

                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-500
                              "
                            >
                              {
                                request.employeeId
                              }

                              {" • "}

                              {
                                employee?.department ??
                                "Unknown Department"
                              }

                              {
                                employee?.designation
                                  ? ` • ${employee.designation}`
                                  : ""
                              }
                            </p>


                            {/* Request ID */}

                            <p
                              className="
                                mt-2
                                font-mono
                                text-[10px]
                                font-black
                                text-blue-600
                              "
                            >
                              Request ID: {request.id}
                            </p>


                            {/* =================================
                                LEAVE INFO BADGES
                            ================================== */}

                            <div
                              className="
                                mt-4
                                flex
                                flex-wrap
                                gap-2.5
                              "
                            >

                              <InfoBadge>
                                {request.leaveType}
                              </InfoBadge>


                              <InfoBadge>

                                {request.totalDays}{" "}

                                {
                                  request.totalDays === 1
                                    ? "day"
                                    : "days"
                                }

                              </InfoBadge>


                              <InfoBadge>

                                {
                                  formatLeaveDate(
                                    request.startDate
                                  )
                                }

                                {" - "}

                                {
                                  formatLeaveDate(
                                    request.endDate
                                  )
                                }

                              </InfoBadge>

                            </div>


                            {/* =================================
                                REASON
                            ================================== */}

                            <div
                              className="
                                mt-4
                                rounded-2xl
                                border
                                border-slate-100
                                bg-slate-50
                                p-4
                              "
                            >

                              <p
                                className="
                                  text-[10px]
                                  font-black
                                  uppercase
                                  tracking-[0.12em]
                                  text-slate-400
                                "
                              >
                                Leave Reason
                              </p>


                              <p
                                className="
                                  mt-2
                                  max-w-3xl
                                  text-sm
                                  leading-6
                                  text-slate-600
                                "
                              >
                                {request.reason}
                              </p>

                            </div>


                            {/* =================================
                                APPLIED DATE
                            ================================== */}

                            <p
                              className="
                                mt-3
                                text-[10px]
                                font-semibold
                                text-slate-400
                              "
                            >
                              Applied on{" "}

                              {
                                formatLeaveDate(
                                  request.appliedDate
                                )
                              }
                            </p>

                          </div>

                        </div>


                        {/* ==============================
                            APPROVAL ACTIONS
                        =============================== */}

                        <div
                          className="
                            flex
                            shrink-0
                            flex-col
                            gap-3
                            sm:flex-row
                            xl:flex-col
                            2xl:flex-row
                          "
                        >

                          {/* Reject */}

                          <button
                            type="button"
                            onClick={() =>
                              onReject(
                                request.id
                              )
                            }
                            className="
                              inline-flex
                              min-w-28
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-red-200
                              bg-red-50
                              px-4
                              py-3
                              text-xs
                              font-black
                              text-red-600
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:border-red-600
                              hover:bg-red-600
                              hover:text-white
                              hover:shadow-md
                            "
                          >

                            <X
                              size={16}
                            />

                            Reject

                          </button>


                          {/* Approve */}

                          <button
                            type="button"
                            onClick={() =>
                              onApprove(
                                request.id
                              )
                            }
                            className="
                              inline-flex
                              min-w-28
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-gradient-to-r
                              from-emerald-600
                              to-green-600
                              px-4
                              py-3
                              text-xs
                              font-black
                              text-white
                              shadow-md
                              shadow-emerald-600/20
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:from-emerald-700
                              hover:to-green-700
                              hover:shadow-lg
                            "
                          >

                            <Check
                              size={16}
                            />

                            Approve

                          </button>

                        </div>

                      </div>

                    </div>

                  </article>

                );
              }
            )

          )
          : (

            /* =================================
               EMPTY STATE
            ================================== */

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
                  bg-emerald-50
                  text-emerald-600
                "
              >

                <Clock3
                  size={28}
                />

              </div>


              <h3
                className="
                  mt-5
                  text-lg
                  font-black
                  text-slate-900
                "
              >
                No pending requests
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
                There are currently no pending
                employee leave requests waiting
                for HR approval.
              </p>


              <div
                className="
                  mx-auto
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-50
                  px-4
                  py-2
                  text-xs
                  font-black
                  text-emerald-700
                "
              >

                <Check
                  size={14}
                />

                All requests reviewed

              </div>

            </section>

          )
      }

    </div>
  );
}


/* ==========================================
   INFO BADGE

   TypeScript 6 compatible:
   ReactNode is imported directly.
========================================== */

interface InfoBadgeProps {
  children: ReactNode;
}


function InfoBadge({
  children
}: InfoBadgeProps) {

  return (

    <span
      className="
        inline-flex
        items-center
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-[11px]
        font-bold
        text-slate-600
        shadow-sm
      "
    >
      {children}
    </span>
  );
}


export default LeaveApprovalTable;
