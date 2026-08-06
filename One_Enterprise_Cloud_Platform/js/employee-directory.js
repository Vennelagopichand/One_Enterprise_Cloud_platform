

// Retrieve the shared employee array.
const employees = Array.isArray(window.employeeData)
    ? window.employeeData
    : [];

// Select required HTML elements.
const employeeGrid = document.getElementById("employeeGrid");
const emptyState = document.getElementById("emptyState");
const employeeCount = document.getElementById("employeeCount");

const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const designationFilter = document.getElementById(
    "designationFilter"
);
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");
const resetFiltersButton = document.getElementById(
    "resetFilters"
);

/*
    Check whether all required HTML elements exist.
*/
function validatePageElements() {
    const requiredElements = [
        employeeGrid,
        emptyState,
        employeeCount,
        searchInput,
        departmentFilter,
        designationFilter,
        statusFilter,
        sortFilter,
        resetFiltersButton
    ];

    const missingElement = requiredElements.some(function (element) {
        return element === null;
    });

    if (missingElement) {
        console.error(
            "Employee Directory: One or more required HTML elements are missing."
        );

        return false;
    }

    return true;
}

/*
    Escape text before inserting it into HTML.
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
    Generate employee initials for image fallback.
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
            return word.charAt(0).toUpperCase();
        })
        .join("");
}

/*
    Return a safe CSS class for employee status.
*/
function getStatusClass(status) {
    return String(status).toLowerCase() === "active"
        ? "active"
        : "inactive";
}

/*
    Add unique values to a filter dropdown.
*/
function populateFilterOptions(
    selectElement,
    values
) {
    const uniqueValues = [...new Set(values)]
        .filter(function (value) {
            return value && value.trim() !== "";
        })
        .sort(function (firstValue, secondValue) {
            return firstValue.localeCompare(secondValue);
        });

    uniqueValues.forEach(function (value) {
        const option = document.createElement("option");

        option.value = value;
        option.textContent = value;

        selectElement.appendChild(option);
    });
}

/*
    Render employee cards.
*/
function renderEmployees(employeeList) {
    employeeGrid.innerHTML = "";

    employeeCount.textContent = employeeList.length;

    if (employeeList.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    employeeList.forEach(function (employee) {
        const card = document.createElement("article");

        card.className = "employee-card";

        const safeName = escapeHTML(employee.name);
        const safeId = escapeHTML(employee.id);
        const safeDepartment = escapeHTML(
            employee.department
        );
        const safeDesignation = escapeHTML(
            employee.designation
        );
        const safeEmail = escapeHTML(employee.email);
        const safePhoto = escapeHTML(employee.photo || "");
        const safeStatus = escapeHTML(employee.status);
        const statusClass = getStatusClass(
            employee.status
        );
        const initials = getInitials(employee.name);

        card.innerHTML = `
            <div class="employee-card-header">

                <div class="photo-wrapper">

                    <div
                        class="photo-fallback"
                        aria-hidden="true"
                    >
                        ${initials}
                    </div>

                    <img
                        class="employee-photo"
                        src="${safePhoto}"
                        alt="${safeName}"
                        loading="lazy"
                    >

                </div>

                <span
                    class="status-badge ${statusClass}"
                >
                    <span class="status-dot"></span>
                    ${safeStatus}
                </span>

            </div>

            <div class="employee-main-info">

                <h2>${safeName}</h2>

                <span class="employee-id">
                    <i class="fa-solid fa-id-card"></i>
                    ${safeId}
                </span>

            </div>

            <div class="employee-details">

                <div class="detail-row">

                    <span class="detail-icon">
                        <i class="fa-solid fa-building"></i>
                    </span>

                    <div class="detail-content">

                        <small>Department</small>

                        <p>${safeDepartment}</p>

                    </div>

                </div>

                <div class="detail-row">

                    <span class="detail-icon">
                        <i class="fa-solid fa-briefcase"></i>
                    </span>

                    <div class="detail-content">

                        <small>Designation</small>

                        <p>${safeDesignation}</p>

                    </div>

                </div>

                <div class="detail-row">

                    <span class="detail-icon">
                        <i class="fa-solid fa-envelope"></i>
                    </span>

                    <div class="detail-content email-detail">

                        <small>Email Address</small>

                        <a href="mailto:${safeEmail}">
                            ${safeEmail}
                        </a>

                    </div>

                </div>

            </div>
        `;

        const employeePhoto = card.querySelector(
            ".employee-photo"
        );

        /*
            If the image loads successfully, show it.
        */
        employeePhoto.addEventListener(
            "load",
            function () {
                employeePhoto.classList.add(
                    "image-loaded"
                );
            }
        );

        /*
            If the image fails, hide it and display initials.
        */
        employeePhoto.addEventListener(
            "error",
            function () {
                employeePhoto.classList.add(
                    "image-error"
                );

                console.warn(
                    `Unable to load employee image: ${employee.photo}`
                );
            }
        );

        employeeGrid.appendChild(card);
    });
}

/*
    Extract the numeric portion of employee IDs.

    EMP101 becomes 101.
*/
function getEmployeeIdNumber(employeeId) {
    const numericPart = String(employeeId).replace(
        /\D/g,
        ""
    );

    return Number(numericPart) || 0;
}

/*
    Sort employee records.
*/
function sortEmployees(employeeList, sortValue) {
    const sortedEmployees = [...employeeList];

    sortedEmployees.sort(
        function (firstEmployee, secondEmployee) {
            switch (sortValue) {
                case "name-asc":
                    return firstEmployee.name.localeCompare(
                        secondEmployee.name
                    );

                case "name-desc":
                    return secondEmployee.name.localeCompare(
                        firstEmployee.name
                    );

                case "id-desc":
                    return (
                        getEmployeeIdNumber(
                            secondEmployee.id
                        ) -
                        getEmployeeIdNumber(
                            firstEmployee.id
                        )
                    );

                case "id-asc":
                default:
                    return (
                        getEmployeeIdNumber(
                            firstEmployee.id
                        ) -
                        getEmployeeIdNumber(
                            secondEmployee.id
                        )
                    );
            }
        }
    );

    return sortedEmployees;
}

/*
    Apply search, filters and sorting.
*/
function applyFilters() {
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    const selectedDepartment =
        departmentFilter.value;

    const selectedDesignation =
        designationFilter.value;

    const selectedStatus = statusFilter.value;
    const selectedSort = sortFilter.value;

    const filteredEmployees = employees.filter(
        function (employee) {
            const employeeName = String(employee.name)
                .toLowerCase();

            const employeeId = String(employee.id)
                .toLowerCase();

            const matchesSearch =
                employeeName.includes(searchValue) ||
                employeeId.includes(searchValue);

            const matchesDepartment =
                selectedDepartment === "all" ||
                employee.department ===
                    selectedDepartment;

            const matchesDesignation =
                selectedDesignation === "all" ||
                employee.designation ===
                    selectedDesignation;

            const matchesStatus =
                selectedStatus === "all" ||
                employee.status === selectedStatus;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesDesignation &&
                matchesStatus
            );
        }
    );

    const sortedEmployees = sortEmployees(
        filteredEmployees,
        selectedSort
    );

    renderEmployees(sortedEmployees);
}

/*
    Reset all filters and use Employee ID ascending.
*/
function resetAllFilters() {
    searchInput.value = "";

    departmentFilter.value = "all";
    designationFilter.value = "all";
    statusFilter.value = "all";
    sortFilter.value = "id-asc";

    applyFilters();

    searchInput.focus();
}

/*
    Initialize the directory page.
*/
function initializeEmployeeDirectory() {
    if (!validatePageElements()) {
        return;
    }

    populateFilterOptions(
        departmentFilter,
        employees.map(function (employee) {
            return employee.department;
        })
    );

    populateFilterOptions(
        designationFilter,
        employees.map(function (employee) {
            return employee.designation;
        })
    );

    /*
        Display employees in this order by default:

        EMP101, EMP102, EMP103, EMP104,
        EMP105, EMP106, EMP107, EMP108
    */
    sortFilter.value = "id-asc";

    searchInput.addEventListener(
        "input",
        applyFilters
    );

    departmentFilter.addEventListener(
        "change",
        applyFilters
    );

    designationFilter.addEventListener(
        "change",
        applyFilters
    );

    statusFilter.addEventListener(
        "change",
        applyFilters
    );

    sortFilter.addEventListener(
        "change",
        applyFilters
    );

    resetFiltersButton.addEventListener(
        "click",
        resetAllFilters
    );

    applyFilters();
}

initializeEmployeeDirectory();