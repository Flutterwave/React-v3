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
        callback: async (response) => {
          if (response.status === 'successful') {
            await fetch(
              ' https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
              {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  publicKey: flutterWaveConfig.public_key,
                  language: 'Flutterwave-React-v3',
                  version: '1.0.7',
                  title: `${
                    flutterWaveConfig?.payment_options.split(',').length > 1
                      ? 'Initiate-Charge-Multiple'
                      : `Initiate-Charge-${flutterWaveConfig?.payment_options}`
                  }`,
                  message: '15s',
                }),
              }
            );
            callback(response);
          } else {
            await fetch(
              ' https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
              {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  publicKey: flutterWaveConfig.public_key ?? '',
                  language: 'Flutterwave-React-v3',
                  version: '1.0.7',
                  title: `${
                    flutterWaveConfig?.payment_options.split(',').length > 1
                      ? 'Initiate-Charge-Multiple-error'
                      : `Initiate-Charge-${flutterWaveConfig?.payment_options}-error`
                  }`,
                  message: '15s',
                }),
              }
            );
            callback(response);
          }
        },
        onclose: onClose,
        payment_options:
          flutterWaveConfig?.payment_options ?? 'card, ussd, mobilemoney',
      };

      return (
        // @ts-ignore
        // eslint-disable-next-line no-undef
        window.FlutterwaveCheckout &&
        // @ts-ignore
        // eslint-disable-next-line no-undef
        window.FlutterwaveCheckout(flutterwaveArgs)
      );
    }
  }

  return handleFlutterwavePayment;
}
