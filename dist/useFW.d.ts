import { FlutterwaveConfig, InitializeFlutterwavePayment } from './types';
/**
 *
 * @param config takes in configuration for flutterwave
 * @returns handleFlutterwavePayment function
 */
export default function useFlutterwave(flutterWaveConfig: FlutterwaveConfig): ({ callback, onClose }: InitializeFlutterwavePayment) => void;
