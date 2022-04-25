import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import PaymentComponent from 'components/Wallet/Payment/PaymentComponent';
import React, { useEffect, useState } from 'react';

type Props = {
  amount: number,
  type: string,
  isOpenPay: boolean
  setIsOpenPay: React.Dispatch<React.SetStateAction<boolean>>
};

const PaymentContainerInner: React.FC<Props> = ({
  amount,
  type, isOpenPay, setIsOpenPay,
}) => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const handleClose = () => {
    setIsOpenPay(false);
  };

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'LV',
        currency: 'kzt',
        total: {
          label: 'PokeCurrency purchase',
          amount,
        },
      });
      pr.canMakePayment()
        .then((result) => {
          if (result) {
            setPaymentRequest(pr);
          }
        })
        .catch();
    }
  }, [stripe, amount]);

  if (paymentRequest) {
    paymentRequest.on('paymentmethod', async (event: any) => {
      const {
        id,
      } = event.paymentMethod;
      try {
        const { data } = await axios.post('/api/payment', {
          id,
          amount,
          type,
        });
        event.complete('success');
        console.log(data);
      } catch ({ message, response }) {
        event.complete('fail');
        console.log(response || message);
      }
    });
  }

  return (
    <Modal
      hideBackdrop
      open={isOpenPay}
      onClose={handleClose}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Box sx={{
          width: '500px',
          maxWidth: '80%',
          height: '300px',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <Typography sx={{ alignSelf: 'center', mb: '3%' }}>{`К оплате: ${amount / 100} 〒`}</Typography>
          {paymentRequest && (
            <Box sx={{
              mt: '3%',
              mb: '5%',
            }}
            >
              <PaymentRequestButtonElement options={{ paymentRequest }} />
            </Box>
          )}
          <Box>
            <PaymentComponent amount={amount} type={type} setIsOpenPay={setIsOpenPay} />
          </Box>
          <Button onClick={handleClose} sx={{ width: '40%', alignSelf: 'center', mt: '3%' }} variant="contained" color="error">cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PaymentContainerInner;
