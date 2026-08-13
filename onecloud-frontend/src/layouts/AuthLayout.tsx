import type {
  ComponentType
} from "react";

import {
  ArrowLeft,
  Building2,
  Cloud,
  Database,
  LockKeyhole,
  ShieldCheck
} from "lucide-react";

import {
  Link,
  Outlet
} from "react-router-dom";

import {
  ROUTES
} from "../constants/routes";


function AuthLayout() {

  return (

    <div
      className="
        grid
        min-h-screen
        bg-slate-50
        lg:grid-cols-[1.05fr_1fr]
      "
    >

      {/* =====================================
          LEFT BRAND PANEL
      ====================================== */}

      <section
        className="
          relative
          hidden
          overflow-hidden
          bg-slate-950
          px-12
          py-10
          text-white
          lg:flex
          lg:flex-col
          lg:justify-between
          xl:px-16
        "
      >

        {/* Decorative background */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-blue-600/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-80
            w-80
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -right-32
            h-[450px]
            w-[450px]
            rounded-full
            bg-indigo-600/20
            blur-3xl
          "
        />


        {/* Decorative grid */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.04]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",

            backgroundSize:
              "42px 42px"
          }}
        />


        {/* =================================
            LOGO
        ================================== */}

        <Link
          to={ROUTES.HOME}
          className="
            relative
            z-10
            flex
            w-fit
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              shadow-xl
              shadow-blue-950/40
            "
          >

            <Cloud
              size={27}
              strokeWidth={2.4}
            />

          </div>


          <div>

            <p
              className="
                text-xl
                font-black
                tracking-tight
              "
            >
              OneCloud
            </p>


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

        </Link>


        {/* =================================
            MAIN CONTENT
        ================================== */}

        <div
          className="
            relative
            z-10
            max-w-xl
          "
        >

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-400/20
              bg-blue-500/10
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-[0.15em]
              text-blue-300
            "
          >

            <ShieldCheck
              size={15}
            />

            Enterprise Access

          </div>


          <h1
            className="
              text-4xl
              font-black
              leading-tight
              tracking-tight
              xl:text-5xl
            "
          >
            Manage your entire
            organization from one
            intelligent platform.
          </h1>


          <p
            className="
              mt-6
              max-w-lg
              text-base
              leading-8
              text-slate-400
            "
          >
            OneCloud connects workforce
            management, attendance, leave,
            finance, CRM and analytics through
            one unified enterprise experience.
          </p>


          {/* =================================
              FEATURE CARDS
          ================================== */}

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-4
            "
          >

            <FeatureBox
              icon={ShieldCheck}
              title="Enterprise Security"
              text="Protected workforce access"
            />

            <FeatureBox
              icon={Building2}
              title="HR Management"
              text="Unified employee operations"
            />

            <FeatureBox
              icon={Database}
              title="Centralized Data"
              text="One shared enterprise source"
            />

            <FeatureBox
              icon={LockKeyhole}
              title="Role Based Access"
              text="Secure application permissions"
            />

          </div>


          {/* =================================
              SMALL PLATFORM STATS
          ================================== */}

          <div
            className="
              mt-10
              grid
              grid-cols-3
              gap-4
              border-t
              border-white/10
              pt-8
            "
          >

            <PlatformStat
              value="6+"
              label="Core Modules"
            />

            <PlatformStat
              value="99.9%"
              label="Availability"
            />

            <PlatformStat
              value="24/7"
              label="Enterprise Access"
            />

          </div>

        </div>


        {/* =================================
            LEFT FOOTER
        ================================== */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            gap-5
            text-xs
            text-slate-500
          "
        >

          <p>
            © {new Date().getFullYear()} OneCloud
          </p>


          <p>
            Secure Enterprise Platform
          </p>

        </div>

      </section>


      {/* =====================================
          RIGHT AUTHENTICATION AREA
      ====================================== */}

      <section
        className="
          relative
          flex
          min-h-screen
          items-start
          justify-center
          overflow-x-hidden
          bg-slate-50
          px-5
          pb-12
          pt-24
          sm:px-8
          sm:pt-28
          lg:px-12
          lg:py-12
          xl:px-16
        "
      >

        {/* Right background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            top-24
            h-72
            w-72
            rounded-full
            bg-blue-200/30
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-72
            w-72
            rounded-full
            bg-indigo-200/20
            blur-3xl
          "
        />


        {/* =================================
            BACK HOME BUTTON
        ================================== */}

        <Link
          to={ROUTES.HOME}
          className="
            absolute
            left-5
            top-5
            z-20
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3.5
            py-2.5
            text-sm
            font-bold
            text-slate-600
            shadow-sm
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-700
            hover:shadow-md
            sm:left-8
            sm:top-8
          "
        >

          <ArrowLeft
            size={17}
          />

          Back Home

        </Link>


        {/* =================================
            MOBILE LOGO
        ================================== */}

        <Link
          to={ROUTES.HOME}
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            items-center
            gap-2
            lg:hidden
            sm:right-8
            sm:top-8
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-blue-600
              to-indigo-700
              text-white
              shadow-md
              shadow-blue-600/20
            "
          >

            <Cloud
              size={21}
            />

          </div>


          <div
            className="
              hidden
              text-left
              sm:block
            "
          >

            <p
              className="
                text-sm
                font-black
                text-slate-900
              "
            >
              OneCloud
            </p>

            <p
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.15em]
                text-blue-600
              "
            >
              Enterprise
            </p>

          </div>

        </Link>


        {/* =================================
            PAGE CONTENT
        ================================== */}

        <div
          className="
            relative
            z-10
            my-auto
            w-full
            max-w-2xl
          "
        >

          {/*
            React Router renders:

            /login    -> Login.tsx
            /register -> Register.tsx

            here.
          */}

          <Outlet />

        </div>

      </section>

    </div>
  );
}


/* ========================================
   FEATURE BOX
======================================== */

interface FeatureBoxProps {
  icon: ComponentType<{
    size?: number;
    className?: string;
  }>;

  title: string;

  text: string;
}


function FeatureBox({
  icon: Icon,
  title,
  text
}: FeatureBoxProps) {

  return (

    <div
      className="
        group
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        p-4
        backdrop-blur
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-400/20
        hover:bg-white/[0.07]
      "
    >

      <div
        className="
          mb-3
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-blue-500/10
          text-blue-400
          transition
          group-hover:bg-blue-500/20
        "
      >

        <Icon
          size={19}
        />

      </div>


      <h3
        className="
          text-sm
          font-black
          text-white
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-1.5
          text-xs
          leading-5
          text-slate-500
        "
      >
        {text}
      </p>

    </div>
  );
}


/* ========================================
   PLATFORM STAT
======================================== */

interface PlatformStatProps {
  value: string;
  label: string;
}


function PlatformStat({
  value,
  label
}: PlatformStatProps) {

  return (

    <div>

      <p
        className="
          text-xl
          font-black
          text-white
        "
      >
        {value}
      </p>


      <p
        className="
          mt-1
          text-[10px]
          font-semibold
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

    </div>
  );
}


export default AuthLayout;
