import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../Loading";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classesData = [], isLoading } = useQuery({
    queryKey: ["classes"], // Include search in the query key to refetch on changes
    queryFn: async () => {
      const result = await axiosPublic(`/top-classes`);

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
    <div className="container mx-auto ">
      <Title
        title={"Featured Classes"}
        description={"Top 6 most popular classes based on total bookings"}
      ></Title>

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
                <p className="text-gray-700 dark:text-gray-400">{clas?.details}</p>
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
                            (trainerInfo) => trainerInfo?._id === trainer,
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
    </div>
  );
};

export default FeaturedClasses;
