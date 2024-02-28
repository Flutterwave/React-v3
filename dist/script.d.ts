import { ScriptDownloadRetryStrategy } from './types';
export default function useFWScript({ maxAttempt, retryDuration }: ScriptDownloadRetryStrategy): readonly [boolean, boolean];
