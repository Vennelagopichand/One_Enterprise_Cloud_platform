import {
  Cloud,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import {
  ROUTES
} from "../../constants/routes";


function FooterSection() {

  const currentYear =
    new Date().getFullYear();


  return (

    <footer
      id="contact"
      className="
        bg-slate-950
        text-white
      "
    >

      <div
        className="
          mx-auto
          grid
          max-w-[1500px]
          gap-12
          px-5
          py-16
          sm:px-8
          md:grid-cols-2
          lg:grid-cols-4
          lg:px-12
        "
      >

        {/* Company */}

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-600
              "
            >
              <Cloud size={24} />
            </div>


            <div>

              <h3
                className="
                  text-xl
                  font-black
                "
              >
                OneCloud
              </h3>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-blue-400
                "
              >
                Enterprise Platform
              </p>

            </div>

          </div>


          <p
            className="
              mt-5
              max-w-sm
              text-sm
              leading-7
              text-slate-400
            "
          >
            A unified enterprise cloud
            platform for workforce,
            customers, finance, analytics
            and intelligent automation.
          </p>


          <div
            className="
              mt-6
              flex
              gap-3
            "
          >

            <SocialButton>
              <Linkedin size={18} />
            </SocialButton>

            <SocialButton>
              <Github size={18} />
            </SocialButton>

          </div>

        </div>


        {/* Platform */}

        <FooterColumn
          title="Platform"
          links={[
            {
              label: "HRMS",
              href: "#modules"
            },
            {
              label: "CRM",
              href: "#modules"
            },
            {
              label: "ERP",
              href: "#modules"
            },
            {
              label: "Finance",
              href: "#modules"
            },
            {
              label: "Analytics",
              href: "#modules"
            }
          ]}
        />


        {/* Company */}

        <div
          id="about"
        >

          <FooterColumn
            title="Company"
            links={[
              {
                label: "About",
                href: "#about"
              },
              {
                label: "Technology",
                href: "#technology"
              },
              {
                label: "Solutions",
                href: "#solutions"
              },
              {
                label: "Privacy Policy",
                href: "#"
              }
            ]}
          />

        </div>


        {/* Contact */}

        <div>

          <h4
            className="
              text-sm
              font-black
              uppercase
              tracking-[0.12em]
              text-white
            "
          >
            Contact
          </h4>


          <div
            className="
              mt-6
              space-y-4
            "
          >

            <ContactItem
              icon={Mail}
              text="contact@onecloud.com"
            />

            <ContactItem
              icon={Phone}
              text="+91 98765 43210"
            />

            <ContactItem
              icon={MapPin}
              text="India"
            />

          </div>


          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-3
            "
          >

            <Link
              to={ROUTES.LOGIN}
              className="
                rounded-xl
                border
                border-white/10
                px-4
                py-2.5
                text-center
                text-xs
                font-bold
                text-slate-300
                transition
                hover:bg-white/10
              "
            >
              Login
            </Link>


            <Link
              to={ROUTES.REGISTER}
              className="
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-center
                text-xs
                font-bold
                text-white
                transition
                hover:bg-blue-500
              "
            >
              Register
            </Link>

          </div>

        </div>

      </div>


      {/* Bottom Footer */}

      <div
        className="
          border-t
          border-white/10
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            items-center
            justify-between
            gap-3
            px-5
            py-6
            text-center
            sm:px-8
            md:flex-row
            md:text-left
            lg:px-12
          "
        >

          <p
            className="
              text-xs
              text-slate-500
            "
          >
            © {currentYear} OneCloud
            Enterprise Platform.
            All rights reserved.
          </p>


          <p
            className="
              text-xs
              text-slate-600
            "
          >
            SaaS • Private Cloud • Hybrid
            Cloud • On-Premises
          </p>

        </div>

      </div>

    </footer>
  );
}


interface FooterLink {
  label: string;
  href: string;
}


interface FooterColumnProps {
  title: string;

  links: FooterLink[];
}


function FooterColumn({
  title,
  links
}: FooterColumnProps) {

  return (

    <div>

      <h4
        className="
          text-sm
          font-black
          uppercase
          tracking-[0.12em]
          text-white
        "
      >
        {title}
      </h4>


      <div
        className="
          mt-6
          flex
          flex-col
          gap-3
        "
      >

        {
          links.map(
            (link) => (

              <a
                key={link.label}
                href={link.href}
                className="
                  w-fit
                  text-sm
                  text-slate-400
                  transition
                  hover:text-blue-400
                "
              >
                {link.label}
              </a>

            )
          )
        }

      </div>

    </div>
  );
}


interface ContactItemProps {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  text: string;
}


function ContactItem({
  icon: Icon,
  text
}: ContactItemProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white/5
          text-blue-400
        "
      >
        <Icon size={16} />
      </div>


      <span
        className="
          text-sm
          text-slate-400
        "
      >
        {text}
      </span>

    </div>
  );
}


interface SocialButtonProps {
  children:
    React.ReactNode;
}


function SocialButton({
  children
}: SocialButtonProps) {

  return (

    <button
      type="button"
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        bg-white/5
        text-slate-400
        transition
        hover:bg-blue-600
        hover:text-white
      "
    >
      {children}
    </button>
  );
}


export default FooterSection;