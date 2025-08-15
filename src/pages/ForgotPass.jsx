import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "../components/ScrollToTop";

const ForgotPass = () => {
  const { email, passwordReset } = useAuth();
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    // Reset Password
    passwordReset(email)
      .then(() => {
        navigate("/login");
        window.open("https://mail.google.com/mail/u/0/", "_blank");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire("Error!", `${errorCode} ${errorMessage}`, "error");
      });
  };
  return (
    <form
      onSubmit={handleReset}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <ScrollToTop></ScrollToTop>
      <Helmet>
        <title>TrueFit - Recover Your Password</title>
      </Helmet>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl font-prata">Reset Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        type="email"
        name="email"
        defaultValue={email}
        autoComplete="username"
        className="w-full px-3 py-2 border border-gray-800 rounded-lg"
        placeholder="Email"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p></p>
        <Link to={"/login"}>Login here</Link>
      </div>
      <Button type="submit" color="blue" className="px-5 mt-4">
        Reset Password
      </Button>
    </form>
  );
};

export default ForgotPass;
