import {
  BriefcaseBusiness,
  Building2,
  Users
} from "lucide-react";

import {
  useMemo
} from "react";

import {
  useAppContext
} from "../../hooks/useAppContext";


interface DepartmentData {
  department: string;
  employees: number;
  percentage: number;
}


function WorkforceOverview() {

  const {
    employees
  } = useAppContext();


  const departmentData =
    useMemo<
      DepartmentData[]
    >(
      () => {

        const departmentCounts =
          new Map<
            string,
            number
          >();


        employees.forEach(
          (employee) => {

            const department =
              employee.department
                .trim();


            if (!department) {
              return;
            }


            const current =
              departmentCounts.get(
                department
              ) ?? 0;


            departmentCounts.set(
              department,
              current + 1
            );
          }
        );


        const maximum =
          Math.max(
            ...Array.from(
              departmentCounts.values()
            ),
            1
          );


        return Array.from(
          departmentCounts.entries()
        )
          .map(
            ([
              department,
              count
            ]) => ({

              department,

              employees:
                count,

              percentage:
                Math.max(
                  Math.round(
                    (
                      count /
                      maximum
                    ) * 100
                  ),
                  8
                )

            })
          )
          .sort(
            (a, b) =>
              b.employees -
              a.employees
          );

      },
      [employees]
    );


  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-100
          pb-5
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
            Workforce Analytics
          </p>


          <h2
            className="
              mt-2
              text-xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            Department Overview
          </h2>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Live employee distribution
            across departments.
          </p>

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


      {
        departmentData.length >
        0
          ? (

            <div
              className="
                mt-6
                space-y-5
              "
            >

              {
                departmentData.map(
                  (department) => (

                    <div
                      key={
                        department.department
                      }
                    >

                      <div
                        className="
                          mb-2
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <BriefcaseBusiness
                            size={15}
                            className="
                              text-slate-400
                            "
                          />

                          <span
                            className="
                              text-xs
                              font-bold
                              text-slate-700
                            "
                          >
                            {
                              department.department
                            }
                          </span>
                        </div>


                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            font-black
                            text-slate-700
                          "
                        >
                          <Users
                            size={13}
                            className="
                              text-blue-500
                            "
                          />

                          {
                            department.employees
                          }
                        </div>

                      </div>


                      <div
                        className="
                          h-2
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
                            to-cyan-400
                            transition-all
                            duration-500
                          "
                          style={{
                            width:
                              `${department.percentage}%`
                          }}
                        />
                      </div>

                    </div>

                  )
                )
              }

            </div>

          )
          : (

            <div
              className="
                py-12
                text-center
                text-sm
                text-slate-500
              "
            >
              No department data available.
            </div>

          )
      }

    </section>
  );
}


export default WorkforceOverview;
