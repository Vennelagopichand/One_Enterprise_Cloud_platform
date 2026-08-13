import {
  CalendarDays
} from "lucide-react";

import type {
  LeaveRequest,
  LeaveStatus
} from "../../types/leave";

import {
  formatLeaveDate
} from "../../utils/leave";


interface ProfileLeaveHistoryProps {
  requests: LeaveRequest[];
}


function ProfileLeaveHistory({
  requests
}: ProfileLeaveHistoryProps) {

  const sortedRequests =
    [...requests].sort(
      (a, b) =>
        new Date(
          b.appliedDate
        ).getTime() -
        new Date(
          a.appliedDate
        ).getTime()
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
              text-purple-600
            "
          >
            Leave Records
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Leave History
          </h2>

        </div>


        <div
          className="
            rounded-xl
            bg-purple-50
            px-4
            py-2
            text-xs
            font-black
            text-purple-700
          "
        >
          {requests.length} Requests
        </div>

      </div>


      {
        sortedRequests.length > 0
          ? (

            <div
              className="
                overflow-x-auto
              "
            >

              <table
                className="
                  w-full
                  min-w-[850px]
                "
              >

                <thead
                  className="
                    bg-slate-950
                    text-left
                    text-white
                  "
                >

                  <tr>

                    <th className={headingClass}>
                      Request ID
                    </th>

                    <th className={headingClass}>
                      Leave Type
                    </th>

                    <th className={headingClass}>
                      Dates
                    </th>

                    <th className={headingClass}>
                      Days
                    </th>

                    <th className={headingClass}>
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    sortedRequests.map(
                      (request) => (

                        <tr
                          key={request.id}
                          className="
                            border-b
                            border-slate-100
                            transition
                            hover:bg-slate-50
                          "
                        >

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <span
                              className="
                                font-mono
                                text-xs
                                font-black
                                text-blue-600
                              "
                            >
                              {request.id}
                            </span>

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-sm
                              font-bold
                              text-slate-700
                            "
                          >
                            {request.leaveType}
                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                text-slate-600
                              "
                            >

                              <CalendarDays
                                size={14}
                                className="
                                  text-blue-500
                                "
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

                            </div>

                          </td>


                          <td
                            className="
                              px-5
                              py-4
                              text-sm
                              font-black
                              text-slate-800
                            "
                          >
                            {request.totalDays}
                          </td>


                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <StatusBadge
                              status={
                                request.status
                              }
                            />

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          )
          : (

            <div
              className="
                px-6
                py-14
                text-center
              "
            >

              <CalendarDays
                size={30}
                className="
                  mx-auto
                  text-slate-300
                "
              />


              <h3
                className="
                  mt-4
                  text-base
                  font-black
                  text-slate-800
                "
              >
                No leave history
              </h3>


              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                This employee has not
                submitted any leave requests.
              </p>

            </div>

          )
      }

    </section>
  );
}


interface StatusBadgeProps {
  status: LeaveStatus;
}


function StatusBadge({
  status
}: StatusBadgeProps) {

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
        inline-flex
        rounded-full
        px-3
        py-1.5
        text-[10px]
        font-black
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}


const headingClass = `
  whitespace-nowrap
  px-5
  py-4
  text-[10px]
  font-black
  uppercase
  tracking-[0.1em]
  text-slate-300
`;


export default ProfileLeaveHistory;
