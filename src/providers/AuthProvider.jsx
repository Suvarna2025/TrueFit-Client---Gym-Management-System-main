import { AuthContext } from "../context/contexts";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../hooks/useAxiosPublic";


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // console.log(user);

  // Register User
  const registerNewUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // Login User
  const loginUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // Logout User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update User
  const updateUser = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };

  // Password Reset
  const passwordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Login with google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const authInfo = {
    auth,
    registerNewUser,
    loading,
    setLoading,
    user,
    setUser,
    loginUser,
    logOut,
    updateUser,
    loginWithGoogle,
    email,
    setEmail,
    passwordReset,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(null); // Clear user data while fetching
      setLoading(true);

      if (currentUser) {
        const userInfo = {email: currentUser.email}
        await axiosPublic.post('/jwt', userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
          }
        })
        try {
          // Fetch user data from backend using their email
          const response = await axiosPublic.get(`/users/${currentUser.email}`);

          if (response.status == 200) {
            // Merge Firebase data with backend data if needed
            setUser({
              ...currentUser,
              ...response.data, // Merge backend data
            });
          } else {
            setUser(currentUser); // Fallback to Firebase user if backend fetch fails
          }
        } catch {
          setUser(currentUser); // Fallback to Firebase user in case of an error
        }
      } else{
        localStorage.removeItem('access-token')
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
