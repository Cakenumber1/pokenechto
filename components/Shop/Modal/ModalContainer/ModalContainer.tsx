import clsx from 'clsx';
import ModalComponent from 'components/Shop/Modal/ModalComponent';
import { useStyles } from 'components/Shop/Modal/style';
import { DataType, PokemonShop } from 'interfaces';
import { useAuth } from 'myFirebase/AuthContext';
import { useEffect, useState } from 'react';
import { usePatchSellPokemonMutation, usePostMoneyQuery } from 'store/service';

type Props = {
  open: boolean
  onClose: () => void
  pokemon: PokemonShop,
  data: DataType
};

const ModalContainer = ({
  open, onClose, pokemon, data,
}: Props) => {
  const { currentUser } = useAuth()!;
  const classes = useStyles(data);
  const { data: money } = usePostMoneyQuery(currentUser.uid);
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
    patchSellPokemonMutation({ uid: currentUser.uid, poke: pokemon!, price: pokemon!.price });
  };

  const isDisabledMoneyButton = money!.count < pokemon!.price || pokemon!.amount === 0;

  return (
    <ModalComponent
      open={open}
      pokemon={pokemon}
      handleBuy={handleBuy}
      handleClose={handleClose}
      isDisabledMoneyButton={isDisabledMoneyButton}
      modalStyle={modalStyle}
      modalInnerStyle={classes.modalInner}
      buttonStyle={buttonStyle}
      imgStyle={imgStyle}
    />
  );
};

export default ModalContainer;
