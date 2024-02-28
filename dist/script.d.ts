import { ScriptDownloadRetryStrategy } from './types';
export default function useFWScript({ maxAttempt, interval }: ScriptDownloadRetryStrategy): Promise<void>;
