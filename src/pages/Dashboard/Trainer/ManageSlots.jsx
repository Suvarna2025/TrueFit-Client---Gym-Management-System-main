import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const trainerId = user?._id;
  const {
    data: slots = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/slots/${trainerId}`);
      return result.data;
    },
  });
  // console.log(slots);

  const handleDeleteSlot = (slotId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.delete(`/slots/${slotId}`);
        if (result.status === 200) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Slot has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>TrueFit - Manage Your Slots.</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Manage Slots</h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => (
            <div
              key={slot._id}
              className="bg-white dark:bg-gray-800 border rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {slot.slotName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Time:</strong> {slot.slotTime}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Days:</strong>{" "}
                  {slot.selectedDays.map((day) => day.label).join(", ")}
                </p>
              </div>
              <button
                onClick={() => handleDeleteSlot(slot._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No Slots Message */}
      {slots.length === 0 && (
        <p className="text-red-500 dark:text-red-400">No slots available.</p>
      )}
    </div>
  );
};

export default ManageSlots;
