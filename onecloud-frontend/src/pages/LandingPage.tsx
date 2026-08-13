import FooterSection
  from "../components/landing-page/FooterSection";

import HeroSection
  from "../components/landing-page/HeroSection";

import ModulesSection
  from "../components/landing-page/ModulesSection";

import Navbar
  from "../components/landing-page/Navbar";

import TechnologySection
  from "../components/landing-page/TechnologySection";


function LandingPage() {

  return (

    <>

      <Navbar />

      <main>

        <HeroSection />

        <ModulesSection />

        <section
          id="solutions"
          className="
            bg-slate-950
            py-20
            text-white
          "
        >

          <div
            className="
              mx-auto
              max-w-[1500px]
              px-5
              text-center
              sm:px-8
              lg:px-12
            "
          >

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.2em]
                text-blue-400
              "
            >
              Flexible Deployment
            </p>


            <h2
              className="
                mx-auto
                mt-4
                max-w-4xl
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Deploy OneCloud the way
              your enterprise needs
            </h2>


            <div
              className="
                mt-10
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              <DeploymentCard
                title="SaaS Platform"
              />

              <DeploymentCard
                title="Private Cloud"
              />

              <DeploymentCard
                title="Hybrid Cloud"
              />

              <DeploymentCard
                title="On-Premises"
              />

            </div>

          </div>

        </section>

        <TechnologySection />

      </main>

      <FooterSection />

    </>
  );
}


interface DeploymentCardProps {
  title: string;
}


function DeploymentCard({
  title
}: DeploymentCardProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-5
        py-6
        font-bold
        text-slate-200
        backdrop-blur
      "
    >
      {title}
    </div>
  );
}


export default LandingPage;