import React, { useEffect, useState } from 'react';
import { Pokemon } from '../../../interfaces';
import css from './CellComponent.module.scss';
import soledOut from '../../../public/soled_out.png'

type Props = {
  pokemon: Pokemon,
  amount?: number,
  limit?: number
}
const CellComponent: React.FC<Props> = ({pokemon}) => {
  const [loading, setLoading] = useState(true)
  const amount = pokemon!.amount;
  const limit = pokemon!.limit;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1)
  }, [])

  if (!loading) {
    if (amount! > 0) {
      return (
        <div className={css.CellComponent}>
          <img className={`${css.standard}`} src={pokemon?.img} alt={pokemon?.img}/>
          {amount && limit && <div className={css.left}>{amount}/{limit}</div>}
        </div>
      )
    } else {
      return (
        <div className={css.CellComponent}>
          <img className={`${css.unavailable}`} src={pokemon?.img} alt={pokemon?.img}/>
          <img src={soledOut.src} className={css.soled}/>
        </div>
      )
    }
  }
  return <></>
}

export default CellComponent;
