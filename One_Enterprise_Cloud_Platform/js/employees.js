const employees = [

    {
        id: 101,
        name: "John Smith",
        department: "Development",
        designation: "Frontend Developer",
        status: "Active",
        photo: "https://randomuser.me/api/portraits/men/1.jpg"
    },

    {
        id: 102,
        name: "Sophia Brown",
        department: "HR",
        designation: "HR Manager",
        status: "Active",
        photo: "https://randomuser.me/api/portraits/women/2.jpg"
    },

    {
        id: 103,
        name: "David Wilson",
        department: "Finance",
        designation: "Accountant",
        status: "Active",
        photo: "https://randomuser.me/api/portraits/men/3.jpg"
    },

    {
        id: 104,
        name: "Emma Johnson",
        department: "CRM",
        designation: "CRM Executive",
        status: "Inactive",
        photo: "https://randomuser.me/api/portraits/women/4.jpg"
    },

    {
        id: 105,
        name: "Michael Lee",
        department: "Development",
        designation: "Backend Developer",
        status: "Active",
        photo: "https://randomuser.me/api/portraits/men/5.jpg"
    },

    {
        id: 106,
        name: "Olivia Martin",
        department: "Finance",
        designation: "Financial Analyst",
        status: "Active",
        photo: "https://randomuser.me/api/portraits/women/6.jpg"
    }

];

const employeeContainer =
    document.getElementById("employeeContainer");

const searchInput =
    document.getElementById("searchInput");

const departmentFilter =
    document.getElementById("departmentFilter");

function renderEmployees(employeeList) {

    employeeContainer.innerHTML = "";

    employeeList.forEach(employee => {

        employeeContainer.innerHTML += `

            <div class="card">

                <img src="${employee.photo}" alt="Employee">

                <h3>${employee.name}</h3>

                <p><strong>ID:</strong> ${employee.id}</p>

                <p><strong>Department:</strong> ${employee.department}</p>

                <p><strong>Designation:</strong> ${employee.designation}</p>

                <span class="status">
                    ${employee.status}
                </span>

            </div>

        `;
    });
}

function filterEmployees() {

    const searchValue =
        searchInput.value.toLowerCase();

    const departmentValue =
        departmentFilter.value;

    const filtered = employees.filter(employee => {

        const nameMatch =
            employee.name.toLowerCase()
            .includes(searchValue);

        const departmentMatch =
            departmentValue === "all" ||
            employee.department === departmentValue;

        return nameMatch && departmentMatch;
    });

    renderEmployees(filtered);
}

searchInput.addEventListener(
    "input",
    filterEmployees
);

departmentFilter.addEventListener(
    "change",
    filterEmployees
);

renderEmployees(employees);
