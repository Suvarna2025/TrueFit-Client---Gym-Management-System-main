import { Button } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router";
import { assets } from "../assets/assets";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ScrollToTop from "../components/ScrollToTop";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainerData = {}, isLoading } = useQuery({
    queryKey: ["trainerData"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/trainers/${id}`);
      return result.data;
    },
  });

  const { data: slots = [] } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/slots/${id}`);
      return result.data;
    },
  });

  return (
    <div className="container mx-auto px-3 py-6">
      <ScrollToTop></ScrollToTop>
      <Helmet>
        <title>TrueFit - Explore Comprehensive Details of The Trainer.</title>
      </Helmet>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          {/* Trainer Info Section */}
          <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 mb-8">
            <img
              src={trainerData?.photoURL}
              alt={trainerData?.fullName || trainerData.displayName}
              className="w-48 h-48 rounded-full object-cover shadow-lg"
            />
            <div className="lg:ml-8 mt-6 lg:mt-0 lg:text-left">
              <h2 className="text-3xl font-bold mb-2">
                {trainerData?.fullName || trainerData.displayName}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">{trainerData?.aboutInfo}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Age: </strong>
                {trainerData?.age} year
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Experience: </strong>
                {trainerData?.experience} year of experience
              </p>
              <h4 className="font-semibold">Expertise:</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                {trainerData?.skills?.map((item, index) => (
                  <li key={index}>{item.label}</li>
                ))}
              </ul>
              <p
                className={`mt-4 ${
                  trainerData?.slots > 0 ? "text-gray-600 dark:text-gray-300" : "text-red-500"
                } `}
              >
                <strong>Slots Left: </strong>
                {trainerData?.slots}
              </p>
            </div>
          </div>

          {/* Available Slots Section */}
          <div className="bg-gray-50  dark:bg-gray-800 shadow-lg border rounded-lg p-6 mb-32">
            <h3 className="text-2xl font-bold mb-4">
              Book For Available Slots
            </h3>
            {trainerData?.slots > 0 ? (
              <>
                {slots.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {slots.map((slot) => (
                      <Link
                        to={`book-trainer/${slot._id}`}
                        key={slot._id}
                        className="rounded-lg p-3 border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-lg space-y-1"
                      >
                        <p>
                          <strong>Slot Name : </strong>
                          {slot.slotName}
                        </p>
                        <p>
                          <strong>Slot Time : </strong>
                          {slot.slotTime}
                        </p>
                        <p>
                          <strong>Slot Days : </strong>
                          {slot.selectedDays.map((day) => day.label).join(", ")}
                        </p>
                        <p>
                          <strong>Classes Include : </strong>
                          {slot.selectedClasses
                            .map((day) => day.label)
                            .join(", ")}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">No Slots For This Trainer</p>
                )}
              </>
            ) : (
              <p className="text-red-500">No Slots Available for Booking</p>
            )}
          </div>
        </>
      )}

      {/* Be A Trainer Section */}
      <div
        style={{ backgroundImage: `url(${assets.Trainer})` }}
        className="relative bg-cover bg-center h-full text-white text-center py-10 md:py-40 rounded-lg shadow-lg"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-lg"></div>

        <div className="relative flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 font-prata">
            Passionate About Fitness?
          </h3>
          <p className="mb-6">
            Join our team and inspire others to achieve their goals.
          </p>
          <Button
            size="xl"
            gradientDuoTone="purpleToBlue"
            onClick={() => navigate("/become-trainer")}
          >
            Become a Trainer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
