import { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import SliderHorizontal from '../slider-horizontal';

import './styles/index.scss';
import 'swiper/css';

import { IProps, THistoricalEvent } from './types';
import { BREAKPOINT_TABLET } from '../../constants';
import useBreakpointView from '../../hooks/useBreakpointView';

gsap.registerPlugin(useGSAP);

function Slider({ historicalEvents }: IProps) {
  const isTabletView = useBreakpointView(BREAKPOINT_TABLET);
  const paginationDotsContainer = useRef();
  const sliderContainer = useRef();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const [swiperHorizontalInstance, setSwiperHorizontalInstance] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { contextSafe } = useGSAP({ scope: paginationDotsContainer });

  const rotationAngle = 360 / historicalEvents.length;
  const initialAngle = 65;
  const radius = 265;
  const duration = 1.5;

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.slider__dot', paginationDotsContainer.current);

      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${BREAKPOINT_TABLET + 1}px)`, () => {
        gsap.to(items, {
          x: (index) => {
            return radius * Math.cos(((index * rotationAngle - initialAngle) * Math.PI) / 180);
          },
          y: (index) => {
            return radius * Math.sin(((index * rotationAngle - initialAngle) * Math.PI) / 180);
          },
          duration: 0,
        });
      });
    },
    { scope: paginationDotsContainer }
  );

  const getFraction = (activeIndex: number) => {
    return `${activeIndex < 9 ? `0${activeIndex + 1}` : activeIndex + 1}/${
      historicalEvents.length < 10 ? `0${historicalEvents.length}` : historicalEvents.length
    }`;
  };

  const getRotationAngle = (activeIndex: number, previousIndex: number) =>
    rotationAngle * Math.abs(activeIndex - previousIndex);

  const rotatePaginationDots = contextSafe((activeIndex: number, previousIndex: number) => {
    const items = gsap.utils.toArray('.slider__dot', paginationDotsContainer.current);

    if (activeIndex > previousIndex) {
      gsap.to(paginationDotsContainer.current, {
        rotation: `-=${getRotationAngle(activeIndex, previousIndex)}`,
        duration: duration,
      });
      gsap.to(items, {
        rotation: `+=${getRotationAngle(activeIndex, previousIndex)}`,
        duration: duration,
      });
    } else {
      gsap.to(paginationDotsContainer.current, {
        rotation: `+=${getRotationAngle(activeIndex, previousIndex)}`,
        duration: duration,
      });
      gsap.to(items, {
        rotation: `-=${getRotationAngle(activeIndex, previousIndex)}`,
        duration: duration,
      });
    }
  });

  const changePeriod = contextSafe((previousIndex: number) => {
    const q = gsap.utils.selector(sliderContainer);

    gsap.from(q('.swiper-slide-visible .slide__date-from'), {
      innerText: historicalEvents[previousIndex].from,
      duration: duration,
      snap: {
        innerText: 1,
      },
    });
    gsap.from(q('.swiper-slide-visible .slide__date-to'), {
      innerText: historicalEvents[previousIndex].to,
      duration: duration,
      snap: {
        innerText: 1,
      },
    });
  });

  return (
    <section className='slider' ref={sliderContainer}>
      <Swiper
        className='slider__swiper'
        modules={[Navigation, Pagination, EffectFade]}
        effect='fade'
        spaceBetween={0}
        slidesPerView={1}
        simulateTouch={false}
        onSlideChange={() => {
          setActiveSlide(swiperInstance.activeIndex);
          swiperHorizontalInstance.slideTo(0, 0);

          !isTabletView &&
            rotatePaginationDots(swiperInstance.activeIndex, swiperInstance.previousIndex);

          changePeriod(swiperInstance.previousIndex);
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        navigation={{
          nextEl: '.slider__button-next',
          prevEl: '.slider__button-prev',
          disabledClass: 'slider__button-disabled',
        }}
        pagination={{
          el: '#dots',
          type: 'bullets',
          bulletClass: 'slider__dot',
          bulletActiveClass: 'slider__dot_active',
          clickable: true,

          renderBullet: function (index) {
            return `<button class="slider__dot">
              <span class="slider__dot-number">${index + 1}</span>
              ${
                historicalEvents[index].name &&
                `<span class="slider__dot-name">${historicalEvents[index].name}</span>`
              } </button>`;
          },
        }}
      >
        {historicalEvents?.map((item: THistoricalEvent) => (
          <SwiperSlide key={item.id}>
            <div className='slide__date-wrapper'>
              <span className='slide__date slide__date-from' id='from'>
                {item.from}
              </span>
              <span className='slide__date slide__date-to'>{item.to}</span>
            </div>
            {isTabletView && item.name && <h2 className='slide__title'>{item.name}</h2>}
          </SwiperSlide>
        ))}
        <div className='slider__wrap'>
          <div className='slider__controller-wrap'>
            <div id='dots' className='slider__dots' ref={paginationDotsContainer}></div>
            <div className='slider__navigation_wrap'>
              <div className='slider__fraction'>{getFraction(activeSlide)}</div>
              <div className={'slider__navigation'}>
                <button className='slider__button slider__button-prev'>
                  {!isTabletView ? (
                    <svg
                      width='9'
                      height='14'
                      viewBox='0 0 9 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.66418 0.707108L1.41419 6.95711L7.66418 13.2071'
                        stroke='#42567A'
                        strokeWidth='2'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='6'
                      height='8'
                      viewBox='0 0 6 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M4.53918 0.707093L1.41418 3.83209L4.53918 6.95709'
                        stroke='#42567A'
                        strokeWidth='2'
                      />
                    </svg>
                  )}
                </button>
                <button className='slider__button slider__button-next'>
                  {!isTabletView ? (
                    <svg
                      width='9'
                      height='14'
                      viewBox='0 0 9 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.66418 0.707108L1.41419 6.95711L7.66418 13.2071'
                        stroke='#42567A'
                        strokeWidth='2'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='6'
                      height='8'
                      viewBox='0 0 6 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M4.53918 0.707093L1.41418 3.83209L4.53918 6.95709'
                        stroke='#42567A'
                        strokeWidth='2'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <SliderHorizontal
            setSwiperHorizontalInstance={setSwiperHorizontalInstance}
            eventList={historicalEvents[activeSlide].eventList}
          ></SliderHorizontal>
        </div>
      </Swiper>
    </section>
  );
}

export default Slider;
