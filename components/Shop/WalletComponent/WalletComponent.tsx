import React, { SyntheticEvent, useRef, useState } from 'react';
import css from './WalletComponent.module.scss';
import { Button } from '@mui/material';

type Props = {
  money: number,
  mushrooms: number,
};

const WalletComponent: React.FC<Props> = ({money, mushrooms}) => {
  const [temp, setTemp] = useState(css.WalletComponent)
  const test = useRef(null)

  const handleClick = (e: SyntheticEvent) => {
    if (temp == css.WalletComponent) setTemp(`${css.WalletComponent} ${css.fullscreen}`)
    else if (e.target == test.current) setTemp(css.WalletComponent)
  }

  return (
    <div className={temp} onClick={handleClick}>
      <table>
        <tr>
          <td>{money}</td>
          <td className={css.icon}>$</td>
        </tr>
        <tr>
          <td>{mushrooms}</td>
          <td className={css.icon}>🍄</td>
        </tr>
      </table>
      <div className={css.Operations}>
        <div>
          <div>Купить $$$</div>
          <Button variant="contained" disabled>10</Button>
          <Button variant="contained" disabled>100</Button>
          <Button variant="contained">1000</Button>
        </div>
        <div>
          <div>Купить 🍄</div>
          <Button variant="contained" disabled>10</Button>
          <Button variant="contained" disabled>50</Button>
          <Button variant="contained">100</Button>
        </div>
        <button className={css.closeBtn} ref={test}>Close</button>
      </div>
    </div>
  )
}

export default WalletComponent;