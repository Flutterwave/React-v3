<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Flutterwave v3 React Library
![Publish React Package](https://github.com/Flutterwave/Flutterwave-React-v3/workflows/Publish%20React%20Package/badge.svg)
![npm](https://img.shields.io/npm/v/flutterwave-react-v3)
![npm](https://img.shields.io/npm/dt/flutterwave-react-v3)
![NPM](https://img.shields.io/npm/l/flutterwave-react-v3)



## Introduction

The React SDK helps you create seamless payment experiences in your React mobile or web app. By connecting to our modal, you can start collecting payments in no time.

Available features include:

- Collections: Card, Account, Mobile money, Bank Transfers, USSD, Barter, NQR.
- Recurring payments: Tokenization and Subscriptions.
- Split payments


## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Initialization](#initialization)
4. [Usage](#usage)
5. [Support](#support)
6. [Contribution Guidelines](#contribution-guidelines)
7. [License](#license)
8. [Contributors](#contributors)
9. [Changelog](#)


## Requirements

1. Flutterwave version 3 API keys
2. Node version >= 6.9.x and npm >= 3.x.x
3. React version >= 15 (including React 19)
4. For Next.js: Version 12+ (both App Router and Pages Router supported)


## Installation

Install the SDK

```bash
$ npm install flutterwave-react-v3

# or
$ yarn add flutterwave-react-v3

```


## Initialization

Import useFlutterwave to any component in your application and pass your config

```javascript
import { useFlutterwave } from 'flutterwave-react-v3';
 const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

 useFlutterwave(config)

```


## Usage

Add Flutterwave to your projects as a component or a React hook:

1. [As a Component](#components)
2. [Directly in your code](#hooks)
3. [Next.js Applications](#nextjs-applications)
4. [Making recurrent payments](#recurring-payments)


### Components

```javascript
import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
   const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="App">
     <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
```


### Hooks

```javascript
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
     <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}
```

### Next.js Applications

The Flutterwave React SDK works seamlessly with Next.js applications. Since the library loads external scripts, you must ensure it runs only on the client side.

#### App Router (Next.js 13+)

Add the `'use client'` directive at the top of your payment component:

```javascript
'use client';

import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function FlutterwavePayment() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'My Payment',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div>
      <h1>Make Payment</h1>
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal();
            },
            onClose: () => {},
          });
        }}
      >
        Pay with Flutterwave
      </button>
    </div>
  );
}
```

You can also use the FlutterWaveButton component:

```javascript
'use client';

import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function PaymentButton() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {},
  };

  return (
    <div>
      <h1>Checkout</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
```

#### Pages Router (Next.js 12 and below)

Use dynamic imports with SSR disabled:

```javascript
import dynamic from 'next/dynamic';

// Dynamically import the payment component with SSR disabled
const FlutterwavePayment = dynamic(
  () => import('../components/FlutterwavePayment'),
  { ssr: false }
);

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <FlutterwavePayment />
    </div>
  );
}
```

Then create your payment component in `components/FlutterwavePayment.js`:

```javascript
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function FlutterwavePayment() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'My Payment',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div>
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal();
            },
            onClose: () => {},
          });
        }}
      >
        Pay with Flutterwave
      </button>
    </div>
  );
}
```

**Important Notes:**
- Always use the `'use client'` directive when using Next.js App Router (Next.js 13+)
- The Flutterwave script loads client-side only and cannot be server-side rendered
- Ensure payment components are client components, not server components
- For Pages Router, use `dynamic` import with `ssr: false` to prevent server-side rendering errors

### Recurring Payments

Pass the payment plan ID into your payload to make [recurring payments](https://developer.flutterwave.com/v3.0.0/docs/payment-plans-1).


```javascript
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
     payment_options="card",
    payment_plan="3341",
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
     <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}
```

### Parameters

Read more about our parameters and how they can be used [here](https://developer.flutterwave.com/v3.0.0/docs/inline).

| Parameter           | Always Required? | Description                                                                                                                                                                                                                             |
| ------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public_key          | True              | Your API public key                                                                                                                                                                                                                     |
| tx_ref              | True              | Your transaction reference. This MUST be unique for every transaction                                                                                                                                                                   |
| amount              | True              | Amount to charge the customer.                                                                                                                                                                                                          |
| currency            | False             | currency to charge in. Defaults to NGN                                                                                                                                                                                                  |
| integrity_hash      | False             | This is a sha256 hash of your FlutterwaveCheckout values, it is used for passing secured values to the payment gateway.                                                                                                                 |
| payment_options     | True              | This specifies the payment options to be displayed e.g - card, mobilemoney, ussd, and so on.                                                                                                                                             |
| payment_plan        | False             | This is the payment plan ID used for Recurring billing                                                                                                                                                                                  |
| redirect_url        | False             | URL to redirect to when a transaction is completed. This is useful for 3DSecure payments, so we can redirect your customer back to a custom page you want to show them.                                                                  |
| customer            | True              | This is an object that can contain your customer details: e.g, 'customer': {'email': 'example@example.com', 'phone_number': '08012345678', 'name': 'Takeshi Kovacs' }                                                                    |
| subaccounts         | False             | This is an array of objects containing the subaccount IDs to split the payment into. Check our Split Payment page for more info                                                                                                         |
| meta                | False             | This is an object that helps you include additional payment information to your request, e.g, {'consumer_id': 23, 'consumer_mac': '92a3-912ba-1192a' }                                                                                     |
| customizations      | True              | This is an object that contains title, logo, and description you want to display on the modal, e.g, {'title': 'Pied Piper Payments', 'description': 'Middleout isn't free. Pay the price', 'logo': 'https://assets.piedpiper.com/logo.png' } |
| callback (function) | False             | This is the function that runs after payment is completed                                                                                                                                                                               |
| close (function)    | False             | This is the function that runs after the payment modal is closed                                                                                                                                                                            |

## Other methods and descriptions:

Methods provided by the React SDK:

| Method Name  | Parameters  | Returns |Description |
| ------------- | ------------- | ------------- | ------------- |
| closePaymentModal  |  Null | Null | This method allows you to close the payment modal via code. |

Please check out [Flutterwave Documentation](https://developer.flutterwave.com/v3.0.0/docs/flutterwave-standard-1) for other available options you can add to the tag.



## Debugging Errors

We understand that you may run into some errors while integrating our library. You can read more about our error messages [here](https://developer.flutterwave.com/v3.0.0/docs/common-errors).

For `authorization` and `validation` error responses, double-check your API keys and request. If you get a `server` error, kindly engage the team for support.



# Support

For additional assistance using this library, please create an issue on the GitHub repo or contact the developer experience (DX) team via [email](mailto:developers@flutterwavego.com) or on [slack](https://bit.ly/34Vkzcg).

You can also follow us [@FlutterwaveEng](https://twitter.com/FlutterwaveEng) and let us know what you think 😊.



## Contribution Guidelines

We welcome contributions from the community. Read more about our community contribution guidelines [here](/CONTRIBUTING.md).


<a id="license"></a>

## License

By contributing to this library, you agree that your contributions will be licensed under its [MIT license](/LICENSE.md).

Copyright (c) Flutterwave Inc.



## Contributors

- [Somto Ugeh](https://twitter.com/SomtoUgeh)
