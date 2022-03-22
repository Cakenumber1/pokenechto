import clsx from 'clsx';
import ModalComponent from 'components/Shop/Modal/ModalComponent';
import { useStyles } from 'components/Shop/Modal/style';
import { DataType, Pokemon } from 'interfaces';
import { useEffect, useState } from 'react';
import { useGetMoneyQuery, usePatchSellPokemonMutation } from 'store/service';

type Props = {
  open: boolean
  onClose: () => void
  pokemon: Pokemon,
  data: DataType
};

const ModalContainer = ({
  open, onClose, pokemon, data,
}: Props) => {
  const classes = useStyles(data);
  const { data: money } = useGetMoneyQuery();
  const [patchSellPokemonMutation] = usePatchSellPokemonMutation();
  const [full, setFull] = useState(false);

  const modalStyle = clsx({
    [classes.modal]: true,
    [classes.modalFull]: full,
  });
  const buttonStyle = clsx({
    [classes.button]: true,
    [classes.buttonFull]: full,
  });
  const imgStyle = clsx({
    [classes.img]: true,
    [classes.imgFull]: full,
  });

  const handleClose = () => {
    setFull(false);
    setTimeout(() => {
      onClose();
    }, 1100);
  };

  useEffect(() => {
    setTimeout(() => {
      setFull(open);
    }, 1);
  }, [open]);
  useEffect(() => {
    if (pokemon!.amount === 0) {
      handleClose();
    }
  });

  const handleBuy = () => {
    patchSellPokemonMutation({ id: pokemon!.id, price: 500 });
  };

  const isDisabledMoneyButton = money!.count < 500 || pokemon!.amount === 0;

  return (
    <ModalComponent
      open={open}
      pokemon={pokemon}
      handleBuy={handleBuy}
      handleClose={handleClose}
      isDisabledMoneyButton={isDisabledMoneyButton}
      modalStyle={modalStyle}
      buttonStyle={buttonStyle}
      imgStyle={imgStyle}
    />
  );
};

export default ModalContainer;
