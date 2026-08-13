import type {
  LucideIcon
} from "lucide-react";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  IdCard,
  Mail,
  Phone,
  UserRound
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import {
  formatLeaveDate
} from "../../utils/leave";


interface ProfileInformationProps {
  employee: EmployeeRecord;
}


function ProfileInformation({
  employee
}: ProfileInformationProps) {

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

      <div
        className="
          border-b
          border-slate-100
          px-6
          py-5
        "
      >

        <p
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.16em]
            text-blue-600
          "
        >
          Employee Details
        </p>


        <h2
          className="
            mt-1
            text-xl
            font-black
            text-slate-950
          "
        >
          Personal Information
        </h2>

      </div>


      <div
        className="
          grid
          gap-4
          p-6
          sm:grid-cols-2
        "
      >

        <InformationItem
          icon={IdCard}
          label="Employee ID"
          value={employee.id}
        />


        <InformationItem
          icon={UserRound}
          label="Full Name"
          value={employee.name}
        />


        <InformationItem
          icon={Building2}
          label="Department"
          value={employee.department}
        />


        <InformationItem
          icon={BriefcaseBusiness}
          label="Designation"
          value={employee.designation}
        />


        <InformationItem
          icon={Mail}
          label="Email Address"
          value={employee.email}
        />


        <InformationItem
          icon={Phone}
          label="Mobile Number"
          value={employee.phone}
        />


        <InformationItem
          icon={CalendarDays}
          label="Date of Joining"
          value={
            formatLeaveDate(
              employee.joiningDate
            )
          }
        />


        <InformationItem
          icon={BadgeCheck}
          label="Employment Status"
          value={employee.status}
        />

      </div>

    </section>
  );
}


interface InformationItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}


function InformationItem({
  icon: Icon,
  label,
  value
}: InformationItemProps) {

  return (

    <div
      className="
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-slate-100
        bg-slate-50/60
        p-4
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

        <Icon size={17} />

      </div>


      <div
        className="
          min-w-0
        "
      >

        <p
          className="
            text-[10px]
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
            mt-1
            break-words
            text-sm
            font-black
            text-slate-800
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}


export default ProfileInformation;
