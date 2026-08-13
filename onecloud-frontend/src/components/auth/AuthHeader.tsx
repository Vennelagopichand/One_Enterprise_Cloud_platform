import {
  LockKeyhole,
  ShieldCheck
} from "lucide-react";


function AuthHeader() {

  return (

    <div
      className="
        mb-8
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

        <ShieldCheck
          size={15}
        />

        Secure Employee Access

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
        Welcome back
      </h1>


      <p
        className="
          mt-3
          max-w-lg
          leading-7
          text-slate-500
        "
      >
        Sign in to access your
        OneCloud enterprise dashboard,
        workforce modules and business
        applications.
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

        <LockKeyhole
          size={15}
        />

        Protected enterprise login

      </div>

    </div>
  );
}


export default AuthHeader;
