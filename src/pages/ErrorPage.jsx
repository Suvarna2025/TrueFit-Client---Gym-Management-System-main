import { Link, useNavigate } from "react-router";
import ScrollToTop from "../components/ScrollToTop";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 px-3">
      <ScrollToTop></ScrollToTop>
      <Helmet>
        <title>TrueFit - 404 - Not Found!</title>
      </Helmet>
      <div className="text-center">
        {/* <!-- Error Code --> */}
        <h1 className="text-8xl lg:text-9xl font-extrabold text-blue-500 dark:text-blue-600">
          404
        </h1>

        {/* <!-- Error Message --> */}
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-400 mt-4">
          Oops! Page not found
        </p>
        <p className="text-gray-600 dark:text-gray-500 mt-2">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* <!-- Action Buttons --> */}
        <div className="mt-6">
          <Link
            to={"/"}
            className="px-5 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
          >
            Go Home
          </Link>
          <Link
            to={"https://www.facebook.com/alimuzzaman.haris"}
            target="_blank"
            onClick={()=>navigate('/')}
            className="px-5 py-2 ml-4 text-blue-500 border border-blue-500 hover:bg-blue-50 rounded-lg shadow-md"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
