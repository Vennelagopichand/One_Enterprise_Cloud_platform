import type {
  IconType
} from "react-icons";

import {
  FaAws,
  FaJava,
  FaReact
} from "react-icons/fa";

import {
  SiFlutter,
  SiPostgresql,
  SiSpringboot
} from "react-icons/si";


/* ==========================================
   TECHNOLOGY TYPE
========================================== */

interface Technology {
  name: string;
  description: string;
  icon: IconType;
}


/* ==========================================
   TECHNOLOGY DATA
========================================== */

const technologies: Technology[] = [

  {
    name: "Java",
    description: "Enterprise Backend",
    icon: FaJava
  },

  {
    name: "Spring Boot",
    description: "Microservices",
    icon: SiSpringboot
  },

  {
    name: "React",
    description: "Web Frontend",
    icon: FaReact
  },

  {
    name: "Flutter",
    description: "Mobile Apps",
    icon: SiFlutter
  },

  {
    name: "PostgreSQL",
    description: "Enterprise Database",
    icon: SiPostgresql
  },

  {
    name: "AWS",
    description: "Cloud Infrastructure",
    icon: FaAws
  }

];


/* ==========================================
   TECHNOLOGY SECTION
========================================== */

function TechnologySection() {

  return (

    <section
      id="technology"
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        lg:py-28
      "
    >

      {/* =====================================
          BACKGROUND DECORATION
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-80
          w-80
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-10
          h-80
          w-80
          rounded-full
          bg-indigo-100/40
          blur-3xl
        "
      />


      {/* =====================================
          MAIN CONTAINER
      ====================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1640px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >

        {/* ===================================
            SECTION HEADER
        ==================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-2
            lg:items-end
          "
        >

          {/* Left */}

          <div>

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.24em]
                text-blue-600
                sm:text-sm
              "
            >
              Technology Stack
            </p>


            <h2
              className="
                mt-5
                max-w-3xl
                text-4xl
                font-black
                leading-[1.08]
                tracking-tight
                text-slate-950
                sm:text-5xl
                lg:text-6xl
              "
            >
              Built using modern enterprise
              technologies
            </h2>

          </div>


          {/* Right */}

          <div
            className="
              lg:pb-2
            "
          >

            <p
              className="
                max-w-2xl
                text-base
                leading-8
                text-slate-500
                sm:text-lg
              "
            >
              OneCloud combines proven
              enterprise technologies with
              modern cloud-native architecture
              to deliver secure, scalable and
              responsive applications.
            </p>

          </div>

        </div>


        {/* ===================================
            TECHNOLOGY CARDS
        ==================================== */}

        <div
          className="
            mt-14
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
          "
        >

          {
            technologies.map(
              (technology) => (

                <TechnologyCard
                  key={
                    technology.name
                  }
                  technology={
                    technology
                  }
                />

              )
            )
          }

        </div>

      </div>

    </section>
  );
}


/* ==========================================
   TECHNOLOGY CARD PROPS
========================================== */

interface TechnologyCardProps {
  technology: Technology;
}


/* ==========================================
   TECHNOLOGY CARD
========================================== */

function TechnologyCard({
  technology
}: TechnologyCardProps) {

  const Icon =
    technology.icon;


  return (

    <article
      className="
        group
        relative
        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-blue-200
        bg-white
        px-5
        py-7
        text-center
        shadow-md
        shadow-slate-200/60
        transition-all
        duration-300

        hover:-translate-y-2
        hover:border-blue-400
        hover:shadow-2xl
        hover:shadow-blue-200/60
      "
    >

      {/* ===================================
          TOP HIGHLIGHT GLOW
      ==================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-28
          bg-gradient-to-b
          from-blue-50
          to-transparent
          opacity-70
          transition
          duration-300
          group-hover:opacity-100
        "
      />


      {/* ===================================
          ICON BACKGROUND GLOW
      ==================================== */}

      <div
        className="
          pointer-events-none
          absolute
          top-10
          h-20
          w-20
          rounded-full
          bg-blue-500/10
          blur-xl
          transition-all
          duration-300
          group-hover:scale-125
          group-hover:bg-blue-500/20
        "
      />


      {/* ===================================
          TECHNOLOGY ICON

          Same style for every technology:
          blue box + white icon
      ==================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-blue-500
          via-blue-600
          to-indigo-600
          text-white
          shadow-xl
          shadow-blue-600/30
          ring-1
          ring-blue-400/30
          transition-all
          duration-300

          group-hover:-translate-y-1
          group-hover:scale-110
          group-hover:shadow-2xl
          group-hover:shadow-blue-500/40
        "
      >

        <Icon
          size={31}
        />

      </div>


      {/* ===================================
          TECHNOLOGY NAME
      ==================================== */}

      <h3
        className="
          relative
          z-10
          mt-6
          text-lg
          font-black
          text-slate-950
          transition-colors
          duration-200
          group-hover:text-blue-600
        "
      >
        {technology.name}
      </h3>


      {/* ===================================
          DESCRIPTION
      ==================================== */}

      <p
        className="
          relative
          z-10
          mt-2
          text-sm
          font-medium
          text-slate-500
        "
      >
        {technology.description}
      </p>


      {/* ===================================
          BOTTOM HIGHLIGHT LINE
      ==================================== */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-1
          w-0
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-indigo-600
          transition-all
          duration-300
          group-hover:w-2/3
        "
      />

    </article>
  );
}


export default TechnologySection;
