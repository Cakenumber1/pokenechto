import {useEffect, useState} from 'react';
import {Swiper as ISwiper} from 'swiper/types';
import {LinearProgress} from '@mui/material';
import {InventorySwiperComponent} from '../InventorySwiperComponent';
import {SwiperSlide} from 'swiper/react';
import {InventoryComponent} from '../InventoryComponent';
import {PokemonCollectionItemType} from '../types';
import {useRouter} from 'next/router';

type PagesStateType = {
  [key: number]: PokemonCollectionItemType[] | undefined;
};

type InventoryContainerProps = {
  pageQuery: number;
};

export const InventoryContainer = ({pageQuery}: InventoryContainerProps) => {
  const router = useRouter();
  const [pagesCount, setPagesCount] = useState(0);
  const [pages, setPages] = useState<PagesStateType>({});

  useEffect(() => {
    async function awaitFetch() {
      const result = await fetch(`/api/inventory/${pageQuery}`).then(response => response.json());
      const {pagesCount, page, data} = result;

      setPagesCount(pagesCount);
      setPages(prevPages => {
        return {
          ...prevPages,
          [pageQuery]: data,
        };
      });
    }

    awaitFetch();
  }, [pageQuery]);

  const handleSlideChange = (swiper: ISwiper) => {
    const realIndexPlusOne = swiper.realIndex + 1;

    if (realIndexPlusOne !== pageQuery) {
      router.push(`/inventory/${realIndexPlusOne}`);
    }
  };

  if (!pages[pageQuery]) return <LinearProgress />;

  const activeSlide = pageQuery - 1;

  return (
    <>
      <InventorySwiperComponent activeSlide={activeSlide} onSlideChange={handleSlideChange}>
        {Array.from(Array(pagesCount)).map((_, slideIndex) => {
          const slideNumber = slideIndex + 1;
          const pokemonCollectionBySlide = pages[slideNumber];

          return (
            <SwiperSlide key={slideIndex}>
              {pokemonCollectionBySlide === undefined ? (
                <LinearProgress />
              ) : (
                <InventoryComponent pokemonCollection={pokemonCollectionBySlide} />
              )}
            </SwiperSlide>
          );
        })}
      </InventorySwiperComponent>
    </>
  );
};
