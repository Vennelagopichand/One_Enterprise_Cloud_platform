import {
  Construction
} from "lucide-react";


interface RoutePlaceholderProps {
  title: string;
  description?: string;
}


function RoutePlaceholder({
  title,
  description
}: RoutePlaceholderProps) {

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm
        sm:p-10
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
        "
      >

        <Construction
          size={25}
        />

      </div>


      <p
        className="
          mt-6
          text-xs
          font-black
          uppercase
          tracking-[0.18em]
          text-blue-600
        "
      >
        OneCloud Module
      </p>


      <h1
        className="
          mt-2
          text-3xl
          font-black
          tracking-tight
          text-slate-900
          sm:text-4xl
        "
      >
        {title}
      </h1>


      <p
        className="
          mt-4
          max-w-2xl
          leading-7
          text-slate-500
        "
      >
        {description ??
          `${title} will be implemented in the upcoming section.`}
      </p>

    </section>
  );
}

export default RoutePlaceholder;
