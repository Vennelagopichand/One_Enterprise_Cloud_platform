import {
  ArrowLeft,
  SearchX
} from "lucide-react";

import {
  Link,
  useParams
} from "react-router-dom";

import EmployeeDetails
  from "../components/employee/EmployeeDetails";

import {
  ROUTES
} from "../constants/routes";

import {
  useAppContext
} from "../hooks/useAppContext";


function EmployeeDetailsPage() {

  const {
    id
  } = useParams<{
    id: string;
  }>();


  const {
    getEmployeeById
  } = useAppContext();


  const employee =
    id
      ? getEmployeeById(id)
      : undefined;


  if (!employee) {

    return (
      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          px-6
          py-16
          text-center
          shadow-sm
        "
      >

        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-red-500
          "
        >
          <SearchX
            size={27}
          />
        </div>


        <h1
          className="
            mt-5
            text-2xl
            font-black
            text-slate-950
          "
        >
          Employee not found
        </h1>


        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          The employee record you
          requested does not exist or
          may have been deleted.
        </p>


        <Link
          to={ROUTES.EMPLOYEES}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-black
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <ArrowLeft size={16} />

          Employee Directory
        </Link>

      </section>
    );
  }


  return (
    <EmployeeDetails
      employee={employee}
    />
  );
}


export default EmployeeDetailsPage;
