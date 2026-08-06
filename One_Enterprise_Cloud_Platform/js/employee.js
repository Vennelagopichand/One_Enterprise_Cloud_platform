let employees = [];

const form = document.getElementById("employeeForm");

const table = document.getElementById("employeeTable");

const totalEmployees =
    document.getElementById("totalEmployees");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const employee = {

        id: document.getElementById("empId").value,

        name: document.getElementById("empName").value,

        department:
            document.getElementById("department").value,

        designation:
            document.getElementById("designation").value,

        email:
            document.getElementById("email").value
    };

    employees.push(employee);

    renderEmployees();

    form.reset();
});

function renderEmployees() {

    table.innerHTML = "";

    employees.forEach((employee) => {

        table.innerHTML += `

        <tr>

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.department}</td>

            <td>${employee.designation}</td>

            <td>${employee.email}</td>

        </tr>

        `;
    });

    totalEmployees.textContent =
        employees.length;
}