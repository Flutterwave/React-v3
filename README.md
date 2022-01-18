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
## Other methods and descriptions:

| Method Name  | Parameters  | Returns |Description |
| ------------- | ------------- | ------------- | ------------- |
| closePaymentModal  |  Null | Null | This methods allows you to close the payment modal via code. |

Please checkout [Flutterwave Documentation](https://developer.flutterwave.com/docs/flutterwave-standard) for other available options you can add to the tag.


<a id="deployment"></a>

## Deployment

- Switch to Live Mode on the Dashboard settings page
- Use the Live Public API key 

<a id="build-tools"></a>

## Securing Your API key
Even when using a public key, it would still be safe to secure it.
Please note that the best way to secure your key is by storing it 
on the server side!
However, your public key can be hidden from direct view on your code
by simply taking the following steps:

1. ### Create a `.env` file at the root of your react app directory
```- your_project_folder
  - node_modules
  - public
  - src
  - .env         <-- create it here
  - .gitignore
  - package-lock.json
  - package.json
```

2. ### Assign REACT_APP_ to your API key
Inside the .env file, assign the variable name REACT_APP_ to your API key.

```
// .env file
REACT_APP_API_KEY=your_api_key
//For example
REACT_APP_FLUTTERWAVE_KEY = 012345
```

3. ### Add the `.env` file to the `.gitignore` file
```
// .gitignore file 

# api keys
.env       <-- add this line

# dependencies
/node_modules
```
After completing the above process, run a `git status` on
your terminal to ensure the `.env` file does not show in the log

4. ### Reference the API key via the `process.env` object
In order to confirm you can now access your API key through this 
object, kindly add a `console.log` to the reference statement like this:
```
console.log(process.env.REACT_APP_FLUTTERWAVE_API_KEY)
```
If your API key shows on your console, then you have successfully accessed
your key through the `process.env` object. If your key does not show, 
try restarting your react app again.

This enables you hide your API key from direct access on the source code.

Please NOTE: this is not a secure method. To keep your key fully safe, render
it from the server side.

## Built Using

- [Typescript](https://www.typescriptlang.org/)
- React

## Contributors

- [Somto Ugeh](https://twitter.com/SomtoUgeh)


## Flutterwave API  References

- [Flutterwave API Doc](https://developer.flutterwave.com/docs)
- [Flutterwave Inline Payment Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Flutterwave Dashboard](https://dashboard.flutterwave.com/login)  

