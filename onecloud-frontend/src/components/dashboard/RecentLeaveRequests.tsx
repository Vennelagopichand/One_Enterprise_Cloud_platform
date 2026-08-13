import {
  CalendarDays,
  Clock3
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";

import {
  useAppContext
} from "../../hooks/useAppContext";

import type {
  LeaveStatus
} from "../../types/leave";

import {
  formatLeaveDate
} from "../../utils/leave";

import EmployeeAvatar
  from "../employee/EmployeeAvatar";


function RecentLeaveRequests() {

  const {
    employees,
    leaveRequests
  } = useAppContext();


  const recentRequests =
    [...leaveRequests]
      .sort(
        (a, b) =>
          new Date(
            b.appliedDate
          ).getTime() -
          new Date(
            a.appliedDate
          ).getTime()
      )
      .slice(
        0,
        5
      );


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

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-slate-100
          px-6
          py-5
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
            Recent Requests
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Latest Leave Activity
          </h2>

        </div>


        <Clock3
          size={20}
          className="
            text-slate-400
          "
        />

      </div>


      <div
        className="
          divide-y
          divide-slate-100
        "
      >

        {
          recentRequests.length > 0
            ? recentRequests.map(
                (request) => {

                  const employee =
                    employees.find(
                      (item) =>
                        item.id ===
                        request.employeeId
                    );


                  return (

                    <div
                      key={request.id}
                      className="
                        flex
                        items-start
                        gap-4
                        px-6
                        py-4
                        transition
                        hover:bg-slate-50
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
                        size="sm"
                      />


                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-2
                          "
                        >

                          <div>

                            <p
                              className="
                                text-sm
                                font-black
                                text-slate-900
                              "
                            >
                              {
                                employee?.name ??
                                request.employeeId
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
                                request.leaveType
                              }
                            </p>

                          </div>


                          <LeaveStatusBadge
                            status={
                              request.status
                            }
                          />

                        </div>


                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                            text-[10px]
                            font-semibold
                            text-slate-500
                          "
                        >

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                            "
                          >
                            <CalendarDays
                              size={12}
                            />

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
                          </span>


                          <span>
                            {request.totalDays}{" "}
                            {
                              request.totalDays === 1
                                ? "day"
                                : "days"
                            }
                          </span>

                        </div>

                      </div>

                    </div>
                  );
                }
              )
            : (

              <div
                className="
                  px-6
                  py-12
                  text-center
                "
              >

                <CalendarDays
                  size={26}
                  className="
                    mx-auto
                    text-slate-300
                  "
                />


                <p
                  className="
                    mt-3
                    text-sm
                    font-black
                    text-slate-700
                  "
                >
                  No leave requests
                </p>

              </div>

            )
        }

      </div>


      <div
        className="
          border-t
          border-slate-100
          px-6
          py-4
        "
      >

        <Link
          to={ROUTES.LEAVE}
          className="
            text-xs
            font-black
            text-blue-600
            hover:text-blue-800
          "
        >
          View all leave requests →
        </Link>

      </div>

    </section>
  );
}


interface LeaveStatusBadgeProps {
  status: LeaveStatus;
}


function LeaveStatusBadge({
  status
}: LeaveStatusBadgeProps) {

  const styles:
    Record<
      LeaveStatus,
      string
    > = {

      Pending:
        "bg-orange-50 text-orange-700",

      Approved:
        "bg-emerald-50 text-emerald-700",

      Rejected:
        "bg-red-50 text-red-700",

      Cancelled:
        "bg-slate-100 text-slate-600"
    };


  return (

    <span
      className={`
        shrink-0
        rounded-full
        px-2.5
        py-1
        text-[9px]
        font-black
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}


export default RecentLeaveRequests;
