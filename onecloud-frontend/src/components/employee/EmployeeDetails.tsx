import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  IdCard,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  UserCheck
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";

import type {
  EmployeeRecord
} from "../../types/employee";

import EmployeeAvatar
  from "./EmployeeAvatar";


interface EmployeeDetailsProps {
  employee: EmployeeRecord;
}


function EmployeeDetails({
  employee
}: EmployeeDetailsProps) {

  return (
    <div
      className="
        space-y-6
      "
    >

      {/* =====================================
          PROFILE HEADER
      ====================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-indigo-950
          p-6
          text-white
          shadow-xl
          sm:p-8
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-28
            h-72
            w-72
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />


        <div
          className="
            relative
            z-10
          "
        >

          <Link
            to={ROUTES.EMPLOYEES}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2.5
              text-xs
              font-black
              text-slate-200
              transition
              hover:bg-white/10
            "
          >
            <ArrowLeft
              size={15}
            />

            Employee Directory
          </Link>


          <div
            className="
              mt-7
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
              "
            >

              <EmployeeAvatar
                name={employee.name}
                photo={employee.photo}
                size="xl"
                className="
                  ring-4
                  ring-white/10
                "
              />


              <div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      rounded-full
                      bg-blue-500/15
                      px-3
                      py-1.5
                      font-mono
                      text-[10px]
                      font-black
                      text-blue-200
                    "
                  >
                    {employee.id}
                  </span>


                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1.5
                      text-[10px]
                      font-black

                      ${
                        employee.status ===
                        "Active"
                          ? `
                            bg-emerald-400/15
                            text-emerald-300
                          `
                          : `
                            bg-slate-400/15
                            text-slate-300
                          `
                      }
                    `}
                  >

                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full

                        ${
                          employee.status ===
                          "Active"
                            ? "bg-emerald-400"
                            : "bg-slate-400"
                        }
                      `}
                    />

                    {employee.status}

                  </span>

                </div>


                <h1
                  className="
                    mt-3
                    text-3xl
                    font-black
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  {employee.name}
                </h1>


                <p
                  className="
                    mt-2
                    text-sm
                    font-medium
                    text-blue-200
                  "
                >
                  {
                    employee.designation
                  }
                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-400
                  "
                >
                  {
                    employee.department
                  }
                </p>

              </div>

            </div>


            <Link
              to={
                ROUTES.EMPLOYEE_MANAGEMENT
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-black
                text-white
                shadow-lg
                transition
                hover:bg-blue-500
              "
            >
              <Pencil
                size={16}
              />

              Manage Employee
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================
          DETAILS GRID
      ====================================== */}

      <section
        className="
          grid
          gap-5
          lg:grid-cols-3
        "
      >

        {/* Main Information */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            lg:col-span-2
          "
        >

          <SectionHeading
            title="Employee Information"
            description="Employment and contact details"
          />


          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
            "
          >

            <DetailItem
              icon={IdCard}
              label="Employee ID"
              value={employee.id}
            />

            <DetailItem
              icon={UserCheck}
              label="Status"
              value={employee.status}
            />

            <DetailItem
              icon={Building2}
              label="Department"
              value={
                employee.department
              }
            />

            <DetailItem
              icon={
                BriefcaseBusiness
              }
              label="Designation"
              value={
                employee.designation
              }
            />

            <DetailItem
              icon={Mail}
              label="Email Address"
              value={employee.email}
            />

            <DetailItem
              icon={Phone}
              label="Mobile Number"
              value={employee.phone}
            />

            <DetailItem
              icon={CalendarDays}
              label="Joining Date"
              value={
                formatDate(
                  employee.joiningDate
                )
              }
            />

          </div>

        </div>


        {/* Employment Summary */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >

          <SectionHeading
            title="Employment Summary"
            description="OneCloud workforce profile"
          />


          <div
            className="
              mt-6
              space-y-4
            "
          >

            <SummaryItem
              label="Current Status"
              value={employee.status}
            />

            <SummaryItem
              label="Department"
              value={
                employee.department
              }
            />

            <SummaryItem
              label="Role"
              value={
                employee.designation
              }
            />

            <SummaryItem
              label="Joined"
              value={
                formatDate(
                  employee.joiningDate
                )
              }
            />

          </div>


          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              p-4
            "
          >

            <ShieldCheck
              size={19}
              className="
                mt-0.5
                shrink-0
                text-blue-600
              "
            />


            <div>

              <p
                className="
                  text-xs
                  font-black
                  text-blue-900
                "
              >
                OneCloud Employee Record
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-blue-700
                "
              >
                This profile uses the
                shared employee record
                maintained by AppContext.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* ==========================================
   DETAILS ITEM
========================================== */

interface DetailItemProps {
  icon: typeof IdCard;
  label: string;
  value: string;
}


function DetailItem({
  icon: Icon,
  label,
  value
}: DetailItemProps) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-4
      "
    >

      <div
        className="
          flex
          items-start
          gap-3
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white
            text-blue-600
            shadow-sm
          "
        >
          <Icon size={17} />
        </div>


        <div
          className="
            min-w-0
          "
        >

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              break-words
              text-sm
              font-black
              text-slate-800
            "
          >
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}


/* ==========================================
   SECTION HEADING
========================================== */

interface SectionHeadingProps {
  title: string;
  description: string;
}


function SectionHeading({
  title,
  description
}: SectionHeadingProps) {

  return (
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
        HRMS
      </p>

      <h2
        className="
          mt-1
          text-xl
          font-black
          text-slate-950
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-1
          text-xs
          text-slate-500
        "
      >
        {description}
      </p>

    </div>
  );
}


/* ==========================================
   SUMMARY
========================================== */

interface SummaryItemProps {
  label: string;
  value: string;
}


function SummaryItem({
  label,
  value
}: SummaryItemProps) {

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-slate-100
        pb-4
        last:border-0
      "
    >

      <span
        className="
          text-xs
          font-semibold
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
          text-right
          text-xs
          font-black
          text-slate-800
        "
      >
        {value}
      </span>

    </div>
  );
}


function formatDate(
  value: string
) {

  if (!value) {
    return "Not Available";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  ).format(
    new Date(
      `${value}T00:00:00`
    )
  );
}


export default EmployeeDetails;
