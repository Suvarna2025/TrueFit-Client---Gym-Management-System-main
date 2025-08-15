import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { Helmet } from "react-helmet-async";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainer = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const result = axiosSecure.get("/applications");
      return (await result).data;
    },
  });

  const navigate = useNavigate();

  const handleDetails = (trainer) => {
    navigate(`${trainer.userEmail}`); // Redirect to the detailed page
  };

  return (
    <div className="">
      <Helmet>
        <title>TrueFit - Applied Trainers.</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Applied Trainers
      </h1>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          {trainer.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trainer.map((trainer) => (
                <div
                  key={trainer._id}
                  className="bg-white dark:bg-gray-800 dark:text-gray-300 border rounded-lg shadow p-4 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <strong>Name:</strong> {trainer.fullName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <strong>Age:</strong> {trainer.age}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <strong>Skills:</strong>{" "}
                      {trainer.skills.map((skill) => skill.label).join(", ")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <strong>Experience:</strong> {trainer.experience} years
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleDetails(trainer)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">Don&apos;t have any application.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AppliedTrainers;
