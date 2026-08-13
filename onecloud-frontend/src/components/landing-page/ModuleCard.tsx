import type {
  LucideIcon
} from "lucide-react";

import {
  ArrowUpRight
} from "lucide-react";


interface ModuleCardProps {
  icon: LucideIcon;

  name: string;

  description: string;

  features: string[];
}


function ModuleCard({
  icon: Icon,
  name,
  description,
  features
}: ModuleCardProps) {

  return (

    <article
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-2xl
        hover:shadow-blue-900/10
      "
    >

      <div
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-50
            text-blue-600
            transition
            duration-300
            group-hover:bg-blue-600
            group-hover:text-white
          "
        >

          <Icon
            size={25}
            strokeWidth={2}
          />

        </div>


        <ArrowUpRight
          size={20}
          className="
            text-slate-300
            transition
            group-hover:text-blue-600
          "
        />

      </div>


      <h3
        className="
          text-xl
          font-black
          tracking-tight
          text-slate-900
        "
      >
        {name}
      </h3>


      <p
        className="
          mt-3
          leading-7
          text-slate-500
        "
      >
        {description}
      </p>


      <div
        className="
          mt-6
          flex
          flex-wrap
          gap-2
        "
      >

        {
          features.map(
            (feature) => (

              <span
                key={feature}
                className="
                  rounded-full
                  bg-slate-100
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                {feature}
              </span>

            )
          )
        }

      </div>

    </article>
  );
}


export default ModuleCard;