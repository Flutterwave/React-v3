<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo-colored.svg" width="50%"/>
</p>

# Flutterwave v3 React Library
![Publish React Package](https://github.com/Flutterwave/Flutterwave-React-v3/workflows/Publish%20React%20Package/badge.svg)
![npm](https://img.shields.io/npm/v/flutterwave-react-v3)
![npm](https://img.shields.io/npm/dt/flutterwave-react-v3)
![NPM](https://img.shields.io/npm/l/flutterwave-react-v3)

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built Using](#build-tools)
- [References](#references)


<a id="about"></a>

## About

This is a react package for implementing Flutterwave gateway with different payment methods.

<a id="getting-started"></a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.
See [references](#references) for links to dashboard and API documentation.


### Installation

```bash
$ npm install flutterwave-react-v3

# or
$ yarn add flutterwave-react-v3



```

## Usage

### Hooks

```javascript
import React from 'react';
import { useFlutterwave } from 'flutterwave-react-v3';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
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


### Components

```javascript
import React from 'react';
import { FlutterWaveButton } from 'flutterwave-react-v3';

export default function App() {
   const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
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

Please checkout [Flutterwave Documentation](https://developer.flutterwave.com/docs/flutterwave-standard) for other available options you can add to the tag.


<a id="deployment"></a>

## Deployment

- Switch to Live Mode on the Dashboard settings page
- Use the Live Public API key 

<a id="build-tools"></a>
## Built Using

- [Typescript](https://www.typescriptlang.org/)
- React

## Contributors

- [Somto Ugeh](https://twitter.com/SomtoUgeh)


## Flutterwave API  References

- [Flutterwave API Doc](https://developer.flutterwave.com/docs)
- [Flutterwave Inline Payment Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Flutterwave Dashboard](https://dashboard.flutterwave.com/login)  

