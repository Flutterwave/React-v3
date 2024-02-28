/**
 * Check out {@link https://developer.flutterwave.com/docs/flutterwave-standard} for more information.
 */

 export interface FlutterWaveProps {
  /**
   * 	Your transaction reference. This MUST be unique for every transaction
   */
  tx_ref: string;
  amount: number;
  /**
   * currency to charge in. Defaults to NGN
   */
  currency?: 'NGN' | string;
  /**
   * 	This is a sha256 hash of your FlutterwaveCheckout values, it is used for passing secured values to the payment gateway.
   */
  integrity_hash?: string;
  /**
   * This specifies the payment options to be displayed e.g - [card, mobilemoney, ussd] and so on. Defaults to 'card, ussd, mobilemoney'
   */
  payment_options: 'card, ussd, mobilemoney' | string;
  /**
   *	This is the payment plan ID used for Recurring billing
   */
  payment_plan?: string;
  /**
   * URL to redirect to when a transaction is completed. This is useful for 3DSecure payments so we can redirect your customer back to a custom page you want to show them.
   */
  redirect_url?: string;
  /**
   *  This is an object that can contains your customer details.
   * e.g {
   *    'email': 'example@gmail.com',
   *    'phone_number': '08012345678',
   *    'name': 'Takeshi Kovacs'
   *  }
   */
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  /**
   *  This is an object that helps you include additional payment information to your request
   * e.g {
   *   'consumer_id': 23,
   *   'consumer_mac': '92a3-912ba-1192a'
   *  }
   */
  meta?: Record<string, unknown>;
  /**
   * This is an object that contains title, logo, and description you want to display on the modal e.g
   * e.g {
   *    'title': 'example@gmail.com',
   *    'description': '08012345678',
   *    'logo': 'Takeshi Kovacs'
   *  }
   */
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  /**
   * function to be called when the payment is completed successfully
   */
  callback: (data: FlutterWaveResponse) => void;

  /**
   * function to be called when the mono connection is closed
   */
  onclose: () => void;
  public_key: string;
  /**
   * An array of objects containing the subaccount IDs to split the payment into.
   * e.g subaccounts: [
      {
        id: "RS_A8EB7D4D9C66C0B1C75014EE67D4D663",
        transaction_split_ratio: 2,
        transaction_charge_type: "flat_subaccount",
        transaction_charge: 4200,
      },
    ]
    * Check out {@link https://developer.flutterwave.com/docs/collecting-payments/split-payments/} for more information on subaccounts.
   */
  subaccounts?: Array<unknown>;
}

export interface FlutterwaveConfig {
  public_key: FlutterWaveProps['public_key'];
  tx_ref: FlutterWaveProps['tx_ref'];
  amount: FlutterWaveProps['amount'];
  currency?: FlutterWaveProps['currency'];
  customer: FlutterWaveProps['customer'];
  customizations: FlutterWaveProps['customizations'];
  meta?: FlutterWaveProps['meta'];
  redirect_url?: FlutterWaveProps['redirect_url'];
  payment_plan?: FlutterWaveProps['payment_plan'];
  payment_options: FlutterWaveProps['payment_options'];
  subaccounts?: FlutterWaveProps['subaccounts'];
  retry?: ScriptDownloadRetryStrategy
}

export interface InitializeFlutterwavePayment {
  onClose: FlutterWaveProps['onclose'];
  callback: FlutterWaveProps['callback'];
}

export interface FlutterWaveResponse {
  amount: FlutterWaveProps['amount'];
  currency: FlutterWaveProps['currency'];
  customer: FlutterWaveProps['customer'];
  tx_ref: FlutterWaveProps['tx_ref'];
  flw_ref: string;
  status: string;
  transaction_id: number;
}

export interface ScriptDownloadRetryStrategy {
  maxAttempt?: number;
  interval?: number;
}
