/**
 * @jest-environment jsdom
 */
import useFWScript from '../src/script';
import useFW from '../src/useFW';
import { renderHook } from '@testing-library/react';

import '@testing-library/jest-dom';


test('FlutterwaveModule should create', () => {
  const {result} = renderHook(() => useFWScript({}));
  
  expect(
    result.current[0]
  ).not.toBeTruthy();
});

test('Should load Flutterwave Inline script and have FlutterwaveCheckout function', () => {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: 'text_ref1234',
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
  };
  
  const {result} = renderHook(() => useFW(config));

  expect(
    document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]')
  ).not.toBeNull();
});

