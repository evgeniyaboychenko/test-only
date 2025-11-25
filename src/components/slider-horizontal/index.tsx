import { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import './styles/index.scss';
import 'swiper/css';
import { IProps } from './types';
import { TEvent } from '../slider/types';

function SliderHorizontal({ setSwiperHorizontalInstance, eventList }: IProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className='slider-horizontal'>
      <Swiper
        className='slider-horizontal__swiper'
        modules={[Navigation, Pagination]}
        breakpoints={{
          320: {
            spaceBetween: 25,
          },
          1025: {
            spaceBetween: 80,
          },
        }}
        slidesPerView={'auto'}
        initialSlide={0}
        onSwiper={(swiper) => {
          setSwiperHorizontalInstance(swiper);
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          disabledClass: 'slider-horizontal__button-disabled',
        }}
      >
        {eventList?.map((item: TEvent) => (
          <SwiperSlide key={item.id} className='slide-horizontal'>
            <h2 className='slide-horizontal__year'>{item.date}</h2>
            <p className='slide-horizontal__event'>{item.event}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='slider-horizontal__navigation'>
        <button ref={prevRef} className='slider-horizontal__button slider-horizontal__button-prev'>
          <svg
            width='8'
            height='12'
            viewBox='0 0 8 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.707093 0.707092L5.70709 5.70709L0.707093 10.7071'
              stroke='#3877EE'
              strokeWidth='2'
            />
          </svg>
        </button>

        <button ref={nextRef} className='slider-horizontal__button slider-horizontal__button-next'>
          <svg
            width='8'
            height='12'
            viewBox='0 0 8 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.707093 0.707092L5.70709 5.70709L0.707093 10.7071'
              stroke='#3877EE'
              strokeWidth='2'
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default SliderHorizontal;
