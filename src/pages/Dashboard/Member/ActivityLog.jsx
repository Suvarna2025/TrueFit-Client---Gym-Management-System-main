import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: userData = {} } = useQuery({
    queryKey: ["member-info"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });

  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  return (
    <div className="">
      <Helmet>
        <title>TrueFit - Activity Logs Are Here.</title>
      </Helmet>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-4">Activity Log</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-200">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="text-left py-3 px-4 border-b border-gray-200">
                  Name
                </th>
                <th className="text-left py-3 px-4 border-b border-gray-200">
                  Email
                </th>
                <th className="text-left py-3 px-4 border-b border-gray-200">
                  Status
                </th>
                <th className="text-left py-3 px-4 border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData?.status ? (
                <tr>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {userData.displayName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {userData.email}
                  </td>
                  <td
                    className={`py-3 px-4 border-b border-gray-200 ${
                      userData.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {userData.status}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {userData.status === "rejected" && (
                      <button
                        onClick={() =>
                          handleViewFeedback(userData?.adminFeedback)
                        }
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="View Feedback"
                      >
                        <FaEye size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="text-red-500 p-2">No updates today!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Rejection Feedback
            </h2>
            <p className="text-gray-700">
              {selectedFeedback || "No feedback provided."}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
