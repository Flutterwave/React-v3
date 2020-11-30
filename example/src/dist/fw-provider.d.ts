/// <reference types="react" />
import { FlutterwaveConfig, FlutterWaveResponse } from './types';
interface FWProviderProps extends FlutterwaveConfig {
    onClose: () => void;
    children: JSX.Element;
    callback: (response: FlutterWaveResponse) => void;
}
declare const FWProvider: ({ onClose, children, callback, ...others }: FWProviderProps) => JSX.Element;
export default FWProvider;
