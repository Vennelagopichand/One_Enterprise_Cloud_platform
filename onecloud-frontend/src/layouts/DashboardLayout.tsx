import { useState } from "react";

import {
  Outlet,
  useNavigate
} from "react-router-dom";

import Footer
  from "../components/layout/Footer";

import Header
  from "../components/layout/Header";

import Sidebar
  from "../components/layout/Sidebar";

import {
  ROUTES
} from "../constants/routes";

import {
  useAuth
} from "../hooks/useAuth";


function DashboardLayout() {

  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(false);


  const navigate =
    useNavigate();


  const {
    logout
  } = useAuth();


  /*
    Open mobile sidebar
  */
  function openSidebar() {

    setSidebarOpen(true);
  }


  /*
    Close mobile sidebar
  */
  function closeSidebar() {

    setSidebarOpen(false);
  }


  /*
    Logout from OneCloud
  */
  function handleLogout() {

    const confirmed =
      window.confirm(
        "Are you sure you want to logout?"
      );


    if (!confirmed) {
      return;
    }


    /*
      Clear authentication
      using AuthContext
    */
    logout();


    /*
      Close sidebar if it is
      currently open on mobile
    */
    setSidebarOpen(false);


    /*
      Redirect back to login
    */
    navigate(
      ROUTES.LOGIN,
      {
        replace: true
      }
    );
  }


  return (

    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
      "
    >

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onLogout={handleLogout}
      />


      {/* =====================================
          MAIN APPLICATION AREA
      ====================================== */}

      <div
        className="
          flex
          min-h-screen
          flex-col
          transition-all
          duration-300
          lg:pl-72
        "
      >

        {/* =================================
            HEADER
        ================================== */}

        <Header
          onMenuClick={openSidebar}
          onLogout={handleLogout}
        />


        {/* =================================
            PAGE CONTENT
        ================================== */}

        <main
          className="
            flex-1
            bg-slate-50
            p-4
            sm:p-6
            xl:p-8
          "
        >

          <div
            className="
              page-enter
              mx-auto
              w-full
              max-w-[1600px]
            "
          >

            {/*
              The selected route page
              will render here.

              Examples:

              /dashboard
              /employees
              /attendance
              /leave
              /profile
            */}

            <Outlet />

          </div>

        </main>


        {/* =================================
            FOOTER
        ================================== */}

        <Footer />

      </div>

    </div>
  );
}


export default DashboardLayout;
