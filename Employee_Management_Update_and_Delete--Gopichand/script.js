const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");
const totalEmployees = document.getElementById("totalEmployees");
const submitBtn = document.getElementById("submitBtn");

let employees = [];

let editIndex = -1;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const employee = {
        id: document.getElementById("empId").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    if (editIndex === -1) {
        employees.push(employee);
    } else {
        employees[editIndex] = employee;

        editIndex = -1;

        submitBtn.textContent = "Add Employee";
    }

    form.reset();

    displayEmployees();
});

function displayEmployees() {

    table.innerHTML = "";

    employees.forEach((employee, index) => {

        table.innerHTML += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editEmployee(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteEmployee(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });

    updateTotal();
}

function editEmployee(index) {

    const emp = employees[index];

    document.getElementById("empId").value = emp.id;
    document.getElementById("name").value = emp.name;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;

    editIndex = index;

    submitBtn.textContent = "Update Employee";
}

function deleteEmployee(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
        employees.splice(index, 1);

        displayEmployees();
    }
}

function updateTotal() {
    totalEmployees.textContent = employees.length;
}