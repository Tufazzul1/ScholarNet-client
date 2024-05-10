
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='mt-6'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper min-h-[500px] lg:min-h-[calc(100vh-80px)]"
            >
                <SwiperSlide>
                    <div className="hero min-h-[500px] lg:min-h-[calc(100vh-80px)]" style={{ backgroundImage: 'url(https://i.ibb.co/3vk4pNr/vladyslav-melnyk-1l2hh-Vopr9-Y-unsplash.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className=" text-neutral-content">
                            <div className="lg:w-2/4 p-6 md:ml-16">
                                <h1 className="mb-5 text-3xl pt-10 md:text-5xl font-bold">Welcome to <span className='text-green-500'>ScholarNet</span></h1>
                                <p className="mb-5"> Explore our latest book arrivals and embark on exciting literary journeys. From captivating adventures to thought-provoking stories, there's something for every reader in our diverse collection. Dive into new worlds and let your imagination soar!</p>
                                <button className="btn bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500"><span className='text-white'>Get started</span></button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero min-h-[500px] lg:min-h-[calc(100vh-80px)]" style={{ backgroundImage: 'url(https://i.ibb.co/6Yx1hXM/inaki-del-olmo-NIJu-EQw0-RKg-unsplash.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className=" text-neutral-content">
                            <div className="lg:w-2/4 p-6 md:ml-16">
                                <h1 className="mb-5 text-3xl pt-10 md:text-5xl font-bold">Join the Reading Revolution</h1>
                                <p className="mb-5"> Get ready for a reading revolution at our library! Join us for upcoming events, including author talks, book clubs, and reading challenges. </p>
                                <button className="btn bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500"><span className='text-white'>Get started</span></button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero min-h-[500px] lg:min-h-[calc(100vh-80px)]" style={{ backgroundImage: 'url(https://i.ibb.co/j60dBYz/pexels-itfeelslikefilm-590493.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className=" text-neutral-content">
                            <div className="lg:w-2/4 p-6 md:ml-16">
                                <h1 className="mb-5 text-3xl pt-10 md:text-5xl font-bold">Unlock Knowledge & Inspiration</h1>
                                <p className="mb-5">Experience the power of knowledge and inspiration at our library. From research assistance to digital resources, we provide tools and resources to fuel your academic curiosity and creative pursuits.</p>
                                <button className="btn bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500"><span className='text-white'>Get started</span></button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;