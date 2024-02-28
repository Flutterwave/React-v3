import * as React from 'react';
import useFlutterwave from './useFW';
import { FlutterwaveConfig, FlutterWaveResponse } from './types';

interface FlutterWaveButtonProps extends FlutterwaveConfig {
  text?: string;
  className?: string;
  disabled?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  callback: (response: FlutterWaveResponse) => void;
}

const FlutterWaveButton = ({
  text,
  className,
  children,
  callback,
  onClose,
  disabled,
  ...config
}: FlutterWaveButtonProps): JSX.Element => {
  const handleButtonClick = React.useCallback((): void => {
    useFlutterwave(config)({ callback, onClose });
  }, []);

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={handleButtonClick}
    >
      {text || children}
    </button>
  );
};

export default FlutterWaveButton;
