import type {
  LucideIcon
} from "lucide-react";

import {
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  UserPlus,
  Users
} from "lucide-react";


interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;

  type:
    | "blue"
    | "green"
    | "orange"
    | "purple";
}


const activities:
  ActivityItem[] = [

    {
      id: 1,
      title: "New employee added",
      description:
        "Rahul Kumar joined Development.",
      time: "10 minutes ago",
      icon: UserPlus,
      type: "blue"
    },

    {
      id: 2,
      title: "Leave approved",
      description:
        "Priya Sharma's leave request was approved.",
      time: "35 minutes ago",
      icon: CheckCircle2,
      type: "green"
    },

    {
      id: 3,
      title: "Attendance updated",
      description:
        "Today's employee attendance was updated.",
      time: "1 hour ago",
      icon: CalendarCheck2,
      type: "orange"
    },

    {
      id: 4,
      title: "Employee directory updated",
      description:
        "Employee information was modified.",
      time: "2 hours ago",
      icon: Users,
      type: "purple"
    }

  ];


const colorClasses = {

  blue:
    "bg-blue-50 text-blue-600",

  green:
    "bg-emerald-50 text-emerald-600",

  orange:
    "bg-orange-50 text-orange-600",

  purple:
    "bg-purple-50 text-purple-600"

};


function RecentActivity() {

  return (

    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-slate-100
          px-6
          py-5
        "
      >

        <div>

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.16em]
              text-blue-600
            "
          >
            Activity
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-black
              text-slate-950
            "
          >
            Recent Activity
          </h2>

        </div>


        <Clock3
          size={20}
          className="
            text-slate-400
          "
        />

      </div>


      {/* Activities */}

      <div
        className="
          divide-y
          divide-slate-100
        "
      >

        {
          activities.map(
            (activity) => {

              const Icon =
                activity.icon;


              return (

                <div
                  key={activity.id}
                  className="
                    flex
                    gap-4
                    px-6
                    py-5
                    transition
                    hover:bg-slate-50
                  "
                >

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        colorClasses[
                          activity.type
                        ]
                      }
                    `}
                  >

                    <Icon
                      size={18}
                    />

                  </div>


                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-black
                        text-slate-800
                      "
                    >
                      {activity.title}
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      {
                        activity.description
                      }
                    </p>


                    <p
                      className="
                        mt-2
                        text-[10px]
                        font-semibold
                        text-slate-400
                      "
                    >
                      {activity.time}
                    </p>

                  </div>

                </div>

              );
            }
          )
        }

      </div>

    </section>
  );
}


export default RecentActivity;
