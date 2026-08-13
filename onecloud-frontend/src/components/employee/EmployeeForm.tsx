import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  IdCard,
  Mail,
  Phone,
  RotateCcw,
  Save,
  UserRound
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent
} from "react";

import {
  DEPARTMENTS
} from "../../constants/departments";

import type {
  EmployeeFormData,
  EmployeeRecord
} from "../../types/employee";


interface EmployeeFormProps {

  editingEmployee:
    EmployeeRecord | null;

  employees:
    EmployeeRecord[];

  onSave:
    (
      employee: EmployeeRecord
    ) => void;

  onCancelEdit:
    () => void;
}


const EMPTY_FORM:
  EmployeeFormData = {

    id: "",

    name: "",

    email: "",

    department: "",

    designation: "",

    phone: "",

    joiningDate: "",

    status: "Active"
  };


function EmployeeForm({
  editingEmployee,
  employees,
  onSave,
  onCancelEdit
}: EmployeeFormProps) {

  const [
    form,
    setForm
  ] =
    useState<EmployeeFormData>(
      EMPTY_FORM
    );


  const [
    error,
    setError
  ] = useState("");


  /*
    If Edit is clicked,
    populate existing data.
  */
  useEffect(
    () => {

      if (
        editingEmployee
      ) {

        setForm({
          id:
            editingEmployee.id,

          name:
            editingEmployee.name,

          email:
            editingEmployee.email,

          department:
            editingEmployee.department,

          designation:
            editingEmployee.designation,

          phone:
            editingEmployee.phone,

          joiningDate:
            editingEmployee.joiningDate,

          status:
            editingEmployee.status
        });

      } else {

        setForm(
          EMPTY_FORM
        );
      }


      setError("");

    },
    [
      editingEmployee
    ]
  );


  function updateField(
    field: keyof EmployeeFormData,
    value: string
  ) {

    setForm(
      (current) => ({
        ...current,
        [field]: value
      }) as EmployeeFormData
    );


    if (error) {
      setError("");
    }
  }


  function validateForm():
    boolean {

    if (!form.id.trim()) {

      setError(
        "Employee ID is required."
      );

      return false;
    }


    if (!form.name.trim()) {

      setError(
        "Employee name is required."
      );

      return false;
    }


    if (!form.email.trim()) {

      setError(
        "Employee email is required."
      );

      return false;
    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailPattern.test(
        form.email.trim()
      )
    ) {

      setError(
        "Enter a valid email address."
      );

      return false;
    }


    if (!form.department) {

      setError(
        "Please select a department."
      );

      return false;
    }


    if (
      !form.designation.trim()
    ) {

      setError(
        "Designation is required."
      );

      return false;
    }


    if (!form.phone.trim()) {

      setError(
        "Phone number is required."
      );

      return false;
    }


    if (
      !/^[0-9]{10}$/.test(
        form.phone
      )
    ) {

      setError(
        "Phone number must contain exactly 10 digits."
      );

      return false;
    }


    if (!form.joiningDate) {

      setError(
        "Joining date is required."
      );

      return false;
    }


    /*
      Duplicate ID check
      only during CREATE.
    */
    if (
      !editingEmployee
    ) {

      const duplicate =
        employees.some(
          (employee) =>
            employee.id
              .toUpperCase() ===
            form.id
              .trim()
              .toUpperCase()
        );


      if (duplicate) {

        setError(
          "Employee ID already exists."
        );

        return false;
      }
    }


    /*
      Duplicate email check.
    */
    const duplicateEmail =
      employees.some(
        (employee) => {

          const sameEmployee =
            editingEmployee &&
            employee.id ===
              editingEmployee.id;


          if (sameEmployee) {
            return false;
          }


          return (
            employee.email
              .toLowerCase() ===
            form.email
              .trim()
              .toLowerCase()
          );
        }
      );


    if (duplicateEmail) {

      setError(
        "Employee email already exists."
      );

      return false;
    }


    return true;
  }


  function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    if (!validateForm()) {
      return;
    }


    const employee:
      EmployeeRecord = {

      id:
        editingEmployee
          ? editingEmployee.id
          : form.id
              .trim()
              .toUpperCase(),

      name:
        form.name.trim(),

      email:
        form.email
          .trim()
          .toLowerCase(),

      department:
        form.department,

      designation:
        form.designation.trim(),

      phone:
        form.phone.trim(),

      joiningDate:
        form.joiningDate,

      status:
        form.status,

      photo:
        editingEmployee?.photo
    };


    onSave(
      employee
    );


    setForm(
      EMPTY_FORM
    );


    setError("");
  }


  function handleReset() {

    if (
      editingEmployee
    ) {

      onCancelEdit();

      return;
    }


    setForm(
      EMPTY_FORM
    );

    setError("");
  }


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
          border-b
          border-slate-100
          px-6
          py-5
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
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-blue-600
              "
            >
              {
                editingEmployee
                  ? "Edit Employee"
                  : "New Employee"
              }
            </p>


            <h2
              className="
                mt-1
                text-xl
                font-black
                text-slate-950
              "
            >

              {
                editingEmployee
                  ? "Update Employee"
                  : "Add Employee"
              }

            </h2>


            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {
                editingEmployee
                  ? "Modify the selected employee information."
                  : "Enter employee information to create a new record."
              }
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

            {
              editingEmployee
                ? (
                  <Save
                    size={20}
                  />
                )
                : (
                  <UserRound
                    size={20}
                  />
                )
            }

          </div>

        </div>

      </div>


      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="
          p-6
        "
      >

        {
          error && (

            <div
              className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                font-semibold
                text-red-700
              "
            >
              {error}
            </div>

          )
        }


        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >

          {/* Employee ID */}

          <FormField
            label="Employee ID"
            icon={IdCard}
          >

            <input
              type="text"
              value={form.id}
              disabled={
                Boolean(
                  editingEmployee
                )
              }
              onChange={
                (event) =>
                  updateField(
                    "id",
                    event.target.value
                  )
              }
              placeholder="EMP109"
              className={`
                ${inputClass}

                ${
                  editingEmployee
                    ? `
                      cursor-not-allowed
                      bg-slate-100
                      text-slate-500
                    `
                    : ""
                }
              `}
            />

          </FormField>


          {/* Name */}

          <FormField
            label="Employee Name"
            icon={UserRound}
          >

            <input
              type="text"
              value={form.name}
              onChange={
                (event) =>
                  updateField(
                    "name",
                    event.target.value
                  )
              }
              placeholder="Employee full name"
              className={inputClass}
            />

          </FormField>


          {/* Department */}

          <FormField
            label="Department"
            icon={Building2}
          >

            <select
              value={
                form.department
              }
              onChange={
                (event) =>
                  updateField(
                    "department",
                    event.target.value
                  )
              }
              className={inputClass}
            >

              <option value="">
                Select Department
              </option>


              {
                DEPARTMENTS.map(
                  (department) => (

                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>

                  )
                )
              }

            </select>

          </FormField>


          {/* Designation */}

          <FormField
            label="Designation"
            icon={
              BriefcaseBusiness
            }
          >

            <input
              type="text"
              value={
                form.designation
              }
              onChange={
                (event) =>
                  updateField(
                    "designation",
                    event.target.value
                  )
              }
              placeholder="Frontend Developer"
              className={inputClass}
            />

          </FormField>


          {/* Email */}

          <FormField
            label="Email"
            icon={Mail}
          >

            <input
              type="email"
              value={form.email}
              onChange={
                (event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
              }
              placeholder="employee@onecloud.com"
              className={inputClass}
            />

          </FormField>


          {/* Phone */}

          <FormField
            label="Phone"
            icon={Phone}
          >

            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.phone}
              onChange={
                (event) => {

                  const value =
                    event.target.value
                      .replace(
                        /\D/g,
                        ""
                      );


                  updateField(
                    "phone",
                    value
                  );
                }
              }
              placeholder="9876543210"
              className={inputClass}
            />

          </FormField>


          {/* Joining Date */}

          <FormField
            label="Joining Date"
            icon={CalendarDays}
          >

            <input
              type="date"
              value={
                form.joiningDate
              }
              onChange={
                (event) =>
                  updateField(
                    "joiningDate",
                    event.target.value
                  )
              }
              className={inputClass}
            />

          </FormField>


          {/* Status */}

          <FormField
            label="Employee Status"
            icon={CheckCircle2}
          >

            <select
              value={form.status}
              onChange={
                (event) =>
                  updateField(
                    "status",
                    event.target.value
                  )
              }
              className={inputClass}
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </FormField>

        </div>


        {/* Buttons */}

        <div
          className="
            mt-7
            flex
            flex-col-reverse
            gap-3
            sm:flex-row
          "
        >

          <button
            type="button"
            onClick={handleReset}
            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-black
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >

            <RotateCcw
              size={17}
            />


            {
              editingEmployee
                ? "Cancel Edit"
                : "Reset"
            }

          </button>


          <button
            type="submit"
            className="
              inline-flex
              flex-[1.4]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-5
              py-3
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >

            <Save size={17} />


            {
              editingEmployee
                ? "Update Employee"
                : "Add Employee"
            }

          </button>

        </div>

      </form>

    </section>
  );
}


const inputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-3
  text-sm
  text-slate-900
  outline-none
  transition-all
  placeholder:text-slate-400
  hover:border-slate-300
  focus:border-blue-500
  focus:ring-4
  focus:ring-blue-500/10
`;


interface FormFieldProps {

  label: string;

  icon:
    React.ComponentType<{
      size?: number;
      className?: string;
    }>;

  children:
    React.ReactNode;
}


function FormField({
  label,
  icon: Icon,
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

        <Icon
          size={15}
          className="
            text-blue-600
          "
        />

        {label}

      </label>


      {children}

    </div>
  );
}


export default EmployeeForm;
