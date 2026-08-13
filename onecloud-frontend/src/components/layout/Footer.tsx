import {
  Cloud
} from "lucide-react";


function Footer() {

  const currentYear =
    new Date().getFullYear();


  return (

    <footer
      className="
        border-t
        border-slate-200
        bg-white
        px-5
        py-5
        sm:px-6
        xl:px-8
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-3
          text-center
          sm:flex-row
          sm:text-left
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Cloud
            size={17}
            className="text-blue-600"
          />

          <p
            className="
              text-xs
              text-slate-500
            "
          >
            © {currentYear} OneCloud
            Enterprise Platform
          </p>

        </div>


        <p
          className="
            text-xs
            text-slate-400
          "
        >
          Unified Enterprise
          Management System
        </p>

      </div>

    </footer>
  );
}

export default Footer;
