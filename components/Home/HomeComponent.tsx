import WalletComponent from 'components/WalletComponent';
import { ActiveLink } from 'helpers';
import React from 'react';

type Props = {
  onclick: () => void
};

const HomeComponent: React.FC<Props> = ({ onclick }) => (
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
      <ActiveLink onclick={onclick} href="/shop">Shop</ActiveLink>
      <ActiveLink onclick={onclick} href="/arena">Arena</ActiveLink>
    </div>
    <WalletComponent money={1000} mushrooms={100}/>
  </div>
);

export default HomeComponent;
