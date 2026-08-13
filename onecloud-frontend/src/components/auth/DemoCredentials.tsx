import {
  Copy,
  Info
} from "lucide-react";

import {
  useState
} from "react";


function DemoCredentials() {

  const [
    copied,
    setCopied
  ] = useState(false);


  async function copyCredentials() {

    const value =
      "Employee ID: admin\nPassword: admin123";


    try {

      await navigator.clipboard
        .writeText(value);

      setCopied(true);


      window.setTimeout(
        () => {
          setCopied(false);
        },
        1800
      );

    } catch {

      setCopied(false);
    }
  }


  return (

    <div
      className="
        mt-6
        rounded-2xl
        border
        border-blue-100
        bg-gradient-to-br
        from-blue-50
        to-indigo-50
        p-4
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-white
            "
          >

            <Info size={18} />

          </div>


          <div>

            <h3
              className="
                text-sm
                font-black
                text-slate-900
              "
            >
              Demo Credentials
            </h3>


            <div
              className="
                mt-2
                space-y-1
                text-xs
                text-slate-600
              "
            >

              <p>
                Employee ID:
                {" "}
                <strong
                  className="
                    text-slate-900
                  "
                >
                  admin
                </strong>
              </p>

              <p>
                Password:
                {" "}
                <strong
                  className="
                    text-slate-900
                  "
                >
                  admin123
                </strong>
              </p>

            </div>

          </div>

        </div>


        <button
          type="button"
          onClick={copyCredentials}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-blue-200
            bg-white
            text-blue-600
            transition
            hover:bg-blue-600
            hover:text-white
          "
          title="Copy credentials"
        >

          <Copy size={16} />

        </button>

      </div>


      {
        copied && (

          <p
            className="
              mt-3
              text-xs
              font-bold
              text-emerald-600
            "
          >
            Credentials copied.
          </p>

        )
      }

    </div>
  );
}


export default DemoCredentials;
