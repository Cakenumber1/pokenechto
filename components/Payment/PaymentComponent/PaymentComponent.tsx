import { Button } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuth } from 'myFirebase/AuthContext';
import React from 'react';
import {
  usePatchMoneyMutation,
  usePatchMushroomsMutation,
} from 'store/service';

const checkoutFormOptions = {
  style: {
    base: {
      fontSize: '20px',
      color: '#424770',
      '::placeholder': {
        color: 'dimgrey',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: true,
};

type Props = {
  amount: number,
  type: string
  setIsOpenPay: React.Dispatch<React.SetStateAction<boolean>>
};

const PaymentComponent: React.FC<Props> = ({ amount, type, setIsOpenPay }) => {
  const { currentUser } = useAuth()!;
  const [patchMoneyMutation] = usePatchMoneyMutation();
  const [patchMushroomsMutation] = usePatchMushroomsMutation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      // @ts-ignore
      card: elements!.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod!;
      try {
        await axios.post('/api/payment', {
          id,
          amount,
          type,
        });
        switch (type) {
          case 'berries':
            patchMushroomsMutation({ uid: currentUser.uid, count: 10 }).unwrap();
            break;
          case 'money':
            patchMoneyMutation({ uid: currentUser.uid, count: 1000 }).unwrap();
            break;
          default:
            alert('smth went wrong sorry(');
        }
        setIsOpenPay(false);
      } catch ({ message, response }) {
        console.log(response || message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardElement options={checkoutFormOptions} />
      <Button type="submit" sx={{ width: '40%', alignSelf: 'center', mt: '10%' }} variant="contained">Pay</Button>
    </form>
  );
};

export default PaymentComponent;
