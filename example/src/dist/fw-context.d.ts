import * as React from 'react';
import { FlutterWaveResponse, InitializeFlutterwavePayment } from './types';
declare type FWContextType = {
    onClose: () => void;
    callback: (response: FlutterWaveResponse) => void;
    handleFlutterwavePayment: ({ callback, onClose, }: InitializeFlutterwavePayment) => void;
};
declare const FWContext: React.Context<FWContextType>;
declare const Provider: React.Provider<FWContextType>;
export { Provider as FWContextProvider, FWContext };
