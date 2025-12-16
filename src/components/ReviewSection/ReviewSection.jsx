import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { Autoplay, EffectCoverflow } from "swiper/modules";
import ReviewCard from "../../pages/Reviews/ReviewCard";

// Minimal Framer Motion
import { motion, useInView } from "framer-motion";

const ReviewSection = () => {
  const axiosInstance = useAxios();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="py-16 px-4" ref={sectionRef}>
      <div >
        {/* Fade-in container */}
        <motion.div
          initial={{ opacity: 0 ,}}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            What Our <span className="text-secondary">Customers</span> Say
          </h2>
          <span className="block mt-3 text-secondary font-semibold text-lg md:text-xl">
            {reviews.length} Genuine Reviews
          </span>
        </motion.div>

        
        <div className="px-4 md:px-6">
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={20}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;