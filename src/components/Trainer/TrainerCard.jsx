import { Button } from "flowbite-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import PropTypes from "prop-types";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center border hover:shadow-2xl relative">
      <img
        src={trainer.photoURL}
        alt={trainer.fullName || trainer.displayName}
        className="w-32 h-32 mx-auto rounded-full object-cover border"
      />
      <h3 className="text-xl font-bold mt-4">{trainer.fullName || trainer.displayName}</h3>
      <p className="text-gray-500">{trainer.experience} Years of Experience</p>
      <p className="text-gray-700 dark:text-gray-400 mt-2">{trainer.skills.map(skill=>skill.label).join(', ')}</p>
      <p
        className={`mt-2 ${
          trainer.slots > 0 ? "text-green-600 dark:text-green-400" : "text-red-600"
        }`}
      >
        {trainer.slots > 0
          ? `${trainer.slots} Slots Remaining`
          : "Fully Booked"}
      </p>
      <div className="flex justify-center mt-4">
        <Link to={`/trainers/${trainer._id}`}>
          <Button>Know More</Button>
        </Link>
      </div>
      <div className="absolute top-12 right-10 flex flex-col gap-3">
        <a href={trainer.linkedin || "#"} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-600 text-4xl transform hover:scale-105 transition duration-150" />
        </a>
        <a href={trainer.instagram || "#"} target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-500 text-4xl transform hover:scale-105 transition duration-150" />
        </a>
      </div>
    </div>
  );
};

TrainerCard.propTypes = {
  trainer: PropTypes.object,
};

export default TrainerCard;
