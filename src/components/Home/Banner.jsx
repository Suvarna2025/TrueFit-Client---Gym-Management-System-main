import { Button, Carousel } from "flowbite-react";
import { Link } from "react-router";
import { assets } from "../../assets/assets";

const Banner = () => {
  const bannerSlider = [
    {
      image: assets.Slider1,
      title: "Transform Your Fitness Journey",
      description:
        "Achieve your fitness goals with expert guidance and support.",
      buttonText: "Get Started Now",
      buttonLink: "/classes",
    },
    {
      image: assets.Slider2,
      title: "Personalized Workouts, Maximum Results",
      description:
        "Customized workout plans tailored to your unique fitness journey.",
      buttonText: "View Workout Plans",
      buttonLink: "/classes",
    },
    {
      image: assets.Slider3,
      title: "Join the TrueFit Community",
      description:
        "Join a supportive community for inspiration and shared success.",
      buttonText: "Join the Community",
      buttonLink: "/forum",
    },
  ];

  return (
    <div className="h-80 sm:h-80 lg:h-[550px]">
      <Carousel className="z-[1]" slideInterval={3000}>
        {bannerSlider.map((slider, idx) => (
          <div
            style={{ backgroundImage: `url(${slider.image})` }}
            key={idx}
            className="relative bg-cover bg-center h-full"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-3">
              <h2 className="text-4xl lg:text-5xl font-bold font-prata">
                {slider.title}
              </h2>
              <p className="text-lg my-4 px-9">{slider.description}</p>
              <Link to={slider.buttonLink}>
                <Button outline gradientDuoTone="purpleToBlue">
                  {slider.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
