import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Loading from "../../../components/Loading";

const BookedTrainer = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosSecure = useAxiosSecure();

  // Fetch user data
  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ["member-info"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${userEmail}`);
      return result.data;
    },
  });

  // Fetch booking info
  const { data: bookingData, isLoading: bookingLoading } = useQuery({
    queryKey: ["bookingInfo"],
    enabled: !!userData?.subscription, // Trigger only if subscription exists
    queryFn: async () => {
      const result = await axiosSecure.get(`/bookings/${userEmail}`);
      return result.data;
    },
  });


  const trainerInfo = bookingData?.trainerResult;
  const slotInfo = bookingData?.slotResult;
  const classesInfo = bookingData?.classResult;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);



  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        reviewer: user?.displayName,
        reviewerPhoto: user?.photoURL,
        reviewerEmail: user?.email,
        trainerId: trainerInfo?._id,
        review,
        rating,
      };
      const result = await axiosSecure.post("/reviews", reviewData);
      if (result.status === 200) {
        Swal.fire("Success!", "Successfully Submitted Review!", "success");
      } else {
        Swal.fire("Error!", "Error Submitting Review!", "error");
      }
    } catch (error) {
      Swal.fire("Error!", error?.message || "Error Submitting Review!", "error");
    } finally {
      setIsReviewModalOpen(false);
    }
  };
  
  
  // Loading state
  if (userLoading || bookingLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Helmet>
        <title>TrueFit - Your Booked Trainer</title>
      </Helmet>
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-4">Booked Trainer</h1>
        {bookingData ? (
          <>
            {/* Trainer Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <img
                src={trainerInfo?.photoURL}
                alt={trainerInfo?.fullName || "Trainer"}
                className="w-20 h-20 rounded-full border border-blue-500 object-cover"
              />
              <div>
                <h2 className="text-xl font-bold dark:text-gray-300">
                  {trainerInfo?.fullName || "No Trainer Info"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {trainerInfo?.skills?.map((skill) => skill.label).join(", ")}
                </p>
                <p className="text-gray-600 dark:text-gray-200 flex gap-3">
                  <a
                    href={trainerInfo?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={trainerInfo?.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    Instagram
                  </a>
                </p>
              </div>
            </div>

            {/* Classes Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-300">Classes Info</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                {classesInfo?.map((classItem) => (
                  <li key={classItem?._id}>{classItem?.className}</li>
                ))}
              </ul>
            </div>

            {/* Slot Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-300">Slot Info</h3>
              <ul className="text-gray-700 dark:text-gray-400 list-disc list-inside">
                <li>
                  <strong>Slot Name:</strong> {slotInfo?.slotName}
                </li>
                <li>
                  <strong>Slot Time:</strong> {slotInfo?.slotTime}
                </li>
              </ul>
            </div>

            {/* Review Button */}
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Leave a Review
            </button>
          </>
        ) : (
          <p className="text-red-500">You haven&apos;t booked any trainer yet.</p>
        )}
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Leave a Review
            </h2>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Feedback Textarea */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your feedback here..."
              className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              rows="4"
            ></textarea>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                onClick={handleReviewSubmit}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
