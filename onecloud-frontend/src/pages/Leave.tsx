import {
  ArrowRight,
  CalendarDays
} from "lucide-react";

import {
  useMemo,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import LeaveFilters, {
  type LeaveStatusFilter,
  type LeaveTypeFilter
} from "../components/leave/LeaveFilters";

import LeaveForm
  from "../components/leave/LeaveForm";

import LeaveRequestTable
  from "../components/leave/LeaveRequestTable";

import LeaveSummary
  from "../components/leave/LeaveSummary";

import {
  ROUTES
} from "../constants/routes";

import {
  useAppContext
} from "../hooks/useAppContext";

import type {
  CreateLeaveRequestInput
} from "../types/leave";


function Leave() {

  const {
    employees,
    leaveRequests,
    addLeaveRequest,
    cancelLeaveRequest
  } = useAppContext();


  const [
    search,
    setSearch
  ] = useState("");


  const [
    status,
    setStatus
  ] =
    useState<LeaveStatusFilter>(
      "All"
    );


  const [
    leaveType,
    setLeaveType
  ] =
    useState<LeaveTypeFilter>(
      "All"
    );


  const [
    message,
    setMessage
  ] = useState("");


  /* ========================================
     SUMMARY
  ======================================== */

  const summary =
    useMemo(
      () => ({

        total:
          leaveRequests.length,

        pending:
          leaveRequests.filter(
            (request) =>
              request.status ===
              "Pending"
          ).length,

        approved:
          leaveRequests.filter(
            (request) =>
              request.status ===
              "Approved"
          ).length,

        rejected:
          leaveRequests.filter(
            (request) =>
              request.status ===
              "Rejected"
          ).length,

        cancelled:
          leaveRequests.filter(
            (request) =>
              request.status ===
              "Cancelled"
          ).length

      }),
      [leaveRequests]
    );


  /* ========================================
     FILTER REQUESTS
  ======================================== */

  const filteredRequests =
    useMemo(
      () => {

        const query =
          search
            .trim()
            .toLowerCase();


        return leaveRequests.filter(
          (request) => {

            const employee =
              employees.find(
                (item) =>
                  item.id ===
                  request.employeeId
              );


            const matchesSearch =
              !query ||
              request.employeeId
                .toLowerCase()
                .includes(query) ||
              employee?.name
                .toLowerCase()
                .includes(query);


            const matchesStatus =
              status === "All" ||
              request.status ===
                status;


            const matchesType =
              leaveType === "All" ||
              request.leaveType ===
                leaveType;


            return (
              matchesSearch &&
              matchesStatus &&
              matchesType
            );
          }
        );

      },
      [
        leaveRequests,
        employees,
        search,
        status,
        leaveType
      ]
    );


  /* ========================================
     APPLY LEAVE
  ======================================== */

  function handleApplyLeave(
    request:
      CreateLeaveRequestInput
  ) {

    addLeaveRequest(
      request
    );


    setMessage(
      "Leave request submitted successfully."
    );


    window.setTimeout(
      () =>
        setMessage(""),
      3000
    );
  }


  /* ========================================
     CANCEL LEAVE
  ======================================== */

  function handleCancel(
    leaveId: string
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this leave request?"
      );


    if (!confirmed) {
      return;
    }


    cancelLeaveRequest(
      leaveId
    );


    setMessage(
      "Leave request cancelled."
    );


    window.setTimeout(
      () =>
        setMessage(""),
      3000
    );
  }


  function resetFilters() {

    setSearch("");

    setStatus("All");

    setLeaveType("All");
  }


  return (

    <div
      className="
        space-y-7
      "
    >

      {/* =====================================
          HEADER
      ====================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-indigo-950
          px-6
          py-8
          text-white
          shadow-xl
          sm:px-8
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-32
            h-80
            w-80
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />


        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.18em]
                text-blue-300
              "
            >
              OneCloud HRMS
            </p>

            <h1
              className="
                mt-3
                text-3xl
                font-black
                sm:text-4xl
              "
            >
              Leave Management
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-300
              "
            >
              Apply for leave, review
              leave history and track
              approval status across
              the organization.
            </p>

          </div>


          <Link
            to={
              ROUTES.LEAVE_APPROVAL
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-black
              text-white
              transition
              hover:bg-blue-500
            "
          >
            Review Requests

            <ArrowRight
              size={17}
            />
          </Link>

        </div>

      </section>


      {/* Summary */}

      <LeaveSummary
        {...summary}
      />


      {
        message && (

          <div
            className="
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              px-5
              py-4
              text-sm
              font-black
              text-emerald-700
            "
          >
            {message}
          </div>

        )
      }


      {/* Form */}

      <LeaveForm
        employees={
          employees
        }
        onSubmit={
          handleApplyLeave
        }
      />


      {/* Filters */}

      <LeaveFilters
        search={search}
        status={status}
        leaveType={leaveType}
        onSearchChange={
          setSearch
        }
        onStatusChange={
          setStatus
        }
        onLeaveTypeChange={
          setLeaveType
        }
        onReset={
          resetFilters
        }
      />


      {/* Table */}

      <LeaveRequestTable
        requests={
          filteredRequests
        }
        employees={
          employees
        }
        onCancel={
          handleCancel
        }
      />


      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-blue-100
          bg-blue-50
          px-5
          py-4
        "
      >

        <CalendarDays
          size={19}
          className="
            text-blue-600
          "
        />

        <p
          className="
            text-xs
            leading-5
            text-blue-700
          "
        >
          New leave requests are created
          with Pending status and can be
          approved or rejected from the
          Leave Approval page.
        </p>

      </div>

    </div>
  );
}


export default Leave;
