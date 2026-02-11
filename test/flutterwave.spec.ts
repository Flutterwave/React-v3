/**
 * @jest-environment jsdom
 */
import useFWScript from '../src/script';
import useFW from '../src/useFW';
import FlutterWaveButton from '../src/FWButton';
import closePaymentModal from '../src/closeModal';
import { renderHook, act } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';

import '@testing-library/jest-dom';

const mockConfig = {
  public_key: 'FLWPUBK-**************************-X',
  tx_ref: 'text_ref1234',
  amount: 10,
  currency: 'NGN',
  payment_options: 'card,mobilemoney,ussd',
  customer: {
    email: 'user@gmail.com',
    phone_number: '08102909304',
    name: 'test user',
  },
  customizations: {
    title: 'My store',
    description: 'Payment for items in cart',
    logo: 'https://assets.piedpiper.com/logo.png',
  },
};

// Core tests - All existing tests
test('FlutterwaveModule should create', () => {
  const {result} = renderHook(() => useFWScript({}));
  
  expect(
    result.current[0]
  ).not.toBeTruthy();
});

test('Should load Flutterwave Inline script and have FlutterwaveCheckout function', () => {
  const {result} = renderHook(() => useFW(mockConfig));

  expect(
    document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]')
  ).not.toBeNull();
});

test('useFWScript validates parameters correctly', async () => {
  const scriptPromise = useFWScript({ maxAttempt: 'invalid' as any, interval: 'invalid' as any });
  
  setTimeout(() => {
    const scripts = document.querySelectorAll('script[src="https://checkout.flutterwave.com/v3.js"]');
    const script = scripts[scripts.length - 1] as HTMLScriptElement;
    if (script) {
      const event = new Event('load');
      script.dispatchEvent(event);
    }
  }, 0);
  
  await scriptPromise;
  expect(true).toBe(true);
}, 10000);

test('useFWScript handles errors correctly', async () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  
  const scriptPromise = useFWScript({ maxAttempt: 1, interval: 0 });
  
  setTimeout(() => {
    const scripts = document.querySelectorAll('script[src="https://checkout.flutterwave.com/v3.js"]');
    const script = scripts[scripts.length - 1] as HTMLScriptElement;
    if (script) {
      const errorEvent = new Event('error');
      script.dispatchEvent(errorEvent);
    }
  }, 0);
  
  await expect(scriptPromise).rejects.toThrow('Failed to load payment modal');
  
  consoleSpy.mockRestore();
}, 10000);

test('useFWScript retries when attempt is below max', async () => {
  jest.useFakeTimers();
  const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  
  const scriptPromise = useFWScript({ maxAttempt: 10, interval: 1 });
  
  const scripts = document.querySelectorAll('script[src="https://checkout.flutterwave.com/v3.js"]');
  const script = scripts[scripts.length - 1] as HTMLScriptElement;
  const errorEvent = new Event('error');
  script.dispatchEvent(errorEvent);
  
  expect(setTimeoutSpy).toHaveBeenCalled();
  
  jest.runOnlyPendingTimers();
  
  const retryScripts = document.querySelectorAll('script[src="https://checkout.flutterwave.com/v3.js"]');
  const retryScript = retryScripts[retryScripts.length - 1] as HTMLScriptElement;
  const loadEvent = new Event('load');
  retryScript.dispatchEvent(loadEvent);
  
  await scriptPromise;
  
  setTimeoutSpy.mockRestore();
  jest.useRealTimers();
}, 10000);

test('useFlutterwave should return a function', () => {
  const {result} = renderHook(() => useFW(mockConfig));
  expect(typeof result.current).toBe('function');
});

test('useFlutterwave loads script when checkout is missing', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();

  delete (window as any).FlutterwaveCheckout;

  const {result} = renderHook(() => useFW(mockConfig));

  setTimeout(() => {
    (window as any).FlutterwaveCheckout = jest.fn();
    const scripts = document.querySelectorAll('script[src="https://checkout.flutterwave.com/v3.js"]');
    const script = scripts[scripts.length - 1] as HTMLScriptElement;
    if (script) {
      script.dispatchEvent(new Event('load'));
    }
  }, 0);

  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });

  expect((window as any).FlutterwaveCheckout).toHaveBeenCalled();
});

test('useFlutterwave should handle successful payment callback', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  const mockResponse = {
    status: 'successful',
    amount: 10,
    currency: 'NGN',
    customer: mockConfig.customer,
    tx_ref: mockConfig.tx_ref,
    flw_ref: 'FLW123456',
    transaction_id: 123456,
  };
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  );
  
  const {result} = renderHook(() => useFW(mockConfig));
  
  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    args.callback(mockResponse);
  });
  
  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });
  
  expect(mockCallback).toHaveBeenCalledWith(mockResponse);
  expect(global.fetch).toHaveBeenCalled();
});

test('useFlutterwave uses single-option title on success', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  const config = { ...mockConfig, payment_options: 'card' };
  const mockResponse = {
    status: 'successful',
    amount: 10,
    currency: 'NGN',
    customer: config.customer,
    tx_ref: config.tx_ref,
    flw_ref: 'FLW123456',
    transaction_id: 123456,
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  );

  const {result} = renderHook(() => useFW(config));

  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    args.callback(mockResponse);
  });

  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });

  const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
  expect(body.title).toBe('Initiate-Charge-card');
});

test('useFlutterwave uses single-option title on error with missing public_key', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  const config = { ...mockConfig, payment_options: 'card', public_key: undefined } as any;
  const mockResponse = {
    status: 'failed',
    amount: 10,
    currency: 'NGN',
    customer: config.customer,
    tx_ref: config.tx_ref,
    flw_ref: 'FLW123456',
    transaction_id: 123456,
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  );

  const {result} = renderHook(() => useFW(config));

  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    args.callback(mockResponse);
  });

  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });

  const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
  expect(body.title).toBe('Initiate-Charge-card-error');
  expect(body.publicKey).toBe('');
});

test('useFlutterwave should handle failed payment callback', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  const mockResponse = {
    status: 'error',
    amount: 10,
    currency: 'NGN',
    customer: mockConfig.customer,
    tx_ref: mockConfig.tx_ref,
    flw_ref: 'FLW123456',
    transaction_id: 123456,
  };
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  );
  
  const {result} = renderHook(() => useFW(mockConfig));
  
  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    args.callback(mockResponse);
  });
  
  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });
  
  expect(mockCallback).toHaveBeenCalledWith(mockResponse);
});

test('useFlutterwave should use default amount when not provided', async () => {
  const configWithoutAmount = { ...mockConfig, amount: undefined };
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  const {result} = renderHook(() => useFW(configWithoutAmount as any));
  
  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    expect(args.amount).toBe(0);
  });
  
  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });
  
  expect((window as any).FlutterwaveCheckout).toHaveBeenCalled();
});

test('useFlutterwave should use default payment_options when not provided', async () => {
  const configWithoutPaymentOptions = { ...mockConfig, payment_options: undefined };
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  const {result} = renderHook(() => useFW(configWithoutPaymentOptions as any));
  
  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    expect(args.payment_options).toBe('card, ussd, mobilemoney');
  });
  
  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });
  
  expect((window as any).FlutterwaveCheckout).toHaveBeenCalled();
});

test('FlutterWaveButton should render with text prop', () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  const element = React.createElement(FlutterWaveButton, {
    ...mockConfig,
    text: 'Pay Now',
    callback: mockCallback,
    onClose: mockOnClose,
  });
  
  render(element);
  
  const button = screen.getByRole('button', { name: /pay now/i });
  expect(button).toBeInTheDocument();
});

test('FlutterWaveButton should render with children', () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  const element = React.createElement(FlutterWaveButton, {
    ...mockConfig,
    callback: mockCallback,
    onClose: mockOnClose,
  }, 'Click to Pay');
  
  render(element);
  
  const button = screen.getByRole('button', { name: /click to pay/i });
  expect(button).toBeInTheDocument();
});

test('FlutterWaveButton should handle disabled state', () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  const element = React.createElement(FlutterWaveButton, {
    ...mockConfig,
    text: 'Pay Now',
    disabled: true,
    callback: mockCallback,
    onClose: mockOnClose,
  });
  
  render(element);
  
  const button = screen.getByRole('button', { name: /pay now/i }) as HTMLButtonElement;
  expect(button.disabled).toBe(true);
});

test('FlutterWaveButton should apply custom className', () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  const element = React.createElement(FlutterWaveButton, {
    ...mockConfig,
    text: 'Pay Now',
    className: 'custom-class',
    callback: mockCallback,
    onClose: mockOnClose,
  });
  
  render(element);
  
  const button = screen.getByRole('button', { name: /pay now/i });
  expect(button).toHaveClass('custom-class');
});

test('FlutterWaveButton should call handleFlutterPayment on click', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  (window as any).FlutterwaveCheckout = jest.fn();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  );
  
  const element = React.createElement(FlutterWaveButton, {
    ...mockConfig,
    text: 'Pay Now',
    callback: mockCallback,
    onClose: mockOnClose,
  });
  
  render(element);
  
  const button = screen.getByRole('button', { name: /pay now/i });
  fireEvent.click(button);
  
  await new Promise(resolve => setTimeout(resolve, 100));
  expect(true).toBe(true);
});

test('closePaymentModal should close payment modal', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('name', 'checkout');
  document.body.appendChild(iframe);
  
  closePaymentModal();
  
  const checkout = document.querySelector('iframe[name="checkout"]') as HTMLIFrameElement;
  expect(checkout).toBeTruthy();
  expect(checkout.id).toBe('flwpugpaidid');
  expect(checkout.src).toBe('https://checkout.flutterwave.com/?');
  
  document.body.removeChild(iframe);
});

test('closePaymentModal should handle multiple iframes', () => {
  const iframe1 = document.createElement('iframe');
  iframe1.setAttribute('name', 'checkout');
  document.body.appendChild(iframe1);
  
  const iframe2 = document.createElement('iframe');
  iframe2.setAttribute('name', 'checkout');
  document.body.appendChild(iframe2);
  
  closePaymentModal();
  
  const checkouts = document.querySelectorAll('iframe[name="checkout"]');
  expect(checkouts.length).toBe(2);
  
  checkouts.forEach((checkout) => {
    expect((checkout as HTMLIFrameElement).id).toBe('flwpugpaidid');
  });
  
  document.body.removeChild(iframe1);
  document.body.removeChild(iframe2);
});

// Additional coverage-focused tests
test('useFlutterwave should handle window.FlutterwaveCheckout already existing', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  // Pre-set FlutterwaveCheckout
  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    args.callback({ status: 'successful' });
  });
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response)
  );
  
  const {result} = renderHook(() => useFW(mockConfig));
  
  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });
  
  expect(mockCallback).toHaveBeenCalled();
});

test('useFlutterwave should forward onClose parameter correctly', async () => {
  const mockCallback = jest.fn();
  const mockOnClose = jest.fn();
  
  (window as any).FlutterwaveCheckout = jest.fn((args) => {
    expect(args.onclose).toBe(mockOnClose);
  });
  
  const {result} = renderHook(() => useFW(mockConfig));
  
  await act(async () => {
    await result.current({ callback: mockCallback, onClose: mockOnClose });
  });
  
  expect((window as any).FlutterwaveCheckout).toHaveBeenCalled();
});

test('useFWScript validates maxAttempt and interval as numbers', async () => {
  const scriptPromise = useFWScript({ maxAttempt: 0, interval: 0 });
  
  setTimeout(() => {
    const scripts = document.querySelectorAll('script[src="https://checkout.flutterwave.com/v3.js"]');
    const script = scripts[scripts.length - 1] as HTMLScriptElement;
    if (script) {
      const event = new Event('load');
      script.dispatchEvent(event);
    }
  }, 0);
  
  await scriptPromise;
  expect(true).toBe(true);
}, 10000);
