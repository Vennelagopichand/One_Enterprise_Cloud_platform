import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode
} from "react";

import {
  CalendarDays,
  FileText,
  Loader2,
  Send,
  UserRound
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import type {
  CreateLeaveRequestInput,
  LeaveType
} from "../../types/leave";

import {
  calculateLeaveDays
} from "../../utils/leave";


/* ==========================================
   COMPONENT PROPS
========================================== */

interface LeaveFormProps {

  employees:
    EmployeeRecord[];

  onSubmit:
    (
      request:
        CreateLeaveRequestInput
    ) => void;
}


/* ==========================================
   LEAVE TYPES
========================================== */

const leaveTypes:
  LeaveType[] = [

    "Annual Leave",
    "Sick Leave",
    "Casual Leave",
    "Emergency Leave"

  ];


/* ==========================================
   LEAVE FORM
========================================== */

function LeaveForm({
  employees,
  onSubmit
}: LeaveFormProps) {

  /* ========================================
     EMPLOYEE
  ======================================== */

  const [
    employeeId,
    setEmployeeId
  ] = useState("");


  /* ========================================
     LEAVE TYPE
  ======================================== */

  const [
    leaveType,
    setLeaveType
  ] =
    useState<LeaveType>(
      "Annual Leave"
    );


  /* ========================================
     START DATE
  ======================================== */

  const [
    startDate,
    setStartDate
  ] = useState("");


  /* ========================================
     END DATE
  ======================================== */

  const [
    endDate,
    setEndDate
  ] = useState("");


  /* ========================================
     REASON
  ======================================== */

  const [
    reason,
    setReason
  ] = useState("");


  /* ========================================
     ERROR MESSAGE
  ======================================== */

  const [
    error,
    setError
  ] = useState("");


  /* ========================================
     LOADING
  ======================================== */

  const [
    loading,
    setLoading
  ] = useState(false);


  /* ========================================
     ACTIVE EMPLOYEES

     Only Active employees can
     submit leave requests.
  ======================================== */

  const activeEmployees =
    useMemo(
      () => {

        return employees.filter(
          (employee) =>
            employee.status ===
            "Active"
        );

      },
      [
        employees
      ]
    );


  /* ========================================
     TOTAL LEAVE DAYS
  ======================================== */

  const totalDays =
    calculateLeaveDays(
      startDate,
      endDate
    );


  /* ========================================
     FORM SUBMIT
  ======================================== */

  function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    setError("");


    /* Employee Validation */

    if (!employeeId) {

      setError(
        "Please select an employee."
      );

      return;
    }


    /* Start Date Validation */

    if (!startDate) {

      setError(
        "Please select a start date."
      );

      return;
    }


    /* End Date Validation */

    if (!endDate) {

      setError(
        "Please select an end date."
      );

      return;
    }


    /* Date Validation */

    if (
      totalDays <= 0
    ) {

      setError(
        "End date must be the same as or after the start date."
      );

      return;
    }


    /* Reason Validation */

    if (
      reason
        .trim()
        .length < 5
    ) {

      setError(
        "Please enter a valid reason for leave."
      );

      return;
    }


    setLoading(true);


    /*
      Frontend simulation.

      Later this can be replaced
      with a Spring Boot API call.
    */

    window.setTimeout(
      () => {

        onSubmit({

          employeeId,

          leaveType,

          startDate,

          endDate,

          totalDays,

          reason:
            reason.trim()

        });


        /* Reset Form */

        setEmployeeId("");

        setLeaveType(
          "Annual Leave"
        );

        setStartDate("");

        setEndDate("");

        setReason("");

        setError("");

        setLoading(false);

      },
      450
    );
  }


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
          New Request
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
          Apply for Leave
        </h2>


        <p
          className="
            mt-1
            text-xs
            leading-5
            text-slate-500
          "
        >
          Submit an employee leave
          request for HR approval.
        </p>

      </div>


      {/* =====================================
          FORM
      ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          p-6
        "
      >

        {/* ===================================
            ERROR
        ==================================== */}

        {
          error && (

            <div
              role="alert"
              className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                font-bold
                text-red-700
              "
            >
              {error}
            </div>

          )
        }


        {/* ===================================
            MAIN FIELDS
        ==================================== */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >

          {/* =================================
              EMPLOYEE
          ================================== */}

          <FormField
            label="Employee"
            icon={
              <UserRound
                size={16}
              />
            }
          >

            <select
              value={employeeId}
              onChange={
                (event) => {

                  setEmployeeId(
                    event.target.value
                  );

                  setError("");
                }
              }
              className={inputClass}
            >

              <option value="">
                Select Employee
              </option>


              {
                activeEmployees.map(
                  (employee) => (

                    <option
                      key={
                        employee.id
                      }
                      value={
                        employee.id
                      }
                    >
                      {employee.id} - {employee.name}
                    </option>

                  )
                )
              }

            </select>

          </FormField>


          {/* =================================
              LEAVE TYPE
          ================================== */}

          <FormField
            label="Leave Type"
            icon={
              <CalendarDays
                size={16}
              />
            }
          >

            <select
              value={leaveType}
              onChange={
                (event) => {

                  setLeaveType(
                    event.target
                      .value as LeaveType
                  );

                  setError("");
                }
              }
              className={inputClass}
            >

              {
                leaveTypes.map(
                  (type) => (

                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>

                  )
                )
              }

            </select>

          </FormField>


          {/* =================================
              START DATE
          ================================== */}

          <FormField
            label="Start Date"
            icon={
              <CalendarDays
                size={16}
              />
            }
          >

            <input
              type="date"
              value={startDate}
              onChange={
                (event) => {

                  const value =
                    event.target.value;


                  setStartDate(
                    value
                  );


                  /*
                    If the current end date
                    becomes earlier than
                    the start date, reset it.
                  */

                  if (
                    endDate &&
                    value >
                      endDate
                  ) {

                    setEndDate("");
                  }


                  setError("");
                }
              }
              className={inputClass}
            />

          </FormField>


          {/* =================================
              END DATE
          ================================== */}

          <FormField
            label="End Date"
            icon={
              <CalendarDays
                size={16}
              />
            }
          >

            <input
              type="date"
              value={endDate}
              min={
                startDate ||
                undefined
              }
              onChange={
                (event) => {

                  setEndDate(
                    event.target.value
                  );

                  setError("");
                }
              }
              className={inputClass}
            />

          </FormField>

        </div>


        {/* ===================================
            LEAVE DURATION
        ==================================== */}

        {
          totalDays > 0 && (

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-blue-100
                bg-blue-50
                px-4
                py-4
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    text-blue-700
                  "
                >
                  Leave Duration
                </p>


                <p
                  className="
                    mt-1
                    text-xs
                    text-blue-600
                  "
                >
                  Calculated automatically
                  from selected dates.
                </p>

              </div>


              <div
                className="
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-center
                  shadow-sm
                "
              >

                <p
                  className="
                    text-xl
                    font-black
                    text-blue-950
                  "
                >
                  {totalDays}
                </p>


                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wide
                    text-blue-500
                  "
                >
                  {
                    totalDays === 1
                      ? "Day"
                      : "Days"
                  }
                </p>

              </div>

            </div>

          )
        }


        {/* ===================================
            REASON
        ==================================== */}

        <div
          className="
            mt-5
          "
        >

          <FormField
            label="Reason for Leave"
            icon={
              <FileText
                size={16}
              />
            }
          >

            <textarea
              value={reason}
              onChange={
                (event) => {

                  setReason(
                    event.target.value
                  );

                  setError("");
                }
              }
              rows={4}
              maxLength={500}
              placeholder="Enter reason for leave..."
              className={`
                ${inputClass}
                resize-none
              `}
            />

          </FormField>


          <div
            className="
              mt-2
              text-right
              text-[10px]
              font-semibold
              text-slate-400
            "
          >
            {reason.length}/500
          </div>

        </div>


        {/* ===================================
            SUBMIT BUTTON
        ==================================== */}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            px-5
            py-3.5
            text-sm
            font-black
            text-white
            shadow-lg
            shadow-blue-600/20
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-blue-700
            hover:to-indigo-700
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >

          {
            loading
              ? (
                <>

                  <Loader2
                    size={18}
                    className="
                      animate-spin
                    "
                  />

                  Submitting Request...

                </>
              )
              : (
                <>

                  <Send
                    size={17}
                  />

                  Submit Leave Request

                </>
              )
          }

        </button>

      </form>

    </section>
  );
}


/* ==========================================
   REUSABLE FORM FIELD

   TypeScript 6:
   ReactNode is imported directly.
========================================== */

interface FormFieldProps {

  label: string;

  icon: ReactNode;

  children: ReactNode;
}


function FormField({
  label,
  icon,
  children
}: FormFieldProps) {

  return (

    <div>

      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-sm
          font-bold
          text-slate-700
        "
      >

        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            bg-blue-50
            text-blue-600
          "
        >
          {icon}
        </span>


        {label}

      </label>


      {children}

    </div>
  );
}


/* ==========================================
   COMMON INPUT STYLE
========================================== */

const inputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3
  text-sm
  text-slate-700
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  hover:border-slate-300
  focus:border-blue-500
  focus:bg-white
  focus:ring-4
  focus:ring-blue-500/10
`;


export default LeaveForm;
