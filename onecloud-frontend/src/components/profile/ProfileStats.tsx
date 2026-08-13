import type {
  LucideIcon
} from "lucide-react";

import {
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock3
} from "lucide-react";


interface ProfileStatsProps {
  attendancePercentage: number;

  totalAttendanceDays: number;

  approvedLeaveDays: number;

  remainingLeaveDays: number;
}


function ProfileStats({
  attendancePercentage,
  totalAttendanceDays,
  approvedLeaveDays,
  remainingLeaveDays
}: ProfileStatsProps) {

  return (

    <section
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      <ProfileStat
        title="Attendance Rate"
        value={`${attendancePercentage}%`}
        description="Overall attendance"
        icon={CalendarCheck2}
        variant="blue"
      />


      <ProfileStat
        title="Attendance Records"
        value={totalAttendanceDays}
        description="Recorded work days"
        icon={Clock3}
        variant="cyan"
      />


      <ProfileStat
        title="Approved Leave"
        value={approvedLeaveDays}
        description="Leave days used"
        icon={CalendarDays}
        variant="orange"
      />


      <ProfileStat
        title="Leave Balance"
        value={remainingLeaveDays}
        description="Days remaining"
        icon={CheckCircle2}
        variant="green"
      />

    </section>
  );
}


interface ProfileStatProps {
  title: string;

  value: string | number;

  description: string;

  icon: LucideIcon;

  variant:
    | "blue"
    | "cyan"
    | "orange"
    | "green";
}


const styles = {

  blue:
    "bg-blue-50 text-blue-600",

  cyan:
    "bg-cyan-50 text-cyan-600",

  orange:
    "bg-orange-50 text-orange-600",

  green:
    "bg-emerald-50 text-emerald-600"
};


function ProfileStat({
  title,
  value,
  description,
  icon: Icon,
  variant
}: ProfileStatProps) {

  return (

    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
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


export default ProfileStats;
