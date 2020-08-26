/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import useFWScript from './script';
import {
  FlutterwaveConfig,
  FlutterWaveProps,
  InitializeFlutterwavePayment,
} from './types';

/**
 *
 * @param config takes in configuration for flutterwave
 * @returns handleFlutterwavePayment function
 */
export default function useFlutterwave(
  flutterWaveConfig: FlutterwaveConfig
): ({ callback, onClose }: InitializeFlutterwavePayment) => void {
  const [loaded, error] = useFWScript();

  React.useEffect(() => {
    if (error) throw new Error('Unable to load flutterwave payment modal');
  }, [error]);

  /**
   *
   * @param object - {callback, onClose}
   */
  function handleFlutterwavePayment({
    callback,
    onClose,
  }: InitializeFlutterwavePayment): void {
    if (error) throw new Error('Unable to load flutterwave payment modal');

    if (loaded) {
      const flutterwaveArgs: FlutterWaveProps = {
        ...flutterWaveConfig,
        amount: flutterWaveConfig.amount ?? 0,
        callback,
        onclose: onClose,
        payment_options:
          flutterWaveConfig?.payment_options ?? 'card, ussd, mobilemoney',
      };

      return (
        // @ts-ignore
        window.FlutterwaveCheckout &&
        // @ts-ignore
        window.FlutterwaveCheckout(flutterwaveArgs)
      );
    }
  }

  return handleFlutterwavePayment;
}
