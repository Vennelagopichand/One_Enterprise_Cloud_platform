import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import {
  createInitialAttendanceRecords
} from "../data/attendance";

import {
  initialEmployees
} from "../data/employees";

import {
  initialLeaveRequests
} from "../data/leave";

import type {
  AttendanceRecord,
  AttendanceStatus
} from "../types/attendance";

import type {
  EmployeeRecord
} from "../types/employee";

import type {
  CreateLeaveRequestInput,
  LeaveRequest,
  LeaveStatus
} from "../types/leave";

import {
  getTodayDateString
} from "../utils/date";


const EMPLOYEE_STORAGE_KEY =
  "onecloud_employees";

const ATTENDANCE_STORAGE_KEY =
  "onecloud_attendance";

const LEAVE_STORAGE_KEY =
  "onecloud_leave_requests";


interface AppContextType {

  /* =========================
     EMPLOYEES
  ========================= */

  employees:
    EmployeeRecord[];

  addEmployee:
    (
      employee:
        EmployeeRecord
    ) => void;

  updateEmployee:
    (
      employee:
        EmployeeRecord
    ) => void;

  deleteEmployee:
    (
      employeeId: string
    ) => void;

  getEmployeeById:
    (
      employeeId: string
    ) => EmployeeRecord | undefined;


  /* =========================
     ATTENDANCE
  ========================= */

  attendanceRecords:
    AttendanceRecord[];

  setAttendanceStatus:
    (
      employeeId: string,
      date: string,
      status: AttendanceStatus
    ) => void;

  getAttendanceStatus:
    (
      employeeId: string,
      date: string
    ) => AttendanceStatus;


  /* =========================
     LEAVE
  ========================= */

  leaveRequests:
    LeaveRequest[];

  addLeaveRequest:
    (
      request:
        CreateLeaveRequestInput
    ) => void;

  updateLeaveStatus:
    (
      leaveId: string,
      status: LeaveStatus,
      reviewerComment?: string
    ) => void;

  cancelLeaveRequest:
    (
      leaveId: string
    ) => void;
}


export const AppContext =
  createContext<
    AppContextType | undefined
  >(undefined);


interface AppProviderProps {
  children: ReactNode;
}


/* =========================================
   LOAD EMPLOYEES
========================================= */

function loadEmployees():
  EmployeeRecord[] {

  const stored =
    localStorage.getItem(
      EMPLOYEE_STORAGE_KEY
    );


  if (!stored) {
    return initialEmployees;
  }


  try {

    const parsed =
      JSON.parse(
        stored
      ) as EmployeeRecord[];


    return Array.isArray(parsed)
      ? parsed
      : initialEmployees;

  } catch {

    return initialEmployees;
  }
}


/* =========================================
   LOAD ATTENDANCE
========================================= */

function loadAttendance():
  AttendanceRecord[] {

  const stored =
    localStorage.getItem(
      ATTENDANCE_STORAGE_KEY
    );


  if (!stored) {

    return (
      createInitialAttendanceRecords()
    );
  }


  try {

    const parsed =
      JSON.parse(
        stored
      ) as AttendanceRecord[];


    return Array.isArray(parsed)
      ? parsed
      : createInitialAttendanceRecords();

  } catch {

    return (
      createInitialAttendanceRecords()
    );
  }
}


/* =========================================
   LOAD LEAVE REQUESTS
========================================= */

function loadLeaveRequests():
  LeaveRequest[] {

  const stored =
    localStorage.getItem(
      LEAVE_STORAGE_KEY
    );


  if (!stored) {
    return initialLeaveRequests;
  }


  try {

    const parsed =
      JSON.parse(
        stored
      ) as LeaveRequest[];


    return Array.isArray(parsed)
      ? parsed
      : initialLeaveRequests;

  } catch {

    return initialLeaveRequests;
  }
}


/* =========================================
   CREATE LEAVE ID
========================================= */

function createLeaveId(
  requests: LeaveRequest[]
): string {

  const highestNumber =
    requests.reduce(
      (
        highest,
        request
      ) => {

        const value =
          Number(
            request.id.replace(
              /\D/g,
              ""
            )
          );


        return Number.isNaN(value)
          ? highest
          : Math.max(
              highest,
              value
            );
      },
      0
    );


  return `LEV${String(
    highestNumber + 1
  ).padStart(
    3,
    "0"
  )}`;
}


/* =========================================
   APP PROVIDER
========================================= */

export function AppProvider({
  children
}: AppProviderProps) {

  const [
    employees,
    setEmployees
  ] =
    useState<EmployeeRecord[]>(
      loadEmployees
    );


  const [
    attendanceRecords,
    setAttendanceRecords
  ] =
    useState<AttendanceRecord[]>(
      loadAttendance
    );


  const [
    leaveRequests,
    setLeaveRequests
  ] =
    useState<LeaveRequest[]>(
      loadLeaveRequests
    );


  /* =======================================
     SAVE EMPLOYEES
  ======================================= */

  useEffect(
    () => {

      localStorage.setItem(
        EMPLOYEE_STORAGE_KEY,
        JSON.stringify(
          employees
        )
      );

    },
    [employees]
  );


  /* =======================================
     SAVE ATTENDANCE
  ======================================= */

  useEffect(
    () => {

      localStorage.setItem(
        ATTENDANCE_STORAGE_KEY,
        JSON.stringify(
          attendanceRecords
        )
      );

    },
    [attendanceRecords]
  );


  /* =======================================
     SAVE LEAVE
  ======================================= */

  useEffect(
    () => {

      localStorage.setItem(
        LEAVE_STORAGE_KEY,
        JSON.stringify(
          leaveRequests
        )
      );

    },
    [leaveRequests]
  );


  /* =======================================
     ADD EMPLOYEE
  ======================================= */

  const addEmployee =
    useCallback(
      (
        employee:
          EmployeeRecord
      ) => {

        setEmployees(
          (current) => [
            ...current,
            employee
          ]
        );

      },
      []
    );


  /* =======================================
     UPDATE EMPLOYEE
  ======================================= */

  const updateEmployee =
    useCallback(
      (
        updatedEmployee:
          EmployeeRecord
      ) => {

        setEmployees(
          (current) =>
            current.map(
              (employee) =>
                employee.id ===
                updatedEmployee.id
                  ? updatedEmployee
                  : employee
            )
        );

      },
      []
    );


  /* =======================================
     DELETE EMPLOYEE
  ======================================= */

  const deleteEmployee =
    useCallback(
      (
        employeeId: string
      ) => {

        setEmployees(
          (current) =>
            current.filter(
              (employee) =>
                employee.id !==
                employeeId
            )
        );


        setAttendanceRecords(
          (current) =>
            current.filter(
              (record) =>
                record.employeeId !==
                employeeId
            )
        );


        setLeaveRequests(
          (current) =>
            current.filter(
              (request) =>
                request.employeeId !==
                employeeId
            )
        );

      },
      []
    );


  /* =======================================
     GET EMPLOYEE
  ======================================= */

  const getEmployeeById =
    useCallback(
      (
        employeeId: string
      ) => {

        return employees.find(
          (employee) =>
            employee.id ===
            employeeId
        );

      },
      [employees]
    );


  /* =======================================
     SET ATTENDANCE
  ======================================= */

  const setAttendanceStatus =
    useCallback(
      (
        employeeId: string,
        date: string,
        status: AttendanceStatus
      ) => {

        setAttendanceRecords(
          (current) => {

            const exists =
              current.some(
                (record) =>
                  record.employeeId ===
                    employeeId &&
                  record.date ===
                    date
              );


            if (exists) {

              return current.map(
                (record) =>
                  record.employeeId ===
                    employeeId &&
                  record.date ===
                    date
                    ? {
                        ...record,
                        status
                      }
                    : record
              );
            }


            return [
              ...current,
              {
                employeeId,
                date,
                status
              }
            ];
          }
        );

      },
      []
    );


  /* =======================================
     GET ATTENDANCE
  ======================================= */

  const getAttendanceStatus =
    useCallback(
      (
        employeeId: string,
        date: string
      ): AttendanceStatus => {

        const record =
          attendanceRecords.find(
            (item) =>
              item.employeeId ===
                employeeId &&
              item.date ===
                date
          );


        return (
          record?.status ??
          "Not Marked"
        );

      },
      [attendanceRecords]
    );


  /* =======================================
     ADD LEAVE REQUEST
  ======================================= */

  const addLeaveRequest =
    useCallback(
      (
        input:
          CreateLeaveRequestInput
      ) => {

        setLeaveRequests(
          (current) => {

            const newRequest:
              LeaveRequest = {

              id:
                createLeaveId(
                  current
                ),

              employeeId:
                input.employeeId,

              leaveType:
                input.leaveType,

              startDate:
                input.startDate,

              endDate:
                input.endDate,

              totalDays:
                input.totalDays,

              reason:
                input.reason,

              status:
                "Pending",

              appliedDate:
                getTodayDateString()
            };


            return [
              newRequest,
              ...current
            ];
          }
        );

      },
      []
    );


  /* =======================================
     APPROVE / REJECT
  ======================================= */

  const updateLeaveStatus =
    useCallback(
      (
        leaveId: string,
        status: LeaveStatus,
        reviewerComment = ""
      ) => {

        setLeaveRequests(
          (current) =>
            current.map(
              (request) =>
                request.id ===
                leaveId
                  ? {
                      ...request,
                      status,
                      reviewerComment
                    }
                  : request
            )
        );

      },
      []
    );


  /* =======================================
     CANCEL LEAVE
  ======================================= */

  const cancelLeaveRequest =
    useCallback(
      (
        leaveId: string
      ) => {

        setLeaveRequests(
          (current) =>
            current.map(
              (request) =>
                request.id ===
                leaveId
                  ? {
                      ...request,
                      status:
                        "Cancelled"
                    }
                  : request
            )
        );

      },
      []
    );


  /* =======================================
     CONTEXT VALUE
  ======================================= */

  const value =
    useMemo<AppContextType>(
      () => ({

        employees,

        addEmployee,

        updateEmployee,

        deleteEmployee,

        getEmployeeById,

        attendanceRecords,

        setAttendanceStatus,

        getAttendanceStatus,

        leaveRequests,

        addLeaveRequest,

        updateLeaveStatus,

        cancelLeaveRequest

      }),
      [
        employees,
        attendanceRecords,
        leaveRequests,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        setAttendanceStatus,
        getAttendanceStatus,
        addLeaveRequest,
        updateLeaveStatus,
        cancelLeaveRequest
      ]
    );


  return (

    <AppContext.Provider
      value={value}
    >

      {children}

    </AppContext.Provider>
  );
}
