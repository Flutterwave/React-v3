import * as React from 'react';
import useFlutterwave from './useFW';
import { FWContextProvider } from './fw-context';
import { FlutterwaveConfig, FlutterWaveResponse } from './types';

interface FWProviderProps extends FlutterwaveConfig {
  onClose: () => void;
  children: JSX.Element;
  callback: (response: FlutterWaveResponse) => void;
}

const FWProvider = ({
  onClose,
  children,
  callback,
  ...others
}: FWProviderProps): JSX.Element => {
  const handleFlutterwavePayment = useFlutterwave(others);

  return (
    <FWContextProvider value={{ handleFlutterwavePayment, callback, onClose }}>
      {children}
    </FWContextProvider>
  );
};

export default FWProvider;
