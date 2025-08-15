import { useQuery } from "@tanstack/react-query";
import ScrollToTop from "../components/ScrollToTop";
import Title from "../components/Title";
import TrainerCard from "../components/Trainer/TrainerCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";

const AllTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trainers = [], isLoading } = useQuery({
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
          TrueFit - Meet Our Trainers. Experienced trainers dedicated to helping
          you achieve fitness goals.
        </title>
      </Helmet>
      <ScrollToTop></ScrollToTop>
      <div className="mt-6 container mx-auto">
        <Title
          title={"Meet Our Trainers"}
          description={
            "Experienced trainers dedicated to helping you achieve fitness goals."
          }
        ></Title>

        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-3">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer._id} trainer={trainer} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllTrainer;
