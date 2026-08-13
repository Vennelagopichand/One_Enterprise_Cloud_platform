import {
  useState,
  type ComponentType,
  type FormEvent,
  type ReactNode
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  IdCard,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  RotateCcw,
  UserRound,
  UserRoundPlus
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  DEPARTMENTS
} from "../../constants/departments";

import {
  ROUTES
} from "../../constants/routes";

import type {
  Employee,
  EmployeeRegistrationForm,
  StoredRegisteredEmployee
} from "../../types/employee";


/* ==========================================
   INITIAL FORM DATA
========================================== */

const INITIAL_FORM: EmployeeRegistrationForm = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  department: "",
  designation: "",
  joiningDate: "",
  password: "",
  confirmPassword: ""
};


/* ==========================================
   LOCAL STORAGE KEY
========================================== */

const STORAGE_KEY =
  "onecloud_registered_employees";


/* ==========================================
   REUSABLE INPUT CLASS
========================================== */

const inputClass = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-3.5
  text-sm
  text-slate-900
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  hover:border-slate-300
  focus:border-blue-500
  focus:ring-4
  focus:ring-blue-500/10
`;


/* ==========================================
   REGISTRATION FORM
========================================== */

function RegistrationForm() {

  const navigate =
    useNavigate();


  /* ========================================
     FORM STATE
  ======================================== */

  const [
    form,
    setForm
  ] = useState<EmployeeRegistrationForm>(
    INITIAL_FORM
  );


  const [
    error,
    setError
  ] = useState("");


  const [
    success,
    setSuccess
  ] = useState("");


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    showPassword,
    setShowPassword
  ] = useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);


  /* ========================================
     UPDATE FORM FIELD
  ======================================== */

  function updateField(
    field: keyof EmployeeRegistrationForm,
    value: string
  ) {

    setForm(
      (current) => ({
        ...current,
        [field]: value
      })
    );


    if (error) {
      setError("");
    }


    if (success) {
      setSuccess("");
    }
  }


  /* ========================================
     VALIDATE FORM
  ======================================== */

  function validateForm(): boolean {

    /* Employee ID */

    if (!form.id.trim()) {

      setError(
        "Please enter an Employee ID."
      );

      return false;
    }


    if (
      form.id.trim().length < 4
    ) {

      setError(
        "Employee ID must contain at least 4 characters."
      );

      return false;
    }


    /* Employee Name */

    if (!form.name.trim()) {

      setError(
        "Please enter the employee's full name."
      );

      return false;
    }


    if (
      form.name.trim().length < 3
    ) {

      setError(
        "Employee name must contain at least 3 characters."
      );

      return false;
    }


    /* Email */

    if (!form.email.trim()) {

      setError(
        "Please enter an email address."
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
        "Please enter a valid email address."
      );

      return false;
    }


    /* Mobile */

    if (!form.mobile.trim()) {

      setError(
        "Please enter a mobile number."
      );

      return false;
    }


    const mobilePattern =
      /^[0-9]{10}$/;


    if (
      !mobilePattern.test(
        form.mobile.trim()
      )
    ) {

      setError(
        "Mobile number must contain exactly 10 digits."
      );

      return false;
    }


    /* Department */

    if (!form.department) {

      setError(
        "Please select a department."
      );

      return false;
    }


    /* Designation */

    if (!form.designation.trim()) {

      setError(
        "Please enter a designation."
      );

      return false;
    }


    /* Joining Date */

    if (!form.joiningDate) {

      setError(
        "Please select the joining date."
      );

      return false;
    }


    /* Password */

    if (!form.password) {

      setError(
        "Please enter a password."
      );

      return false;
    }


    if (
      form.password.length < 8
    ) {

      setError(
        "Password must contain at least 8 characters."
      );

      return false;
    }


    /* Confirm Password */

    if (!form.confirmPassword) {

      setError(
        "Please confirm the password."
      );

      return false;
    }


    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Password and Confirm Password do not match."
      );

      return false;
    }


    return true;
  }


  /* ========================================
     READ EMPLOYEES FROM LOCAL STORAGE
  ======================================== */

  function getStoredEmployees():
    StoredRegisteredEmployee[] {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (!saved) {
      return [];
    }


    try {

      return JSON.parse(
        saved
      ) as StoredRegisteredEmployee[];

    } catch (storageError) {

      console.error(
        "Unable to read registered employees.",
        storageError
      );

      return [];
    }
  }


  /* ========================================
     REGISTER EMPLOYEE
  ======================================== */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    setError("");
    setSuccess("");


    if (!validateForm()) {
      return;
    }


    const registeredEmployees =
      getStoredEmployees();


    /* Normalize ID */

    const employeeId =
      form.id
        .trim()
        .toUpperCase();


    /* Normalize Email */

    const email =
      form.email
        .trim()
        .toLowerCase();


    /* ======================================
       DUPLICATE EMPLOYEE ID
    ====================================== */

    const duplicateId =
      registeredEmployees.some(
        (employee) =>
          employee.id
            .toUpperCase() ===
          employeeId
      );


    if (duplicateId) {

      setError(
        "An employee with this Employee ID is already registered."
      );

      return;
    }


    /* ======================================
       DUPLICATE EMAIL
    ====================================== */

    const duplicateEmail =
      registeredEmployees.some(
        (employee) =>
          employee.email
            .toLowerCase() ===
          email
      );


    if (duplicateEmail) {

      setError(
        "An employee with this email address is already registered."
      );

      return;
    }


    setLoading(true);


    /* ======================================
       BASIC EMPLOYEE MODEL

       Required by React Task 2
    ====================================== */

    const employee: Employee = {

      id: employeeId,

      name:
        form.name.trim(),

      email,

      department:
        form.department,

      designation:
        form.designation.trim()
    };


    /* ======================================
       ADDITIONAL EMPLOYEE INFORMATION
    ====================================== */

    const registeredEmployee:
      StoredRegisteredEmployee = {

      ...employee,

      mobile:
        form.mobile.trim(),

      joiningDate:
        form.joiningDate
    };


    /*
      Frontend-only simulation.

      Later when Spring Boot API is added,
      this setTimeout/localStorage logic
      can be replaced with an API request.
    */

    window.setTimeout(
      () => {

        const updatedEmployees = [
          ...registeredEmployees,
          registeredEmployee
        ];


        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            updatedEmployees
          )
        );


        setLoading(false);


        setSuccess(
          "Employee registration completed successfully."
        );


        /*
          Reset form after registration.
        */

        setForm(
          INITIAL_FORM
        );


        setShowPassword(false);

        setShowConfirmPassword(false);


        /*
          Redirect to login.
        */

        window.setTimeout(
          () => {

            navigate(
              ROUTES.LOGIN
            );

          },
          1400
        );

      },
      650
    );
  }


  /* ========================================
     RESET FORM
  ======================================== */

  function handleReset() {

    setForm(
      INITIAL_FORM
    );

    setError("");

    setSuccess("");

    setLoading(false);

    setShowPassword(false);

    setShowConfirmPassword(false);
  }


  /* ========================================
     FORM UI
  ======================================== */

  return (

    <form
      onSubmit={handleSubmit}
      className="
        space-y-7
      "
    >

      {/* ===================================
          ERROR MESSAGE
      ==================================== */}

      {
        error && (

          <div
            role="alert"
            className="
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              font-medium
              text-red-700
              shadow-sm
            "
          >

            <AlertCircle
              size={20}
              className="
                mt-0.5
                shrink-0
              "
            />


            <div>

              <p
                className="
                  font-bold
                "
              >
                Registration Error
              </p>

              <p
                className="
                  mt-1
                "
              >
                {error}
              </p>

            </div>

          </div>

        )
      }


      {/* ===================================
          SUCCESS MESSAGE
      ==================================== */}

      {
        success && (

          <div
            role="status"
            className="
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              p-4
              text-sm
              font-semibold
              text-emerald-700
              shadow-sm
            "
          >

            <CheckCircle2
              size={20}
              className="
                mt-0.5
                shrink-0
              "
            />


            <div>

              <p>
                {success}
              </p>


              <p
                className="
                  mt-1
                  text-xs
                  font-normal
                  text-emerald-600
                "
              >
                Redirecting to login...
              </p>

            </div>

          </div>

        )
      }


      {/* ===================================
          EMPLOYEE INFORMATION
      ==================================== */}

      <section>

        <SectionTitle
          number="01"
          title="Employee Information"
          description="Enter the basic identity and contact information for the employee."
        />


        <div
          className="
            mt-6
            grid
            gap-5
            md:grid-cols-2
          "
        >

          {/* Employee ID */}

          <FormField
            label="Employee ID"
            htmlFor="employeeId"
            icon={IdCard}
          >

            <input
              id="employeeId"
              name="employeeId"
              type="text"
              value={form.id}
              onChange={
                (event) =>
                  updateField(
                    "id",
                    event.target.value
                  )
              }
              placeholder="Example: EMP101"
              autoComplete="off"
              className={inputClass}
            />

          </FormField>


          {/* Full Name */}

          <FormField
            label="Full Name"
            htmlFor="employeeName"
            icon={UserRound}
          >

            <input
              id="employeeName"
              name="employeeName"
              type="text"
              value={form.name}
              onChange={
                (event) =>
                  updateField(
                    "name",
                    event.target.value
                  )
              }
              placeholder="Enter employee full name"
              autoComplete="name"
              className={inputClass}
            />

          </FormField>


          {/* Email */}

          <FormField
            label="Email Address"
            htmlFor="employeeEmail"
            icon={Mail}
          >

            <input
              id="employeeEmail"
              name="employeeEmail"
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
              autoComplete="email"
              className={inputClass}
            />

          </FormField>


          {/* Mobile */}

          <FormField
            label="Mobile Number"
            htmlFor="mobile"
            icon={Phone}
          >

            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.mobile}
              onChange={
                (event) => {

                  const numericValue =
                    event.target.value.replace(
                      /\D/g,
                      ""
                    );


                  updateField(
                    "mobile",
                    numericValue
                  );
                }
              }
              placeholder="9876543210"
              autoComplete="tel"
              className={inputClass}
            />

          </FormField>

        </div>

      </section>


      {/* Divider */}

      <div
        className="
          h-px
          bg-gradient-to-r
          from-transparent
          via-slate-200
          to-transparent
        "
      />


      {/* ===================================
          EMPLOYMENT INFORMATION
      ==================================== */}

      <section>

        <SectionTitle
          number="02"
          title="Employment Information"
          description="Select the employee department, role and joining date."
        />


        <div
          className="
            mt-6
            grid
            gap-5
            md:grid-cols-2
          "
        >

          {/* Department */}

          <FormField
            label="Department"
            htmlFor="department"
            icon={Building2}
          >

            <select
              id="department"
              name="department"
              value={form.department}
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
            htmlFor="designation"
            icon={BriefcaseBusiness}
          >

            <input
              id="designation"
              name="designation"
              type="text"
              value={form.designation}
              onChange={
                (event) =>
                  updateField(
                    "designation",
                    event.target.value
                  )
              }
              placeholder="Example: Frontend Developer"
              autoComplete="organization-title"
              className={inputClass}
            />

          </FormField>


          {/* Joining Date */}

          <div
            className="
              md:col-span-2
            "
          >

            <FormField
              label="Date of Joining"
              htmlFor="joiningDate"
              icon={CalendarDays}
            >

              <input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={form.joiningDate}
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

          </div>

        </div>

      </section>


      {/* Divider */}

      <div
        className="
          h-px
          bg-gradient-to-r
          from-transparent
          via-slate-200
          to-transparent
        "
      />


      {/* ===================================
          ACCOUNT SECURITY
      ==================================== */}

      <section>

        <SectionTitle
          number="03"
          title="Account Security"
          description="Create a secure password for the OneCloud employee account."
        />


        <div
          className="
            mt-6
            grid
            gap-5
            md:grid-cols-2
          "
        >

          {/* Password */}

          <div>

            <label
              htmlFor="registerPassword"
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

              <LockKeyhole
                size={16}
                className="
                  text-blue-600
                "
              />

              Password

            </label>


            <div
              className="
                relative
              "
            >

              <input
                id="registerPassword"
                name="registerPassword"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={form.password}
                onChange={
                  (event) =>
                    updateField(
                      "password",
                      event.target.value
                    )
                }
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className={`
                  ${inputClass}
                  pr-12
                `}
              />


              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {
                  showPassword
                    ? (
                      <EyeOff
                        size={18}
                      />
                    )
                    : (
                      <Eye
                        size={18}
                      />
                    )
                }

              </button>

            </div>

          </div>


          {/* Confirm Password */}

          <div>

            <label
              htmlFor="confirmPassword"
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

              <LockKeyhole
                size={16}
                className="
                  text-blue-600
                "
              />

              Confirm Password

            </label>


            <div
              className="
                relative
              "
            >

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={form.confirmPassword}
                onChange={
                  (event) =>
                    updateField(
                      "confirmPassword",
                      event.target.value
                    )
                }
                placeholder="Re-enter password"
                autoComplete="new-password"
                className={`
                  ${inputClass}
                  pr-12
                `}
              />


              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) =>
                      !current
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >

                {
                  showConfirmPassword
                    ? (
                      <EyeOff
                        size={18}
                      />
                    )
                    : (
                      <Eye
                        size={18}
                      />
                    )
                }

              </button>

            </div>

          </div>

        </div>


        {/* Password Information */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-blue-100
            bg-blue-50/70
            p-4
          "
        >

          <div
            className="
              mt-0.5
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-blue-100
              text-blue-600
            "
          >

            <LockKeyhole
              size={15}
            />

          </div>


          <div>

            <p
              className="
                text-xs
                font-black
                text-slate-700
              "
            >
              Password Security
            </p>


            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500
              "
            >
              Use at least 8 characters.
              When the Spring Boot backend is
              connected, authentication and
              secure password storage will be
              handled server-side.
            </p>

          </div>

        </div>

      </section>


      {/* ===================================
          FORM BUTTONS
      ==================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-100
          pt-7
          sm:flex-row
        "
      >

        {/* Reset */}

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
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
            py-3.5
            text-sm
            font-black
            text-slate-700
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-slate-300
            hover:bg-slate-50
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:translate-y-0
          "
        >

          <RotateCcw
            size={18}
          />

          Reset Form

        </button>


        {/* Register */}

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            flex-[1.5]
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

                  Registering Employee...

                </>
              )
              : (
                <>

                  <UserRoundPlus
                    size={18}
                  />

                  Register Employee

                </>
              )
          }

        </button>

      </div>


      {/* ===================================
          LOGIN LINK
      ==================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-100
          bg-gradient-to-r
          from-slate-50
          to-blue-50/50
          px-5
          py-4
          text-center
        "
      >

        <p
          className="
            text-sm
            text-slate-500
          "
        >

          Already have a OneCloud account?

          {" "}

          <Link
            to={ROUTES.LOGIN}
            className="
              font-black
              text-blue-600
              transition
              hover:text-blue-800
            "
          >
            Sign in here
          </Link>

        </p>

      </div>

    </form>
  );
}


/* ==========================================
   REUSABLE FORM FIELD
========================================== */

interface FormFieldProps {

  label: string;

  htmlFor: string;

  icon: ComponentType<{
    size?: number;
    className?: string;
  }>;

  children: ReactNode;
}


function FormField({
  label,
  htmlFor,
  icon: Icon,
  children
}: FormFieldProps) {

  return (

    <div>

      <label
        htmlFor={htmlFor}
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

        <div
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

          <Icon
            size={15}
          />

        </div>

        {label}

      </label>


      {children}

    </div>
  );
}


/* ==========================================
   REUSABLE SECTION TITLE
========================================== */

interface SectionTitleProps {
  number: string;
  title: string;
  description: string;
}


function SectionTitle({
  number,
  title,
  description
}: SectionTitleProps) {

  return (

    <div
      className="
        flex
        items-start
        gap-4
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
          bg-slate-950
          text-xs
          font-black
          text-white
          shadow-md
        "
      >
        {number}
      </div>


      <div>

        <h2
          className="
            text-lg
            font-black
            tracking-tight
            text-slate-900
          "
        >
          {title}
        </h2>


        <p
          className="
            mt-1
            text-xs
            leading-5
            text-slate-500
          "
        >
          {description}
        </p>

      </div>

    </div>
  );
}


export default RegistrationForm;
