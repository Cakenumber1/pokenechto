import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../store/slices/counterSlice';

const IndexPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
      <h2>
        The current number is
        {count}
      </h2>
      <div>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          type="number"
        />
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment by amount
        </button>
      </div>
      <div>
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={() => dispatch(decrement())}>Decrement by 1</button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={() => dispatch(increment())}>Increment by 1</button>
      </div>
    </>
  );
};

export default IndexPage;
