import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentContainerInner from 'components/Wallet/Payment/PaymentContainerInner';
import React from 'react';

// @ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type Props = {
  amount: number,
  type: string,
  isOpenPay: boolean
  setIsOpenPay: React.Dispatch<React.SetStateAction<boolean>>
};

const PaymentContainerOuter: React.FC<Props> = ({
  amount,
  type,
  isOpenPay,
  setIsOpenPay,
}) => (
  <Elements stripe={stripePromise}>
    <PaymentContainerInner
      amount={amount}
      type={type}
      isOpenPay={isOpenPay}
      setIsOpenPay={setIsOpenPay}
    />
  </Elements>
);

export default PaymentContainerOuter;
