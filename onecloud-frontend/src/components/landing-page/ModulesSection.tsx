import {
  BarChart3,
  Boxes,
  BrainCircuit,
  Handshake,
  Landmark,
  Users
} from "lucide-react";

import ModuleCard
  from "./ModuleCard";


const modules = [

  {
    name: "HRMS",

    description:
      "Manage employees, attendance, leave, payroll and workforce operations from a unified HR platform.",

    icon: Users,

    features: [
      "Employees",
      "Attendance",
      "Leave"
    ]
  },

  {
    name: "CRM",

    description:
      "Manage customer relationships, leads, opportunities and sales pipelines through intelligent workflows.",

    icon: Handshake,

    features: [
      "Customers",
      "Leads",
      "Sales"
    ]
  },

  {
    name: "ERP",

    description:
      "Connect enterprise resources, procurement, inventory and operations through centralized business processes.",

    icon: Boxes,

    features: [
      "Operations",
      "Inventory",
      "Procurement"
    ]
  },

  {
    name: "Finance",

    description:
      "Manage accounting, expenses, financial reporting, budgets and enterprise financial operations.",

    icon: Landmark,

    features: [
      "Accounts",
      "Expenses",
      "Budgets"
    ]
  },

  {
    name: "AI Platform",

    description:
      "Use enterprise artificial intelligence to automate workflows, analyze data and improve business decisions.",

    icon: BrainCircuit,

    features: [
      "Automation",
      "AI Insights",
      "Prediction"
    ]
  },

  {
    name: "Analytics",

    description:
      "Transform enterprise data into interactive dashboards, reports and actionable business intelligence.",

    icon: BarChart3,

    features: [
      "Reports",
      "KPIs",
      "Dashboards"
    ]
  }

];


function ModulesSection() {

  return (

    <section
      id="modules"
      className="
        bg-slate-50
        py-24
      "
    >

      <div
        className="
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* Heading */}

        <div
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >

          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.2em]
              text-blue-600
            "
          >
            One Unified Platform
          </p>


          <h2
            className="
              mt-4
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            "
          >
            Enterprise modules built to work together
          </h2>


          <p
            className="
              mt-6
              leading-8
              text-slate-500
            "
          >
            OneCloud brings workforce,
            customers, finance, operations,
            artificial intelligence and analytics
            into one connected enterprise ecosystem.
          </p>

        </div>


        {/* Module Cards */}

        <div
          className="
            mt-14
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {
            modules.map(
              (module) => (

                <ModuleCard
                  key={module.name}
                  icon={module.icon}
                  name={module.name}
                  description={
                    module.description
                  }
                  features={
                    module.features
                  }
                />

              )
            )
          }

        </div>

      </div>

    </section>
  );
}


export default ModulesSection;