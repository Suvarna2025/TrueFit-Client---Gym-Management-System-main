import { Button } from "flowbite-react";
import { Link } from "react-router";
import { MdHome } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ThemeToggle from "../../utils/ThemeToggle";
import Logo from "../Logo";

const DashboardNav = () => {
  const { logOut, setLoading } = useAuth();
  return (
    <div className="flex items-center justify-between py-2 px-[4%] fixed w-full border-b-2 bg-white dark:bg-gray-900">
      <Logo></Logo>
      <div className="flex items-center gap-3">
        <ThemeToggle></ThemeToggle>
        <Link to={"/"}>
          <Button color="blue" size="xs" pill outline>
            <MdHome className="text-lg" />
          </Button>
        </Link>
        <Button
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
                Swal.fire("Error!", `${errorCode} ${errorMessage}`, "error");
              });
          }}
          color="blue"
          size="xs"
          pill
          className="px-5"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardNav;
