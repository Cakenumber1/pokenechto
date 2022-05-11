import { Box, Grid } from '@mui/material';
import BestiaryComponent from 'components/Pokedex/Bestiary/BestiaryComponent';
import { SearchComponent } from 'components/Pokedex/Bestiary/SearchComponent';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { memo, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useGetPokemonListQuery } from 'store/api';

const PokemonsChunk = memo(({ offset, unlocked }: { offset: number, unlocked: number[] }) => {
  const { data, isLoading } = useGetPokemonListQuery(offset);

  return isLoading
    ? <Box height="70vh" visibility="hidden">loading...</Box>
    : <BestiaryComponent pokemons={data} unlocked={unlocked} />;
});

const getData = async (uid: string, setData: React.Dispatch<number[]>) => {
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    setData(res.data().bestiary);
  }
};

const BestiaryContainer = () => {
  const { currentUser } = useAuth()!;
  const [chunksCount, setChunksCount] = useState(0);
  const [pokesUnl, setPokesUnl] = useState<number[]>([]);
  useEffect(() => {
    getData(currentUser.uid, setPokesUnl);
  }, []);
  return (
    <>
      <SearchComponent unlocked={pokesUnl} />
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
            <PokemonsChunk key={index} offset={index} unlocked={pokesUnl} />
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default BestiaryContainer;
