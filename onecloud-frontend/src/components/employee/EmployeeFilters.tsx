import type {
  ReactNode
} from "react";

import {
  ArrowDownAZ,
  BadgeCheck,
  Building2,
  RefreshCcw,
  Search,
  SlidersHorizontal
} from "lucide-react";

import type {
  EmployeeStatus
} from "../../types/employee";


/* ==========================================
   SHARED FILTER TYPES
========================================== */

export type EmployeeStatusFilter =
  | "All"
  | EmployeeStatus;


export type EmployeeSortOption =
  | "id"
  | "name-asc"
  | "name-desc"
  | "newest";


/* ==========================================
   COMPONENT PROPS
========================================== */

interface EmployeeFiltersProps {

  search: string;

  department: string;

  status:
    EmployeeStatusFilter;

  sortBy:
    EmployeeSortOption;

  departments:
    string[];

  onSearchChange:
    (value: string) => void;

  onDepartmentChange:
    (value: string) => void;

  onStatusChange:
    (
      value:
        EmployeeStatusFilter
    ) => void;

  onSortChange:
    (
      value:
        EmployeeSortOption
    ) => void;

  onReset:
    () => void;
}


/* ==========================================
   EMPLOYEE FILTERS
========================================== */

function EmployeeFilters({
  search,
  department,
  status,
  sortBy,
  departments,
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onSortChange,
  onReset
}: EmployeeFiltersProps) {

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >

      {/* =====================================
          FILTER HEADER
      ====================================== */}

      <div
        className="
          mb-5
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
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
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
            "
          >

            <SlidersHorizontal
              size={19}
            />

          </div>


          <div>

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]
                text-blue-600
              "
            >
              Directory Controls
            </p>


            <h2
              className="
                mt-1
                text-lg
                font-black
                text-slate-950
              "
            >
              Search & Filter Employees
            </h2>

          </div>

        </div>


        {/* Reset */}

        <button
          type="button"
          onClick={
            onReset
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-xs
            font-black
            text-slate-600
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-700
          "
        >

          <RefreshCcw
            size={15}
          />

          Reset Filters

        </button>

      </div>


      {/* =====================================
          FILTER CONTROLS
      ====================================== */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* ===================================
            SEARCH
        ==================================== */}

        <FilterField
          label="Search"
          icon={
            <Search
              size={15}
            />
          }
        >

          <div
            className="
              relative
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
              value={
                search
              }
              onChange={
                (event) =>
                  onSearchChange(
                    event.target.value
                  )
              }
              placeholder="Search employee..."
              className={`
                ${inputClass}
                pl-11
              `}
            />

          </div>

        </FilterField>


        {/* ===================================
            DEPARTMENT
        ==================================== */}

        <FilterField
          label="Department"
          icon={
            <Building2
              size={15}
            />
          }
        >

          <select
            value={
              department
            }
            onChange={
              (event) =>
                onDepartmentChange(
                  event.target.value
                )
            }
            className={
              inputClass
            }
          >

            <option value="All">
              All Departments
            </option>


            {
              departments.map(
                (
                  departmentName
                ) => (

                  <option
                    key={
                      departmentName
                    }
                    value={
                      departmentName
                    }
                  >
                    {departmentName}
                  </option>

                )
              )
            }

          </select>

        </FilterField>


        {/* ===================================
            STATUS
        ==================================== */}

        <FilterField
          label="Status"
          icon={
            <BadgeCheck
              size={15}
            />
          }
        >

          <select
            value={
              status
            }
            onChange={
              (event) =>
                onStatusChange(
                  event.target
                    .value as EmployeeStatusFilter
                )
            }
            className={
              inputClass
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </FilterField>


        {/* ===================================
            SORT
        ==================================== */}

        <FilterField
          label="Sort By"
          icon={
            <ArrowDownAZ
              size={15}
            />
          }
        >

          <select
            value={
              sortBy
            }
            onChange={
              (event) =>
                onSortChange(
                  event.target
                    .value as EmployeeSortOption
                )
            }
            className={
              inputClass
            }
          >

            {/* Default */}

            <option value="id">
              Employee ID
            </option>


            <option value="name-asc">
              Name A - Z
            </option>


            <option value="name-desc">
              Name Z - A
            </option>


            <option value="newest">
              Newest Joined
            </option>

          </select>

        </FilterField>

      </div>

    </section>
  );
}


/* ==========================================
   FILTER FIELD
   TYPESCRIPT 6 COMPATIBLE
========================================== */

interface FilterFieldProps {

  label: string;

  icon: ReactNode;

  children: ReactNode;
}


function FilterField({
  label,
  icon,
  children
}: FilterFieldProps) {

  return (

    <div>

      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-xs
          font-black
          text-slate-600
        "
      >

        <span
          className="
            text-blue-600
          "
        >
          {icon}
        </span>


        {label}

      </label>


      {children}

    </div>
  );
}


/* ==========================================
   COMMON INPUT STYLE
========================================== */

const inputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3
  text-sm
  font-semibold
  text-slate-700
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  hover:border-slate-300
  focus:border-blue-500
  focus:bg-white
  focus:ring-4
  focus:ring-blue-500/10
`;


export default EmployeeFilters;
