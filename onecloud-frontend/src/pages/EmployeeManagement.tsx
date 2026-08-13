import {
  CheckCircle2,
  UserCheck,
  UserPlus,
  Users,
  XCircle
} from "lucide-react";

import {
  useMemo,
  useState
} from "react";

import EmployeeForm
  from "../components/employee/EmployeeForm";

import EmployeeTable
  from "../components/employee/EmployeeTable";

import {
  useAppContext
} from "../hooks/useAppContext";

import type {
  EmployeeRecord
} from "../types/employee";


function EmployeeManagement() {

  const {

    employees,

    addEmployee,

    updateEmployee,

    deleteEmployee

  } = useAppContext();


  const [
    editingEmployee,
    setEditingEmployee
  ] =
    useState<EmployeeRecord | null>(
      null
    );


  const [
    search,
    setSearch
  ] = useState("");


  const [
    message,
    setMessage
  ] = useState("");


  /*
    Search employees.

    Array.filter() is used
    instead of DOM filtering.
  */
  const filteredEmployees =
    useMemo(
      () => {

        const query =
          search
            .trim()
            .toLowerCase();


        if (!query) {
          return employees;
        }


        return employees.filter(
          (employee) => {

            return (

              employee.id
                .toLowerCase()
                .includes(query)

              ||

              employee.name
                .toLowerCase()
                .includes(query)

              ||

              employee.department
                .toLowerCase()
                .includes(query)

              ||

              employee.designation
                .toLowerCase()
                .includes(query)

              ||

              employee.email
                .toLowerCase()
                .includes(query)

            );
          }
        );

      },
      [
        employees,
        search
      ]
    );


  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status ===
        "Active"
    ).length;


  const inactiveEmployees =
    employees.length -
    activeEmployees;


  /*
    CREATE / UPDATE
  */
  function handleSave(
    employee: EmployeeRecord
  ) {

    if (
      editingEmployee
    ) {

      updateEmployee(
        employee
      );


      setMessage(
        `${employee.name} was updated successfully.`
      );


      setEditingEmployee(
        null
      );

    } else {

      addEmployee(
        employee
      );


      setMessage(
        `${employee.name} was added successfully.`
      );
    }


    window.setTimeout(
      () => {

        setMessage("");

      },
      3000
    );
  }


  /*
    EDIT
  */
  function handleEdit(
    employee: EmployeeRecord
  ) {

    setEditingEmployee(
      employee
    );


    setMessage("");


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /*
    DELETE
  */
  function handleDelete(
    employeeId: string
  ) {

    const employee =
      employees.find(
        (item) =>
          item.id ===
          employeeId
      );


    if (!employee) {
      return;
    }


    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${employee.name}?`
      );


    if (!confirmed) {
      return;
    }


    deleteEmployee(
      employeeId
    );


    /*
      If deleted employee
      was being edited.
    */
    if (
      editingEmployee?.id ===
      employeeId
    ) {

      setEditingEmployee(
        null
      );
    }


    setMessage(
      `${employee.name} was deleted successfully.`
    );


    window.setTimeout(
      () => {

        setMessage("");

      },
      3000
    );
  }


  return (

    <div
      className="
        space-y-7
      "
    >

      {/* =====================================
          PAGE HEADER
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
          "
        >

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
            Employee Management
          </h1>


          <p
            className="
              mt-3
              max-w-3xl
              text-sm
              leading-7
              text-slate-300
            "
          >
            Create, view, update and
            delete employee records using
            React state and reusable
            TypeScript components.
          </p>

        </div>

      </section>


      {/* =====================================
          SUMMARY CARDS
      ====================================== */}

      <section
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        <SummaryCard
          title="Total Employees"
          value={
            employees.length
          }
          icon={Users}
          color="blue"
        />


        <SummaryCard
          title="Active Employees"
          value={
            activeEmployees
          }
          icon={UserCheck}
          color="green"
        />


        <SummaryCard
          title="Inactive"
          value={
            inactiveEmployees
          }
          icon={XCircle}
          color="orange"
        />


        <SummaryCard
          title="Displayed Records"
          value={
            filteredEmployees.length
          }
          icon={UserPlus}
          color="purple"
        />

      </section>


      {/* =====================================
          SUCCESS MESSAGE
      ====================================== */}

      {
        message && (

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              px-5
              py-4
              text-sm
              font-bold
              text-emerald-700
            "
          >

            <CheckCircle2
              size={19}
            />

            {message}

          </div>

        )
      }


      {/* =====================================
          FORM + INFO
      ====================================== */}

      <EmployeeForm
        editingEmployee={
          editingEmployee
        }
        employees={
          employees
        }
        onSave={
          handleSave
        }
        onCancelEdit={
          () =>
            setEditingEmployee(
              null
            )
        }
      />


      {/* =====================================
          TABLE
      ====================================== */}

      <EmployeeTable
        employees={
          filteredEmployees
        }
        search={search}
        onSearchChange={
          setSearch
        }
        onEdit={
          handleEdit
        }
        onDelete={
          handleDelete
        }
      />

    </div>
  );
}


/* ==========================================
   SUMMARY CARD
========================================== */

interface SummaryCardProps {

  title: string;

  value: number;

  icon:
    React.ComponentType<{
      size?: number;
    }>;

  color:
    | "blue"
    | "green"
    | "orange"
    | "purple";
}


const summaryColors = {

  blue:
    "bg-blue-50 text-blue-600",

  green:
    "bg-emerald-50 text-emerald-600",

  orange:
    "bg-orange-50 text-orange-600",

  purple:
    "bg-purple-50 text-purple-600"
};


function SummaryCard({
  title,
  value,
  icon: Icon,
  color
}: SummaryCardProps) {

  return (

    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div
        className="
          flex
          items-center
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
            {title}
          </p>


          <p
            className="
              mt-2
              text-3xl
              font-black
              text-slate-950
            "
          >
            {value}
          </p>

        </div>


        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${
              summaryColors[
                color
              ]
            }
          `}
        >

          <Icon
            size={21}
          />

        </div>

      </div>

    </article>
  );
}


export default EmployeeManagement;