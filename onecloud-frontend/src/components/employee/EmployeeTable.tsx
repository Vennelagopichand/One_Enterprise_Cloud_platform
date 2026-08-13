import {
  Search,
  Users
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import EmployeeRow
  from "./EmployeeRow";


interface EmployeeTableProps {

  employees:
    EmployeeRecord[];

  search:
    string;

  onSearchChange:
    (
      value: string
    ) => void;

  onEdit:
    (
      employee:
        EmployeeRecord
    ) => void;

  onDelete:
    (
      employeeId:
        string
    ) => void;
}


function EmployeeTable({
  employees,
  search,
  onSearchChange,
  onEdit,
  onDelete
}: EmployeeTableProps) {

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
          flex-col
          gap-5
          border-b
          border-slate-100
          px-6
          py-5
          lg:flex-row
          lg:items-center
          lg:justify-between
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

            <Users
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
              Employee Records
            </h2>


            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {
                employees.length
              } employee
              {
                employees.length === 1
                  ? ""
                  : "s"
              } displayed
            </p>

          </div>

        </div>


        {/* Search */}

        <div
          className="
            relative
            w-full
            lg:max-w-sm
          "
        >

          <Search
            size={17}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />


          <input
            type="search"
            value={search}
            onChange={
              (event) =>
                onSearchChange(
                  event.target.value
                )
            }
            placeholder="Search employee..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

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
            min-w-[950px]
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
                Employee ID
              </TableHeading>

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
                Status
              </TableHeading>

              <TableHeading>
                Actions
              </TableHeading>

            </tr>

          </thead>


          <tbody>

            {
              employees.length > 0
                ? (

                  employees.map(
                    (employee) => (

                      <EmployeeRow
                        key={
                          employee.id
                        }
                        employee={
                          employee
                        }
                        onEdit={
                          onEdit
                        }
                        onDelete={
                          onDelete
                        }
                      />

                    )
                  )

                )
                : (

                  <tr>

                    <td
                      colSpan={6}
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
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-slate-100
                          text-slate-400
                        "
                      >

                        <Users
                          size={24}
                        />

                      </div>


                      <h3
                        className="
                          mt-4
                          font-black
                          text-slate-800
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
                        Try changing your
                        search or add a new
                        employee.
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
  children:
    React.ReactNode;
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


export default EmployeeTable;
