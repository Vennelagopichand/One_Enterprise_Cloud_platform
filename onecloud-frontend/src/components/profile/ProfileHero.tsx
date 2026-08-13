import {
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone
} from "lucide-react";

import type {
  EmployeeRecord
} from "../../types/employee";

import EmployeeAvatar
  from "../employee/EmployeeAvatar";


interface ProfileHeroProps {
  employee: EmployeeRecord;

  employees: EmployeeRecord[];

  onEmployeeChange:
    (employeeId: string) => void;
}


function ProfileHero({
  employee,
  employees,
  onEmployeeChange
}: ProfileHeroProps) {

  return (

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
        lg:p-10
      "
    >

      {/* Background decoration */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-28
          h-80
          w-80
          rounded-full
          bg-blue-500/20
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/3
          h-72
          w-72
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />


      <div
        className="
          relative
          z-10
        "
      >

        {/* Top */}

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.18em]
                text-blue-300
              "
            >
              OneCloud HRMS
            </p>


            <h1
              className="
                mt-2
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Employee Profile
            </h1>


            <p
              className="
                mt-2
                text-sm
                text-slate-300
              "
            >
              View employee information,
              attendance and leave history.
            </p>

          </div>


          {/* Employee Selector */}

          <div
            className="
              w-full
              lg:w-72
            "
          >

            <label
              htmlFor="profileEmployee"
              className="
                mb-2
                block
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                text-blue-200
              "
            >
              Select Employee
            </label>


            <select
              id="profileEmployee"
              value={employee.id}
              onChange={
                (event) =>
                  onEmployeeChange(
                    event.target.value
                  )
              }
              className="
                w-full
                rounded-xl
                border
                border-white/15
                bg-white/10
                px-4
                py-3
                text-sm
                font-bold
                text-white
                outline-none
                backdrop-blur
                transition
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-500/20
              "
            >

              {
                employees.map(
                  (item) => (

                    <option
                      key={item.id}
                      value={item.id}
                      className="
                        bg-slate-900
                        text-white
                      "
                    >
                      {item.id} - {item.name}
                    </option>

                  )
                )
              }

            </select>

          </div>

        </div>


        {/* Employee profile */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-6
            border-t
            border-white/10
            pt-8
            md:flex-row
            md:items-center
          "
        >

          <div
            className="
              shrink-0
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-2
              backdrop-blur
            "
          >

            <EmployeeAvatar
              name={employee.name}
              photo={employee.photo}
              size="xl"
            />

          </div>


          <div
            className="
              min-w-0
              flex-1
            "
          >

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  sm:text-3xl
                "
              >
                {employee.name}
              </h2>


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
                    employee.status === "Active"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-red-500/15 text-red-300"
                  }
                `}
              >

                <CheckCircle2
                  size={12}
                />

                {employee.status}

              </span>

            </div>


            <p
              className="
                mt-2
                font-mono
                text-xs
                font-bold
                text-blue-300
              "
            >
              {employee.id}
            </p>


            <div
              className="
                mt-5
                grid
                gap-3
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >

              <InfoItem
                icon={Building2}
                label="Department"
                value={employee.department}
              />


              <InfoItem
                icon={BriefcaseBusiness}
                label="Designation"
                value={employee.designation}
              />


              <InfoItem
                icon={Mail}
                label="Email"
                value={employee.email}
              />


              <InfoItem
                icon={Phone}
                label="Phone"
                value={employee.phone}
              />


              <InfoItem
                icon={CalendarDays}
                label="Joining Date"
                value={employee.joiningDate}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


interface InfoItemProps {
  icon: typeof Building2;
  label: string;
  value: string;
}


function InfoItem({
  icon: Icon,
  label,
  value
}: InfoItemProps) {

  return (

    <div
      className="
        flex
        items-start
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/5
        p-3
      "
    >

      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-500/15
          text-blue-300
        "
      >
        <Icon size={15} />
      </div>


      <div
        className="
          min-w-0
        "
      >

        <p
          className="
            text-[9px]
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
            truncate
            text-xs
            font-bold
            text-white
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}


export default ProfileHero;
