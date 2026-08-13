import type {
  LucideIcon
} from "lucide-react";

import {
  Building2,
  CalendarCheck2,
  CalendarDays,
  UserCheck,
  Users
} from "lucide-react";


interface ReportSummaryProps {
  totalEmployees: number;
  activeEmployees: number;
  totalDepartments: number;
  attendanceRate: number;
  pendingLeave: number;
}


function ReportSummary({
  totalEmployees,
  activeEmployees,
  totalDepartments,
  attendanceRate,
  pendingLeave
}: ReportSummaryProps) {

  return (

    <section
      className="
        grid
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        2xl:grid-cols-5
      "
    >

      <SummaryCard
        title="Total Employees"
        value={totalEmployees}
        description="Organization workforce"
        icon={Users}
        variant="blue"
      />

      <SummaryCard
        title="Active Employees"
        value={activeEmployees}
        description="Currently active"
        icon={UserCheck}
        variant="green"
      />

      <SummaryCard
        title="Departments"
        value={totalDepartments}
        description="Business departments"
        icon={Building2}
        variant="purple"
      />

      <SummaryCard
        title="Attendance Rate"
        value={`${attendanceRate}%`}
        description="Recorded attendance"
        icon={CalendarCheck2}
        variant="cyan"
      />

      <SummaryCard
        title="Pending Leave"
        value={pendingLeave}
        description="Waiting for approval"
        icon={CalendarDays}
        variant="orange"
      />

    </section>
  );
}


interface SummaryCardProps {
  title: string;

  value:
    string |
    number;

  description: string;

  icon:
    LucideIcon;

  variant:
    | "blue"
    | "green"
    | "purple"
    | "cyan"
    | "orange";
}


const styles = {

  blue:
    "bg-blue-50 text-blue-600",

  green:
    "bg-emerald-50 text-emerald-600",

  purple:
    "bg-purple-50 text-purple-600",

  cyan:
    "bg-cyan-50 text-cyan-600",

  orange:
    "bg-orange-50 text-orange-600"
};


function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  variant
}: SummaryCardProps) {

  return (

    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-xs
              font-bold
              text-slate-500
            "
          >
            {title}
          </p>


          <p
            className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-[10px]
              text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${styles[variant]}
          `}
        >

          <Icon size={19} />

        </div>

      </div>

    </article>
  );
}


export default ReportSummary;
