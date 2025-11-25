import { TEvent } from '../slider/types';
import { Swiper as SwiperType } from 'swiper';

export interface IProps {
  setSwiperHorizontalInstance: React.Dispatch<React.SetStateAction<SwiperType>>;
  eventList: TEvent[];
}
