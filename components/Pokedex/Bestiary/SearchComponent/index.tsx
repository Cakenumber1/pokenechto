import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PokeModal from 'components/Pokedex/Bestiary/ModalComponent';
import React, { useCallback, useState } from 'react';
import { useGetPokemonByNameQuery } from 'store/api';

type Props = {
  submit: boolean,
  onClose: () => void,
  search: string,
  unlocked: number[],
};

const Result = ({
  search, submit, onClose, unlocked,
}: Props) => {
  const pos = {
    left: '50%',
    top: '50%',
    height: 20,
    width: 20,
    background: 'none',
  };
  if (!submit || !search) return <Box sx={{ visibility: 'hidden' }} />;
  if (!unlocked.includes(Number(search))) {
    return <Box sx={{ visibility: submit ? 'visible' : 'hidden' }}>Не открыт</Box>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useGetPokemonByNameQuery(search);
  if (error) return <Box sx={{ visibility: submit ? 'visible' : 'hidden' }}>Ошибка</Box>;
  if (!data) return <Box sx={{ visibility: submit ? 'visible' : 'hidden' }}>Загрузка</Box>;
  return <PokeModal open={submit} onClose={onClose} pokemon={data} data={pos} />;
};

export const SearchComponent = ({ unlocked }: { unlocked: number[] }) => {
  const matchWidth = useMediaQuery('(min-width:350px)');
  const [input, setInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => setIsSubmitted(false), []);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitted(true);
  }, []);
  const handleInput = useCallback((e) => {
    setInput(e.target.value);
    if (isSubmitted) setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <Box sx={{ pt: 1, px: 2 }}>
      <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
        <TextField
          sx={{ maxWidth: matchWidth ? '100%' : '78%' }}
          onChange={handleInput}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </form>
      <IconButton onClick={handleSubmit}>
        <SearchIcon fontSize="large" />
      </IconButton>
      <Result search={input} submit={isSubmitted} onClose={handleClose} unlocked={unlocked} />
    </Box>
  );
};
