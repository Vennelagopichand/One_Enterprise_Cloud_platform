const employeeSelect =
    document.getElementById("employeeSelect");

const profilePhoto =
    document.getElementById("profilePhoto");

const photoFallback =
    document.getElementById("photoFallback");

const profileStatus =
    document.getElementById("profileStatus");

const profileName =
    document.getElementById("profileName");

const profileRole =
    document.getElementById("profileRole");

const profileEmail =
    document.getElementById("profileEmail");

const profilePhone =
    document.getElementById("profilePhone");

const detailsGrid =
    document.getElementById("detailsGrid");

const reportGrid =
    document.getElementById("reportGrid");

const leaveHistory =
    document.getElementById("leaveHistory");

const downloadButton =
    document.getElementById("downloadButton");


/*
    Generate initials.

    Example:
    Aarav Kumar -> AK
*/
function getInitials(name) {

    return String(name)
        .trim()
        .split(/\s+/)
        .filter(function (word) {

            return word.length > 0;
        })
        .slice(0, 2)
        .map(function (word) {

            return word
                .charAt(0)
                .toUpperCase();
        })
        .join("");
}


/*
    Populate the employee selector.
*/
function populateEmployeeSelector() {

    employeeSelect.innerHTML = "";

    HRMS.employees.forEach(
        function (employee) {

            const option =
                document.createElement("option");

            option.value =
                employee.id;

            option.textContent =
                `${employee.id} - ${employee.name}`;

            employeeSelect.appendChild(
                option
            );
        }
    );
}


/*
    Update the profile image.
*/
function updateProfilePhoto(employee) {

    const initials =
        getInitials(employee.name);

    photoFallback.textContent =
        initials;

    /*
        Initially show fallback
        until the image successfully loads.
    */
    profilePhoto.classList.remove(
        "loaded"
    );

    if (!employee.photo) {

        profilePhoto.removeAttribute(
            "src"
        );

        return;
    }

    profilePhoto.alt =
        `${employee.name} profile photo`;

    profilePhoto.src =
        employee.photo;
}


/*
    Profile image loaded successfully.
*/
profilePhoto.addEventListener(
    "load",
    function () {

        profilePhoto.classList.add(
            "loaded"
        );
    }
);


/*
    Profile image failed to load.

    The initials fallback remains visible.
*/
profilePhoto.addEventListener(
    "error",
    function () {

        profilePhoto.classList.remove(
            "loaded"
        );

        console.warn(
            "Unable to load employee image:",
            profilePhoto.src
        );
    }
);


/*
    Calculate attendance report.
*/
function calculateAttendanceReport(
    employee,
    approvedLeaveDays
) {

    const totalWorkingDays = 220;

    const todayAttendance =
        HRMS.attendance[employee.id];

    let presentDays =
        totalWorkingDays;


    if (
        todayAttendance === "Absent"
    ) {

        presentDays -= 1;

    } else if (
        todayAttendance === "Half Day"
    ) {

        presentDays -= 0.5;
    }


    /*
        Approved leave days are deducted
        from present days in this simulation.
    */
    presentDays -= approvedLeaveDays;


    presentDays =
        Math.max(
            0,
            presentDays
        );


    const attendancePercentage =
        (
            (
                presentDays /
                totalWorkingDays
            ) * 100
        ).toFixed(1);


    return {

        totalWorkingDays:
            totalWorkingDays,

        presentDays:
            presentDays,

        attendancePercentage:
            attendancePercentage
    };
}


/*
    Render employee profile.
*/
function renderProfile() {

    const employees =
        HRMS.employees;


    if (employees.length === 0) {

        return;
    }


    const employee =
        employees.find(
            function (item) {

                return (
                    item.id ===
                    employeeSelect.value
                );
            }
        ) || employees[0];


    employeeSelect.value =
        employee.id;


    /*
        Update profile photo.
    */
    updateProfilePhoto(
        employee
    );


    /*
        Basic employee information.
    */
    profileName.textContent =
        employee.name;


    profileRole.textContent =
        `${employee.designation} • ${employee.department}`;


    profileEmail.textContent =
        employee.email;


    profilePhone.textContent =
        employee.phone ||
        "Not available";


    /*
        Active / Inactive badge.
    */
    profileStatus.textContent =
        employee.status;


    profileStatus.className =
        `profile-status ${
            employee.status
                .toLowerCase()
        }`;


    /*
        Retrieve leave history.
    */
    const employeeLeaves =
        HRMS.leaveRequests.filter(
            function (leave) {

                return (
                    leave.employeeId ===
                    employee.id
                );
            }
        );


    /*
        Calculate approved leave days.
    */
    const approvedLeaveDays =
        employeeLeaves
            .filter(
                function (leave) {

                    return (
                        leave.status ===
                        "Approved"
                    );
                }
            )
            .reduce(
                function (
                    total,
                    leave
                ) {

                    return (
                        total +
                        Number(
                            leave.totalDays
                        )
                    );
                },
                0
            );


    /*
        Leave Balance.

        Simulated yearly allocation:
        24 days.
    */
    const annualLeaveBalance =
        24;


    const remainingLeaveBalance =
        Math.max(
            0,
            annualLeaveBalance -
            approvedLeaveDays
        );


    /*
        Calculate attendance statistics.
    */
    const report =
        calculateAttendanceReport(
            employee,
            approvedLeaveDays
        );


    /*
        Employee details.
    */
    const employeeDetails = [

        {
            label:
                "Employee ID",

            value:
                employee.id,

            icon:
                "fa-id-card"
        },

        {
            label:
                "Name",

            value:
                employee.name,

            icon:
                "fa-user"
        },

        {
            label:
                "Department",

            value:
                employee.department,

            icon:
                "fa-building"
        },

        {
            label:
                "Designation",

            value:
                employee.designation,

            icon:
                "fa-briefcase"
        },

        {
            label:
                "Email",

            value:
                employee.email,

            icon:
                "fa-envelope"
        },

        {
            label:
                "Phone Number",

            value:
                employee.phone ||
                "Not available",

            icon:
                "fa-phone"
        },

        {
            label:
                "Joining Date",

            value:
                employee.joiningDate ||
                "Not available",

            icon:
                "fa-calendar-days"
        },

        {
            label:
                "Attendance Percentage",

            value:
                `${
                    report.attendancePercentage
                }%`,

            icon:
                "fa-chart-line"
        },

        {
            label:
                "Leave Balance",

            value:
                `${remainingLeaveBalance} days`,

            icon:
                "fa-calendar-check"
        }
    ];


    detailsGrid.innerHTML =
        employeeDetails
            .map(
                function (detail) {

                    return `

                        <div class="detail-box">

                            <div class="detail-box-icon">

                                <i
                                    class="fa-solid ${detail.icon}"
                                ></i>

                            </div>

                            <div>

                                <small>
                                    ${detail.label}
                                </small>

                                <strong>
                                    ${detail.value}
                                </strong>

                            </div>

                        </div>
                    `;
                }
            )
            .join("");


    /*
        Report cards.
    */
    const reports = [

        {
            title:
                "Total Working Days",

            value:
                report.totalWorkingDays,

            icon:
                "fa-calendar"
        },

        {
            title:
                "Present Days",

            value:
                report.presentDays,

            icon:
                "fa-user-check"
        },

        {
            title:
                "Leave Days",

            value:
                approvedLeaveDays,

            icon:
                "fa-plane-departure"
        },

        {
            title:
                "Attendance Percentage",

            value:
                `${
                    report.attendancePercentage
                }%`,

            icon:
                "fa-chart-pie"
        }
    ];


    reportGrid.innerHTML =
        reports
            .map(
                function (reportItem) {

                    return `

                        <article
                            class="card report-card"
                        >

                            <div
                                class="report-icon"
                            >

                                <i
                                    class="fa-solid ${reportItem.icon}"
                                ></i>

                            </div>

                            <small>
                                ${reportItem.title}
                            </small>

                            <strong>
                                ${reportItem.value}
                            </strong>

                        </article>
                    `;
                }
            )
            .join("");


    /*
        Leave history.
    */
    renderLeaveHistory(
        employeeLeaves
    );
}


/*
    Render leave history table.
*/
function renderLeaveHistory(
    employeeLeaves
) {

    if (
        employeeLeaves.length === 0
    ) {

        leaveHistory.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty-table-message"
                >
                    No leave history found for this employee.
                </td>

            </tr>
        `;

        return;
    }


    leaveHistory.innerHTML =
        employeeLeaves
            .map(
                function (leave) {

                    const statusClass =
                        leave.status
                            .toLowerCase();


                    return `

                        <tr>

                            <td>
                                ${leave.leaveType}
                            </td>

                            <td>
                                ${leave.fromDate}
                            </td>

                            <td>
                                ${leave.toDate}
                            </td>

                            <td>
                                ${leave.totalDays}
                            </td>

                            <td>

                                <span
                                    class="badge ${statusClass}"
                                >
                                    ${leave.status}
                                </span>

                            </td>

                        </tr>
                    `;
                }
            )
            .join("");
}


/*
    Change selected employee.
*/
employeeSelect.addEventListener(
    "change",
    renderProfile
);


/*
    Download button is UI-only.
*/
downloadButton.addEventListener(
    "click",
    function () {

        alert(
            "Download Profile is a UI-only feature for this task."
        );
    }
);


/*
    Initialize page.
*/
populateEmployeeSelector();

renderProfile();