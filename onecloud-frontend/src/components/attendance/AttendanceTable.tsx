import {
  CalendarCheck2,
  Users
} from "lucide-react";

import type {
  AttendanceStatus
} from "../../types/attendance";

import type {
  EmployeeRecord
} from "../../types/employee";

import AttendanceRow
  from "./AttendanceRow";


interface AttendanceTableProps {
  employees: EmployeeRecord[];

  getStatus:
    (
      employeeId: string
    ) => AttendanceStatus;

  onStatusChange:
    (
      employeeId: string,
      status: AttendanceStatus
    ) => void;
}


function AttendanceTable({
  employees,
  getStatus,
  onStatusChange
}: AttendanceTableProps) {

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

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
            "
          >
            <CalendarCheck2
              size={20}
            />
          </div>


          <div>

            <h2
              className="
                text-xl
                font-black
                text-slate-950
              "
            >
              Daily Attendance
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {employees.length} employees displayed
            </p>

          </div>

        </div>

      </div>


      {/* Table */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            min-w-[1000px]
            border-collapse
          "
        >

          <thead>

            <tr
              className="
                bg-slate-950
                text-left
                text-white
              "
            >

              <TableHeading>
                Employee
              </TableHeading>

              <TableHeading>
                Department
              </TableHeading>

              <TableHeading>
                Designation
              </TableHeading>

              <TableHeading>
                Current Status
              </TableHeading>

              <TableHeading>
                Mark Attendance
              </TableHeading>

            </tr>

          </thead>


          <tbody>

            {
              employees.length > 0
                ? (

                  employees.map(
                    (employee) => (

                      <AttendanceRow
                        key={
                          employee.id
                        }
                        employee={
                          employee
                        }
                        status={
                          getStatus(
                            employee.id
                          )
                        }
                        onStatusChange={
                          onStatusChange
                        }
                      />

                    )
                  )

                )
                : (

                  <tr>

                    <td
                      colSpan={5}
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
                          size={26}
                        />
                      </div>


                      <h3
                        className="
                          mt-4
                          font-black
                          text-slate-900
                        "
                      >
                        No employees found
                      </h3>


                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >
                        Change the attendance
                        filters to view records.
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


interface TableHeadingProps {
  children: React.ReactNode;
}


function TableHeading({
  children
}: TableHeadingProps) {

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


export default AttendanceTable;