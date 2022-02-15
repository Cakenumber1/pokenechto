import {Swiper as ISwiper} from 'swiper/types';
import {InventorySwiperComponent} from '../InventorySwiperComponent';
import {SwiperSlide} from 'swiper/react';
import {PokemonCollectionItemType} from '../types';
import {useRouter} from 'next/router';
import {InventoryPageContainer} from '../InventoryPageContainer';

type PagesStateType = {
  [key: number]: PokemonCollectionItemType[] | undefined;
};

type InventoryContainerProps = {
  pageQuery: number;
};

export const InventoryContainer = ({pageQuery}: InventoryContainerProps) => {
  const router = useRouter();

  const handleSlideChange = (swiper: ISwiper) => {
    router.push(`/inventory/${swiper.realIndex + 1}`);
  };

  //TODO:
  const pagesCount = 5;
  const activeSlide = pageQuery - 1;

  return (
    <>
      <InventorySwiperComponent
        activeSlide={activeSlide}
        onSlideChange={handleSlideChange}
      >
        {Array.from(Array(pagesCount)).map((_, slideIndex) => {
          const slideIndexLikePage = slideIndex + 1;
          if (
            (pageQuery === 1 && slideIndexLikePage <= 2) ||
            (pageQuery > 1 &&
              (pageQuery === slideIndexLikePage - 1 ||
                pageQuery === slideIndexLikePage ||
                pageQuery === slideIndexLikePage + 1)) ||
            (pageQuery === pagesCount && slideIndexLikePage >= pagesCount - 1)
          ) {
            return (
              <SwiperSlide key={slideIndex}>
                <InventoryPageContainer page={slideIndexLikePage} />
              </SwiperSlide>
            );
          } else {
            return <SwiperSlide key={slideIndex}></SwiperSlide>;
          }
        })}
      </InventorySwiperComponent>
    </>
  );
};
