import type {
  LucideIcon
} from "lucide-react";

import {
  ArrowRight
} from "lucide-react";

import {
  Link
} from "react-router-dom";


interface ModuleCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;

  color?:
    | "blue"
    | "purple"
    | "green"
    | "orange"
    | "cyan"
    | "rose";
}


const colorStyles = {

  blue: {
    icon: "bg-blue-50 text-blue-600",
    hover: "group-hover:bg-blue-600"
  },

  purple: {
    icon:
      "bg-purple-50 text-purple-600",

    hover:
      "group-hover:bg-purple-600"
  },

  green: {
    icon:
      "bg-emerald-50 text-emerald-600",

    hover:
      "group-hover:bg-emerald-600"
  },

  orange: {
    icon:
      "bg-orange-50 text-orange-600",

    hover:
      "group-hover:bg-orange-600"
  },

  cyan: {
    icon:
      "bg-cyan-50 text-cyan-600",

    hover:
      "group-hover:bg-cyan-600"
  },

  rose: {
    icon:
      "bg-rose-50 text-rose-600",

    hover:
      "group-hover:bg-rose-600"
  }

};


function ModuleCard({
  title,
  description,
  path,
  icon: Icon,
  color = "blue"
}: ModuleCardProps) {

  const styles =
    colorStyles[color];


  return (

    <Link
      to={path}
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-slate-900/5
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-300
            group-hover:text-white
            ${styles.icon}
            ${styles.hover}
          `}
        >

          <Icon
            size={21}
          />

        </div>


        <ArrowRight
          size={18}
          className="
            text-slate-300
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-blue-600
          "
        />

      </div>


      <h3
        className="
          mt-5
          text-base
          font-black
          text-slate-900
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-2
          text-xs
          leading-5
          text-slate-500
        "
      >
        {description}
      </p>

    </Link>
  );
}


export default ModuleCard;
