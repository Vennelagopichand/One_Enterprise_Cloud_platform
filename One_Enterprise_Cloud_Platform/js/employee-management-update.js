// Store all employee objects.
let employees = [];

// -1 means no employee is being edited.
let editIndex = -1;

// Stores the employee index selected for deletion.
let deleteIndex = -1;

// Select HTML elements.
const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");
const totalEmployees = document.getElementById("totalEmployees");

const submitButton = document.getElementById("submitButton");
const submitButtonText = submitButton.querySelector("span");

const cancelButton = document.getElementById("cancelButton");
const resetButton = document.getElementById("resetButton");

const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");

const deleteModal = document.getElementById("deleteModal");
const deleteMessage = document.getElementById("deleteMessage");
const confirmDeleteButton = document.getElementById(
    "confirmDeleteButton"
);
const cancelDeleteButton = document.getElementById(
    "cancelDeleteButton"
);

// Form submission handles both Create and Update.
employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const employeeData = getFormData();

    if (!employeeData) {
        return;
    }

    const duplicateId = employees.some(function (employee, index) {
        return (
            employee.id.toLowerCase() ===
                employeeData.id.toLowerCase() &&
            index !== editIndex
        );
    });

    if (duplicateId) {
        showMessage(
            "Employee ID already exists. Please use a unique ID.",
            "error"
        );

        document.getElementById("empId").focus();

        return;
    }

    if (editIndex === -1) {
        // CREATE operation.
        employees.push(employeeData);

        showMessage(
            `${employeeData.name} was added successfully.`,
            "success"
        );
    } else {
        // UPDATE operation.
        employees[editIndex] = employeeData;

        showMessage(
            `${employeeData.name} was updated successfully.`,
            "success"
        );
    }

    resetFormMode();
    renderEmployees();
});

// Read and validate the form data.
function getFormData() {
    const id = document.getElementById("empId").value.trim();
    const name = document.getElementById("empName").value.trim();
    const department = document.getElementById("department").value;
    const designation = document
        .getElementById("designation")
        .value.trim();
    const email = document.getElementById("email").value.trim();

    if (
        id === "" ||
        name === "" ||
        department === "" ||
        designation === "" ||
        email === ""
    ) {
        showMessage(
            "Please complete all employee fields.",
            "error"
        );

        return null;
    }

    return {
        id: id,
        name: name,
        department: department,
        designation: designation,
        email: email
    };
}

// READ operation: display employees in the table.
function renderEmployees(employeeList = employees) {
    employeeTable.innerHTML = "";

    if (employeeList.length === 0) {
        employeeTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-message">
                    No employee records found.
                </td>
            </tr>
        `;

        updateEmployeeCount();

        return;
    }

    employeeList.forEach(function (employee) {
        const originalIndex = employees.indexOf(employee);

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
                ${escapeHTML(employee.designation)}
            </td>

            <td>
                <a
                    href="mailto:${escapeHTML(employee.email)}"
                    class="email-link"
                >
                    ${escapeHTML(employee.email)}
                </a>
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        type="button"
                        class="edit-button"
                        data-action="edit"
                        data-index="${originalIndex}"
                    >

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>

                    <button
                        type="button"
                        class="delete-button"
                        data-action="delete"
                        data-index="${originalIndex}"
                    >

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </td>
        `;

        employeeTable.appendChild(row);
    });

    updateEmployeeCount();
}

// Event delegation for table Edit and Delete buttons.
employeeTable.addEventListener("click", function (event) {
    const actionButton = event.target.closest(
        "button[data-action]"
    );

    if (!actionButton) {
        return;
    }

    const action = actionButton.dataset.action;
    const index = Number(actionButton.dataset.index);

    if (action === "edit") {
        editEmployee(index);
    }

    if (action === "delete") {
        openDeleteModal(index);
    }
});

// UPDATE: fill the form with selected employee data.
function editEmployee(index) {
    const employee = employees[index];

    if (!employee) {
        showMessage("Employee record was not found.", "error");
        return;
    }

    document.getElementById("empId").value = employee.id;
    document.getElementById("empName").value = employee.name;
    document.getElementById("department").value =
        employee.department;
    document.getElementById("designation").value =
        employee.designation;
    document.getElementById("email").value = employee.email;

    editIndex = index;

    formTitle.textContent = "Update Employee";

    submitButtonText.textContent = "Update Employee";

    submitButton.querySelector("i").className =
        "fa-solid fa-floppy-disk";

    submitButton.classList.add("update-mode");

    cancelButton.classList.remove("hidden");

    employeeForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    document.getElementById("empName").focus();

    showMessage(
        `Editing ${employee.name}. Update the details and click Update Employee.`,
        "success"
    );
}

// Open custom delete confirmation modal.
function openDeleteModal(index) {
    const employee = employees[index];

    if (!employee) {
        showMessage("Employee record was not found.", "error");
        return;
    }

    deleteIndex = index;

    deleteMessage.textContent =
        `Are you sure you want to delete ${employee.name}? ` +
        "This action cannot be undone.";

    deleteModal.classList.remove("hidden");

    confirmDeleteButton.focus();
}

// DELETE operation.
confirmDeleteButton.addEventListener("click", function () {
    if (deleteIndex < 0 || !employees[deleteIndex]) {
        closeDeleteModal();
        return;
    }

    const deletedEmployee = employees[deleteIndex];

    employees.splice(deleteIndex, 1);

    if (editIndex === deleteIndex) {
        resetFormMode();
    } else if (editIndex > deleteIndex) {
        editIndex--;
    }

    showMessage(
        `${deletedEmployee.name} was deleted successfully.`,
        "success"
    );

    closeDeleteModal();

    searchInput.value = "";

    renderEmployees();
});

// Close modal without deleting.
cancelDeleteButton.addEventListener(
    "click",
    closeDeleteModal
);

deleteModal.addEventListener("click", function (event) {
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        !deleteModal.classList.contains("hidden")
    ) {
        closeDeleteModal();
    }
});

function closeDeleteModal() {
    deleteIndex = -1;
    deleteModal.classList.add("hidden");
}

// Cancel update mode.
cancelButton.addEventListener("click", function () {
    resetFormMode();

    showMessage(
        "Employee update was cancelled.",
        "success"
    );
});

// Reset button behaviour.
resetButton.addEventListener("click", function () {
    setTimeout(function () {
        resetFormMode();
        clearMessage();
    }, 0);
});

// Reset form and return to Create mode.
function resetFormMode() {
    employeeForm.reset();

    editIndex = -1;

    formTitle.textContent = "Add New Employee";

    submitButtonText.textContent = "Add Employee";

    submitButton.querySelector("i").className =
        "fa-solid fa-user-plus";

    submitButton.classList.remove("update-mode");

    cancelButton.classList.add("hidden");
}

// Search employees by any displayed field.
searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    const filteredEmployees = employees.filter(
        function (employee) {
            return (
                employee.id.toLowerCase().includes(searchValue) ||
                employee.name
                    .toLowerCase()
                    .includes(searchValue) ||
                employee.department
                    .toLowerCase()
                    .includes(searchValue) ||
                employee.designation
                    .toLowerCase()
                    .includes(searchValue) ||
                employee.email
                    .toLowerCase()
                    .includes(searchValue)
            );
        }
    );

    renderEmployees(filteredEmployees);
});

// Update Total Employees counter.
function updateEmployeeCount() {
    totalEmployees.textContent = employees.length;
}

// Display success or error messages.
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message show ${type}`;

    window.clearTimeout(showMessage.timeout);

    showMessage.timeout = window.setTimeout(
        function () {
            clearMessage();
        },
        4000
    );
}

function clearMessage() {
    message.textContent = "";
    message.className = "message";
}

// Generate initials for employee avatar.
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

// Protect the page from HTML inserted through inputs.
function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// Initial page rendering.
renderEmployees();