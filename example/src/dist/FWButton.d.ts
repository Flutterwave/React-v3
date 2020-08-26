import * as React from 'react';
import { FlutterwaveConfig, FlutterWaveResponse } from './types';
interface FlutterWaveButtonProps extends FlutterwaveConfig {
    text?: string;
    className?: string;
    disabled?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    callback: (response: FlutterWaveResponse) => void;
}
declare const FlutterWaveButton: ({ text, className, children, callback, onClose, disabled, ...config }: FlutterWaveButtonProps) => JSX.Element;
export default FlutterWaveButton;
