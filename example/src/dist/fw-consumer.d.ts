import * as React from 'react';
import { FlutterwaveConfig, FlutterWaveResponse } from './types';
interface FWConsumerProps extends FlutterwaveConfig {
    children: Function;
    onClose: () => void;
    callback: (response: FlutterWaveResponse) => void;
}
declare const FWConsumer: React.ForwardRefExoticComponent<FWConsumerProps & React.RefAttributes<unknown>>;
export default FWConsumer;
