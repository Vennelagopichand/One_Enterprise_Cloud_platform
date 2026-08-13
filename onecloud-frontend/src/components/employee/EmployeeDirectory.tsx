import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  SearchX,
  Users
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import EmployeeCard
  from "./EmployeeCard";

import EmployeeFilters, {
  type EmployeeSortOption,
  type EmployeeStatusFilter
} from "./EmployeeFilters";


/* ==========================================
   COMPONENT PROPS
========================================== */

interface EmployeeDirectoryProps {

  employees:
    EmployeeRecord[];

  initialSearch?: string;
}


/* ==========================================
   EMPLOYEE DIRECTORY
========================================== */

function EmployeeDirectory({
  employees,
  initialSearch = ""
}: EmployeeDirectoryProps) {

  /* ========================================
     SEARCH
  ======================================== */

  const [
    search,
    setSearch
  ] = useState(
    initialSearch
  );


  /* ========================================
     DEPARTMENT FILTER
  ======================================== */

  const [
    department,
    setDepartment
  ] = useState(
    "All"
  );


  /* ========================================
     STATUS FILTER
  ======================================== */

  const [
    status,
    setStatus
  ] =
    useState<EmployeeStatusFilter>(
      "All"
    );


  /* ========================================
     SORT

     IMPORTANT:

     Default sorting is by Employee ID.

     Therefore:

     EMP101
     EMP102
     EMP103
     EMP104
     ...
  ======================================== */

  const [
    sortBy,
    setSortBy
  ] =
    useState<EmployeeSortOption>(
      "id"
    );


  /* ========================================
     SYNCHRONIZE SEARCH QUERY

     Example:

     /employees?search=Aarav
  ======================================== */

  useEffect(
    () => {

      setSearch(
        initialSearch
      );

    },
    [
      initialSearch
    ]
  );


  /* ========================================
     UNIQUE DEPARTMENTS
  ======================================== */

  const departments =
    useMemo(
      () => {

        const uniqueDepartments =
          new Set(
            employees
              .map(
                (employee) =>
                  employee.department
                    .trim()
              )
              .filter(
                Boolean
              )
          );


        return Array.from(
          uniqueDepartments
        ).sort(
          (
            firstDepartment,
            secondDepartment
          ) =>
            firstDepartment
              .localeCompare(
                secondDepartment
              )
        );

      },
      [
        employees
      ]
    );


  /* ========================================
     FILTERED + SORTED EMPLOYEES
  ======================================== */

  const filteredEmployees =
    useMemo(
      () => {

        /* ===================================
           SEARCH VALUE
        ==================================== */

        const query =
          search
            .trim()
            .toLowerCase();


        /* ===================================
           FILTER EMPLOYEES
        ==================================== */

        const filtered =
          employees.filter(
            (
              employee
            ) => {

              /* =============================
                 SEARCH
              ============================== */

              const matchesSearch =
                !query ||

                employee.id
                  .toLowerCase()
                  .includes(
                    query
                  )

                ||

                employee.name
                  .toLowerCase()
                  .includes(
                    query
                  )

                ||

                employee.email
                  .toLowerCase()
                  .includes(
                    query
                  )

                ||

                employee.department
                  .toLowerCase()
                  .includes(
                    query
                  )

                ||

                employee.designation
                  .toLowerCase()
                  .includes(
                    query
                  );


              /* =============================
                 DEPARTMENT
              ============================== */

              const matchesDepartment =
                department ===
                  "All"

                ||

                employee.department
                  .trim() ===
                  department;


              /* =============================
                 STATUS
              ============================== */

              const matchesStatus =
                status ===
                  "All"

                ||

                employee.status ===
                  status;


              return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
              );
            }
          );


        /* ===================================
           SORT EMPLOYEES

           Important:
           make a new array before .sort().
        ==================================== */

        const sorted =
          [
            ...filtered
          ];


        sorted.sort(
          (
            firstEmployee,
            secondEmployee
          ) => {

            /* ===============================
               EMPLOYEE ID

               EMP101
               EMP102
               EMP103
               ...
            ================================ */

            if (
              sortBy ===
              "id"
            ) {

              return compareEmployeeIds(
                firstEmployee.id,
                secondEmployee.id
              );
            }


            /* ===============================
               NAME A → Z
            ================================ */

            if (
              sortBy ===
              "name-asc"
            ) {

              return (
                firstEmployee.name
                  .localeCompare(
                    secondEmployee.name,
                    undefined,
                    {
                      sensitivity:
                        "base"
                    }
                  )
              );
            }


            /* ===============================
               NAME Z → A
            ================================ */

            if (
              sortBy ===
              "name-desc"
            ) {

              return (
                secondEmployee.name
                  .localeCompare(
                    firstEmployee.name,
                    undefined,
                    {
                      sensitivity:
                        "base"
                    }
                  )
              );
            }


            /* ===============================
               NEWEST JOINED
            ================================ */

            if (
              sortBy ===
              "newest"
            ) {

              const firstDate =
                parseDate(
                  firstEmployee
                    .joiningDate
                );


              const secondDate =
                parseDate(
                  secondEmployee
                    .joiningDate
                );


              return (
                secondDate -
                firstDate
              );
            }


            /* ===============================
               FALLBACK
            ================================ */

            return compareEmployeeIds(
              firstEmployee.id,
              secondEmployee.id
            );
          }
        );


        return sorted;

      },
      [
        employees,
        search,
        department,
        status,
        sortBy
      ]
    );


  /* ========================================
     RESET FILTERS
  ======================================== */

  function handleReset() {

    setSearch("");

    setDepartment(
      "All"
    );

    setStatus(
      "All"
    );

    /*
      Always return to:

      EMP101
      EMP102
      EMP103
      ...
    */

    setSortBy(
      "id"
    );
  }


  return (

    <div
      className="
        space-y-6
      "
    >

      {/* =====================================
          FILTERS
      ====================================== */}

      <EmployeeFilters
        search={
          search
        }
        department={
          department
        }
        status={
          status
        }
        sortBy={
          sortBy
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
          setStatus
        }
        onSortChange={
          setSortBy
        }
        onReset={
          handleReset
        }
      />


      {/* =====================================
          DIRECTORY HEADER
      ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Users
              size={15}
              className="
                text-blue-600
              "
            />


            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]
                text-blue-600
              "
            >
              Employee Directory
            </p>

          </div>


          <h2
            className="
              mt-1
              text-xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            Employee Records
          </h2>

        </div>


        {/* ===================================
            RESULT COUNT
        ==================================== */}

        <p
          className="
            rounded-full
            bg-slate-100
            px-4
            py-2
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
              text-slate-900
            "
          >
            {
              employees.length
            }
          </span>

          {" "}employees

        </p>

      </div>


      {/* =====================================
          EMPLOYEE CARD GRID

          DESKTOP:

          ROW 1
          EMP101 | EMP102 | EMP103

          ROW 2
          EMP104 | EMP105 | EMP106

          ROW 3
          EMP107 | EMP108

          TABLET:
          2 cards per row

          MOBILE:
          1 card per row
      ====================================== */}

      {
        filteredEmployees.length >
        0
          ? (

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {
                filteredEmployees.map(
                  (
                    employee
                  ) => (

                    <EmployeeCard
                      key={
                        employee.id
                      }
                      employee={
                        employee
                      }
                    />

                  )
                )
              }

            </div>

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
                  bg-blue-50
                  text-blue-600
                "
              >

                <SearchX
                  size={27}
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
                No employees found
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
                No employee records match
                your current search,
                department, status or
                sorting filters.
              </p>


              <button
                type="button"
                onClick={
                  handleReset
                }
                className="
                  mt-6
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  text-sm
                  font-black
                  text-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                  hover:shadow-lg
                "
              >
                Reset Filters
              </button>

            </section>

          )
      }

    </div>
  );
}


/* ==========================================
   COMPARE EMPLOYEE IDS

   Examples:

   EMP1
   EMP2
   EMP10
   EMP101
   EMP102

   This correctly uses the numeric
   portion of each ID.
========================================== */

function compareEmployeeIds(
  firstId: string,
  secondId: string
): number {

  const firstNumber =
    extractEmployeeNumber(
      firstId
    );


  const secondNumber =
    extractEmployeeNumber(
      secondId
    );


  /* ========================================
     BOTH IDS CONTAIN NUMBERS
  ======================================== */

  if (
    firstNumber !== null &&
    secondNumber !== null
  ) {

    if (
      firstNumber !==
      secondNumber
    ) {

      return (
        firstNumber -
        secondNumber
      );
    }
  }


  /* ========================================
     FALLBACK

     Useful for IDs such as:

     HR001
     DEV002
     TEMP01
  ======================================== */

  return firstId.localeCompare(
    secondId,
    undefined,
    {
      numeric: true,
      sensitivity: "base"
    }
  );
}


/* ==========================================
   EXTRACT EMPLOYEE NUMBER

   EMP101 → 101

   EMP008 → 8
========================================== */

function extractEmployeeNumber(
  employeeId: string
): number | null {

  const numericPart =
    employeeId.replace(
      /\D/g,
      ""
    );


  if (
    numericPart.length ===
    0
  ) {

    return null;
  }


  const value =
    Number(
      numericPart
    );


  if (
    Number.isNaN(
      value
    )
  ) {

    return null;
  }


  return value;
}


/* ==========================================
   SAFE DATE PARSER
========================================== */

function parseDate(
  date: string
): number {

  if (
    !date
  ) {

    return 0;
  }


  const parsedDate =
    new Date(
      `${date}T00:00:00`
    ).getTime();


  return Number.isNaN(
    parsedDate
  )
    ? 0
    : parsedDate;
}


export default EmployeeDirectory;
