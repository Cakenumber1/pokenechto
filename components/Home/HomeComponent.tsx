import WalletComponent from 'components/WalletComponent';
import { ActiveLink } from 'helpers';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectWallet } from 'store/wallet/walletSlice';

type Props = {
  onclick: () => void
};

const HomeComponent: React.FC<Props> = ({ onclick }) => {
  const { money, mushrooms } = useSelector(selectWallet);
  return (
    <div style={{ height: '100%' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '50%',
        maxWidth: '300px',
      }}
      >
        <ActiveLink onclick={onclick} href="/pokedex">Pokedex</ActiveLink>
        <Link href="/bestiary">Bestiary std link</Link>
        <Link href="/pokedex/inventory">inventory std link</Link>
        <ActiveLink onclick={onclick} href="/shop">Shop</ActiveLink>
        <ActiveLink onclick={onclick} href="/arena">Arena</ActiveLink>
      </div>
      <WalletComponent money={money} mushrooms={mushrooms} />
    </div>
  );
};

export default HomeComponent;
