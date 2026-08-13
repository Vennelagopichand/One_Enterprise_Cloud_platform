import type {
  LucideIcon
} from "lucide-react";

import {
  Link
} from "react-router-dom";


interface QuickActionProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}


function QuickAction({
  title,
  description,
  path,
  icon: Icon
}: QuickActionProps) {

  return (

    <Link
      to={path}
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        transition-all
        duration-200
        hover:border-blue-200
        hover:bg-blue-50/40
        hover:shadow-md
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
          bg-blue-50
          text-blue-600
          transition-all
          group-hover:bg-blue-600
          group-hover:text-white
        "
      >

        <Icon
          size={19}
        />

      </div>


      <div
        className="
          min-w-0
        "
      >

        <h4
          className="
            text-sm
            font-black
            text-slate-900
          "
        >
          {title}
        </h4>


        <p
          className="
            mt-1
            truncate
            text-xs
            text-slate-500
          "
        >
          {description}
        </p>

      </div>

    </Link>
  );
}


export default QuickAction;
