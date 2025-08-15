import Swal from "sweetalert2";
import { Button } from "flowbite-react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { loginWithGoogle, setUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setLoading(true);
    // Login with google
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;

        // Save user to db
        await axiosPublic
          .post("/users", {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            authMethod: "google",
          })
          .then(() => {
            axiosPublic.patch(`/users/${user.email}`)
            .then((response)=>{
              setUser(response.data.user)
              setLoading(false);
            Swal.fire("Success!", "Successfully Logged In!", "success");
            navigate(location?.state ? location.state : "/");
            })
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            Swal.fire("Error!", `${errorCode} ${errorMessage}`, "error");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        Swal.fire("Error!", `${errorCode} ${errorMessage}`, "error");
      });
  };
  return (
    <Button onClick={() => handleLogin()} outline color="blue" size="sm">
      <img className="w-6" src={assets.Google} alt="" />
    </Button>
  );
};

export default SocialLogin;
