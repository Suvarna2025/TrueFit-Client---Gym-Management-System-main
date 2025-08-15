import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const Trainers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/trainers");
      return result.data;
    },
  });

  const handleDeleteTrainer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.patch(`/trainers/${id}`);
        if (result.status === 200) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Trainer has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>TrueFit - All Trainers Here.</title>
      </Helmet>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-4">All Trainers</p>

      <div className="flex flex-col gap-2">
        {/* List Table Title */}

        <div className="hidden md:grid grid-cols-[0.5fr_3fr_3fr_2fr] items-center py-1 px-2 border bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300 text-sm gap-2">
          <b>#</b>
          <b>Name</b>
          <b>Email</b>
          <b className="text-center">Action</b>
        </div>

        {/* trainer list */}
        {trainers.map((trainer, idx) => (
          <div
            key={trainer._id}
            className="grid grid-cols-[auto_2fr_1fr] md:grid-cols-[0.5fr_6fr_2fr] items-center gap-2 px-2 py-1 border text-sm  dark:bg-gray-800 dark:text-gray-300"
          >
            <p className="row-start-1 col-start-1">{idx + 1}</p>
            <div className="row-start-1 col-start-2 md:grid grid-cols-2 gap-2">
              <p>{trainer.displayName}</p>
              <p className="text-gray-500 dark:text-gray-300 text-xs md:text-base">
                {trainer.email}
              </p>
            </div>
            <p
              onClick={() => handleDeleteTrainer(trainer._id)}
              className="row-start-1 col-start-3 md:col-auto text-right md:text-center cursor-pointer text-lg text-red-500"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Trainers;
