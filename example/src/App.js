import React from 'react';
import {
  useFlutterwave,
  FlutterWaveButton,
  closePaymentModal,
} from './dist/index';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-d5f9ffa65be83a121705e72e0f6a2679-X',
    tx_ref: Date.now(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '08102909304',
      name: 'test user',
    },
    subaccounts: [
      {
        id: 'RS_ED071C8796497315BD851F4A0B89DAC9',
        transaction_split_ratio: 2,
      },
      {
        id: 'RS_1CCEB40AFBC50D0CB3ADAAF102CC974F',
        transaction_split_ratio: 2,
      },
      {
        id: 'RS_ED071C8796497315BD851F4A0B89DAC9',
        transaction_split_ratio: 2,
      },

      {
        id: 'RS_1CCEB40AFBC50D0CB3ADAAF102CC974F',
        transaction_split_ratio: 2,
      },
      {
        id: 'RS_ED071C8796497315BD851F4A0B89DAC9',
        transaction_split_ratio: 2,
      },
    ],

    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://assets.piedpiper.com/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  function handleSuccess(response) {
    console.log(response);
  }

  function handleClose() {
    console.log('You close me!');
    closePaymentModal();
  }

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {
      console.log('You close me!');
      closePaymentModal();
    },
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal();
            },
            onClose: () => {
              console.log('You close me ooo');
            },
          });
        }}
      >
        Testing FW Payment
      </button>

      <FlutterWaveButton {...fwConfig} />

      <FlutterWaveConsumer {...config}>
        {({ handleFlutterwavePayment }) => (
          <button
            onClick={() =>
              handleFlutterwavePayment({
                onClose: handleClose,
                callback: handleSuccess,
              })
            }
          >
            Flutterwave Consumer Implementation
          </button>
        )}
      </FlutterWaveConsumer>
    </div>
  );
}
