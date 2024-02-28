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

    const flutterwaveArgs: FlutterWaveProps = {
      ...flutterWaveConfig,
      amount: flutterWaveConfig.amount ?? 0,
      callback: async(response) => {
        if(response.status === 'successful'){
          callback(response);

          await fetch('https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              publicKey: flutterWaveConfig.public_key,
              language: 'Flutterwave-React-v3',
              version: '1.0.7',
              title: `${flutterWaveConfig?.payment_options.split(',').length>1?'Initiate-Charge-Multiple': `Initiate-Charge-${flutterWaveConfig?.payment_options}`}`,
              message: '15s'
            })
          });
        }else{
          callback(response);
          await fetch('https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              publicKey: flutterWaveConfig.public_key ?? '',
              language: 'Flutterwave-React-v3',
              version: '1.0.7',
              title: `${flutterWaveConfig?.payment_options.split(',').length>1?'Initiate-Charge-Multiple-error': `Initiate-Charge-${flutterWaveConfig?.payment_options}-error`}`,
              message: '15s'
            })
          });
        }
      },
      onclose: onClose,
      payment_options: flutterWaveConfig?.payment_options ?? 'card, ussd, mobilemoney',
    };

    // @ts-ignore
    window.FlutterwaveCheckout(flutterwaveArgs);
  };
}
