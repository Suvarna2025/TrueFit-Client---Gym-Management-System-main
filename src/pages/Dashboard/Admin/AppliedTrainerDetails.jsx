import { useQuery } from "@tanstack/react-query";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import { Helmet } from "react-helmet-async";

const AppliedTrainerDetails = () => {
  const { email } = useParams();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: trainerDetails = {}, isLoading } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/application/${email}`);
      return response.data;
    },
  });

  const handleConfirm = async () => {
    setConfirmLoading(true);
    // Handle confirm logic here
    const response = await axiosSecure.patch(`/confirm/${email}`);

    if (response.status === 200) {
      Swal.fire("Success!", "Confirmed Trainer Successfully!", "success");
      setConfirmLoading(false);
      navigate("/dashboard/applied-trainers");
    } else {
      Swal.fire("Error!", "Error Confirming Trainer!", "error");
      setConfirmLoading(false);
      navigate("/dashboard/applied-trainers");
    }
  };

  const handleReject = () => {
    setRejectLoading(true);
    // Handle reject logic here
    Swal.fire({
      title: "Give Feedback For Rejection",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Reject Application",
      confirmButtonColor: "red",
      showLoaderOnConfirm: true,
      preConfirm: async (feedback) => {
        const result = await axiosSecure.patch(`/reject/${email}`, {
          adminFeedback: feedback,
        });
        return result;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        setRejectLoading(false);
        Swal.fire("Success!", "Successfully Rejected Application!", "success");
        navigate("/dashboard/applied-trainers");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>TrueFit - Applied Trainer Details.</title>
      </Helmet>
      <div className="flex items-center gap-3 mb-6">
        <Link to={"/dashboard/applied-trainers"}>
          <FaRegArrowAltCircleLeft className="text-2xl dark:text-white text-black" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 ">Trainer Details</h1>
      </div>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={trainerDetails?.photoURL}
              alt="Profile"
              className="w-40 h-40 rounded-full border border-blue-500 object-cover shadow-lg"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Name: {trainerDetails?.fullName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> {trainerDetails?.userEmail}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>About:</strong> {trainerDetails?.aboutInfo}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Age:</strong> {trainerDetails?.age}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Skills:</strong>{" "}
                {trainerDetails.skills?.map((skill) => skill?.label).join(", ")}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Experience:</strong> {trainerDetails?.experience} years
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Available Days:</strong>{" "}
                {trainerDetails.availableDays
                  ?.map((day) => day?.label)
                  .join(", ")}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Available Time:</strong> {trainerDetails?.availableTime}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Applied at:</strong>{" "}
                {trainerDetails?.appliedAt?.split("T")[0]}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Status:</strong> {trainerDetails?.status}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {confirmLoading ? (
                <Spinner color="info" aria-label="Info spinner example" />
              ) : (
                "Confirm Application"
              )}
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              {rejectLoading ? (
                <Spinner color="info" aria-label="Info spinner example" />
              ) : (
                "Reject Application"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedTrainerDetails;
