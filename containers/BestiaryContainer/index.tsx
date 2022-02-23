import { Box, Grid } from '@mui/material';
import { BestiaryComponent } from 'components/Bestiary/BestiaryComponent';
import { SearchComponent } from 'components/Bestiary/SearchComponent';
import React, { memo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useGetPokemonListQuery } from 'store/api';

const PokemonsChunk = memo(({ offset }: { offset: number }) => {
  const { data, isLoading } = useGetPokemonListQuery(offset);

  return isLoading
    ? <Box height="70vh" visibility="hidden">loading...</Box>
    : <BestiaryComponent pokemons={data} />;
});

export const BestiaryContainer = () => {
  const [chunksCount, setChunksCount] = useState(0);

  return (
    <>
      <SearchComponent />
      <InfiniteScroll
        pageStart={0}
        loadMore={setChunksCount}
        hasMore
        loader={<Box key={0} height="60vh" visibility="hidden">Loading ...</Box>}
        useWindow={false}
      >
        <Grid
          sx={{ py: 2, px: 2 }}
          container
          spacing={4}
          columns={{ sm: 6, md: 9, lg: 12 }}
        >
          {Array.from({ length: chunksCount }, (_item, index) => (
            <PokemonsChunk key={index} offset={index} />
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};
