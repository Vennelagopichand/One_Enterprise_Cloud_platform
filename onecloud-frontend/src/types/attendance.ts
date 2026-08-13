export type AttendanceStatus =
  | "Present"
  | "Absent"
  | "WFH"
  | "Half Day"
  | "Not Marked";


export interface AttendanceRecord {
  employeeId: string;
  date: string;
  status: AttendanceStatus;
}
