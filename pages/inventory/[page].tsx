import CardPreviewPok from '../../components/CardPreviewPok';
import {Grid} from '@mui/material';
import Container from '@mui/material/Container';
import {Swiper, SwiperSlide} from 'swiper/react';
import {History, Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import pokemonCollection from './pokemonCollection.json';

function getSlicesCount(array: any[], itemsPerSlice: number): number {
  return Math.ceil(array.length / itemsPerSlice);
}

export const getServerSideProps = async () => {
  const pokemonsPerPage = 12;
  const pagesCount = getSlicesCount(pokemonCollection, pokemonsPerPage);
  const loopNeeded = pagesCount > 1;

  return {
    props: {
      pokemonCollection,
      pokemonsPerPage,
      pagesCount,
      loopNeeded,
    },
  };
};

export type InventoryByPageProps = {
  pokemonCollection: typeof pokemonCollection;
  pokemonsPerPage: number;
  pagesCount: number;
  loopNeeded: boolean;
};

export default function InventoryByPage({
  pokemonCollection,
  pokemonsPerPage,
  pagesCount,
  loopNeeded,
}: InventoryByPageProps) {
  return (
    <Container maxWidth="md">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={loopNeeded}
        pagination={{
          clickable: true,
        }}
        history={{key: 'inventory'}}
        navigation={true}
        modules={[Pagination, Navigation, History]}
      >
        {Array.from(Array(pagesCount)).map((_, i) => {
          const start = i * pokemonsPerPage;
          const end = start + pokemonsPerPage;
          return (
            <SwiperSlide data-history={i + 1} key={i}>
              <Grid container spacing={{xs: 1}}>
                {pokemonCollection
                  .slice(start, end)
                  .map(({pokCollectionItemId, pokId, image, name}) => (
                    <Grid key={pokCollectionItemId} item xs={4} sm={3}>
                      <CardPreviewPok id={pokId} name={name} image={image} />
                    </Grid>
                  ))}
              </Grid>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}
