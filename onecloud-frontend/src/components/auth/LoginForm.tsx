import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  UserRound
} from "lucide-react";

import {
  useState,
  type FormEvent
} from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";

import {
  useAuth
} from "../../hooks/useAuth";


interface LocationState {
  from?: {
    pathname?: string;
  };
}


function LoginForm() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    login
  } = useAuth();


  const [
    employeeId,
    setEmployeeId
  ] = useState("");


  const [
    password,
    setPassword
  ] = useState("");


  const [
    rememberMe,
    setRememberMe
  ] = useState(false);


  const [
    showPassword,
    setShowPassword
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    loading,
    setLoading
  ] = useState(false);


  function validateForm():
    boolean {

    if (
      !employeeId.trim()
    ) {

      setError(
        "Please enter your Employee ID."
      );

      return false;
    }


    if (!password) {

      setError(
        "Please enter your password."
      );

      return false;
    }


    if (
      password.length < 6
    ) {

      setError(
        "Password must contain at least 6 characters."
      );

      return false;
    }


    setError("");

    return true;
  }


  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    if (!validateForm()) {
      return;
    }


    setLoading(true);

    setError("");


    /*
      Small simulated delay.

      Later API loading will
      naturally replace this.
    */

    window.setTimeout(
      () => {

        const result =
          login({
            employeeId,
            password,
            rememberMe
          });


        setLoading(false);


        if (!result.success) {

          setError(
            result.message
          );

          return;
        }


        const state =
          location.state as
            LocationState | null;


        const destination =
          state?.from?.pathname ||
          ROUTES.DASHBOARD;


        navigate(
          destination,
          {
            replace: true
          }
        );

      },
      500
    );
  }


  return (

    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
      "
    >

      {/* Error */}

      {
        error && (

          <div
            className="
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              text-red-700
            "
          >

            <AlertCircle
              size={19}
              className="
                mt-0.5
                shrink-0
              "
            />

            <span>
              {error}
            </span>

          </div>

        )
      }


      {/* Employee ID */}

      <div>

        <label
          htmlFor="employeeId"
          className="
            mb-2
            block
            text-sm
            font-bold
            text-slate-700
          "
        >
          Employee ID / Email
        </label>


        <div
          className="
            relative
          "
        >

          <UserRound
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />


          <input
            id="employeeId"
            name="employeeId"
            type="text"
            value={employeeId}
            onChange={
              (event) =>
                setEmployeeId(
                  event.target.value
                )
            }
            autoComplete="username"
            placeholder="Enter employee ID"
            className="
              h-13
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3.5
              pl-12
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              hover:border-slate-300
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

        </div>

      </div>


      {/* Password */}

      <div>

        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <label
            htmlFor="password"
            className="
              text-sm
              font-bold
              text-slate-700
            "
          >
            Password
          </label>


          <button
            type="button"
            onClick={() =>
              alert(
                "Forgot Password will be connected to the backend later."
              )
            }
            className="
              text-xs
              font-bold
              text-blue-600
              transition
              hover:text-blue-800
            "
          >
            Forgot Password?
          </button>

        </div>


        <div
          className="
            relative
          "
        >

          <LockKeyhole
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />


          <input
            id="password"
            name="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={
              (event) =>
                setPassword(
                  event.target.value
                )
            }
            autoComplete="current-password"
            placeholder="Enter password"
            className="
              h-13
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3.5
              pl-12
              pr-12
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              hover:border-slate-300
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
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
                ? <EyeOff size={18} />
                : <Eye size={18} />
            }

          </button>

        </div>

      </div>


      {/* Remember */}

      <label
        className="
          flex
          cursor-pointer
          items-center
          gap-3
          text-sm
          text-slate-600
        "
      >

        <input
          type="checkbox"
          checked={rememberMe}
          onChange={
            (event) =>
              setRememberMe(
                event.target.checked
              )
          }
          className="
            h-4
            w-4
            rounded
            border-slate-300
            accent-blue-600
          "
        />

        <span>
          Remember me on this device
        </span>

      </label>


      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          h-13
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
          transition
          hover:-translate-y-0.5
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0
        "
      >

        {
          loading ? (

            <>

              <Loader2
                size={18}
                className="
                  animate-spin
                "
              />

              Signing in...

            </>

          ) : (

            <>

              Sign In

              <ArrowRight
                size={18}
              />

            </>

          )
        }

      </button>


      {/* Registration */}

      <p
        className="
          pt-2
          text-center
          text-sm
          text-slate-500
        "
      >

        Don't have an employee account?

        {" "}

        <Link
          to={ROUTES.REGISTER}
          className="
            font-black
            text-blue-600
            transition
            hover:text-blue-800
          "
        >
          Register
        </Link>

      </p>

    </form>
  );
}


export default LoginForm;
