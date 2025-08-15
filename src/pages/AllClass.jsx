import { useState } from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import { Helmet } from "react-helmet-async";
import { TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";

const AllClass = () => {
  const axiosPublic = useAxiosPublic();
  const [classesData, setClassesData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isLoading } = useQuery({
    queryKey: ["classes", currentPage, search], // Include search in the query key to refetch on changes
    queryFn: async () => {
      const result = await axiosPublic(
        `/classes?page=${currentPage}&limit=6&search=${search}`,
      );
      setClassesData(result.data.classes);
      setTotalPages(result.data.totalPages);
      return result.data;
    },
  });

  const { data: trainers = [] } = useQuery({
    queryKey: ["all-trainers"],
    queryFn: async () => {
      const result = await axiosPublic.get("/trainers");
      return result.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>
          TrueFit - Explore All Classes! Discover diverse classes and expert
          trainers to elevate your skills!
        </title>
      </Helmet>
      <ScrollToTop></ScrollToTop>
      <div className="container mx-auto mt-6">
        <Title
          title={"Explore All Classes"}
          description={
            "Discover diverse classes and expert trainers to elevate your skills!"
          }
        />

        {/* Search Bar */}
        <div className="flex justify-end pr-3 mb-5">
          <TextInput
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" dark:text-gray-800"
            icon={IoSearch}
            required
          />
        </div>

        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-3">
            {classesData?.map((clas) => (
              <div
                key={clas?._id}
                className="border hover:shadow-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <img
                    src={clas?.photoURL}
                    alt={clas?.className}
                    className="w-full h-52 sm:h-60 lg:h-56 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {clas?.className}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {clas?.details}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="text-2xl">{clas?.bookings}</span> Bookings
                  </span>
                  <div className="flex -space-x-2">
                    {clas?.trainerId?.slice(0, 5)?.map((trainer, idx) => (
                      <Link
                        to={`/trainers/${trainer}`}
                        key={idx}
                        className="relative block w-12 h-12 rounded-full border border-blue-400 hover:ring-2 hover:ring-blue-500 overflow-hidden hover:z-10 transition duration-200"
                      >
                        <img
                          src={
                            trainers?.find(
                              (trainerInfo) => trainerInfo._id === trainer,
                            )?.photoURL
                          }
                          alt={
                            trainers?.find(
                              (trainerInfo) => trainerInfo._id === trainer,
                            )?.fullName
                          }
                          className="object-cover w-full h-full bg-white"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)]?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              } rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllClass;
