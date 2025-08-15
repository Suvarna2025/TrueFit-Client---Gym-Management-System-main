import { Outlet } from "react-router";
import DashboardNav from "../components/Dashboard/DashboardNav";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <>
        <DashboardNav></DashboardNav>
        <div className="py-[28px]"></div>
        <div className="flex min-h-screen">
            <Sidebar></Sidebar>
            <div className="ml-[18%] w-[82%] mx-auto my-6 text-gray-600 text-base px-3 md:px-10">
            <Outlet></Outlet>
            </div>
        </div>
      </>
      
    </div>
  );
};

export default Dashboard;
