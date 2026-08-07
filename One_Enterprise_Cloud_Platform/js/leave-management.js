const leaveForm =
    document.getElementById("leaveForm");

const employeeId =
    document.getElementById("employeeId");

const employeeName =
    document.getElementById("employeeName");

const department =
    document.getElementById("department");

const leaveType =
    document.getElementById("leaveType");

const fromDate =
    document.getElementById("fromDate");

const toDate =
    document.getElementById("toDate");

const totalDays =
    document.getElementById("totalDays");

const reason =
    document.getElementById("reason");

const message =
    document.getElementById("message");

const resetButton =
    document.getElementById("resetButton");


/* Add employees to dropdown */

HRMS.employees.forEach(function (employee) {

    const option =
        document.createElement("option");

    option.value = employee.id;

    option.textContent =
        `${employee.id} - ${employee.name}`;

    employeeId.appendChild(option);
});


/* Fill employee information */

employeeId.addEventListener(
    "change",
    function () {

        const employee =
            HRMS.employees.find(
                function (item) {

                    return item.id ===
                        employeeId.value;
                }
            );


        employeeName.value =
            employee ? employee.name : "";

        department.value =
            employee ? employee.department : "";
    }
);


/* Calculate leave days */

function calculateLeaveDays() {

    if (
        !fromDate.value ||
        !toDate.value
    ) {

        totalDays.value = 0;

        return true;
    }


    const start =
        new Date(fromDate.value);

    const end =
        new Date(toDate.value);


    if (end < start) {

        totalDays.value = 0;

        showMessage(
            "To Date cannot be earlier than From Date.",
            "error"
        );

        return false;
    }


    const difference =
        end.getTime() -
        start.getTime();


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    totalDays.value = days;

    clearMessage();

    return true;
}


/* Set minimum To Date */

fromDate.addEventListener(
    "change",
    function () {

        toDate.min =
            fromDate.value;

        calculateLeaveDays();
    }
);


toDate.addEventListener(
    "change",
    calculateLeaveDays
);


/* Submit leave request */

leaveForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const validDates =
            calculateLeaveDays();


        if (
            !leaveForm.checkValidity() ||
            !validDates ||
            Number(totalDays.value) <= 0
        ) {

            showMessage(
                "Please complete all required fields with valid information.",
                "error"
            );

            return;
        }


        const leaveRequest = {

            id:
                "LV" +
                Date.now(),

            employeeId:
                employeeId.value,

            employeeName:
                employeeName.value,

            department:
                department.value,

            leaveType:
                leaveType.value,

            fromDate:
                fromDate.value,

            toDate:
                toDate.value,

            totalDays:
                Number(totalDays.value),

            reason:
                reason.value.trim(),

            status:
                "Pending",

            createdAt:
                new Date().toISOString()
        };


        HRMS.addLeave(
            leaveRequest
        );


        showMessage(
            `Leave request submitted successfully for ${leaveRequest.totalDays} day(s).`,
            "success"
        );


        leaveForm.reset();

        employeeName.value = "";
        department.value = "";
        totalDays.value = 0;
        toDate.removeAttribute("min");
    }
);


/* Reset */

resetButton.addEventListener(
    "click",
    function () {

        setTimeout(
            function () {

                employeeName.value = "";
                department.value = "";
                totalDays.value = 0;

                clearMessage();

            },
            0
        );
    }
);


/* Message functions */

function showMessage(
    text,
    type
) {

    message.textContent =
        text;

    message.className =
        `message show ${type}`;
}


function clearMessage() {

    message.textContent = "";

    message.className =
        "message";
}