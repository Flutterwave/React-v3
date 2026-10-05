/* eslint-disable @typescript-eslint/ban-ts-comment */
import useFWScript from './script';
import {
  FlutterwaveConfig,
  FlutterWaveProps,
  InitializeFlutterwavePayment,
} from './types';

let isFWScriptLoading = false;

/**
 *
 * @param config takes in configuration for flutterwave
 * @returns handleFlutterwavePayment function
 */
export default function useFlutterwave(
  flutterWaveConfig: FlutterwaveConfig
): ({ callback, onClose }: InitializeFlutterwavePayment) => void {
  /**
   *
   * @param object - {callback, onClose}
   */
  return async function handleFlutterwavePayment({
    callback,
    onClose,
  }: InitializeFlutterwavePayment): Promise<void> {
    if (isFWScriptLoading) {
      return;
    }
    
    // @ts-ignore
    if (!window.FlutterwaveCheckout) {
      isFWScriptLoading = true;

      await useFWScript({ ...flutterWaveConfig.retry });

      isFWScriptLoading = false;
    }

    const paymentOptions =
      flutterWaveConfig?.payment_options ?? 'card, ussd, mobilemoney';
    const isMultipleOptions =
      typeof paymentOptions === 'string' &&
      paymentOptions.split(',').length > 1;

    const flutterwaveArgs: FlutterWaveProps = {
      ...flutterWaveConfig,
      amount: flutterWaveConfig.amount ?? 0,
      callback: async (response) => {
        callback(response);

        try {
          const title =
            response.status === 'successful'
              ? isMultipleOptions
                ? 'Initiate-Charge-Multiple'
                : `Initiate-Charge-${paymentOptions}`
              : isMultipleOptions
              ? 'Initiate-Charge-Multiple-error'
              : `Initiate-Charge-${paymentOptions}-error`;

          await fetch(
            'https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                publicKey: flutterWaveConfig.public_key ?? '',
                language: 'Flutterwave-React-v3',
                version: '1.0.7',
                title,
                message: '15s',
              }),
            }
          );
        } catch (e) {
          // Telemetry failures should never disrupt the consumer callback
        }
      },
      onclose: onClose,
      payment_options: paymentOptions,
    };

    // @ts-ignore
    window.FlutterwaveCheckout(flutterwaveArgs);
  };
}
