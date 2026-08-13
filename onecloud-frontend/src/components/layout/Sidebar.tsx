import type {
  LucideIcon
} from "lucide-react";

import {
  BarChart3,
  CalendarCheck2,
  CalendarDays,
  Cloud,
  Handshake,
  Landmark,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  Users,
  WalletCards,
  X
} from "lucide-react";

import {
  NavLink
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";

import {
  sidebarRoutes,
  type RouteIconName
} from "../../routes/routeConfig";

import {
  useAuth
} from "../../hooks/useAuth";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}


/*
  Map icon names from routeConfig.ts
  to Lucide React icons.
*/
const iconMap: Record<
  RouteIconName,
  LucideIcon
> = {
  dashboard: LayoutDashboard,
  employees: Users,
  attendance: CalendarCheck2,
  leave: CalendarDays,
  payroll: WalletCards,
  crm: Handshake,
  finance: Landmark,
  reports: BarChart3,
  settings: Settings,
  profile: UserRound
};


function Sidebar({
  isOpen,
  onClose,
  onLogout
}: SidebarProps) {

  /*
    Get authenticated user
    from AuthContext.
  */
  const {
    user
  } = useAuth();


  /*
    User information.
  */
  const userName =
    user?.name ??
    "Admin User";


  const userRole =
    user?.role ??
    "HR Administrator";


  /*
    Create initials.

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


  return (
    <>

      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      {
        isOpen && (

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="
              fixed
              inset-0
              z-40
              bg-slate-950/70
              backdrop-blur-sm
              lg:hidden
            "
          />

        )
      }


      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50

          flex
          w-72
          flex-col

          overflow-hidden

          border-r
          border-white/10

          bg-gradient-to-b
          from-slate-950
          via-slate-950
          to-slate-900

          text-white

          shadow-2xl
          shadow-slate-950/40

          transition-transform
          duration-300
          ease-in-out

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =====================================
            DECORATIVE BACKGROUND
        ====================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            top-16
            h-72
            w-72
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-24
            h-80
            w-80
            rounded-full
            bg-indigo-600/10
            blur-3xl
          "
        />


        {/* =====================================
            BRAND
        ====================================== */}

        <div
          className="
            relative
            z-10
            flex
            h-20
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-5
          "
        >

          <NavLink
            to={ROUTES.DASHBOARD}
            onClick={onClose}
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* Logo */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                text-white
                shadow-lg
                shadow-blue-950/50
              "
            >

              <Cloud
                size={25}
                strokeWidth={2.4}
              />

            </div>


            {/* Brand Name */}

            <div>

              <h1
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                OneCloud
              </h1>


              <p
                className="
                  mt-0.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-blue-400
                "
              >
                Enterprise Platform
              </p>

            </div>

          </NavLink>


          {/* Mobile close */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
            aria-label="Close navigation"
          >

            <X size={20} />

          </button>

        </div>


        {/* =====================================
            APPLICATION LABEL
        ====================================== */}

        <div
          className="
            relative
            z-10
            px-4
            pb-2
            pt-6
          "
        >

          <p
            className="
              px-3
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-500
            "
          >
            Application
          </p>

        </div>


        {/* =====================================
            NAVIGATION
        ====================================== */}

        <nav
          className="
            relative
            z-10
            flex-1
            space-y-1
            overflow-y-auto
            px-3
            pb-5
          "
        >

          {
            sidebarRoutes.map(
              (route) => {

                const Icon =
                  route.icon
                    ? iconMap[
                        route.icon
                      ]
                    : LayoutDashboard;


                return (

                  <NavLink
                    key={route.path}
                    to={route.path}
                    onClick={onClose}
                    className={({
                      isActive
                    }) => `

                      group
                      relative

                      flex
                      items-center
                      gap-3

                      rounded-xl

                      px-4
                      py-3

                      text-sm
                      font-semibold

                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-blue-600
                            to-blue-500

                            text-white

                            shadow-lg
                            shadow-blue-950/30
                          `
                          : `
                            text-slate-400

                            hover:bg-white/8
                            hover:text-white
                          `
                      }
                    `}
                  >

                    {
                      ({
                        isActive
                      }) => (

                        <>

                          {/* Icon */}

                          <div
                            className={`
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              transition-all
                              duration-200

                              ${
                                isActive
                                  ? `
                                    bg-white/15
                                    text-white
                                  `
                                  : `
                                    bg-white/5
                                    text-slate-500
                                    group-hover:bg-blue-500/10
                                    group-hover:text-blue-400
                                  `
                              }
                            `}
                          >

                            <Icon
                              size={18}
                              strokeWidth={2}
                            />

                          </div>


                          {/* Route Name */}

                          <span
                            className="
                              flex-1
                            "
                          >
                            {route.name}
                          </span>


                          {/* Active indicator */}

                          {
                            isActive && (

                              <span
                                className="
                                  h-2
                                  w-2
                                  shrink-0
                                  rounded-full
                                  bg-white
                                  shadow
                                "
                              />

                            )
                          }

                        </>

                      )
                    }

                  </NavLink>

                );
              }
            )
          }

        </nav>


        {/* =====================================
            QUICK PROFILE
        ====================================== */}

        <div
          className="
            relative
            z-10
            px-3
            pb-2
          "
        >

          <p
            className="
              px-3
              pb-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-500
            "
          >
            Account
          </p>


          <NavLink
            to={ROUTES.PROFILE}
            onClick={onClose}
            className={({
              isActive
            }) => `
              flex
              items-center
              gap-3

              rounded-2xl

              border

              px-3
              py-3

              transition-all
              duration-200

              ${
                isActive
                  ? `
                    border-blue-500/30
                    bg-blue-500/10
                  `
                  : `
                    border-white/5
                    bg-white/[0.03]
                    hover:border-white/10
                    hover:bg-white/[0.07]
                  `
              }
            `}
          >

            {/* Avatar */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl

                bg-gradient-to-br
                from-blue-600
                to-indigo-600

                text-sm
                font-black
                text-white

                shadow-md
                shadow-blue-950/40
              "
            >
              {initials}
            </div>


            {/* User Data */}

            <div
              className="
                min-w-0
                flex-1
              "
            >

              <p
                className="
                  truncate
                  text-sm
                  font-black
                  text-white
                "
              >
                {userName}
              </p>


              <p
                className="
                  mt-0.5
                  truncate
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {userRole}
              </p>

            </div>


            <UserRound
              size={17}
              className="
                shrink-0
                text-slate-500
              "
            />

          </NavLink>

        </div>


        {/* =====================================
            LOGOUT
        ====================================== */}

        <div
          className="
            relative
            z-10
            shrink-0
            border-t
            border-white/10
            p-3
          "
        >

          <button
            type="button"
            onClick={onLogout}
            className="
              group
              flex
              w-full
              items-center
              gap-3

              rounded-xl

              px-4
              py-3

              text-sm
              font-bold
              text-red-400

              transition-all
              duration-200

              hover:bg-red-500/10
              hover:text-red-300
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
                bg-red-500/10
                text-red-400
                transition
                group-hover:bg-red-500/20
              "
            >

              <LogOut
                size={18}
              />

            </div>


            <span>
              Logout
            </span>

          </button>


          {/* Version */}

          <p
            className="
              mt-3
              text-center
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-slate-700
            "
          >
            OneCloud v1.0.0
          </p>

        </div>

      </aside>

    </>
  );
}


export default Sidebar;
