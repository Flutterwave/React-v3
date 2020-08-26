<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo-colored.svg" width="50%"/>
</p>

# Flutterwave-v3-react

This is a react package for implementing Flutterwave collection gateway

## Demo

![Alt text](React_App.png?raw=true "Demo Image")

## Installation

```bash
$ npm install flutterwave-v3-react

# or
$ yarn add flutterwave-v3-react



```

### Usage

### Hooks

```javascript
import React from 'react';
import { useFlutterwave } from 'flutterwave-v3-react';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-ad8d5d4eca114b1255ac7798d3d1787d-X',
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
import { FlutterWaveButton } from 'flutterwave-v3-react';

export default function App() {
   const config = {
    public_key: 'FLWPUBK-ad8d5d4eca114b1255ac7798d3d1787d-X',
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

Please checkout
[Flutterwave Documentation](https://developer.flutterwave.com/docs/flutterwave-standard)
for other available options you can add to the tag

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE)
file for details

## Contributions ✨

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Follow on Twitter [@UgwumaduJoel](https://twitter.com/UgwumaduJoel)

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!


### Issues

Looking to contribute? Look for the Good First Issue label.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

## License

MIT
