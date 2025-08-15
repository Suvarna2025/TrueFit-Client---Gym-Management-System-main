import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/subscribers");
      return result.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>TrueFit - All Subscribers Here.</title>
      </Helmet>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        All Newsletter Subscribers
      </p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}

        <div className="hidden md:grid grid-cols-[0.5fr_3fr_3fr_2fr] items-center py-1 px-2 border bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300 text-sm gap-2">
          <b>#</b>
          <b>Name</b>
          <b>Email</b>
          <b className="text-center">Action</b>
        </div>

        {/* Subscriber list */}
        {subscribers.map((subscriber, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[auto_2fr_1fr] md:grid-cols-[0.5fr_6fr_2fr] items-center gap-2 px-2 py-1 border text-sm dark:bg-gray-800 dark:text-gray-300"
          >
            <p className="row-start-1 col-start-1">{idx + 1}</p>
            <div className="row-start-1 col-start-2 md:grid grid-cols-2 gap-2">
              <p>{subscriber.name}</p>
              <p className="text-gray-500 dark:text-gray-300 text-xs md:text-base">
                {subscriber.email}
              </p>
            </div>
            <p className="row-start-1 col-start-3 md:col-auto text-right md:text-center cursor-pointer text-lg">
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Subscribers;
