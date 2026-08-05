let employees = [];

function addEmployee() {

    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const department = document.getElementById("department").value;
    const designation = document.getElementById("designation").value;
    const email = document.getElementById("email").value;

    if (
        id === "" ||
        name === "" ||
        department === "" ||
        designation === "" ||
        email === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const employee = {
        id,
        name,
        department,
        designation,
        email
    };

    employees.push(employee);

    displayEmployees();

    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("email").value = "";
}

function displayEmployees() {

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(function (employee) {

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
}