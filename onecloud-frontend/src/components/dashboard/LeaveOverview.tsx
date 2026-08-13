import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";

import {
  useAppContext
} from "../../hooks/useAppContext";


function LeaveOverview() {

  const {
    leaveRequests
  } = useAppContext();


  const pending =
    leaveRequests.filter(
      (request) =>
        request.status ===
        "Pending"
    ).length;


  const approved =
    leaveRequests.filter(
      (request) =>
        request.status ===
        "Approved"
    ).length;


  const rejected =
    leaveRequests.filter(
      (request) =>
        request.status ===
        "Rejected"
    ).length;


  const cancelled =
    leaveRequests.filter(
      (request) =>
        request.status ===
        "Cancelled"
    ).length;


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
          gap-4
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
            Leave Management
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Leave Overview
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


      {/* Total */}

      <div
        className="
          px-6
          pt-6
        "
      >

        <p
          className="
            text-sm
            font-bold
            text-slate-500
          "
        >
          Total Leave Requests
        </p>


        <p
          className="
            mt-1
            text-4xl
            font-black
            text-slate-950
          "
        >
          {leaveRequests.length}
        </p>

      </div>


      {/* Leave status */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          p-6
        "
      >

        <LeaveItem
          title="Pending"
          value={pending}
          icon={Clock3}
          styleName="orange"
        />


        <LeaveItem
          title="Approved"
          value={approved}
          icon={CheckCircle2}
          styleName="green"
        />


        <LeaveItem
          title="Rejected"
          value={rejected}
          icon={XCircle}
          styleName="red"
        />


        <LeaveItem
          title="Cancelled"
          value={cancelled}
          icon={Ban}
          styleName="slate"
        />

      </div>


      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-t
          border-slate-100
          px-6
          py-4
        "
      >

        <Link
          to={ROUTES.LEAVE}
          className="
            text-xs
            font-black
            text-blue-600
            hover:text-blue-800
          "
        >
          Leave Management
        </Link>


        <Link
          to={ROUTES.LEAVE_APPROVAL}
          className="
            text-xs
            font-black
            text-purple-600
            hover:text-purple-800
          "
        >
          Review {pending} Pending →
        </Link>

      </div>

    </section>
  );
}


interface LeaveItemProps {

  title: string;

  value: number;

  icon:
    typeof Clock3;

  styleName:
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
  title,
  value,
  icon: Icon,
  styleName
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
        bg-slate-50/50
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
          ${styles[styleName]}
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
          {title}
        </p>

      </div>

    </div>
  );
}


export default LeaveOverview;
