import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Spinner } from "flowbite-react";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils/imageUpload";
import { Helmet } from "react-helmet-async";
const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const className = e.target.className.value;
    const details = e.target.details.value;
    const photo = e.target.photo.files[0];

    // upload photo
    const photoURL = await imageUpload(photo);

    const classData = {
      className,
      details,
      photoURL,
      bookings: 0,
    };

    // Add logic here to save data to the database
    const result = await axiosSecure.post("/classes", classData);
    if (result.status === 200) {
      setLoading(false);
      Swal.fire("Success!", "Successfully Added Class!", "success");

      e.target.className.value = "";
      e.target.details.value = "";
      e.target.photo.value = null;
    }
  };

  return (
    <div>
      <Helmet>
        <title>TrueFit - Add Classes.</title>
      </Helmet>
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Add New Class</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Name */}
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Class Name
            </label>
            <input
              type="text"
              id="className"
              name="className"
              required
              placeholder="Enter class name"
              className="mt-1 block w-full p-2 border dark:text-gray-300 dark:bg-gray-800 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Details
            </label>
            <textarea
              id="details"
              name="details"
              required
              placeholder="Enter class details"
              rows="4"
              className="mt-1 block w-full p-2 border dark:bg-gray-800 dark:text-gray-300 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Class Image
            </label>
            <input
              type="file"
              id="image"
              name="photo"
              accept="image/*"
              required
              className="mt-1 w-full rounded-md border dark:text-gray-300"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? (
                <Spinner color="success" aria-label="Success spinner example" />
              ) : (
                "Add Class"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
