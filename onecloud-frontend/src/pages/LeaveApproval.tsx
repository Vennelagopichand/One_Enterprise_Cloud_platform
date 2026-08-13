import {
  ArrowLeft,
  ClipboardCheck
} from "lucide-react";

import {
  useMemo,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import LeaveApprovalTable
  from "../components/leave/LeaveApprovalTable";

import {
  ROUTES
} from "../constants/routes";

import {
  useAppContext
} from "../hooks/useAppContext";


function LeaveApproval() {

  const {
    employees,
    leaveRequests,
    updateLeaveStatus
  } = useAppContext();


  const [
    message,
    setMessage
  ] = useState("");


  const pendingRequests =
    useMemo(
      () =>
        leaveRequests.filter(
          (request) =>
            request.status ===
            "Pending"
        ),
      [leaveRequests]
    );


  function handleApprove(
    leaveId: string
  ) {

    const confirmed =
      window.confirm(
        "Approve this leave request?"
      );


    if (!confirmed) {
      return;
    }


    updateLeaveStatus(
      leaveId,
      "Approved",
      "Approved by HR Administrator."
    );


    showMessage(
      "Leave request approved successfully."
    );
  }


  function handleReject(
    leaveId: string
  ) {

    const confirmed =
      window.confirm(
        "Reject this leave request?"
      );


    if (!confirmed) {
      return;
    }


    updateLeaveStatus(
      leaveId,
      "Rejected",
      "Rejected by HR Administrator."
    );


    showMessage(
      "Leave request rejected."
    );
  }


  function showMessage(
    value: string
  ) {

    setMessage(value);


    window.setTimeout(
      () =>
        setMessage(""),
      3000
    );
  }


  return (

    <div
      className="
        space-y-7
      "
    >

      {/* Header */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-indigo-950
          p-7
          text-white
          shadow-xl
          sm:p-8
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-28
            h-72
            w-72
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

            <Link
              to={ROUTES.LEAVE}
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                font-black
                text-blue-300
              "
            >
              <ArrowLeft
                size={14}
              />

              Leave Management
            </Link>


            <h1
              className="
                mt-4
                text-3xl
                font-black
                sm:text-4xl
              "
            >
              Leave Approval
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
              Review pending employee
              leave requests and approve
              or reject them.
            </p>

          </div>


          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white/10
              text-blue-200
            "
          >
            <ClipboardCheck
              size={28}
            />
          </div>

        </div>

      </section>


      {/* Pending count */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <p
          className="
            text-xs
            font-bold
            text-slate-500
          "
        >
          Pending Requests
        </p>

        <p
          className="
            mt-2
            text-3xl
            font-black
            text-slate-950
          "
        >
          {pendingRequests.length}
        </p>

      </section>


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


      <LeaveApprovalTable
        requests={
          pendingRequests
        }
        employees={
          employees
        }
        onApprove={
          handleApprove
        }
        onReject={
          handleReject
        }
      />

    </div>
  );
}


export default LeaveApproval;
