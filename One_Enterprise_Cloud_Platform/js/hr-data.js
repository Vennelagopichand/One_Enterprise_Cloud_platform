window.HRMS = (function () {

    const defaultEmployees = [
        {
            id: "EMP101",
            name: "Aarav Kumar",
            department: "Development",
            designation: "Frontend Developer",
            email: "aarav@onecloud.com",
            phone: "9876543210",
            joiningDate: "2025-01-10",
            status: "Active",
            photo: "./assets/images/IMG01.PNG"
        },

        {
            id: "EMP102",
            name: "Priya Sharma",
            department: "HR",
            designation: "HR Manager",
            email: "priya@onecloud.com",
            phone: "9876543211",
            joiningDate: "2024-11-15",
            status: "Active",
            photo: "./assets/images/IMG02.jpeg"
        },

        {
            id: "EMP103",
            name: "Rohan Verma",
            department: "Finance",
            designation: "Financial Analyst",
            email: "rohan@onecloud.com",
            phone: "9876543212",
            joiningDate: "2025-02-05",
            status: "Active",
            photo: "./assets/images/IMG03.jpeg"
        },

        {
            id: "EMP104",
            name: "Sneha Reddy",
            department: "CRM",
            designation: "CRM Executive",
            email: "sneha@onecloud.com",
            phone: "9876543213",
            joiningDate: "2024-12-18",
            status: "Inactive",
            photo: "./assets/images/IMG04.jpeg"
        },

        {
            id: "EMP105",
            name: "Vikram Singh",
            department: "Development",
            designation: "Backend Developer",
            email: "vikram@onecloud.com",
            phone: "9876543214",
            joiningDate: "2025-03-01",
            status: "Active",
            photo: "./assets/images/IMG05.jpeg"
        },

        {
            id: "EMP106",
            name: "Neha Gupta",
            department: "Marketing",
            designation: "Marketing Manager",
            email: "neha@onecloud.com",
            phone: "9876543215",
            joiningDate: "2025-03-15",
            status: "Active",
            photo: "./assets/images/IMG06.jpeg"
        },

        {
            id: "EMP107",
            name: "Arjun Patel",
            department: "Sales",
            designation: "Sales Executive",
            email: "arjun@onecloud.com",
            phone: "9876543216",
            joiningDate: "2025-04-01",
            status: "Active",
            photo: "./assets/images/IMG07.png"
        },

        {
            id: "EMP108",
            name: "Meera Nair",
            department: "Operations",
            designation: "Operations Manager",
            email: "meera@onecloud.com",
            phone: "9876543217",
            joiningDate: "2024-10-10",
            status: "Inactive",
            photo: "./assets/images/IMG08.jpeg"
        }
    ];

    const defaultAttendance = {
        EMP101: "Present",
        EMP102: "Present",
        EMP103: "Work From Home",
        EMP104: "Absent",
        EMP105: "Half Day",
        EMP106: "Present",
        EMP107: "Present",
        EMP108: "Absent"
    };

    function readData(key, fallback) {
        try {
            const storedValue = localStorage.getItem(key);

            if (!storedValue) {
                return fallback;
            }

            return JSON.parse(storedValue);
        } catch (error) {
            console.error(
                `Unable to read ${key} from localStorage.`,
                error
            );

            return fallback;
        }
    }

    function writeData(key, value) {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }


    function initializeEmployees() {
        const storedEmployees = readData(
            "hrmsEmployees",
            []
        );

        if (storedEmployees.length === 0) {
            writeData(
                "hrmsEmployees",
                defaultEmployees
            );

            return;
        }

        const mergedEmployees = defaultEmployees.map(
            function (defaultEmployee) {

                const storedEmployee =
                    storedEmployees.find(
                        function (employee) {
                            return (
                                employee.id ===
                                defaultEmployee.id
                            );
                        }
                    );

                return {
                    ...defaultEmployee,
                    ...(storedEmployee || {}),
                    photo:
                        defaultEmployee.photo
                };
            }
        );

        writeData(
            "hrmsEmployees",
            mergedEmployees
        );
    }

    function initializeData() {
        initializeEmployees();

        if (!localStorage.getItem("hrmsAttendance")) {
            writeData(
                "hrmsAttendance",
                defaultAttendance
            );
        }

        if (!localStorage.getItem("hrmsLeaveRequests")) {
            writeData(
                "hrmsLeaveRequests",
                []
            );
        }

        if (!localStorage.getItem("hrmsActivities")) {
            writeData(
                "hrmsActivities",
                []
            );
        }
    }

    function getEmployees() {
        return readData(
            "hrmsEmployees",
            defaultEmployees
        );
    }

    function getAttendance() {
        return readData(
            "hrmsAttendance",
            defaultAttendance
        );
    }

    function getLeaveRequests() {
        return readData(
            "hrmsLeaveRequests",
            []
        );
    }

    function getActivities() {
        return readData(
            "hrmsActivities",
            []
        );
    }

    function addActivity(type, text) {
        const activities =
            getActivities();

        activities.unshift({
            type: type,
            text: text,
            time: new Date().toISOString()
        });

        writeData(
            "hrmsActivities",
            activities.slice(0, 40)
        );
    }

    function addLeave(request) {
        const leaveRequests =
            getLeaveRequests();

        leaveRequests.push(request);

        writeData(
            "hrmsLeaveRequests",
            leaveRequests
        );

        addActivity(
            "Leave Request",
            `${request.employeeName} applied for ${request.leaveType}`
        );
    }

    function updateLeave(
        leaveId,
        status
    ) {
        const leaveRequests =
            getLeaveRequests();

        const request =
            leaveRequests.find(
                function (leave) {
                    return (
                        leave.id ===
                        leaveId
                    );
                }
            );

        if (!request) {
            return;
        }

        request.status = status;

        writeData(
            "hrmsLeaveRequests",
            leaveRequests
        );

        addActivity(
            "Leave Status",
            `${request.employeeName}'s leave was ${status.toLowerCase()}`
        );
    }

    function cancelLeave(leaveId) {
        const leaveRequests =
            getLeaveRequests();

        const request =
            leaveRequests.find(
                function (leave) {
                    return leave.id === leaveId;
                }
            );

        const remainingRequests =
            leaveRequests.filter(
                function (leave) {
                    return leave.id !== leaveId;
                }
            );

        writeData(
            "hrmsLeaveRequests",
            remainingRequests
        );

        if (request) {
            addActivity(
                "Leave Cancelled",
                `${request.employeeName}'s leave request was cancelled`
            );
        }
    }

    initializeData();

    return {
        get employees() {
            return getEmployees();
        },

        get attendance() {
            return getAttendance();
        },

        get leaveRequests() {
            return getLeaveRequests();
        },

        activities: getActivities,

        addLeave: addLeave,

        updateLeave: updateLeave,

        cancelLeave: cancelLeave
    };

})();