import "../index.css";
import { Link, NavLink } from "react-router";
import { Button, Spinner } from "flowbite-react";
import { BiMenuAltRight } from "react-icons/bi";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import ThemeToggle from "../utils/ThemeToggle";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { user, logOut, setLoading, loading } = useAuth();

  return (
    <div className="navbar py-2 md:py-3 font-medium  shadow-xl fixed top-0 w-full z-10 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-3 flex items-center justify-between">
        <Logo></Logo>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700 dark:text-gray-300 uppercase">
          <NavLink to={"/"} className="flex flex-col items-center gap-1">
            <p>Home</p>{" "}
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to={"/trainers"}
            className="flex flex-col items-center gap-1"
          >
            <p>All Trainer</p>{" "}
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to={"/classes"} className="flex flex-col items-center gap-1">
            <p>All Class</p>{" "}
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to={"/forum"} className="flex flex-col items-center gap-1">
            <p>Forum</p>{" "}
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to={"/about"} className="flex flex-col items-center gap-1">
            <p>About</p>{" "}
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          {user && (
            <NavLink
              to={"/dashboard"}
              className="flex flex-col items-center gap-1"
            >
              <p>Dashboard</p>{" "}
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          )}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle></ThemeToggle>
          {loading ? (
            <Spinner color="info" aria-label="Info spinner example" />
          ) : (
            <>
              {user ? (
                <div className="group relative">
                  <div className="w-10 h-10 rounded-full border border-blue-500 overflow-hidden">
                    {user.photoURL && (
                      <img
                        className="w-full h-full object-cover"
                        alt={user?.displayName}
                        src={user.photoURL}
                      />
                    )}
                  </div>

                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                    <div className="flex flex-col gap-2 w-52 py-3 px-5 bg-slate-100 text-gray-500 border rounded-md">
                      <p className="text-xl">Welcome, </p>
                      <p>{user?.fullName || user?.displayName}</p>
                      <p className="">---</p>
                      <Link
                        to={"/dashboard"}
                        className="cursor-pointer hover:text-black"
                      >
                        Dashboard
                      </Link>
                      <p
                        onClick={() => {
                          logOut()
                            .then(() => {
                              setLoading(false);
                              Swal.fire(
                                "Success!",
                                "You're Logged Out Successfully",
                                "success",
                              );
                            })
                            .catch((error) => {
                              const errorCode = error.code;
                              const errorMessage = error.message;
                              setLoading(false);
                              Swal.fire(
                                "Error!",
                                `${errorCode} ${errorMessage}`,
                                "error",
                              );
                            });
                        }}
                        className="cursor-pointer hover:text-black"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to={"/login"}>
                  <Button size="sm" color="blue">
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}

          <BiMenuAltRight
            onClick={() => setVisible(true)}
            className="text-4xl sm:text-5xl cursor-pointer sm:hidden"
          />
        </div>

        {/* Sidebar menu for small screen */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-gray-800 transition-all z-10 min-h-screen ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="text-gray-600 dark:text-gray-300 mt-5 px-3">
            <div className="flex items-center justify-between border-b-2 pb-5 mb-10">
              <Logo></Logo>
              <button onClick={() => setVisible(false)}>
                <RxCross1 className="text-2xl text-red-500 font-bold cursor-pointer" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <NavLink
                onClick={() => setVisible(false)}
                to={"/"}
                className="py-2 pl-5 border"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to={"/trainers"}
                className="py-2 pl-5 border"
              >
                All Trainer
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to={"/classes"}
                className="py-2 pl-5 border"
              >
                All Class
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to={"/forum"}
                className="py-2 pl-5 border"
              >
                Forum
              </NavLink>

              {user && (
                <NavLink
                  onClick={() => setVisible(false)}
                  to={"/dashboard"}
                  className="py-2 pl-5 border"
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
