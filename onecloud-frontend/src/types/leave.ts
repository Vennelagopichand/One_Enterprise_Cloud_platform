export type LeaveType =
  | "Annual Leave"
  | "Sick Leave"
  | "Casual Leave"
  | "Emergency Leave";


export type LeaveStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Cancelled";


export interface LeaveRequest {
  id: string;

  employeeId: string;

  leaveType: LeaveType;

  startDate: string;

  endDate: string;

  totalDays: number;

  reason: string;

  status: LeaveStatus;

  appliedDate: string;

  reviewerComment?: string;
}


export interface CreateLeaveRequestInput {
  employeeId: string;

  leaveType: LeaveType;

  startDate: string;

  endDate: string;

  totalDays: number;

  reason: string;
}
