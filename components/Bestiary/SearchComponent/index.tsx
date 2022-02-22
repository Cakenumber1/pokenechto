import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PokeModal from 'components/Bestiary/ModalComponent';
import React, { useCallback, useState } from 'react';
import { useGetPokemonByNameQuery } from 'store/api';

type Props = {
  submit: boolean,
  onClose: () => void,
  search: string
};

const Result = ({ search, submit, onClose }: Props) => {
  const pos = {
    left: '50%',
    top: '50%',
    height: 20,
    width: 20,
    background: 'none',
  };
  if (!search) return <Box sx={{ visibility: 'hidden' }} />;
  const { data, error } = useGetPokemonByNameQuery(search);
  if (error) return <Box sx={{ visibility: submit ? 'visible' : 'hidden' }}>Ошибка</Box>;
  if (!data) return <Box sx={{ visibility: submit ? 'visible' : 'hidden' }}>Загрузка</Box>;
  return <PokeModal open={submit} onClose={onClose} pokemon={data} data={pos} />;
};

export const SearchComponent = () => {
  const matchWidth = useMediaQuery('(min-width:350px)');
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleClose = useCallback(() => setSubmit(false), []);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmit(true);
    setSearch(input);
  }, [input]);
  const handleInput = useCallback((e) => setInput(e.target.value), []);

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
      <Result search={search} submit={submit} onClose={handleClose} />
    </Box>
  );
};
