import { Link } from "react-router";
import Title from "../Title";
import { Button } from "flowbite-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../Loading";

const CommunityPosts = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch posts
  const { data = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ["forumPosts"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/forum?page=1`);
      return result.data;
    },
    keepPreviousData: true,
  });

  // Mutation for upvote and downvote
  const { mutate: upvote } = useMutation({
    mutationFn: async (postId) => {
      // Make API request to upvote the post
      const response = await axiosPublic.patch(`/forum/upvote/${postId}`);
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
      const response = await axiosPublic.patch(`/forum/downvote/${postId}`);
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

  const { posts } = data;

  return (
    <div className="container mx-auto">
      <Title
        title={"Explore Community Insights"}
        description={
          "Stay informed with the latest posts and valuable discussions."
        }
      ></Title>

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
      <div className="flex justify-center mt-10">
        <Link to={"/forum"}>
          <Button outline gradientDuoTone="purpleToBlue">
            See more ...
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityPosts;
