import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import './Swiperslide.css'
import { getIKUrl } from "../../utils/imageKit";
import { Link } from "react-router";

function Swiperslide() {
  const slideImages = [
    "https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp",
    "https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp",
    "https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp",
    "https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp",
    "https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp?updatedAt=1776085229057"
  ];

  return (
    <>
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={true}
        modules={[Autoplay,EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {slideImages.map((src, i) => (
          <SwiperSlide key={i}>
            <Link to="/catalogue">
              <img 
                src={getIKUrl(src, { width: 500, quality: 80, format: 'auto' })} 
                loading="lazy"
                decoding="async"
                alt={`Slide ${i + 1}`}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Swiperslide
