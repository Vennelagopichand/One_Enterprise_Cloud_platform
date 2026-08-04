const employees = [

    {
        id: 101,
        name: "Rahul Sharma",
        department: "Development",
        designation: "Frontend Developer",
        status: "Active",
        photo: "./Assets/IMG01.PNG"
    },

    {
        id: 102,
        name: "Priya Reddy",
        department: "HR",
        designation: "HR Manager",
        status: "Active",
        photo: "./Assets/IMG02.jpeg"
    },

    {
        id: 103,
        name: "Arjun Kumar",
        department: "Finance",
        designation: "Accountant",
        status: "Inactive",
        photo: "./Assets/IMG03.jpeg"
    },

    {
        id: 104,
        name: "Sneha Patel",
        department: "CRM",
        designation: "CRM Executive",
        status: "Active",
        photo: "./Assets/IMG04.jpeg"
    },

    {
        id: 105,
        name: "Vikram Singh",
        department: "Development",
        designation: "Backend Developer",
        status: "Active",
        photo: "./Assets/IMG05.jpeg"
    },

    {
        id: 106,
        name: "Meera Joshi",
        department: "Finance",
        designation: "Financial Analyst",
        status: "Inactive",
        photo: "./Assets/IMG06.jpeg"
    }

];

const container = document.getElementById("employeeContainer");
const searchInput = document.getElementById("search");
const departmentFilter = document.getElementById("departmentFilter");

function renderEmployees(data) {

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML =
            '<p class="no-data">No employee found</p>';

        return;
    }

    data.forEach((employee) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${employee.photo}" alt="Employee">

            <h2>${employee.name}</h2>

            <p><strong>ID:</strong> ${employee.id}</p>

            <p><strong>Department:</strong> ${employee.department}</p>

            <p><strong>Designation:</strong> ${employee.designation}</p>

            <span class="status ${employee.status.toLowerCase()}">
                ${employee.status}
            </span>

        `;

        container.appendChild(card);
    });
}

function filterEmployees() {

    const searchText = searchInput.value.toLowerCase();

    const selectedDepartment = departmentFilter.value;

    const filteredEmployees = employees.filter((employee) => {

        const matchName = employee.name
            .toLowerCase()
            .includes(searchText);

        const matchDepartment =
            selectedDepartment === "All" ||
            employee.department === selectedDepartment;

        return matchName && matchDepartment;
    });

    renderEmployees(filteredEmployees);
}

searchInput.addEventListener("input", filterEmployees);

departmentFilter.addEventListener(
    "change",
    filterEmployees
);

renderEmployees(employees);