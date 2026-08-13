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


/* ==========================================
   COMPONENT PROPS
========================================== */

interface ProfileAttendanceProps {
  records: AttendanceRecord[];
}


/* ==========================================
   PROFILE ATTENDANCE
========================================== */

function ProfileAttendance({
  records
}: ProfileAttendanceProps) {

  /* ========================================
     ATTENDANCE COUNTS
  ======================================== */

  const present =
    records.filter(
      (record) =>
        record.status === "Present"
    ).length;


  const absent =
    records.filter(
      (record) =>
        record.status === "Absent"
    ).length;


  const wfh =
    records.filter(
      (record) =>
        record.status === "WFH"
    ).length;


  const halfDay =
    records.filter(
      (record) =>
        record.status === "Half Day"
    ).length;


  const notMarked =
    records.filter(
      (record) =>
        record.status === "Not Marked"
    ).length;


  /* ========================================
     MARKED ATTENDANCE RECORDS
  ======================================== */

  const markedRecords =
    records.filter(
      (record) =>
        record.status !==
        "Not Marked"
    );


  /* ========================================
     ATTENDANCE PERCENTAGE

     Present  = 1 day
     WFH      = 1 day
     Half Day = 0.5 day
     Absent   = 0 day
  ======================================== */

  const attendancePercentage =
    markedRecords.length > 0
      ? Math.round(
          (
            (
              present +
              wfh +
              halfDay * 0.5
            ) /
            markedRecords.length
          ) *
          100
        )
      : 0;


  return (

    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      {/* =====================================
          HEADER
      ====================================== */}

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
            Workforce Tracking
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            Attendance Performance
          </h2>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Employee attendance statistics
            from recorded attendance data.
          </p>

        </div>


        <div
          className="
            flex
            h-11
            w-11
            shrink-0
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


      {/* =====================================
          ATTENDANCE PERCENTAGE
      ====================================== */}

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
                text-xs
                font-bold
                text-slate-500
              "
            >
              Overall Attendance
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
                text-sm
                font-black
                text-slate-800
              "
            >
              {markedRecords.length}
            </p>


            <p
              className="
                mt-1
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Marked Records
            </p>

          </div>

        </div>


        {/* Progress Bar */}

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
                `${Math.min(
                  attendancePercentage,
                  100
                )}%`
            }}
          />

        </div>

      </div>


      {/* =====================================
          ATTENDANCE STATUS CARDS
      ====================================== */}

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
          styleName="green"
        />


        <AttendanceItem
          label="Absent"
          value={absent}
          icon={
            <CircleX
              size={17}
            />
          }
          styleName="red"
        />


        <AttendanceItem
          label="WFH"
          value={wfh}
          icon={
            <Laptop
              size={17}
            />
          }
          styleName="blue"
        />


        <AttendanceItem
          label="Half Day"
          value={halfDay}
          icon={
            <Clock3
              size={17}
            />
          }
          styleName="orange"
        />


        <AttendanceItem
          label="Not Marked"
          value={notMarked}
          icon={
            <Clock3
              size={17}
            />
          }
          styleName="slate"
        />

      </div>


      {/* =====================================
          EMPTY RECORD MESSAGE
      ====================================== */}

      {
        records.length === 0 && (

          <div
            className="
              border-t
              border-slate-100
              px-6
              py-5
            "
          >

            <div
              className="
                rounded-xl
                border
                border-blue-100
                bg-blue-50
                px-4
                py-3
                text-xs
                font-semibold
                leading-5
                text-blue-700
              "
            >
              No attendance records are
              currently available for this
              employee.
            </div>

          </div>

        )
      }

    </section>
  );
}


/* ==========================================
   ATTENDANCE ITEM PROPS

   TypeScript 6 compatible:
   ReactNode is imported directly.
========================================== */

interface AttendanceItemProps {

  label: string;

  value: number;

  icon: ReactNode;

  styleName:
    | "green"
    | "red"
    | "blue"
    | "orange"
    | "slate";
}


/* ==========================================
   ATTENDANCE ITEM COLORS
========================================== */

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


/* ==========================================
   ATTENDANCE ITEM
========================================== */

function AttendanceItem({
  label,
  value,
  icon,
  styleName
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
        transition
        hover:-translate-y-0.5
        hover:bg-white
        hover:shadow-md
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
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

    </div>
  );
}


export default ProfileAttendance;
