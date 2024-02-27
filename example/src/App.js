import React from 'react';
import { useFlutterwave, FlutterWaveButton, closePaymentModal } from './dist/index';


export default function App() {
  const config = {
    public_key: "FLWPUBK-**************************-X",
    tx_ref: Date.now(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '08102909304',
      name: 'test user',
    },

    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://assets.piedpiper.com/logo.png',
    },

    subaccounts: [
      {
        // vendor A
        id: "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
        transaction_split_ratio: 2,
        transaction_charge_type: "flat",
        transaction_charge: 100,
      },
      {
        // vendor B
        id: "RS_344DD49DB5D471EF565C897ECD67CD95",
        transaction_split_ratio: 3,
        transaction_charge_type: "flat",
        transaction_charge: 100,
      },
      {
        // vendor C
        id: "RS_839AC07C3450A65004A0E11B83E22CA9",
        transaction_split_ratio: 5,
        transaction_charge_type: "flat",
        transaction_charge: 100,
      },
    ],
  };
  
  const handleFlutterPayment = useFlutterwave(config);

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave btn',
    callback: (response) => {
      console.log(response);
      closePaymentModal()
    },
    onClose: () => {
      console.log("You close me ooo")
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
              closePaymentModal()
             
            },
            onClose: () => {
              console.log("You close me ooo")
            },
            
          });
        }}
      >
        Testing FW Payment
      </button>

      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}