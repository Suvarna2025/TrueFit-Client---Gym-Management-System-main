import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="min-h-80 flex flex-col justify-center items-center">
      <Spinner color="success" aria-label="Success spinner example" />
    </div>
  );
};

export default Loading;
