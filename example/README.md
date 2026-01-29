# Flutterwave React v3 Example

This example demonstrates how to integrate Flutterwave payment gateway into your React application using the `flutterwave-react-v3` package.

## Features Demonstrated

✅ **Three Payment Integration Methods:**
- Custom button with `useFlutterwave` hook
- Pre-built `FlutterWaveButton` component
- Custom styled payment buttons

✅ **Real-time Configuration:**
- Dynamic amount input
- Customer information management
- Live payment preview

✅ **Modern UI/UX:**
- Responsive design
- Beautiful gradient backgrounds
- Interactive hover effects
- Mobile-friendly layout

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Flutterwave account ([Sign up here](https://flutterwave.com))

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Update your Flutterwave public key in `src/App.js`:

```javascript
const config = {
  public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY", // Replace with your key
  // ... other config
};
```

### Running the Example

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Test Credentials

For testing purposes, use these Flutterwave test card details:

- **Card Number:** 5531 8866 5214 2950
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **PIN:** 3310
- **OTP:** 12345

## Package Information

This example uses `flutterwave-react-v3` - the official Flutterwave React package with:

- ✅ 100% Test Coverage
- ✅ TypeScript Support
- ✅ React 19 Compatible
- ✅ Multiple Payment Options
- ✅ Comprehensive Documentation

## Learn More

- [Flutterwave Documentation](https://developer.flutterwave.com/docs)
- [React Documentation](https://react.dev)
- [Package Repository](https://github.com/Flutterwave/React-v3)

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Support

For issues or questions:
- [GitHub Issues](https://github.com/Flutterwave/React-v3/issues)
- [Flutterwave Support](https://support.flutterwave.com)
