import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Title from "../Title";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const {data: reviews=[]} = useQuery({
    queryKey: ['reviews'],
    queryFn: async()=>{
      const result = await axiosPublic.get('/reviews')
      return result.data;
    }
  })


  return (
    <div className="px-3 container mx-auto">
      <Title
        title={"Real Stories, Real Results"}
        description={
          "Discover success stories shared by our inspiring fitness community members."
        }
      ></Title>
      <Swiper
        modules={[Navigation]} // Use modules array to include Navigation
        slidesPerView={3}
        spaceBetween={40}
        navigation
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="review-card p-6 rounded-lg shadow-lg text-center border hover:shadow-2xl">
              <img
                src={review.reviewerPhoto}
                alt={review.reviewer}
                className="w-20 h-20 rounded-full mx-auto mb-4 border"
              />
              <h3 className="text-xl font-semibold mb-2">{review.reviewer}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                &quot;{review.review}&quot;
              </p>
              <div className="text-yellow-400 text-3xl">
                {"★".repeat(Math.floor(review.rating))}{" "}
                {review.rating % 1 > 0 && "½"}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
