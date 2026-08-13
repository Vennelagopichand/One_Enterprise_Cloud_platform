export type EmployeeStatus =
  | "Active"
  | "Inactive";


/* ==========================================
   BASIC EMPLOYEE MODEL
========================================== */

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
}


/* ==========================================
   COMPLETE EMPLOYEE RECORD

   Used by:
   - Employee Management
   - Employee Directory
   - Employee Details
   - Dashboard
   - Attendance
   - Leave
   - Profile
========================================== */

export interface EmployeeRecord
  extends Employee {

  phone: string;

  joiningDate: string;

  status: EmployeeStatus;

  photo?: string;
}


/* ==========================================
   REGISTRATION FORM MODEL
========================================== */

export interface EmployeeRegistrationForm {
  id: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  joiningDate: string;
  password: string;
  confirmPassword: string;
}


/* ==========================================
   REGISTERED EMPLOYEE STORAGE MODEL

   Used by Part 6 registration.

   Password is intentionally
   not stored.
========================================== */

export interface StoredRegisteredEmployee
  extends Employee {

  mobile: string;

  joiningDate: string;
}


/* ==========================================
   EMPLOYEE CRUD FORM MODEL

   Used by EmployeeForm.tsx
========================================== */

export interface EmployeeFormData {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  joiningDate: string;
  status: EmployeeStatus;
}
