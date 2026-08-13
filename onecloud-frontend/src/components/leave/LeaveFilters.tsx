import {
  RefreshCcw,
  Search,
  SlidersHorizontal
} from "lucide-react";

import type {
  LeaveStatus,
  LeaveType
} from "../../types/leave";


export type LeaveStatusFilter =
  | "All"
  | LeaveStatus;


export type LeaveTypeFilter =
  | "All"
  | LeaveType;


interface LeaveFiltersProps {

  search: string;

  status:
    LeaveStatusFilter;

  leaveType:
    LeaveTypeFilter;

  onSearchChange:
    (value: string) => void;

  onStatusChange:
    (
      value:
        LeaveStatusFilter
    ) => void;

  onLeaveTypeChange:
    (
      value:
        LeaveTypeFilter
    ) => void;

  onReset:
    () => void;
}


function LeaveFilters({
  search,
  status,
  leaveType,
  onSearchChange,
  onStatusChange,
  onLeaveTypeChange,
  onReset
}: LeaveFiltersProps) {

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div
        className="
          mb-5
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
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
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
              Leave Filters
            </h2>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-500
              "
            >
              Search and filter requests.
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={onReset}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2.5
            text-xs
            font-black
            text-slate-600
            transition
            hover:bg-blue-50
            hover:text-blue-700
          "
        >

          <RefreshCcw
            size={15}
          />

          Reset

        </button>

      </div>


      <div
        className="
          grid
          gap-4
          md:grid-cols-3
        "
      >

        {/* Search */}

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
            placeholder="Search employee..."
            className={`
              ${inputClass}
              pl-11
            `}
          />

        </div>


        {/* Leave Type */}

        <select
          value={leaveType}
          onChange={
            (event) =>
              onLeaveTypeChange(
                event.target
                  .value as LeaveTypeFilter
              )
          }
          className={inputClass}
        >

          <option value="All">
            All Leave Types
          </option>

          <option value="Annual Leave">
            Annual Leave
          </option>

          <option value="Sick Leave">
            Sick Leave
          </option>

          <option value="Casual Leave">
            Casual Leave
          </option>

          <option value="Emergency Leave">
            Emergency Leave
          </option>

        </select>


        {/* Status */}

        <select
          value={status}
          onChange={
            (event) =>
              onStatusChange(
                event.target
                  .value as LeaveStatusFilter
              )
          }
          className={inputClass}
        >

          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>

    </section>
  );
}


const inputClass = `
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
  transition
  focus:border-blue-500
  focus:bg-white
  focus:ring-4
  focus:ring-blue-500/10
`;


export default LeaveFilters;
