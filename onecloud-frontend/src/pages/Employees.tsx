import {
  Users
} from "lucide-react";

import {
  useSearchParams
} from "react-router-dom";

import EmployeeDirectory
  from "../components/employee/EmployeeDirectory";

import {
  useAppContext
} from "../hooks/useAppContext";


function Employees() {

  const {
    employees
  } = useAppContext();


  /*
    Header.tsx searches using:

    /employees?search=employeeName
  */
  const [
    searchParams
  ] = useSearchParams();


  const initialSearch =
    searchParams.get(
      "search"
    ) ?? "";


  return (
    <div
      className="
        space-y-7
      "
    >

      {/* =====================================
          PAGE BANNER
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
          px-6
          py-8
          text-white
          shadow-xl
          sm:px-8
          lg:px-10
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-32
            h-80
            w-80
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />


        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
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
                mt-3
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Employee Directory
            </h1>


            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-300
              "
            >
              Search, filter and explore
              employee information across
              your OneCloud organization.
            </p>

          </div>


          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-white/10
              text-blue-200
              backdrop-blur
            "
          >
            <Users
              size={25}
            />
          </div>

        </div>

      </section>


      <EmployeeDirectory
        employees={
          employees
        }
        initialSearch={
          initialSearch
        }
      />

    </div>
  );
}


export default Employees;
