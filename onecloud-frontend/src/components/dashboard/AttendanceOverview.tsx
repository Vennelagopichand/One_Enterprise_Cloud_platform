import {
  CalendarCheck2,
  CircleCheckBig,
  CircleX,
  Clock3,
  Laptop
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

import {
  getTodayDateString
} from "../../utils/date";


function AttendanceOverview() {

  const {
    employees,
    getAttendanceStatus
  } = useAppContext();


  const today =
    getTodayDateString();


  const summary = {
    present: 0,
    absent: 0,
    wfh: 0,
    halfDay: 0,
    notMarked: 0
  };


  employees.forEach(
    (employee) => {

      const status =
        getAttendanceStatus(
          employee.id,
          today
        );


      switch (status) {

        case "Present":
          summary.present += 1;
          break;

        case "Absent":
          summary.absent += 1;
          break;

        case "WFH":
          summary.wfh += 1;
          break;

        case "Half Day":
          summary.halfDay += 1;
          break;

        default:
          summary.notMarked += 1;
          break;
      }
    }
  );


  const marked =
    summary.present +
    summary.absent +
    summary.wfh +
    summary.halfDay;


  const attendancePercentage =
    employees.length > 0
      ? Math.round(
          (
            (
              summary.present +
              summary.wfh +
              summary.halfDay
            ) /
            employees.length
          ) *
          100
        )
      : 0;


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
              text-blue-600
            "
          >
            Today's Workforce
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Attendance Overview
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
            bg-blue-50
            text-blue-600
          "
        >
          <CalendarCheck2
            size={20}
          />
        </div>

      </div>


      {/* Percentage */}

      <div
        className="
          px-6
          pt-6
        "
      >

        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >

          <div>

            <p
              className="
                text-sm
                font-bold
                text-slate-500
              "
            >
              Attendance Rate
            </p>


            <p
              className="
                mt-1
                text-4xl
                font-black
                tracking-tight
                text-slate-950
              "
            >
              {attendancePercentage}%
            </p>

          </div>


          <div
            className="
              text-right
            "
          >

            <p
              className="
                text-xs
                font-black
                text-slate-700
              "
            >
              {marked} / {employees.length}
            </p>


            <p
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              attendance marked
            </p>

          </div>

        </div>


        <div
          className="
            mt-4
            h-2.5
            overflow-hidden
            rounded-full
            bg-slate-100
          "
        >

          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-400
              transition-all
              duration-500
            "
            style={{
              width:
                `${attendancePercentage}%`
            }}
          />

        </div>

      </div>


      {/* Status Grid */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          p-6
          sm:grid-cols-5
        "
      >

        <AttendanceItem
          label="Present"
          value={summary.present}
          icon={CircleCheckBig}
          styleName="green"
        />


        <AttendanceItem
          label="Absent"
          value={summary.absent}
          icon={CircleX}
          styleName="red"
        />


        <AttendanceItem
          label="WFH"
          value={summary.wfh}
          icon={Laptop}
          styleName="blue"
        />


        <AttendanceItem
          label="Half Day"
          value={summary.halfDay}
          icon={Clock3}
          styleName="orange"
        />


        <AttendanceItem
          label="Not Marked"
          value={summary.notMarked}
          icon={Clock3}
          styleName="slate"
        />

      </div>


      <div
        className="
          border-t
          border-slate-100
          px-6
          py-4
        "
      >

        <Link
          to={ROUTES.ATTENDANCE}
          className="
            inline-flex
            items-center
            text-xs
            font-black
            text-blue-600
            transition
            hover:text-blue-800
          "
        >
          Manage Attendance →
        </Link>

      </div>

    </section>
  );
}


interface AttendanceItemProps {

  label: string;

  value: number;

  icon:
    typeof CircleCheckBig;

  styleName:
    | "green"
    | "red"
    | "blue"
    | "orange"
    | "slate";
}


const styles = {

  green:
    "bg-emerald-50 text-emerald-600",

  red:
    "bg-red-50 text-red-600",

  blue:
    "bg-blue-50 text-blue-600",

  orange:
    "bg-orange-50 text-orange-600",

  slate:
    "bg-slate-100 text-slate-500"
};


function AttendanceItem({
  label,
  value,
  icon: Icon,
  styleName
}: AttendanceItemProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50/50
        p-3
        text-center
      "
    >

      <div
        className={`
          mx-auto
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          ${styles[styleName]}
        `}
      >
        <Icon size={16} />
      </div>


      <p
        className="
          mt-2
          text-xl
          font-black
          text-slate-950
        "
      >
        {value}
      </p>


      <p
        className="
          mt-0.5
          text-[9px]
          font-bold
          text-slate-500
        "
      >
        {label}
      </p>

    </div>
  );
}


export default AttendanceOverview;
