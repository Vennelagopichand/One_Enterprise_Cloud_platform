import {
  BadgeCheck,
  UserPlus
} from "lucide-react";

function RegisterHeader() {
  return (
    <div className="mb-8">

      <div
        className="
          mb-5
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-blue-100
          bg-blue-50
          px-3.5
          py-2
          text-xs
          font-black
          uppercase
          tracking-[0.14em]
          text-blue-700
        "
      >
        <UserPlus size={15} />

        Employee Registration
      </div>

      <h1
        className="
          text-3xl
          font-black
          tracking-tight
          text-slate-950
          sm:text-4xl
        "
      >
        Create your OneCloud account
      </h1>

      <p
        className="
          mt-3
          max-w-xl
          text-sm
          leading-7
          text-slate-500
          sm:text-base
        "
      >
        Register an employee account to access
        OneCloud workforce management, attendance,
        leave and enterprise applications.
      </p>

      <div
        className="
          mt-5
          flex
          items-center
          gap-2
          text-xs
          font-semibold
          text-emerald-700
        "
      >
        <BadgeCheck size={15} />

        Secure enterprise employee registration
      </div>

    </div>
  );
}

export default RegisterHeader;