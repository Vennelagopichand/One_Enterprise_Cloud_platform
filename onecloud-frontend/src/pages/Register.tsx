import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Users
} from "lucide-react";

import RegisterHeader
  from "../components/auth/RegisterHeader";

import RegistrationForm
  from "../components/auth/RegistrationForm";


function Register() {

  return (

    <div
      className="
        relative
        py-6
      "
    >

      {/* Decorative Background */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-blue-200/40
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-64
          w-64
          rounded-full
          bg-indigo-200/30
          blur-3xl
        "
      />


      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          shadow-2xl
          shadow-slate-900/10
        "
      >

        {/* ==================================
            TOP REGISTRATION BANNER
        =================================== */}

        <div
          className="
            border-b
            border-slate-200
            bg-gradient-to-r
            from-slate-950
            via-blue-950
            to-indigo-950
            px-6
            py-6
            text-white
            sm:px-8
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500/20
                  text-blue-300
                "
              >

                <Building2
                  size={24}
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.15em]
                    text-blue-300
                  "
                >
                  OneCloud HRMS
                </p>


                <h2
                  className="
                    mt-1
                    text-lg
                    font-black
                    sm:text-xl
                  "
                >
                  Employee Onboarding
                </h2>

              </div>

            </div>


            <div
              className="
                hidden
                items-center
                gap-5
                xl:flex
              "
            >

              <BannerFeature
                icon={ShieldCheck}
                text="Secure"
              />

              <BannerFeature
                icon={Users}
                text="HR Managed"
              />

              <BannerFeature
                icon={CheckCircle2}
                text="Fast Setup"
              />

            </div>

          </div>

        </div>


        {/* ==================================
            FORM
        =================================== */}

        <div
          className="
            p-6
            sm:p-8
            xl:p-10
          "
        >

          <RegisterHeader />

          <RegistrationForm />

        </div>

      </div>


      <p
        className="
          mt-5
          text-center
          text-xs
          text-slate-400
        "
      >
        Employee information is protected by
        OneCloud Enterprise Security.
      </p>

    </div>
  );
}


interface BannerFeatureProps {
  icon:
    React.ComponentType<{
      size?: number;
    }>;

  text: string;
}


function BannerFeature({
  icon: Icon,
  text
}: BannerFeatureProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
        text-xs
        font-bold
        text-slate-300
      "
    >

      <Icon
        size={15}
      />

      {text}

    </div>
  );
}


export default Register;