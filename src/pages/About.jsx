import { Button } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { FaDumbbell, FaUsers, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className=" text-gray-800">
      <Helmet>
        <title>TrueFit - About Us</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">About TrueFit</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Empowering individuals to achieve their fitness goals through expert
          guidance and an inspiring community.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-3 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-lg dark:text-gray-300">
            At TrueFit, we strive to create a fitness platform that makes
            exercise engaging, accessible, and effective. Our expert trainers
            and innovative classes help individuals of all levels reach their
            health and fitness goals.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            Our Vision
          </h2>
          <p className="text-lg dark:text-gray-300">
            We envision a world where everyone has the knowledge, resources, and
            motivation to lead a healthier life. TrueFit is committed to
            building a supportive fitness community that inspires growth and
            transformation.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-3 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Why Choose TrueFit?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-8">
            <div className="p-6 bg-gray-200 dark:bg-gray-900 border rounded-lg shadow-md">
              <FaDumbbell className="text-4xl text-blue-500 mx-auto" />
              <h3 className="text-xl font-semibold mt-4 dark:text-gray-300">
                Expert Trainers
              </h3>
              <p className="mt-2 dark:text-gray-400">
                Get guidance from certified trainers with years of experience.
              </p>
            </div>
            <div className="p-6 bg-gray-200 dark:bg-gray-900 border rounded-lg shadow-md">
              <FaUsers className="text-4xl text-purple-500 mx-auto" />
              <h3 className="text-xl font-semibold mt-4 dark:text-gray-300">
                Community Support
              </h3>
              <p className="mt-2 dark:text-gray-400">
                Join a vibrant fitness community that keeps you motivated.
              </p>
            </div>
            <div className="p-6 bg-gray-200 dark:bg-gray-900 border rounded-lg shadow-md">
              <FaStar className="text-4xl text-yellow-500 mx-auto" />
              <h3 className="text-xl font-semibold mt-4 dark:text-gray-300">
                Personalized Plans
              </h3>
              <p className="mt-2 dark:text-gray-400">
                We tailor workout and nutrition plans to fit your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="text-center py-16 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Ready to Start Your Fitness Journey?
        </h2>
        <Button
          size="xl"
          gradientDuoTone="purpleToBlue"
          onClick={() => navigate("/signup")}
        >
          Join Now
        </Button>
      </section>
    </div>
  );
};

export default About;
