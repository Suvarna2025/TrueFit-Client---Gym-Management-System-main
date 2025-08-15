import { Card } from "flowbite-react";
import Title from "../Title";
import { assets } from "../../assets/assets";

const Feature = () => {
  const features = [
    {
      title: "Personalized Workouts",
      description: "Custom plans tailored to your fitness level and goals.",
      image: assets.Feature1,
    },
    {
      title: "Certified Trainers",
      description:
        "Train with experienced professionals guiding you every step.",
      image: assets.Feature2,
    },
    {
      title: "Nutrition Guidance",
      description: "Meal plans designed to complement your fitness regime.",
      image: assets.Feature3,
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor and celebrate your fitness milestones in real-time.",
      image: assets.Feature4,
    },
    {
      title: "Community Support",
      description:
        "Join a vibrant community for motivation and shared success.",
      image: assets.Feature5,
    },
    {
      title: "Interactive Classes",
      description:
        "Participate in engaging live or on-demand fitness sessions.",
      image: assets.Feature6,
    },
  ];
  return (
    <div className="container mx-auto">
      <Title
        title={"Key Features"}
        description={
          "Empowering fitness journeys with personalized plans, community, and guidance."
        }
      ></Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-3">
        {features.map((feature, idx) => (
          <Card key={idx} className="hover:shadow-2xl">
            <div className="relative flex items-center justify-between">
              <img src={feature.image} className="w-20" alt="Feature" />
              <p className="absolute right-0 text-9xl font-bold text-gray-200 dark:text-gray-700">{idx+1}</p>
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {feature.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feature;
