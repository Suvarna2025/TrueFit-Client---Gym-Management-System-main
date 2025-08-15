import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddForum = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [forumData, setForumData] = useState({
    title: "",
    description: "",
    category: "",
    postedDate: new Date()
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .replace(",", ""),
    authorType: user.role,
    postedBy: user.displayName,
    upvotes: 0,
    downvotes: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForumData({ ...forumData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call or logic to save forum
    const result = await axiosSecure.post("/forum", forumData);
    if (result.status === 200) {
      await Swal.fire("Success!", "Successfully Posted Forum!", "success");
      navigate("/forum");
    }
  };

  return (
    <div className="max-w-3xl">
      <Helmet>
        <title>TrueFit - Add Forum Posts.</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Add New Forum</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block font-medium text-gray-700 dark:text-gray-400 mb-2"
          >
            Forum Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={forumData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
            placeholder="Enter forum title"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block font-medium text-gray-700 dark:text-gray-400 mb-"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={forumData.category}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="">Select a category</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Wellness">Wellness</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Career Growth">Career Growth</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Parenting">Parenting</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Relationships">Relationships</option>
            <option value="Hobbies">Hobbies</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700 dark:text-gray-400 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={forumData.description}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300"
            placeholder="Write forum description here"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600"
        >
          Add Forum
        </button>
      </form>
    </div>
  );
};

export default AddForum;
