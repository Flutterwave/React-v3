import React from 'react';
import { useFlutterwave, FlutterWaveButton } from './dist/index';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-ad8d5d4eca114b1255ac7798d3d1787d-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '08102909304',
      name: 'test user',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://assets.piedpiper.com/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
    },
    onClose: () => {},
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
            },
            onClose: () => {},
          });
        }}
      >
        Testing FW Payment
      </button>

      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}