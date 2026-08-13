import type {
  ReactNode
} from "react";

import {
  Building2,
  CalendarDays,
  RefreshCcw,
  Search,
  SlidersHorizontal
} from "lucide-react";

import type {
  AttendanceStatus
} from "../../types/attendance";


/* ==========================================
   ATTENDANCE STATUS FILTER TYPE
========================================== */

export type AttendanceStatusFilter =
  | "All"
  | AttendanceStatus;


/* ==========================================
   COMPONENT PROPS
========================================== */

interface AttendanceFiltersProps {

  search: string;

  department: string;

  status: AttendanceStatusFilter;

  date: string;

  departments: string[];


  onSearchChange:
    (value: string) => void;


  onDepartmentChange:
    (value: string) => void;


  onStatusChange:
    (
      value: AttendanceStatusFilter
    ) => void;


  onDateChange:
    (value: string) => void;


  onReset:
    () => void;
}


/* ==========================================
   ATTENDANCE FILTER COMPONENT
========================================== */

function AttendanceFilters({
  search,
  department,
  status,
  date,
  departments,
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onDateChange,
  onReset
}: AttendanceFiltersProps) {

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
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* Title */}

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
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
            "
          >

            <SlidersHorizontal
              size={18}
            />

          </div>


          <div>

            <h2
              className="
                text-base
                font-black
                text-slate-900
              "
            >
              Attendance Filters
            </h2>


            <p
              className="
                mt-0.5
                text-xs
                text-slate-500
              "
            >
              Search and filter employee
              attendance records.
            </p>

          </div>

        </div>


        {/* Reset Button */}

        <button
          type="button"
          onClick={onReset}
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
            shadow-sm
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-700
            hover:shadow-md
          "
        >

          <RefreshCcw
            size={15}
          />

          Reset Filters

        </button>

      </div>


      {/* =====================================
          FILTER INPUTS
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
          label="Search Employee"
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
              value={search}
              onChange={
                (event) =>
                  onSearchChange(
                    event.target.value
                  )
              }
              placeholder="Name or Employee ID"
              className={
                iconInputClass
              }
            />

          </div>

        </FilterField>


        {/* ===================================
            DEPARTMENT
        ==================================== */}

        <FilterField
          label="Department"
        >

          <div
            className="
              relative
            "
          >

            <Building2
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


            <select
              value={department}
              onChange={
                (event) =>
                  onDepartmentChange(
                    event.target.value
                  )
              }
              className={
                iconInputClass
              }
            >

              <option value="All">
                All Departments
              </option>


              {
                departments.map(
                  (item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  )
                )
              }

            </select>

          </div>

        </FilterField>


        {/* ===================================
            ATTENDANCE STATUS
        ==================================== */}

        <FilterField
          label="Attendance Status"
        >

          <select
            value={status}
            onChange={
              (event) =>
                onStatusChange(
                  event.target
                    .value as AttendanceStatusFilter
                )
            }
            className={
              normalInputClass
            }
          >

            <option value="All">
              All Status
            </option>


            <option value="Present">
              Present
            </option>


            <option value="Absent">
              Absent
            </option>


            <option value="WFH">
              Work From Home
            </option>


            <option value="Half Day">
              Half Day
            </option>


            <option value="Not Marked">
              Not Marked
            </option>

          </select>

        </FilterField>


        {/* ===================================
            ATTENDANCE DATE
        ==================================== */}

        <FilterField
          label="Attendance Date"
        >

          <div
            className="
              relative
            "
          >

            <CalendarDays
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
              type="date"
              value={date}
              onChange={
                (event) =>
                  onDateChange(
                    event.target.value
                  )
              }
              className={
                iconInputClass
              }
            />

          </div>

        </FilterField>

      </div>

    </section>
  );
}


/* ==========================================
   FILTER FIELD COMPONENT
========================================== */

interface FilterFieldProps {

  label: string;

  children: ReactNode;
}


function FilterField({
  label,
  children
}: FilterFieldProps) {

  return (

    <div>

      <label
        className="
          mb-2
          block
          text-xs
          font-black
          text-slate-700
        "
      >
        {label}
      </label>


      {children}

    </div>
  );
}


/* ==========================================
   INPUT WITH LEFT ICON
========================================== */

const iconInputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-slate-50
  py-3
  pl-11
  pr-4
  text-sm
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


/* ==========================================
   NORMAL INPUT / SELECT
========================================== */

const normalInputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3
  text-sm
  text-slate-700
  outline-none
  transition-all
  duration-200
  hover:border-slate-300
  focus:border-blue-500
  focus:bg-white
  focus:ring-4
  focus:ring-blue-500/10
`;


export default AttendanceFilters;
