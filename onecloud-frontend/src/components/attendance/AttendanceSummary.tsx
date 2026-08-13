import type {
  LucideIcon
} from "lucide-react";

import {
  BriefcaseBusiness,
  CircleCheckBig,
  CircleX,
  Clock3,
  Laptop
} from "lucide-react";


interface AttendanceSummaryProps {
  present: number;
  absent: number;
  wfh: number;
  halfDay: number;
  notMarked: number;
}


function AttendanceSummary({
  present,
  absent,
  wfh,
  halfDay,
  notMarked
}: AttendanceSummaryProps) {

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
        title="Present"
        value={present}
        icon={CircleCheckBig}
        color="green"
      />


      <SummaryCard
        title="Absent"
        value={absent}
        icon={CircleX}
        color="red"
      />


      <SummaryCard
        title="Work From Home"
        value={wfh}
        icon={Laptop}
        color="blue"
      />


      <SummaryCard
        title="Half Day"
        value={halfDay}
        icon={Clock3}
        color="orange"
      />


      <SummaryCard
        title="Not Marked"
        value={notMarked}
        icon={BriefcaseBusiness}
        color="slate"
      />

    </section>
  );
}


interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;

  color:
    | "green"
    | "red"
    | "blue"
    | "orange"
    | "slate";
}


const colors = {

  green:
    "bg-emerald-50 text-emerald-600",

  red:
    "bg-red-50 text-red-600",

  blue:
    "bg-blue-50 text-blue-600",

  orange:
    "bg-orange-50 text-orange-600",

  slate:
    "bg-slate-100 text-slate-600"
};


function SummaryCard({
  title,
  value,
  icon: Icon,
  color
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
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div
        className="
          flex
          items-center
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
              text-slate-950
            "
          >
            {value}
          </p>

        </div>


        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${colors[color]}
          `}
        >
          <Icon size={21} />
        </div>

      </div>

    </article>
  );
}


export default AttendanceSummary;
