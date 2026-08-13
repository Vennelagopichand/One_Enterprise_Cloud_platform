import type {
  LucideIcon
} from "lucide-react";

import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle
} from "lucide-react";


interface LeaveSummaryProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  cancelled: number;
}


function LeaveSummary({
  total,
  pending,
  approved,
  rejected,
  cancelled
}: LeaveSummaryProps) {

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
        title="Total Requests"
        value={total}
        icon={CalendarDays}
        styleName="blue"
      />

      <SummaryCard
        title="Pending"
        value={pending}
        icon={Clock3}
        styleName="orange"
      />

      <SummaryCard
        title="Approved"
        value={approved}
        icon={CheckCircle2}
        styleName="green"
      />

      <SummaryCard
        title="Rejected"
        value={rejected}
        icon={XCircle}
        styleName="red"
      />

      <SummaryCard
        title="Cancelled"
        value={cancelled}
        icon={Ban}
        styleName="slate"
      />

    </section>
  );
}


interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;

  styleName:
    | "blue"
    | "orange"
    | "green"
    | "red"
    | "slate";
}


const colors = {

  blue:
    "bg-blue-50 text-blue-600",

  orange:
    "bg-orange-50 text-orange-600",

  green:
    "bg-emerald-50 text-emerald-600",

  red:
    "bg-red-50 text-red-600",

  slate:
    "bg-slate-100 text-slate-600"
};


function SummaryCard({
  title,
  value,
  icon: Icon,
  styleName
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
            ${colors[styleName]}
          `}
        >

          <Icon size={21} />

        </div>

      </div>

    </article>
  );
}


export default LeaveSummary;
