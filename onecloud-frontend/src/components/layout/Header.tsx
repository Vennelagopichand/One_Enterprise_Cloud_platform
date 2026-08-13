import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  UserRound
} from "lucide-react";

import {
  useState
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";

import {
  useAuth
} from "../../hooks/useAuth";


interface HeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}


/*
  Convert the current URL
  into a readable page title.
*/
function getPageTitle(
  pathname: string
): string {

  if (
    pathname === ROUTES.DASHBOARD
  ) {
    return "Dashboard";
  }


  if (
    pathname === ROUTES.EMPLOYEES
  ) {
    return "Employee Directory";
  }


  if (
    pathname ===
    ROUTES.EMPLOYEE_MANAGEMENT
  ) {
    return "Employee Management";
  }


  if (
    pathname.startsWith(
      "/employees/"
    )
  ) {
    return "Employee Details";
  }


  if (
    pathname === ROUTES.ATTENDANCE
  ) {
    return "Attendance Management";
  }


  if (
    pathname === ROUTES.LEAVE
  ) {
    return "Leave Management";
  }


  if (
    pathname ===
    ROUTES.LEAVE_APPROVAL
  ) {
    return "Leave Approval";
  }


  if (
    pathname === ROUTES.PAYROLL
  ) {
    return "Payroll";
  }


  if (
    pathname === ROUTES.CRM
  ) {
    return "CRM";
  }


  if (
    pathname === ROUTES.FINANCE
  ) {
    return "Finance";
  }


  if (
    pathname === ROUTES.REPORTS
  ) {
    return "Reports & Analytics";
  }


  if (
    pathname === ROUTES.SETTINGS
  ) {
    return "Settings";
  }


  if (
    pathname === ROUTES.PROFILE
  ) {
    return "Employee Profile";
  }


  return "OneCloud";
}


function Header({
  onMenuClick,
  onLogout
}: HeaderProps) {

  const location =
    useLocation();


  const navigate =
    useNavigate();


  const {
    user
  } = useAuth();


  const [
    profileMenuOpen,
    setProfileMenuOpen
  ] = useState(false);


  const [
    searchValue,
    setSearchValue
  ] = useState("");


  /*
    Current page heading
  */
  const pageTitle =
    getPageTitle(
      location.pathname
    );


  /*
    Authenticated employee information
  */
  const userName =
    user?.name ??
    "Admin User";


  const userRole =
    user?.role ??
    "HR Administrator";


  const userEmail =
    user?.email ??
    "admin@onecloud.com";


  /*
    Generate initials.

    Example:
    Admin User -> AU
  */
  const initials =
    userName
      .trim()
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > 0
      )
      .map(
        (word) =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();


  /*
    Temporary search.

    Later we can connect this
    to employee/global search.
  */
  function handleSearchSubmit(
    event:
      React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    const search =
      searchValue.trim();


    if (!search) {
      return;
    }


    /*
      For now send the user to
      Employees.

      Later we can pass the
      search query to the
      employee directory.
    */
    navigate(
      `${ROUTES.EMPLOYEES}?search=${encodeURIComponent(
        search
      )}`
    );


    setSearchValue("");
  }


  return (

    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        gap-4
        border-b
        border-slate-200/80
        bg-white/95
        px-4
        shadow-sm
        backdrop-blur-xl
        sm:px-6
        xl:px-8
      "
    >

      {/* =====================================
          LEFT SIDE
      ====================================== */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
        "
      >

        {/* Mobile Sidebar Button */}

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            shadow-sm
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            hover:shadow-md
            lg:hidden
          "
          aria-label="Open sidebar"
        >

          <Menu
            size={21}
          />

        </button>


        {/* Page Information */}

        <div
          className="
            min-w-0
          "
        >

          <p
            className="
              hidden
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-blue-600
              sm:block
            "
          >
            OneCloud Enterprise
          </p>


          <h2
            className="
              truncate
              text-lg
              font-black
              tracking-tight
              text-slate-900
              sm:mt-0.5
              sm:text-xl
            "
          >
            {pageTitle}
          </h2>

        </div>

      </div>


      {/* =====================================
          GLOBAL SEARCH
      ====================================== */}

      <form
        onSubmit={
          handleSearchSubmit
        }
        className="
          hidden
          max-w-lg
          flex-1
          lg:block
        "
      >

        <div
          className="
            relative
          "
        >

          <Search
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
            type="search"
            value={searchValue}
            onChange={
              (event) =>
                setSearchValue(
                  event.target.value
                )
            }
            placeholder="Search employees, modules, reports..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-11
              pr-4
              text-sm
              text-slate-700
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              hover:border-slate-300
              focus:border-blue-400
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

        </div>

      </form>


      {/* =====================================
          RIGHT SIDE
      ====================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2
          sm:gap-3
        "
      >

        {/* =================================
            NOTIFICATIONS
        ================================== */}

        <button
          type="button"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-sm
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            hover:shadow-md
          "
          aria-label="Notifications"
          title="Notifications"
        >

          <Bell
            size={19}
          />


          {/* Notification indicator */}

          <span
            className="
              absolute
              right-2
              top-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
              ring-2
              ring-white
            "
          />

        </button>


        {/* =================================
            PROFILE DROPDOWN
        ================================== */}

        <div
          className="
            relative
          "
        >

          <button
            type="button"
            onClick={() =>
              setProfileMenuOpen(
                (current) =>
                  !current
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-transparent
              bg-white
              p-1.5
              transition-all
              duration-200
              hover:border-slate-200
              hover:bg-slate-50
              hover:shadow-sm
              sm:gap-3
            "
            aria-expanded={
              profileMenuOpen
            }
            aria-label="Open user menu"
          >

            {/* User Avatar */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-700
                text-xs
                font-black
                text-white
                shadow-md
                shadow-blue-600/20
              "
            >
              {initials}
            </div>


            {/* User Name */}

            <div
              className="
                hidden
                min-w-0
                text-left
                md:block
              "
            >

              <p
                className="
                  max-w-36
                  truncate
                  text-sm
                  font-black
                  text-slate-800
                "
              >
                {userName}
              </p>


              <p
                className="
                  mt-0.5
                  max-w-36
                  truncate
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {userRole}
              </p>

            </div>


            <ChevronDown
              size={16}
              className={`
                hidden
                text-slate-400
                transition-transform
                duration-200
                md:block
                ${
                  profileMenuOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>


          {/* =================================
              DROPDOWN CONTENT
          ================================== */}

          {
            profileMenuOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+12px)]
                  z-50
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-2
                  shadow-2xl
                  shadow-slate-900/15
                "
              >

                {/* User Header */}

                <div
                  className="
                    rounded-xl
                    bg-gradient-to-br
                    from-slate-50
                    to-blue-50
                    px-4
                    py-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-600
                        text-sm
                        font-black
                        text-white
                      "
                    >
                      {initials}
                    </div>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          truncate
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        {userName}
                      </p>


                      <p
                        className="
                          mt-0.5
                          truncate
                          text-xs
                          text-slate-500
                        "
                      >
                        {userEmail}
                      </p>

                    </div>

                  </div>


                  <span
                    className="
                      mt-3
                      inline-flex
                      rounded-full
                      bg-emerald-100
                      px-2.5
                      py-1
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wide
                      text-emerald-700
                    "
                  >
                    Active Session
                  </span>

                </div>


                {/* Divider */}

                <div
                  className="
                    my-2
                    h-px
                    bg-slate-100
                  "
                />


                {/* Profile */}

                <button
                  type="button"
                  onClick={() => {

                    setProfileMenuOpen(
                      false
                    );


                    navigate(
                      ROUTES.PROFILE
                    );

                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                    transition
                    hover:bg-blue-50
                    hover:text-blue-700
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                    "
                  >

                    <UserRound
                      size={17}
                    />

                  </div>


                  <div>

                    <p
                      className="
                        font-bold
                      "
                    >
                      My Profile
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        font-normal
                        text-slate-400
                      "
                    >
                      View profile and reports
                    </p>

                  </div>

                </button>


                {/* Logout */}

                <button
                  type="button"
                  onClick={() => {

                    setProfileMenuOpen(
                      false
                    );


                    onLogout();

                  }}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-50
                    hover:text-red-700
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      text-red-600
                    "
                  >

                    <LogOut
                      size={17}
                    />

                  </div>


                  <div>

                    <p
                      className="
                        font-bold
                      "
                    >
                      Logout
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        font-normal
                        text-red-400
                      "
                    >
                      End your current session
                    </p>

                  </div>

                </button>

              </div>

            )
          }

        </div>

      </div>

    </header>
  );
}


export default Header;
