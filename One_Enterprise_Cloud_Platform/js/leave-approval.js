const leaveTable =
    document.getElementById("leaveTable");

const pendingCount =
    document.getElementById("pendingCount");

const approvedCount =
    document.getElementById("approvedCount");

const rejectedCount =
    document.getElementById("rejectedCount");


function renderLeaveRequests() {

    const leaveRequests =
        HRMS.leaveRequests;


    leaveTable.innerHTML = "";


    if (leaveRequests.length === 0) {

        leaveTable.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:45px;
                        color:#64748b;
                    "
                >
                    No leave requests available.
                </td>
            </tr>
        `;
    }


    leaveRequests.forEach(
        function (request) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${request.employeeId}
                </td>

                <td>
                    ${request.employeeName}
                </td>

                <td>
                    ${request.department}
                </td>

                <td>
                    ${request.leaveType}
                </td>

                <td>
                    ${request.totalDays}
                </td>

                <td>

                    <span
                        class="badge ${request.status.toLowerCase()}"
                    >
                        ${request.status}
                    </span>

                </td>

                <td>

                    <div class="actions">

                        <button
                            type="button"
                            class="btn success"
                            data-action="Approved"
                            data-id="${request.id}"
                        >
                            Approve
                        </button>

                        <button
                            type="button"
                            class="btn danger"
                            data-action="Rejected"
                            data-id="${request.id}"
                        >
                            Reject
                        </button>

                        <button
                            type="button"
                            class="btn secondary"
                            data-action="Cancel"
                            data-id="${request.id}"
                        >
                            Cancel
                        </button>

                    </div>

                </td>
            `;


            leaveTable.appendChild(row);
        }
    );


    updateSummary();
}


function updateSummary() {

    const leaveRequests =
        HRMS.leaveRequests;


    pendingCount.textContent =
        leaveRequests.filter(
            function (request) {

                return request.status ===
                    "Pending";
            }
        ).length;


    approvedCount.textContent =
        leaveRequests.filter(
            function (request) {

                return request.status ===
                    "Approved";
            }
        ).length;


    rejectedCount.textContent =
        leaveRequests.filter(
            function (request) {

                return request.status ===
                    "Rejected";
            }
        ).length;
}


/* Button actions */

leaveTable.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) {
            return;
        }


        const leaveId =
            button.dataset.id;

        const action =
            button.dataset.action;


        if (action === "Cancel") {

            const confirmation =
                confirm(
                    "Are you sure you want to cancel this leave request?"
                );


            if (!confirmation) {
                return;
            }


            HRMS.cancelLeave(
                leaveId
            );

        } else {

            HRMS.updateLeave(
                leaveId,
                action
            );
        }


        renderLeaveRequests();
    }
);


renderLeaveRequests();