import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import cuberto from '../../assets/cuberto.png'
import cyber from '../../assets/cyberpunk.png'
import tracker from '../../assets/tracker.png'
import pass from '../../assets/pass.png'
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
         <Link to="/projects">
          <img src={cuberto} />
         </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/projects"}>
          <img src={cyber} />
          </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to="/projects">
          <img src={pass} />
         </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/projects">
          <img src={tracker} />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/projects">
          <img src={cyber} />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Swiperslide
