import { Grid } from '@mui/material';
import { BestiaryComponent } from 'components/Bestiary/BestiaryComponent';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useIntersectionObserver} from "components/Bestiary/BestiaryComponent/InterObs";
import {useGetPokemonListQuery} from 'store/api'

export const BestiaryContainer = () => {
  const [currentSlice, setCurrentSlice] = useState(-1);
  const [store, setStore] = useState([])
  const ref = useRef(null);

  // don't fetch pages before 0
  const currentResult = useGetPokemonListQuery(currentSlice);



  const isBottomVisible = useIntersectionObserver(
      ref,
      {
        threshold: 0 //trigger event as soon as the element is in the viewport.
      },
      false // don't remove the observer after intersected.
  );

  useEffect(() => {
    //load next page when bottom is visible
    isBottomVisible && setCurrentSlice(currentSlice + 1)
  }, [isBottomVisible]);

  const { data, isUninitialized, error, isLoading } = currentResult

  if (data && currentSlice + 1> store.length && store[store.length-1] !== data)
    setStore([...store, data])

  return (
      <>
        {error ? (
            <>Oh no, there was an error</>
        ) : isUninitialized ? (
            <div>
               - Currently skipped -
            </div>
        ) : isLoading ? (
            <>loading...</>
        ) : data ? (
    <Grid
      sx={{ py: 2, px: 2 }}
      container
      spacing={4}
      columns={{ sm: 6, md: 9, lg: 12 }}
    >
      {(() => {
        const children = [];
        for (let i = 0; i < store.length; i++) {
          children.push(<BestiaryComponent key={store[i].next} pokemons={store[i]} />);
        }
        return children;
      })()}
    </Grid>
  ) : null}  <div ref={ref} style={{ width: "100%", height: "20px" }}>
        Bottom
      </div></>);
};
