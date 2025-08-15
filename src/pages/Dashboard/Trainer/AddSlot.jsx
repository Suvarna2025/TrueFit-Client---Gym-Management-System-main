import Select from "react-select";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Spinner } from "flowbite-react";
import { Helmet } from "react-helmet-async";

const AddSlot = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [slotData, setSlotData] = useState({
    slotName: "",
    slotTime: "",
    selectedClasses: [],
    selectedDays: [],
  });

  const { data: classes = [] } = useQuery({
    queryKey: ["all-classes"], // Include search in the query key to refetch on changes
    queryFn: async () => {
      const result = await axiosPublic.get("/all-classes");
      return result.data;
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlotData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClassSelect = (selectedOptions) => {
    setSlotData((prevState) => ({
      ...prevState,
      selectedClasses: selectedOptions,
    }));
  };

  const handleDaySelect = (selectedOptions) => {
    setSlotData((prevState) => ({
      ...prevState,
      selectedDays: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const slotDataWithTrainerId = {
      ...slotData,
      trainerId: user._id,
    };

    // Add logic to save the data to the database
    const result = await axiosSecure.post("/add-slot", slotDataWithTrainerId);

    if (result.data.modifiedCount > 0 || result.data.matchedCount > 0) {
      Swal.fire("Success!", "Successfully Added Slot!", "success");
      setLoading(false);
      setSlotData({
        slotName: "",
        slotTime: "",
        selectedClasses: [],
        selectedDays: [],
      });
    } else {
      Swal.fire("Error!", "Error Adding Slot. Try Again!", "error");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <Helmet>
        <title>TrueFit - Add New Slots.</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Add New Slot
      </h2>

      {/* Read-Only Trainer Data */}
      <div className="mb-6 dark:text-gray-300">
        <h3 className="text-lg font-semibold mb-2">Trainer Details</h3>
        <p>
          <strong>Name:</strong> {user.fullName || user.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>Skills:</strong>{" "}
          {user.skills.map((skill) => skill.label).join(", ")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Select Days
          </label>
          <Select
            options={user.availableDays}
            isMulti
            onChange={handleDaySelect}
            value={slotData.selectedDays}
            placeholder="Select available days"
            className="mt-1"
            required
          />
        </div>

        {/* Slot Name */}
        <div>
          <label
            htmlFor="slotName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Slot Name
          </label>
          <input
            type="text"
            id="slotName"
            name="slotName"
            value={slotData.slotName}
            onChange={handleInputChange}
            required
            placeholder="Enter slot name (e.g., Morning Slot)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label
            htmlFor="slotTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Slot Time
          </label>
          <input
            type="text"
            id="slotTime"
            name="slotTime"
            value={slotData.slotTime}
            onChange={handleInputChange}
            required
            placeholder="Enter slot time (e.g., 9:00 - 10:00 AM)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Classes Include */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Classes Include
          </label>
          <Select
            options={classes.map((clas) => ({
              value: clas._id,
              label: clas.className,
            }))}
            isMulti
            onChange={handleClassSelect}
            placeholder="Select classes to include"
            value={slotData.selectedClasses}
            className="mt-1"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? (
              <Spinner color="info" aria-label="Info spinner example" />
            ) : (
              <span>Add Slot</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSlot;
