import type {
  LucideIcon
} from "lucide-react";

import {
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react";


interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;

  trend?: {
    value: string;
    positive: boolean;
  };

  variant?:
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "cyan";
}


const variantClasses = {

  blue: {
    icon: `
      bg-blue-50
      text-blue-600
    `,

    decoration:
      "bg-blue-500"
  },

  green: {
    icon: `
      bg-emerald-50
      text-emerald-600
    `,

    decoration:
      "bg-emerald-500"
  },

  purple: {
    icon: `
      bg-purple-50
      text-purple-600
    `,

    decoration:
      "bg-purple-500"
  },

  orange: {
    icon: `
      bg-orange-50
      text-orange-600
    `,

    decoration:
      "bg-orange-500"
  },

  cyan: {
    icon: `
      bg-cyan-50
      text-cyan-600
    `,

    decoration:
      "bg-cyan-500"
  }

};


function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "blue"
}: StatCardProps) {

  const styles =
    variantClasses[variant];


  return (

    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-slate-900/5
      "
    >

      {/* Decorative line */}

      <div
        className={`
          absolute
          left-0
          top-0
          h-1
          w-full
          ${styles.decoration}
        `}
      />


      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.08em]
              text-slate-500
            "
          >
            {title}
          </p>


          <h3
            className="
              mt-3
              text-3xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            {value}
          </h3>

        </div>


        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            transition-transform
            duration-300
            group-hover:scale-110
            ${styles.icon}
          `}
        >

          <Icon
            size={22}
            strokeWidth={2.2}
          />

        </div>

      </div>


      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          gap-3
        "
      >

        <p
          className="
            text-xs
            text-slate-500
          "
        >
          {description}
        </p>


        {
          trend && (

            <div
              className={`
                flex
                shrink-0
                items-center
                gap-1
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-black

                ${
                  trend.positive
                    ? `
                      bg-emerald-50
                      text-emerald-700
                    `
                    : `
                      bg-red-50
                      text-red-700
                    `
                }
              `}
            >

              {
                trend.positive
                  ? (
                    <ArrowUpRight
                      size={12}
                    />
                  )
                  : (
                    <ArrowDownRight
                      size={12}
                    />
                  )
              }

              {trend.value}

            </div>

          )
        }

      </div>

    </article>
  );
}


export default StatCard;
