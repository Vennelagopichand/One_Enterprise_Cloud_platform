import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CloudCog,
  Database,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";


function HeroSection() {

  return (

    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-slate-950
      "
    >

      {/* Background */}

      <div
        className="
          absolute
          -left-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-600/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-60
          right-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-indigo-600/20
          blur-3xl
        "
      />


      <div
        className="
          relative
          mx-auto
          grid
          min-h-[720px]
          max-w-[1500px]
          items-center
          gap-16
          px-5
          py-20
          sm:px-8
          lg:grid-cols-2
          lg:px-12
          lg:py-24
        "
      >

        {/* =========================
            LEFT HERO
        ========================== */}

        <div>

          <div
            className="
              mb-6
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
              font-bold
              text-blue-300
            "
          >

            <Sparkles size={15} />

            Next Generation Enterprise Cloud

          </div>


          <h1
            className="
              max-w-3xl
              text-4xl
              font-black
              leading-[1.08]
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            Run your entire business with

            <span
              className="
                bg-gradient-to-r
                from-blue-400
                to-cyan-300
                bg-clip-text
                text-transparent
              "
            >
              {" "}OneCloud
            </span>

          </h1>


          <p
            className="
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-slate-400
              sm:text-lg
            "
          >
            A unified cloud-native enterprise
            platform for workforce management,
            customer relationships, finance,
            analytics and AI-powered business
            automation.
          </p>


          {/* Buttons */}

          <div
            className="
              mt-9
              flex
              flex-col
              gap-4
              sm:flex-row
            "
          >

            <Link
              to={ROUTES.REGISTER}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-6
                py-3.5
                text-sm
                font-black
                text-white
                shadow-xl
                shadow-blue-950/40
                transition
                hover:-translate-y-0.5
                hover:bg-blue-500
              "
            >

              Get Started

              <ArrowRight size={18} />

            </Link>


            <a
              href="#contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/15
                bg-white/5
                px-6
                py-3.5
                text-sm
                font-black
                text-white
                transition
                hover:bg-white/10
              "
            >

              <PlayCircle size={18} />

              Request Demo

            </a>

          </div>


          {/* Hero Points */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-x-6
              gap-y-3
            "
          >

            <HeroPoint
              text="Cloud Native"
            />

            <HeroPoint
              text="Enterprise Security"
            />

            <HeroPoint
              text="AI Powered"
            />

          </div>

        </div>


        {/* =========================
            RIGHT HERO MOCK DASHBOARD
        ========================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-xl
          "
        >

          <div
            className="
              rounded-[30px]
              border
              border-white/10
              bg-white/10
              p-3
              shadow-2xl
              shadow-black/40
              backdrop-blur-xl
            "
          >

            <div
              className="
                overflow-hidden
                rounded-[24px]
                bg-white
              "
            >

              {/* Mock Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-200
                  px-5
                  py-4
                "
              >

                <div>

                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-blue-600
                    "
                  >
                    OneCloud Dashboard
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    Enterprise Overview
                  </p>

                </div>


                <div
                  className="
                    h-9
                    w-9
                    rounded-xl
                    bg-blue-600
                  "
                />

              </div>


              {/* Stats */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  p-5
                "
              >

                <HeroStat
                  icon={Users}
                  value="1,248"
                  label="Employees"
                />

                <HeroStat
                  icon={BarChart3}
                  value="94.8%"
                  label="Performance"
                />

                <HeroStat
                  icon={Database}
                  value="6"
                  label="Core Modules"
                />

                <HeroStat
                  icon={ShieldCheck}
                  value="99.9%"
                  label="Availability"
                />

              </div>


              {/* Chart */}

              <div
                className="
                  mx-5
                  mb-5
                  rounded-2xl
                  bg-slate-950
                  p-5
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      Business Analytics
                    </p>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-slate-500
                      "
                    >
                      Organization performance
                    </p>

                  </div>


                  <CloudCog
                    size={22}
                    className="text-blue-400"
                  />

                </div>


                <div
                  className="
                    flex
                    h-32
                    items-end
                    gap-3
                  "
                >

                  <ChartBar height="45%" />

                  <ChartBar height="65%" />

                  <ChartBar height="53%" />

                  <ChartBar height="82%" />

                  <ChartBar height="70%" />

                  <ChartBar height="94%" />

                  <ChartBar height="76%" />

                </div>

              </div>

            </div>

          </div>


          {/* Floating Card */}

          <div
            className="
              absolute
              -bottom-8
              -left-6
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              p-4
              shadow-2xl
              sm:flex
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/15
                text-emerald-400
              "
            >
              <CheckCircle2 size={22} />
            </div>


            <div>

              <p
                className="
                  text-xs
                  font-black
                  text-white
                "
              >
                System Operational
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-slate-500
                "
              >
                All services running
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


interface HeroPointProps {
  text: string;
}


function HeroPoint({
  text
}: HeroPointProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
        text-sm
        font-semibold
        text-slate-400
      "
    >

      <CheckCircle2
        size={16}
        className="text-emerald-400"
      />

      {text}

    </div>
  );
}


interface HeroStatProps {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  value: string;

  label: string;
}


function HeroStat({
  icon: Icon,
  value,
  label
}: HeroStatProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
      "
    >

      <div
        className="
          mb-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-blue-100
          text-blue-600
        "
      >
        <Icon size={18} />
      </div>


      <p
        className="
          text-xl
          font-black
          text-slate-900
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


interface ChartBarProps {
  height: string;
}


function ChartBar({
  height
}: ChartBarProps) {

  return (

    <div
      className="
        flex
        h-full
        flex-1
        items-end
      "
    >

      <div
        className="
          w-full
          rounded-t-md
          bg-gradient-to-t
          from-blue-600
          to-cyan-400
        "
        style={{
          height
        }}
      />

    </div>
  );
}


export default HeroSection;