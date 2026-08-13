import {
  Cloud,
  Menu,
  X
} from "lucide-react";

import {
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";


function Navbar() {

  const [
    menuOpen,
    setMenuOpen
  ] = useState(false);


  function closeMenu() {
    setMenuOpen(false);
  }


  return (

    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200/80
        bg-white/95
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-[1500px]
          items-center
          justify-between
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* =========================
            LOGO
        ========================== */}

        <Link
          to={ROUTES.HOME}
          onClick={closeMenu}
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
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-600
              to-indigo-700
              text-white
              shadow-lg
              shadow-blue-600/20
            "
          >

            <Cloud
              size={25}
              strokeWidth={2.4}
            />

          </div>


          <div>

            <h1
              className="
                text-xl
                font-black
                tracking-tight
                text-slate-900
              "
            >
              OneCloud
            </h1>

            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.18em]
                text-blue-600
              "
            >
              Enterprise Platform
            </p>

          </div>

        </Link>


        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <nav
          className="
            hidden
            items-center
            gap-1
            lg:flex
          "
        >

          <a
            href="#home"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            Home
          </a>


          <a
            href="#modules"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            Modules
          </a>


          <a
            href="#solutions"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            Solutions
          </a>


          <a
            href="#technology"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            Technology
          </a>


          <a
            href="#about"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            About
          </a>


          <a
            href="#contact"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            Contact
          </a>

        </nav>


        {/* =========================
            DESKTOP BUTTONS
        ========================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            lg:flex
          "
        >

          <Link
            to={ROUTES.LOGIN}
            className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-2.5
              text-sm
              font-bold
              text-slate-700
              transition
              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-700
            "
          >
            Login
          </Link>


          <Link
            to={ROUTES.REGISTER}
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-700
            "
          >
            Register
          </Link>

        </div>


        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}

        <button
          type="button"
          onClick={() =>
            setMenuOpen(
              (current) => !current
            )
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            text-slate-700
            transition
            hover:bg-slate-100
            lg:hidden
          "
          aria-label="Open navigation"
        >

          {
            menuOpen
              ? <X size={22} />
              : <Menu size={22} />
          }

        </button>

      </div>


      {/* =========================
          MOBILE NAVIGATION
      ========================== */}

      {
        menuOpen && (

          <div
            className="
              border-t
              border-slate-200
              bg-white
              px-5
              py-5
              lg:hidden
            "
          >

            <nav
              className="
                mx-auto
                flex
                max-w-[1500px]
                flex-col
                gap-1
              "
            >

              <MobileLink
                href="#home"
                label="Home"
                onClick={closeMenu}
              />

              <MobileLink
                href="#modules"
                label="Modules"
                onClick={closeMenu}
              />

              <MobileLink
                href="#solutions"
                label="Solutions"
                onClick={closeMenu}
              />

              <MobileLink
                href="#technology"
                label="Technology"
                onClick={closeMenu}
              />

              <MobileLink
                href="#about"
                label="About"
                onClick={closeMenu}
              />

              <MobileLink
                href="#contact"
                label="Contact"
                onClick={closeMenu}
              />


              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <Link
                  to={ROUTES.LOGIN}
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Login
                </Link>


                <Link
                  to={ROUTES.REGISTER}
                  onClick={closeMenu}
                  className="
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  Register
                </Link>

              </div>

            </nav>

          </div>

        )
      }

    </header>
  );
}


interface MobileLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}


function MobileLink({
  href,
  label,
  onClick
}: MobileLinkProps) {

  return (

    <a
      href={href}
      onClick={onClick}
      className="
        rounded-xl
        px-4
        py-3
        text-sm
        font-semibold
        text-slate-700
        transition
        hover:bg-blue-50
        hover:text-blue-600
      "
    >
      {label}
    </a>
  );
}


export default Navbar;