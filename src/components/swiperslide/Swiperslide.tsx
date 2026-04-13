import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import './Swiperslide.css'
import { Link } from "react-router";




function Swiperslide() {

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
        <SwiperSlide >
         <Link to="/catalogue">
          <img src="https://ik.imagekit.io/ouw0qwets/portfolio/Jewellery3.webp" />
         </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/catalogue"}>
          <img src="https://ik.imagekit.io/ouw0qwets/portfolio/real%20estate.webp" />
          </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to="/catalogue">
          <img src="https://ik.imagekit.io/ouw0qwets/portfolio/original-cb28cbd4789e886882400836504f2167.webp" />
         </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/catalogue">
          <img src="https://ik.imagekit.io/ouw0qwets/portfolio/original-d472901372d30e98e15715b51b7df917.webp" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/catalogue">
          <img src="https://ik.imagekit.io/ouw0qwets/portfolio/6ea1b082c49046484e848a49cf03d001.webp?updatedAt=1776085229057" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Swiperslide
