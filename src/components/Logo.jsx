import { Link } from "react-router";
import { assets } from "../assets/assets";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-1">
      <img src={assets.Logo} className="w-9 md:w-10" alt="" />
      <p className="font-black text-2xl md:text-4xl">TrueFit</p>
    </Link>
  );
};

export default Logo;
