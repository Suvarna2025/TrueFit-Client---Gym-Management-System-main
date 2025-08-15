import { useEffect, useState } from "react";
import Select from "react-select";
import Title from "../components/Title";
import { Button, Spinner } from "flowbite-react";
import ScrollToTop from "../components/ScrollToTop";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../utils/imageUpload";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import PrivateRoute from "../routes/PrivateRoute";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

const skillOptions = [
  { value: "fitness", label: "Fitness" },
  { value: "yoga", label: "Yoga" },
  { value: "zumba", label: "Zumba" },
  { value: "martial-arts", label: "Martial Arts" },
  { value: "dance", label: "Dance" },
  { value: "pilates", label: "Pilates" },
  { value: "crossfit", label: "CrossFit" },
  { value: "aerobics", label: "Aerobics" },
  { value: "kickboxing", label: "Kickboxing" },
  { value: "calisthenics", label: "Calisthenics" },
  { value: "personal-training", label: "Personal Training" },
  { value: "spinning", label: "Spinning" },
  { value: "strength-training", label: "Strength Training" },
  { value: "boxing", label: "Boxing" },
  { value: "tai-chi", label: "Tai Chi" },
];

const dayOptions = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

const BeATrainer = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eligible, setEligible] = useState(true);
  const { user } = useAuth();
  const userEmail = user?.email;
  const [formData, setFormData] = useState({
    fullName: "",
    linkedin: "",
    instagram: "",
    age: "",
    experience: "",
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: "",
    aboutInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData({ ...formData, skills: selectedOptions });
  };

  const handleDaysChange = (selectedOptions) => {
    setFormData({ ...formData, availableDays: selectedOptions });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      fullName,
      linkedin,
      instagram,
      age,
      experience,
      skills,
      availableDays,
      availableTime,
      aboutInfo,
      profileImage,
    } = formData;

    try {
      //   upload image
      const photoURL = await imageUpload(profileImage);
      if (photoURL.error) {
        throw new Error(photoURL.error);
      }

      const applicantData = {
        fullName,
        linkedin,
        instagram,
        userEmail,
        photoURL,
        age,
        aboutInfo,
        experience,
        skills,
        availableDays,
        availableTime,
      };

      // Send to backend to store on db
      const response = await axiosSecure.post("/apply", applicantData);
      if (response.status === 200) {
        setLoading(false);
        Swal.fire("Success!", "Successfully Applied For Trainer!", "success");
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error!", `Image upload failed: ${error.message}`, "error");
    }
  };

  useEffect(() => {
    const fetchExistingApplicant = async () => {
      const result = await axiosPublic.get(`/application/${userEmail}`);

      if (result.data || user?.role === "admin" || user?.role === "trainer") {
        setEligible(false);
      } else {
        setEligible(true);
      }
    };
    fetchExistingApplicant();
  }, [axiosPublic, user?.role, userEmail]);

  return (
    <div className="mt-5 md:mt-10">
      <ScrollToTop></ScrollToTop>
      <Helmet>
        <title>
          TrueFit - Become a Trainer. Apply to share your expertise and inspire
          future fitness enthusiasts.
        </title>
      </Helmet>
      <Title
        title={"Become a Trainer"}
        description={
          "Apply to share your expertise and inspire future fitness enthusiasts."
        }
      ></Title>

      <div className="container mx-auto px-3 max-w-2xl">
        {eligible ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg border"
          >
            <div className="mb-4">
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter your name"
                onChange={handleInputChange}
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Email (Read-only)
              </label>
              <input
                type="email"
                name="email"
                value={userEmail}
                readOnly
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="Enter your linked url"
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Instagram URL</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="Enter your instagram url"
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Year of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                placeholder="e.g., 2"
                onChange={handleInputChange}
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Skills</label>
              <Select
                isMulti
                options={skillOptions}
                onChange={handleSkillsChange}
                className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Available Days</label>
              <Select
                isMulti
                options={dayOptions}
                onChange={handleDaysChange}
                className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Available Time</label>
              <input
                type="text"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleInputChange}
                placeholder="e.g., 9:00 AM - 5:00 PM"
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">About Yourself</label>
              <textarea
                name="aboutInfo"
                value={formData.aboutInfo}
                placeholder="Describe about yourself..."
                onChange={handleInputChange}
                rows={3}
                className="w-full border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Profile Image (1 : 1)
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>

            <PrivateRoute>
              <Button type="submit" className="px-10 mt-10" color="blue">
                {loading ? (
                  <Spinner
                    color="success"
                    aria-label="Success spinner example"
                  />
                ) : (
                  "Apply"
                )}
              </Button>
            </PrivateRoute>
          </form>
        ) : (
          <p className="text-red-500 text-center">
            You cannot apply for becoming a trainer.
          </p>
        )}
      </div>
    </div>
  );
};

export default BeATrainer;
