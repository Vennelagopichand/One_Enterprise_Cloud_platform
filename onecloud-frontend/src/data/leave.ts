import type {
  LeaveRequest
} from "../types/leave";


export const initialLeaveRequests:
  LeaveRequest[] = [

    {
      id: "LEV001",
      employeeId: "EMP101",
      leaveType: "Annual Leave",
      startDate: "2026-08-18",
      endDate: "2026-08-20",
      totalDays: 3,
      reason:
        "Personal family function.",
      status: "Pending",
      appliedDate: "2026-08-10"
    },

    {
      id: "LEV002",
      employeeId: "EMP102",
      leaveType: "Sick Leave",
      startDate: "2026-08-06",
      endDate: "2026-08-07",
      totalDays: 2,
      reason:
        "Medical recovery.",
      status: "Approved",
      appliedDate: "2026-08-05",
      reviewerComment:
        "Approved by HR."
    },

    {
      id: "LEV003",
      employeeId: "EMP103",
      leaveType: "Casual Leave",
      startDate: "2026-08-14",
      endDate: "2026-08-14",
      totalDays: 1,
      reason:
        "Personal appointment.",
      status: "Pending",
      appliedDate: "2026-08-09"
    },

    {
      id: "LEV004",
      employeeId: "EMP105",
      leaveType: "Emergency Leave",
      startDate: "2026-08-03",
      endDate: "2026-08-04",
      totalDays: 2,
      reason:
        "Family emergency.",
      status: "Rejected",
      appliedDate: "2026-08-02",
      reviewerComment:
        "Please contact HR."
    }

  ];
  