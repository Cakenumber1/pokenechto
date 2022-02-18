import { Swiper as ISwiper } from 'swiper/types';
import { InventorySwiperComponent } from '../InventorySwiperComponent';
import { SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import { InventoryPageContainer } from '../InventoryPageContainer';
import useSWR from 'swr';
import {
  adjacentSlide,
  fetchInventoryPagesLength,
  getInventoryPagesLengthKey,
} from '../../../helpers/inventoryHelpers';
import { InventoryLoader } from '../InventoryLoader';

type InventoryContainerProps = {
  pageQuery: number;
};
export const InventoryContainer = ({ pageQuery }: InventoryContainerProps) => {
  const router = useRouter();
  const { data: pagesCount, error } = useSWR(
    getInventoryPagesLengthKey,
    fetchInventoryPagesLength,
  );

  const handleSlideChange = (swiper: ISwiper) => {
    router.push(`/inventory/${swiper.realIndex + 1}`);
  };

  if (error) return <div>error InventoryContainer</div>;
  if (!pagesCount) return <InventoryLoader open={!pagesCount} />;

  const activeSlide = pageQuery - 1;

  return (
    <>
      <InventorySwiperComponent
        activeSlide={activeSlide}
        onSlideChange={handleSlideChange}
      >
        {Array.from(Array(pagesCount)).map((_, slideIndex) => {
          if (adjacentSlide(pageQuery, slideIndex, pagesCount)) {
            return (
              <SwiperSlide key={slideIndex}>
                <InventoryPageContainer page={slideIndex + 1} />
              </SwiperSlide>
            );
          } else {
            return <SwiperSlide key={slideIndex} />;
          }
        })}
      </InventorySwiperComponent>
    </>
  );
};
