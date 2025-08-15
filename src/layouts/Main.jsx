import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import FooterSection from "../components/Footer";

const Main = () => {
  return (
    <>
      <nav>
        <Navbar></Navbar>
        <div className="py-[27px] md:py-8"></div>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <FooterSection></FooterSection>
    </>
  );
};

export default Main;
