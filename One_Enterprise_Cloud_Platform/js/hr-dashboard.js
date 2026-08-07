const statsContainer =
    document.getElementById("stats");

const activityTable =
    document.getElementById("activityTable");

const currentDate =
    document.getElementById("currentDate");


/* Current date */

currentDate.textContent =
    new Date().toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );


function renderDashboard() {

    const employees =
        HRMS.employees;

    const attendance =
        HRMS.attendance;

    const leaves =
        HRMS.leaveRequests;


    /* Total Employees */

    const totalEmployees =
        employees.length;


    /* Present Today */

    const presentToday =
        Object.values(attendance)
            .filter(
                function (status) {

                    return (
                        status === "Present" ||
                        status ===
                            "Work From Home"
                    );
                }
            )
            .length;


    /* Employees currently on approved leave */

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const employeesOnLeave =
        leaves.filter(
            function (leave) {

                if (
                    leave.status !==
                    "Approved"
                ) {
                    return false;
                }


                const start =
                    new Date(
                        leave.fromDate +
                        "T00:00:00"
                    );

                const end =
                    new Date(
                        leave.toDate +
                        "T23:59:59"
                    );


                return (
                    today >= start &&
                    today <= end
                );
            }
        ).length;


    /* Pending leave requests */

    const pendingLeaves =
        leaves.filter(
            function (leave) {

                return leave.status ===
                    "Pending";
            }
        ).length;


    /* Departments */

    const totalDepartments =
        new Set(
            employees.map(
                function (employee) {

                    return employee.department;
                }
            )
        ).size;


    /* Active Employees */

    const activeEmployees =
        employees.filter(
            function (employee) {

                return employee.status ===
                    "Active";
            }
        ).length;


    const dashboardCards = [

        {
            title:
                "Total Employees",

            value:
                totalEmployees,

            icon:
                "fa-users"
        },

        {
            title:
                "Present Today",

            value:
                presentToday,

            icon:
                "fa-user-check"
        },

        {
            title:
                "Employees on Leave",

            value:
                employeesOnLeave,

            icon:
                "fa-plane"
        },

        {
            title:
                "Pending Leave Requests",

            value:
                pendingLeaves,

            icon:
                "fa-clock"
        },

        {
            title:
                "Departments",

            value:
                totalDepartments,

            icon:
                "fa-building"
        },

        {
            title:
                "Active Employees",

            value:
                activeEmployees,

            icon:
                "fa-circle-check"
        }
    ];


    statsContainer.innerHTML =
        dashboardCards
            .map(
                function (card) {

                    return `

                        <article
                            class="card summary-card"
                        >

                            <i
                                class="fa-solid ${card.icon}"
                            ></i>

                            <div>

                                <small>
                                    ${card.title}
                                </small>

                                <strong>
                                    ${card.value}
                                </strong>

                            </div>

                        </article>
                    `;
                }
            )
            .join("");


    renderActivities(
        employees,
        leaves
    );
}


function renderActivities(
    employees,
    leaves
) {

    let activities =
        HRMS.activities();


    /*
        If there are no stored activities,
        display example activities from
        existing shared data.
    */

    if (activities.length === 0) {

        activities = [];


        employees
            .slice(-3)
            .reverse()
            .forEach(
                function (employee) {

                    activities.push({

                        type:
                            "Employee",

                        text:
                            `${employee.name} is available in the employee directory`,

                        time:
                            new Date()
                                .toISOString()
                    });
                }
            );


        leaves
            .slice(-3)
            .reverse()
            .forEach(
                function (leave) {

                    activities.push({

                        type:
                            "Leave",

                        text:
                            `${leave.employeeName} requested ${leave.leaveType}`,

                        time:
                            leave.createdAt
                    });
                }
            );
    }


    if (activities.length === 0) {

        activityTable.innerHTML = `

            <tr>

                <td
                    colspan="3"
                    style="
                        text-align:center;
                        padding:40px;
                    "
                >
                    No recent activities.
                </td>

            </tr>
        `;

        return;
    }


    activityTable.innerHTML =
        activities
            .slice(0, 10)
            .map(
                function (activity) {

                    return `

                        <tr>

                            <td>
                                ${activity.type}
                            </td>

                            <td>
                                ${activity.text}
                            </td>

                            <td>
                                ${
                                    new Date(
                                        activity.time
                                    )
                                    .toLocaleString()
                                }
                            </td>

                        </tr>
                    `;
                }
            )
            .join("");
}


renderDashboard();