import {
  ShieldCheck
} from "lucide-react";

import AuthHeader
  from "../components/auth/AuthHeader";

import DemoCredentials
  from "../components/auth/DemoCredentials";

import LoginForm
  from "../components/auth/LoginForm";


function Login() {

  return (

    <div
      className="
        relative
      "
    >

      {/* Decorative background */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-28
          h-60
          w-60
          rounded-full
          bg-blue-200/40
          blur-3xl
        "
      />


      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-2xl
          shadow-slate-900/10
          sm:p-8
          xl:p-10
        "
      >

        {/* Top security icon */}

        <div
          className="
            mb-7
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-700
            text-white
            shadow-lg
            shadow-blue-600/25
          "
        >

          <ShieldCheck
            size={27}
          />

        </div>


        <AuthHeader />

        <LoginForm />

        <DemoCredentials />

      </div>


      <div
        className="
          mt-5
          text-center
        "
      >

        <p
          className="
            text-xs
            text-slate-400
          "
        >
          Protected by OneCloud Enterprise Security
        </p>

      </div>

    </div>
  );
}


export default Login;
