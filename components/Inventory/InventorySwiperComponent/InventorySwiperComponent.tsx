import {Navigation, Pagination} from 'swiper';
import {PropsWithChildren} from 'react';
import {Swiper} from 'swiper/react';
import {Swiper as ISwiper} from 'swiper/types';

export type InventorySwiperComponentProps = {
  activeSlide: number;
  onSlideChange: (swiper: ISwiper) => void;
};

export const InventorySwiperComponent = ({
  children,
  activeSlide,
  onSlideChange: handleSlideChange,
}: PropsWithChildren<InventorySwiperComponentProps>) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      longSwipesRatio={0.3}
      longSwipesMs={50}
      preloadImages={false}
      onSlideChange={handleSlideChange}
      onSwiper={swiper => {
        swiper.slideTo(activeSlide, 0, false);
      }}
    >
      {children}
    </Swiper>
  );
};
