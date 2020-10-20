import * as React from 'react';
import { FlutterWaveResponse, InitializeFlutterwavePayment } from './types';

type FWContextType = {
  onClose: () => void;
  callback: (response: FlutterWaveResponse) => void;
  handleFlutterwavePayment: ({
    callback,
    onClose,
  }: InitializeFlutterwavePayment) => void;
};

const FWContext = React.createContext({
  handleFlutterwavePayment: () => null,
  onClose: () => null,
  callback: () => null,
} as FWContextType);

const { Provider } = FWContext;
export { Provider as FWContextProvider, FWContext };
