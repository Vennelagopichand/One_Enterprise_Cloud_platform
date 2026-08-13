import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle
} from "lucide-react";

import type {
  LeaveRequest
} from "../../types/leave";


interface LeaveAnalyticsProps {
  requests:
    LeaveRequest[];
}


function LeaveAnalytics({
  requests
}: LeaveAnalyticsProps) {

  const pending =
    requests.filter(
      (request) =>
        request.status ===
        "Pending"
    ).length;


  const approved =
    requests.filter(
      (request) =>
        request.status ===
        "Approved"
    ).length;


  const rejected =
    requests.filter(
      (request) =>
        request.status ===
        "Rejected"
    ).length;


  const cancelled =
    requests.filter(
      (request) =>
        request.status ===
        "Cancelled"
    ).length;


  const approvedDays =
    requests
      .filter(
        (request) =>
          request.status ===
          "Approved"
      )
      .reduce(
        (
          total,
          request
        ) =>
          total +
          request.totalDays,
        0
      );


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

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          px-6
          py-5
        "
      >

        <div>

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.16em]
              text-purple-600
            "
          >
            Leave Report
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Leave Analytics
          </h2>

        </div>


        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-purple-50
            text-purple-600
          "
        >

          <CalendarDays
            size={20}
          />

        </div>

      </div>


      {/* Totals */}

      <div
        className="
          grid
          gap-4
          border-b
          border-slate-100
          p-6
          sm:grid-cols-2
        "
      >

        <div
          className="
            rounded-2xl
            bg-purple-50
            p-5
          "
        >

          <p
            className="
              text-xs
              font-bold
              text-purple-600
            "
          >
            Total Requests
          </p>


          <p
            className="
              mt-2
              text-3xl
              font-black
              text-purple-950
            "
          >
            {requests.length}
          </p>

        </div>


        <div
          className="
            rounded-2xl
            bg-emerald-50
            p-5
          "
        >

          <p
            className="
              text-xs
              font-bold
              text-emerald-600
            "
          >
            Approved Leave Days
          </p>


          <p
            className="
              mt-2
              text-3xl
              font-black
              text-emerald-950
            "
          >
            {approvedDays}
          </p>

        </div>

      </div>


      {/* Status */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          p-6
        "
      >

        <LeaveItem
          label="Pending"
          value={pending}
          icon={Clock3}
          variant="orange"
        />


        <LeaveItem
          label="Approved"
          value={approved}
          icon={CheckCircle2}
          variant="green"
        />


        <LeaveItem
          label="Rejected"
          value={rejected}
          icon={XCircle}
          variant="red"
        />


        <LeaveItem
          label="Cancelled"
          value={cancelled}
          icon={Ban}
          variant="slate"
        />

      </div>

    </section>
  );
}


interface LeaveItemProps {
  label: string;

  value: number;

  icon:
    typeof Clock3;

  variant:
    | "orange"
    | "green"
    | "red"
    | "slate";
}


const styles = {

  orange:
    "bg-orange-50 text-orange-600",

  green:
    "bg-emerald-50 text-emerald-600",

  red:
    "bg-red-50 text-red-600",

  slate:
    "bg-slate-100 text-slate-600"
};


function LeaveItem({
  label,
  value,
  icon: Icon,
  variant
}: LeaveItemProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-100
        bg-slate-50/60
        p-4
      "
    >

      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${styles[variant]}
        `}
      >

        <Icon size={17} />

      </div>


      <div>

        <p
          className="
            text-xl
            font-black
            text-slate-950
          "
        >
          {value}
        </p>


        <p
          className="
            text-[10px]
            font-bold
            text-slate-500
          "
        >
          {label}
        </p>

      </div>

    </div>
  );
}


export default LeaveAnalytics;
