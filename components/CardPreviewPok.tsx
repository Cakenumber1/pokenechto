import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';

type CardPreviewPokProps = {
  id: number;
  name: string;
  image: string;
};

export default function CardPreviewPok({name, image}: CardPreviewPokProps) {
  return (
    <Card sx={{height: 150}}>
      <CardActionArea sx={{height: '100%'}}>
        <CardMedia
          sx={{height: '100%', width: '100%', objectFit: 'contain'}}
          component="img"
          image={image}
          alt={name}
        />
      </CardActionArea>
    </Card>
  );
}
