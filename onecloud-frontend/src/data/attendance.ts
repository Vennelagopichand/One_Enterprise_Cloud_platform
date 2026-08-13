import type {
  AttendanceRecord,
  AttendanceStatus
} from "../types/attendance";

import {
  getTodayDateString
} from "../utils/date";


interface DefaultAttendance {
  employeeId: string;
  status: AttendanceStatus;
}


const defaultAttendance:
  DefaultAttendance[] = [

    {
      employeeId: "EMP101",
      status: "Present"
    },

    {
      employeeId: "EMP102",
      status: "Present"
    },

    {
      employeeId: "EMP103",
      status: "WFH"
    },

    {
      employeeId: "EMP104",
      status: "Absent"
    },

    {
      employeeId: "EMP105",
      status: "Half Day"
    },

    {
      employeeId: "EMP106",
      status: "Present"
    },

    {
      employeeId: "EMP107",
      status: "Present"
    },

    {
      employeeId: "EMP108",
      status: "Absent"
    }

  ];


export function createInitialAttendanceRecords():
  AttendanceRecord[] {

  const today =
    getTodayDateString();


  return defaultAttendance.map(
    (item) => ({
      employeeId:
        item.employeeId,

      date:
        today,

      status:
        item.status
    })
  );
}
