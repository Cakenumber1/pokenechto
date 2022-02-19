import { Grid } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-swr-infinite-scroll';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';

import { createKey, getListFromPokeApi } from 'api/pokeApi/getListFromPokeApi';
import { BestiaryComponent } from 'components/Bestiary/BestiaryComponent';
import { PokemonsList } from 'interfaces/pokemonListType';

export const BestiaryContainer = () => {
  const swr = useSWRInfinite(createKey, getListFromPokeApi);

  if (swr.error) return <h1>Loading failed...</h1>;

  if (swr.data === undefined) return <h1>Loading...</h1>;

  return (
    <Grid
      sx={{ py: 2, px: 2 }}
      container
      spacing={4}
      columns={{ sm: 6, md: 9, lg: 12 }}
    >
      <InfiniteScroll
        swr={swr}
        loadingIndicator="Loading..."
        endingIndicator="No more "
        isReachingEnd={(swr: SWRInfiniteResponse<PokemonsList>) =>
          !swr.data || swr.data[swr.data.length - 1].next === null}
      >
        {(response: PokemonsList) => <BestiaryComponent key={response.next || 'last'} pokemons={response} />}
      </InfiniteScroll>
    </Grid>
  );
};
