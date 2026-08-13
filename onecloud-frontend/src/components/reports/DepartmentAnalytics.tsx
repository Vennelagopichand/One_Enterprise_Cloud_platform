import {
  Building2
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";


interface DepartmentAnalyticsProps {
  employees:
    EmployeeRecord[];
}


function DepartmentAnalytics({
  employees
}: DepartmentAnalyticsProps) {

  const departmentCounts =
    employees.reduce<
      Record<string, number>
    >(
      (
        result,
        employee
      ) => {

        const department =
          employee.department.trim() ||
          "Unassigned";


        result[department] =
          (
            result[department] ??
            0
          ) + 1;


        return result;
      },
      {}
    );


  const departments =
    Object.entries(
      departmentCounts
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      );


  const highestCount =
    Math.max(
      ...departments.map(
        ([, count]) =>
          count
      ),
      1
    );


  return (

    <section
      className="
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
            Workforce Distribution
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Department Analytics
          </h2>

        </div>


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

          <Building2
            size={20}
          />

        </div>

      </div>


      {/* Departments */}

      <div
        className="
          space-y-5
          p-6
        "
      >

        {
          departments.length > 0
            ? departments.map(
                (
                  [
                    department,
                    count
                  ]
                ) => {

                  const percentage =
                    employees.length > 0
                      ? Math.round(
                          (
                            count /
                            employees.length
                          ) *
                          100
                        )
                      : 0;


                  const barWidth =
                    (
                      count /
                      highestCount
                    ) *
                    100;


                  return (

                    <div
                      key={
                        department
                      }
                    >

                      <div
                        className="
                          mb-2
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <div>

                          <p
                            className="
                              text-sm
                              font-black
                              text-slate-800
                            "
                          >
                            {department}
                          </p>


                          <p
                            className="
                              mt-0.5
                              text-[10px]
                              text-slate-400
                            "
                          >
                            {percentage}% of workforce
                          </p>

                        </div>


                        <span
                          className="
                            rounded-lg
                            bg-blue-50
                            px-3
                            py-1.5
                            text-xs
                            font-black
                            text-blue-700
                          "
                        >
                          {count}
                        </span>

                      </div>


                      <div
                        className="
                          h-2.5
                          overflow-hidden
                          rounded-full
                          bg-slate-100
                        "
                      >

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-500
                            transition-all
                            duration-500
                          "
                          style={{
                            width:
                              `${barWidth}%`
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )
            : (

              <p
                className="
                  py-10
                  text-center
                  text-sm
                  text-slate-500
                "
              >
                No department data available.
              </p>

            )
        }

      </div>

    </section>
  );
}


export default DepartmentAnalytics;
