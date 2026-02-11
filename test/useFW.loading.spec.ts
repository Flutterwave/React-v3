/**
 * @jest-environment jsdom
 */

test('useFlutterwave returns early when script is loading', async () => {
  let handler: (args: { callback: jest.Mock; onClose: jest.Mock }) => Promise<void>;
  let mockUseFWScript: jest.Mock;

  jest.isolateModules(() => {
    mockUseFWScript = jest.fn(() => new Promise(() => {}));
    jest.doMock('../src/script', () => ({ __esModule: true, default: mockUseFWScript }));

    const useFW = require('../src/useFW').default;

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

    handler = useFW(mockConfig);
  });

  handler({ callback: jest.fn(), onClose: jest.fn() });
  const secondCall = handler({ callback: jest.fn(), onClose: jest.fn() });
  await secondCall;

  expect(mockUseFWScript).toHaveBeenCalledTimes(1);
});
