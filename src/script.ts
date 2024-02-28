import { ScriptDownloadRetryStrategy } from './types';

const srcUrl = 'https://checkout.flutterwave.com/v3.js';
const MAX_ATTEMPT_DEFAULT_VALUE = 3;
const INTERVAL_DEFAULT_VALUE = 1;
let attempt = 1;// Track the attempt count

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export default async function useFWScript({ maxAttempt = MAX_ATTEMPT_DEFAULT_VALUE, interval = INTERVAL_DEFAULT_VALUE }: ScriptDownloadRetryStrategy): Promise<void> {
  // Validate and sanitize variables
  maxAttempt = isNumber(maxAttempt) ? Math.max(1, maxAttempt) : MAX_ATTEMPT_DEFAULT_VALUE; // Ensure minimum of 1 for maxAttempt, revert to the default value otherwise
  interval = isNumber(interval) ? Math.max(1, interval) : INTERVAL_DEFAULT_VALUE; // Ensure minimum of 1 for retryDuration, revert to the default value otherwise

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = srcUrl;
    script.async = true;

    const onScriptLoad = (): void => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
      resolve();
    };

    const onScriptError = (): void => {
      document.body.removeChild(script);

      // eslint-disable-next-line no-console
      console.log(`Flutterwave script download failed. Attempt: ${attempt}`);

      if (attempt < maxAttempt) {
        ++attempt;
        setTimeout(() => useFWScript({ maxAttempt, interval }).then(resolve).catch(reject), (interval * 1000));
      } else {
        reject(new Error('Failed to load payment modal. Check your internet connection and retry later.'));
      }
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.body.appendChild(script);
  });
}
