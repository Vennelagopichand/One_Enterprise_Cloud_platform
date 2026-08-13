import type {
  ReactNode
} from "react";

import {
  CalendarCheck2,
  CircleCheckBig,
  CircleX,
  Clock3,
  Laptop
} from "lucide-react";

import type {
  AttendanceRecord
} from "../../types/attendance";


interface AttendanceAnalyticsProps {
  records:
    AttendanceRecord[];
}


function AttendanceAnalytics({
  records
}: AttendanceAnalyticsProps) {

  const present =
    records.filter(
      (record) =>
        record.status ===
        "Present"
    ).length;


  const absent =
    records.filter(
      (record) =>
        record.status ===
        "Absent"
    ).length;


  const wfh =
    records.filter(
      (record) =>
        record.status ===
        "WFH"
    ).length;


  const halfDay =
    records.filter(
      (record) =>
        record.status ===
        "Half Day"
    ).length;


  const notMarked =
    records.filter(
      (record) =>
        record.status ===
        "Not Marked"
    ).length;


  const marked =
    records.filter(
      (record) =>
        record.status !==
        "Not Marked"
    );


  const attendanceRate =
    marked.length > 0
      ? Math.round(
          (
            (
              present +
              wfh +
              halfDay * 0.5
            ) /
            marked.length
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
              text-cyan-600
            "
          >
            Attendance Report
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Attendance Analytics
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
            bg-cyan-50
            text-cyan-600
          "
        >

          <CalendarCheck2
            size={20}
          />

        </div>

      </div>


      {/* Rate */}

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
              Overall Attendance Rate
            </p>


            <p
              className="
                mt-1
                text-4xl
                font-black
                text-slate-950
              "
            >
              {attendanceRate}%
            </p>

          </div>


          <div
            className="
              text-right
            "
          >

            <p
              className="
                text-lg
                font-black
                text-slate-800
              "
            >
              {marked.length}
            </p>


            <p
              className="
                text-[10px]
                text-slate-400
              "
            >
              Marked Records
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
              from-cyan-500
              to-blue-600
            "
            style={{
              width:
                `${Math.min(
                  attendanceRate,
                  100
                )}%`
            }}
          />

        </div>

      </div>


      {/* Status Cards */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          p-6
          sm:grid-cols-3
          xl:grid-cols-5
        "
      >

        <AttendanceItem
          label="Present"
          value={present}
          icon={
            <CircleCheckBig
              size={17}
            />
          }
          variant="green"
        />


        <AttendanceItem
          label="Absent"
          value={absent}
          icon={
            <CircleX
              size={17}
            />
          }
          variant="red"
        />


        <AttendanceItem
          label="WFH"
          value={wfh}
          icon={
            <Laptop
              size={17}
            />
          }
          variant="blue"
        />


        <AttendanceItem
          label="Half Day"
          value={halfDay}
          icon={
            <Clock3
              size={17}
            />
          }
          variant="orange"
        />


        <AttendanceItem
          label="Not Marked"
          value={notMarked}
          icon={
            <Clock3
              size={17}
            />
          }
          variant="slate"
        />

      </div>

    </section>
  );
}


interface AttendanceItemProps {
  label: string;
  value: number;
  icon: ReactNode;

  variant:
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
  icon,
  variant
}: AttendanceItemProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50/60
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
          ${styles[variant]}
        `}
      >
        {icon}
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
          mt-1
          text-[9px]
          font-black
          uppercase
          text-slate-500
        "
      >
        {label}
      </p>

    </div>
  );
}


export default AttendanceAnalytics;