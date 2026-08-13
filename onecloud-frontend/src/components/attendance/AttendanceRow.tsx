import {
  BriefcaseBusiness,
  Building2,
  IdCard
} from "lucide-react";

import EmployeeAvatar
  from "../employee/EmployeeAvatar";

import type {
  AttendanceStatus
} from "../../types/attendance";

import type {
  EmployeeRecord
} from "../../types/employee";


interface AttendanceRowProps {
  employee: EmployeeRecord;
  status: AttendanceStatus;

  onStatusChange:
    (
      employeeId: string,
      status: AttendanceStatus
    ) => void;
}


function AttendanceRow({
  employee,
  status,
  onStatusChange
}: AttendanceRowProps) {

  return (

    <tr
      className="
        border-b
        border-slate-100
        transition
        hover:bg-blue-50/30
      "
    >

      {/* Employee */}

      <td
        className="
          min-w-64
          px-5
          py-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <EmployeeAvatar
            name={employee.name}
            photo={employee.photo}
            size="sm"
          />


          <div>

            <p
              className="
                text-sm
                font-black
                text-slate-900
              "
            >
              {employee.name}
            </p>


            <p
              className="
                mt-1
                flex
                items-center
                gap-1.5
                text-[11px]
                text-slate-400
              "
            >
              <IdCard size={12} />

              {employee.id}
            </p>

          </div>

        </div>

      </td>


      {/* Department */}

      <td
        className="
          whitespace-nowrap
          px-5
          py-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-600
          "
        >
          <Building2
            size={14}
            className="
              text-slate-400
            "
          />

          {employee.department}
        </div>

      </td>


      {/* Designation */}

      <td
        className="
          min-w-52
          px-5
          py-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-600
          "
        >
          <BriefcaseBusiness
            size={14}
            className="
              text-slate-400
            "
          />

          {employee.designation}
        </div>

      </td>


      {/* Status badge */}

      <td
        className="
          whitespace-nowrap
          px-5
          py-4
        "
      >

        <AttendanceBadge
          status={status}
        />

      </td>


      {/* Change Status */}

      <td
        className="
          min-w-52
          px-5
          py-4
        "
      >

        <select
          value={status}
          onChange={
            (event) =>
              onStatusChange(
                employee.id,
                event.target
                  .value as AttendanceStatus
              )
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            py-2.5
            text-xs
            font-bold
            text-slate-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
          "
        >

          <option value="Not Marked">
            Not Marked
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

        </select>

      </td>

    </tr>
  );
}


/* =========================================
   STATUS BADGE
========================================= */

interface AttendanceBadgeProps {
  status: AttendanceStatus;
}


function AttendanceBadge({
  status
}: AttendanceBadgeProps) {

  const styles: Record<
    AttendanceStatus,
    string
  > = {

    Present:
      "bg-emerald-50 text-emerald-700",

    Absent:
      "bg-red-50 text-red-700",

    WFH:
      "bg-blue-50 text-blue-700",

    "Half Day":
      "bg-orange-50 text-orange-700",

    "Not Marked":
      "bg-slate-100 text-slate-600"
  };


  const dotStyles: Record<
    AttendanceStatus,
    string
  > = {

    Present:
      "bg-emerald-500",

    Absent:
      "bg-red-500",

    WFH:
      "bg-blue-500",

    "Half Day":
      "bg-orange-500",

    "Not Marked":
      "bg-slate-400"
  };


  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-[11px]
        font-black
        ${styles[status]}
      `}
    >

      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${dotStyles[status]}
        `}
      />

      {status}

    </span>
  );
}


export default AttendanceRow;