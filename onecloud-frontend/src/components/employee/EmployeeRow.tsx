import {
  Eye,
  Pencil,
  Trash2
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import type {
  EmployeeRecord
} from "../../types/employee";


interface EmployeeRowProps {

  employee:
    EmployeeRecord;

  onEdit:
    (
      employee:
        EmployeeRecord
    ) => void;

  onDelete:
    (
      employeeId: string
    ) => void;
}


function EmployeeRow({
  employee,
  onEdit,
  onDelete
}: EmployeeRowProps) {

  const employeePath =
    `/employees/${employee.id}`;


  return (

    <tr
      className="
        group
        border-b
        border-slate-100
        transition
        hover:bg-blue-50/30
      "
    >

      {/* Employee ID */}

      <td
        className="
          whitespace-nowrap
          px-5
          py-4
        "
      >

        <span
          className="
            font-mono
            text-xs
            font-black
            text-blue-700
          "
        >
          {employee.id}
        </span>

      </td>


      {/* Name */}

      <td
        className="
          min-w-56
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

          {/* Avatar */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-gradient-to-br
              from-blue-600
              to-indigo-600
              text-xs
              font-black
              text-white
            "
          >

            {
              employee.photo
                ? (
                  <img
                    src={
                      employee.photo
                    }
                    alt={
                      employee.name
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                )
                : (
                  getInitials(
                    employee.name
                  )
                )
            }

          </div>


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
                mt-0.5
                text-xs
                text-slate-400
              "
            >
              {employee.email}
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
          text-sm
          text-slate-600
        "
      >
        {employee.department}
      </td>


      {/* Designation */}

      <td
        className="
          min-w-48
          px-5
          py-4
          text-sm
          text-slate-600
        "
      >
        {employee.designation}
      </td>


      {/* Status */}

      <td
        className="
          whitespace-nowrap
          px-5
          py-4
        "
      >

        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-3
            py-1.5
            text-[11px]
            font-black

            ${
              employee.status ===
              "Active"
                ? `
                  bg-emerald-50
                  text-emerald-700
                `
                : `
                  bg-slate-100
                  text-slate-600
                `
            }
          `}
        >

          <span
            className={`
              h-1.5
              w-1.5
              rounded-full

              ${
                employee.status ===
                "Active"
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }
            `}
          />


          {employee.status}

        </span>

      </td>


      {/* Actions */}

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
          "
        >

          {/* View */}

          <Link
            to={employeePath}
            title="View employee"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-blue-50
              text-blue-600
              transition
              hover:bg-blue-600
              hover:text-white
            "
          >

            <Eye
              size={16}
            />

          </Link>


          {/* Edit */}

          <button
            type="button"
            onClick={() =>
              onEdit(
                employee
              )
            }
            title="Edit employee"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-amber-50
              text-amber-600
              transition
              hover:bg-amber-500
              hover:text-white
            "
          >

            <Pencil
              size={16}
            />

          </button>


          {/* Delete */}

          <button
            type="button"
            onClick={() =>
              onDelete(
                employee.id
              )
            }
            title="Delete employee"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-red-50
              text-red-600
              transition
              hover:bg-red-600
              hover:text-white
            "
          >

            <Trash2
              size={16}
            />

          </button>

        </div>

      </td>

    </tr>
  );
}


function getInitials(
  name: string
) {

  return name
    .trim()
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0)
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


export default EmployeeRow;
