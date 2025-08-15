import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Title from "../components/Title";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Forum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  // Fetch posts
  const {
    data = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["forumPosts", currentPage],
    queryFn: async () => {
      const result = await axiosPublic.get(`/forum?page=${currentPage}`);
      return result.data;
    },
    keepPreviousData: true,
  });

  // Mutation for upvote and downvote
  const { mutate: upvote } = useMutation({
    mutationFn: async (postId) => {
      // Make API request to upvote the post
      const response = await axiosSecure.patch(`/forum/upvote/${postId}`);
      return response.data;
    },
    onSuccess: () => {
      // Handle success (e.g., update UI with new vote count)
      refetch();
    },
    onError: () => {
      // Handle error (e.g., show error message)
    },
  });

  const { mutate: downvote } = useMutation({
    mutationFn: async (postId) => {
      // Make API request to downvote the post
      const response = await axiosSecure.patch(`/forum/downvote/${postId}`);
      return response.data;
    },
    onSuccess: () => {
      // Handle success (e.g., update UI with new vote count)
      refetch();
    },
    onError: () => {
      // Handle error (e.g., show error message)
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p>Error loading posts!</p>;

  const { posts, totalPages } = data;

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Helmet>
        <title>
          TrueFit - Explore Community Insights. Stay informed with the latest
          posts and valuable discussions.
        </title>
      </Helmet>
      <div className="container mx-auto mt-6">
        <Title
          title="Explore Community Insights"
          description="Stay informed with the latest posts and valuable discussions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-3">
          {posts?.map((post) => (
            <div
              key={post._id}
              className="border hover:shadow-2xl p-4 rounded-md flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-xl">{post?.title}</h3>
                  <p
                    className={`px-3 py-1 text-xs text-white rounded-full ${
                      post?.authorType === "admin"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {post?.authorType}
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  By {post.postedBy} | {post?.postedDate}
                </p>
                <p className="text-sm text-gray-400 mt-1 mb-4">
                  Category : {post?.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{post?.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                {/* Voting Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => upvote(post._id)}
                    className="flex items-center text-green-500"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 10h4v6h6v-6h4L10 3 3 10z" />
                    </svg>
                    Upvote
                  </button>
                  <button
                    onClick={() => downvote(post._id)}
                    className="flex items-center text-red-500"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 10h4V4h6v6h4l-7 7-7-7z" />
                    </svg>
                    Downvote
                  </button>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  Votes: {post.upvotes - post.downvotes}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              } rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Forum;
