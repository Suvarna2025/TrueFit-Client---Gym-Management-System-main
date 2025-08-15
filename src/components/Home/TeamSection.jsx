import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Title";
import Loading from "../Loading";
import TrainerCard from "../Trainer/TrainerCard";
import { Link } from "react-router";
import { Button } from "flowbite-react";

const TeamSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["top-trainers"],
    queryFn: async () => {
      const result = await axiosPublic.get("/top-trainers");
      return result.data;
    },
  });

  return (
    <>
      <div className="mt-5 container mx-auto">
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

        <div className="flex justify-center mt-10">
          <Link to={"/trainers"}>
            <Button outline gradientDuoTone="purpleToBlue">
              See more ...
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TeamSection;
