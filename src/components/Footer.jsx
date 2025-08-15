import { Footer } from "flowbite-react";
import { Link } from "react-router";
import Logo from "./Logo";
import { assets } from "../assets/assets";

const FooterSection = () => {
  return (
    <Footer
      container
      className="w-full shadow-none rounded-none px-3 mt-16"
    >
      <div className="container mx-auto text-center">
        <Footer.Divider className="max-w-40" />
        <div className="w-full flex flex-col gap-7 md:flex-row lg:items-center justify-between">
          <div>
            <Logo></Logo>
            <div className="text-left mt-2 text-gray-500 dark:text-gray-300">
              <p>23/3, Hospital Road, Nalchity, Jahlokati.</p>
              <p>mdalimuzzaman437@gmail.com</p>
              <p>+880 1405-742311</p>
            </div>
          </div>
          <div>
            <p className="text-left mb-3 text-lg font-semibold text-gray-500 dark:text-gray-300">
              Useful Links
            </p>
            <ul className="text-gray-500 dark:text-gray-300 flex gap-x-7 gap-y-2 flex-wrap">
              <li>
                <Link className="hover:text-gray-800 dark:hover:text-gray-500" to={"/about"}>
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-800 dark:hover:text-gray-500" to={"/privacy"}>
                  Privacy-Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-800 dark:hover:text-gray-500" to={"/terms"}>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <div className="flex gap-2 mt-3">
              <a target="_blank" href="https://www.facebook.com/alimuzzaman.haris">
                <img
                  className="w-9 transform hover:scale-110 transition duration-300"
                  src={assets.Facebook}
                  alt="Facebook"
                />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/alimuzzaman-haris/">
                <img
                  className="w-9 transform hover:scale-110 transition duration-300"
                  src={assets.LinkedIn}
                  alt="LinkedIn"
                />
              </a>
              <a target="_blank" href="https://www.instagram.com/alimuzzaman.haris/">
                <img
                  className="w-9 transform hover:scale-110 transition duration-300"
                  src={assets.Instagram}
                  alt="Instagram"
                />
              </a>
              <a target="_blank" href="https://www.youtube.com/@az-industries">
                <img
                  className="w-9 transform hover:scale-110 transition duration-300"
                  src={assets.YouTube}
                  alt="YouTube"
                />
              </a>
              <a target="_blank" href="https://wa.me/+8801405742311">
                <img
                  className="w-9 transform hover:scale-110 transition duration-300"
                  src={assets.Whatsapp}
                  alt="Whatsapp"
                />
              </a>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <Link
          to={"https://alimuzzaman-haris.netlify.app"}
          target="_blank"
          className="text-sm text-gray-500 dark:text-gray-300 text-center"
        >
          © {new Date().getFullYear()}{" "}
          <span className="hover:text-blue-700 dark:hover:text-blue-400">Az Industries BD</span>
        </Link>
      </div>
    </Footer>
  );
};

export default FooterSection;
