/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import FWProvider from './fw-provider';
import { FWContext } from './fw-context';
import { FlutterwaveConfig, FlutterWaveResponse } from './types';

interface FWConsumerProps extends FlutterwaveConfig {
  children: Function;
  onClose: () => void;
  callback: (response: FlutterWaveResponse) => void;
}

const FWConsumerChild = ({
  children,
  ref,
}: {
  children: Function;
  ref: any;
}): React.FunctionComponentElement<any> => {
  const {
    onClose,
    callback,
    handleFlutterwavePayment: initializePayment,
  } = React.useContext(FWContext);

  return children({
    handleFlutterwavePayment: () => initializePayment({ callback, onClose }),
    ref,
  });
};

const FWConsumer = React.forwardRef(
  (
    { children, callback, onClose, ...others }: FWConsumerProps,
    ref: any
  ): JSX.Element => {
    return (
      <FWProvider {...{ onClose, callback, ...others }}>
        <FWConsumerChild ref={ref}>{children}</FWConsumerChild>
      </FWProvider>
    );
  }
);

export default FWConsumer;
