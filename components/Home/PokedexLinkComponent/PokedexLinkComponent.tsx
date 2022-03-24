import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import pokedexImg from 'public/pokedex.png';

const PokedexLinkComponent = () => (
  <Box style={{
    cursor: 'pointer', position: 'absolute', left: '1%', top: '1%',
  }}
  >
    <Link href="/pokedex">
      <Image
        src={pokedexImg}
        alt="as"
        width={125}
        height={100}
      />
    </Link>
  </Box>

);
export default PokedexLinkComponent;
