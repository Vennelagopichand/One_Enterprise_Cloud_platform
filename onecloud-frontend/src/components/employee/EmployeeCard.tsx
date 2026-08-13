import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  IdCard,
  Mail
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import EmployeeAvatar
  from "./EmployeeAvatar";

import type {
  EmployeeRecord
} from "../../types/employee";


interface EmployeeCardProps {
  employee: EmployeeRecord;
}


function EmployeeCard({
  employee
}: EmployeeCardProps) {

  const joiningDate =
    formatDate(
      employee.joiningDate
    );


  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-slate-900/5
      "
    >

      {/* Top */}

      <div
        className="
          relative
          bg-gradient-to-br
          from-slate-950
          via-blue-950
          to-indigo-950
          px-5
          pb-14
          pt-5
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-16
            h-40
            w-40
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            items-start
            justify-between
          "
        >

          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/10
              bg-white/5
              px-3
              py-1.5
              font-mono
              text-[10px]
              font-black
              text-blue-200
            "
          >
            <IdCard size={12} />

            {employee.id}
          </span>


          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1.5
              text-[10px]
              font-black

              ${
                employee.status === "Active"
                  ? `
                    bg-emerald-400/15
                    text-emerald-300
                  `
                  : `
                    bg-slate-400/15
                    text-slate-300
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
                  employee.status === "Active"
                    ? "bg-emerald-400"
                    : "bg-slate-400"
                }
              `}
            />

            {employee.status}

          </span>

        </div>

      </div>


      {/* Avatar */}

      <div
        className="
          -mt-10
          px-5
        "
      >

        <EmployeeAvatar
          name={employee.name}
          photo={employee.photo}
          size="lg"
          className="
            relative
            z-10
            ring-4
            ring-white
          "
        />

      </div>


      {/* Employee Information */}

      <div
        className="
          px-5
          pb-5
          pt-4
        "
      >

        <h3
          className="
            text-lg
            font-black
            tracking-tight
            text-slate-950
          "
        >
          {employee.name}
        </h3>


        <p
          className="
            mt-1
            flex
            items-center
            gap-2
            text-xs
            text-slate-500
          "
        >
          <BriefcaseBusiness
            size={14}
            className="
              text-blue-500
            "
          />

          {employee.designation}
        </p>


        <div
          className="
            my-5
            h-px
            bg-slate-100
          "
        />


        <div
          className="
            space-y-3
          "
        >

          <InfoRow
            icon={Building2}
            label="Department"
            value={
              employee.department
            }
          />

          <InfoRow
            icon={Mail}
            label="Email"
            value={
              employee.email
            }
          />

          <InfoRow
            icon={CalendarDays}
            label="Joined"
            value={joiningDate}
          />

        </div>


        <Link
          to={
            `/employees/${employee.id}`
          }
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-4
            py-3
            text-sm
            font-black
            text-white
            transition-all
            duration-200
            hover:bg-blue-600
          "
        >
          View Employee

          <ArrowUpRight
            size={16}
          />
        </Link>

      </div>

    </article>
  );
}


interface InfoRowProps {
  icon: typeof Building2;
  label: string;
  value: string;
}


function InfoRow({
  icon: Icon,
  label,
  value
}: InfoRowProps) {

  return (
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
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-slate-50
          text-slate-500
        "
      >
        <Icon size={14} />
      </div>


      <div
        className="
          min-w-0
        "
      >

        <p
          className="
            text-[9px]
            font-black
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-xs
            font-bold
            text-slate-700
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}


function formatDate(
  value: string
) {

  if (!value) {
    return "Not Available";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  ).format(
    new Date(
      `${value}T00:00:00`
    )
  );
}


export default EmployeeCard;
