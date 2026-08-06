// Retrieve shared employee data from employee-data.js
const employees = window.employeeData || [];

/*
    Each attendance record uses the employee ID as its key.

    Example:
    attendanceRecords["EMP101"] = "Present";
*/
const attendanceRecords = {};

// Select page elements
const attendanceTable = document.getElementById("attendanceTable");

const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById(
    "departmentFilter"
);
const attendanceFilter = document.getElementById(
    "attendanceFilter"
);
const resetFiltersButton = document.getElementById(
    "resetFilters"
);

const currentDateElement = document.getElementById(
    "currentDate"
);
const messageElement = document.getElementById("message");

// Summary count elements
const totalCount = document.getElementById("totalCount");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const halfDayCount = document.getElementById("halfDayCount");
const wfhCount = document.getElementById("wfhCount");

/*
    Display the current date.
*/
function displayCurrentDate() {
    const today = new Date();

    currentDateElement.textContent = today.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );
}

/*
    Add department options dynamically.
*/
function populateDepartmentFilter() {
    const departments = [
        ...new Set(
            employees.map(function (employee) {
                return employee.department;
            })
        )
    ].sort();

    departments.forEach(function (department) {
        const option = document.createElement("option");

        option.value = department;
        option.textContent = department;

        departmentFilter.appendChild(option);
    });
}

/*
    Get the saved attendance status for an employee.
*/
function getAttendanceStatus(employeeId) {
    return attendanceRecords[employeeId] || "Unmarked";
}

/*
    Convert status text into a CSS class.
*/
function getStatusClass(status) {
    if (status === "Present") {
        return "present";
    }

    if (status === "Absent") {
        return "absent";
    }

    if (status === "Half Day") {
        return "half-day";
    }

    if (status === "Work From Home") {
        return "wfh";
    }

    return "unmarked";
}

/*
    Generate initials for employee avatars.
*/
function getInitials(name) {
    return name
        .split(" ")
        .filter(function (word) {
            return word.length > 0;
        })
        .slice(0, 2)
        .map(function (word) {
            return word.charAt(0).toUpperCase();
        })
        .join("");
}

/*
    Render employee attendance rows.
*/
function renderAttendance(employeeList) {
    attendanceTable.innerHTML = "";

    if (employeeList.length === 0) {
        attendanceTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-message">
                    No employee records match the selected filters.
                </td>
            </tr>
        `;

        return;
    }

    employeeList.forEach(function (employee) {
        const status = getAttendanceStatus(employee.id);
        const isMarked = status !== "Unmarked";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <span class="employee-id">
                    ${escapeHTML(employee.id)}
                </span>
            </td>

            <td>
                <div class="employee-name-cell">

                    <div class="employee-avatar">
                        ${getInitials(employee.name)}
                    </div>

                    <span>
                        ${escapeHTML(employee.name)}
                    </span>

                </div>
            </td>

            <td>
                <span class="department-badge">
                    ${escapeHTML(employee.department)}
                </span>
            </td>

            <td>
                <select
                    class="attendance-select"
                    data-employee-id="${employee.id}"
                >
                    <option value="">
                        Select Status
                    </option>

                    <option
                        value="Present"
                        ${status === "Present" ? "selected" : ""}
                    >
                        Present
                    </option>

                    <option
                        value="Absent"
                        ${status === "Absent" ? "selected" : ""}
                    >
                        Absent
                    </option>

                    <option
                        value="Half Day"
                        ${status === "Half Day" ? "selected" : ""}
                    >
                        Half Day
                    </option>

                    <option
                        value="Work From Home"
                        ${
                            status === "Work From Home"
                                ? "selected"
                                : ""
                        }
                    >
                        Work From Home
                    </option>
                </select>
            </td>

            <td>
                <span
                    class="attendance-badge ${getStatusClass(
                        status
                    )}"
                >
                    ${status}
                </span>
            </td>

            <td>
                <div class="action-buttons">

                    <button
                        type="button"
                        class="mark-button"
                        data-action="mark"
                        data-employee-id="${employee.id}"
                        ${isMarked ? "disabled" : ""}
                    >
                        <i class="fa-solid fa-check"></i>
                        Mark
                    </button>

                    <button
                        type="button"
                        class="update-button"
                        data-action="update"
                        data-employee-id="${employee.id}"
                        ${!isMarked ? "disabled" : ""}
                    >
                        <i class="fa-solid fa-pen"></i>
                        Update
                    </button>

                    <button
                        type="button"
                        class="reset-button"
                        data-action="reset"
                        data-employee-id="${employee.id}"
                        ${!isMarked ? "disabled" : ""}
                    >
                        <i class="fa-solid fa-rotate-left"></i>
                        Reset
                    </button>

                </div>
            </td>
        `;

        attendanceTable.appendChild(row);
    });
}

/*
    Apply search and filters.
*/
function applyFilters() {
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    const selectedDepartment = departmentFilter.value;
    const selectedAttendance = attendanceFilter.value;

    const filteredEmployees = employees.filter(
        function (employee) {
            const matchesSearch =
                employee.name
                    .toLowerCase()
                    .includes(searchValue) ||
                employee.id
                    .toLowerCase()
                    .includes(searchValue);

            const matchesDepartment =
                selectedDepartment === "all" ||
                employee.department === selectedDepartment;

            const employeeAttendance =
                getAttendanceStatus(employee.id);

            const matchesAttendance =
                selectedAttendance === "all" ||
                employeeAttendance === selectedAttendance;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesAttendance
            );
        }
    );

    renderAttendance(filteredEmployees);
}

/*
    Update attendance summary cards.
*/
function updateSummary() {
    totalCount.textContent = employees.length;

    const statuses = Object.values(attendanceRecords);

    presentCount.textContent = statuses.filter(
        function (status) {
            return status === "Present";
        }
    ).length;

    absentCount.textContent = statuses.filter(
        function (status) {
            return status === "Absent";
        }
    ).length;

    halfDayCount.textContent = statuses.filter(
        function (status) {
            return status === "Half Day";
        }
    ).length;

    wfhCount.textContent = statuses.filter(
        function (status) {
            return status === "Work From Home";
        }
    ).length;
}

/*
    Get the selected status from the row dropdown.
*/
function getSelectedStatus(employeeId) {
    const select = document.querySelector(
        `.attendance-select[data-employee-id="${employeeId}"]`
    );

    if (!select) {
        return "";
    }

    return select.value;
}

/*
    Mark attendance.

    Duplicate attendance is prevented because the
    Mark button is disabled after attendance is saved.
*/
function markAttendance(employeeId) {
    if (attendanceRecords[employeeId]) {
        showMessage(
            "Attendance has already been marked. Use Update instead.",
            "error"
        );

        return;
    }

    const selectedStatus = getSelectedStatus(employeeId);

    if (selectedStatus === "") {
        showMessage(
            "Please select an attendance status.",
            "error"
        );

        return;
    }

    attendanceRecords[employeeId] = selectedStatus;

    const employee = employees.find(function (item) {
        return item.id === employeeId;
    });

    showMessage(
        `${employee.name}'s attendance was marked as ${selectedStatus}.`,
        "success"
    );

    updateSummary();
    applyFilters();
}

/*
    Update previously marked attendance.
*/
function updateAttendance(employeeId) {
    if (!attendanceRecords[employeeId]) {
        showMessage(
            "Attendance has not been marked yet.",
            "error"
        );

        return;
    }

    const selectedStatus = getSelectedStatus(employeeId);

    if (selectedStatus === "") {
        showMessage(
            "Please select an attendance status.",
            "error"
        );

        return;
    }

    attendanceRecords[employeeId] = selectedStatus;

    const employee = employees.find(function (item) {
        return item.id === employeeId;
    });

    showMessage(
        `${employee.name}'s attendance was updated to ${selectedStatus}.`,
        "success"
    );

    updateSummary();
    applyFilters();
}

/*
    Reset attendance for one employee.
*/
function resetAttendance(employeeId) {
    if (!attendanceRecords[employeeId]) {
        showMessage(
            "There is no attendance record to reset.",
            "error"
        );

        return;
    }

    const employee = employees.find(function (item) {
        return item.id === employeeId;
    });

    const confirmation = confirm(
        `Reset attendance for ${employee.name}?`
    );

    if (!confirmation) {
        return;
    }

    delete attendanceRecords[employeeId];

    showMessage(
        `${employee.name}'s attendance was reset.`,
        "success"
    );

    updateSummary();
    applyFilters();
}

/*
    Use event delegation for attendance buttons.
*/
attendanceTable.addEventListener("click", function (event) {
    const button = event.target.closest(
        "button[data-action]"
    );

    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const employeeId = button.dataset.employeeId;

    if (action === "mark") {
        markAttendance(employeeId);
    }

    if (action === "update") {
        updateAttendance(employeeId);
    }

    if (action === "reset") {
        resetAttendance(employeeId);
    }
});

/*
    Search and filter events.
*/
searchInput.addEventListener("input", applyFilters);

departmentFilter.addEventListener(
    "change",
    applyFilters
);

attendanceFilter.addEventListener(
    "change",
    applyFilters
);

/*
    Reset all filters.
*/
resetFiltersButton.addEventListener(
    "click",
    function () {
        searchInput.value = "";
        departmentFilter.value = "all";
        attendanceFilter.value = "all";

        applyFilters();
    }
);

/*
    Display feedback message.
*/
function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message show ${type}`;

    clearTimeout(showMessage.timer);

    showMessage.timer = setTimeout(function () {
        messageElement.textContent = "";
        messageElement.className = "message";
    }, 3500);
}

/*
    Escape user-controlled HTML.
*/
function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/*
    Initialize the attendance page.
*/
displayCurrentDate();
populateDepartmentFilter();
updateSummary();
applyFilters();
