import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { InventoryPageContainer } from 'components/Inventory/InventoryPageContainer';
import { InventorySwiperComponent } from 'components/Inventory/InventorySwiperComponent';
import {
  adjacentSlide,
  fetchInventoryPagesLength,
  getInventoryPagesLengthKey,
} from 'helpers/inventoryHelpers';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-unresolved
import { SwiperSlide } from 'swiper/react';
import { Swiper as ISwiper } from 'swiper/types';
import useSWR from 'swr';

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
        }
        return <SwiperSlide key={slideIndex} />;
      })}
    </InventorySwiperComponent>
  );
};
