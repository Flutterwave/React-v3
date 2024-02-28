import * as React from 'react';
import { ScriptDownloadRetryStrategy } from './types';

const loadedScripts: {
  src?: string;
} = {};

interface ScriptStatusInterface {
  loaded: boolean;
  error: boolean;
}

const srcUrl = 'https://checkout.flutterwave.com/v3.js';
let attempt = 1;// Track the attempt count

export default function useFWScript({ maxAttempt = 3, retryDuration = 3 }: ScriptDownloadRetryStrategy): readonly [boolean, boolean] {
  const [state, setState] = React.useState<ScriptStatusInterface>({
    loaded: false,
    error: false,
  });

  // Prevent values lower than 1
  maxAttempt = maxAttempt < 1 ? 1 : maxAttempt;
  retryDuration = retryDuration < 1 ? 1 : retryDuration;

  React.useEffect((): (() => void) | void => {
    if (loadedScripts.hasOwnProperty('src')) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      downloadScript();

      return () => {
        const scripts = document.querySelectorAll('script');

        scripts.forEach(script => {
          if (script.src === srcUrl) {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
          }
        });
      };
    }
  }, []);

  const downloadScript = React.useCallback((): void => {
    loadedScripts.src = srcUrl;

    const script = document.createElement('script');
    script.src = srcUrl;
    script.async = true;

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.body.appendChild(script);
  }, []);

  const onScriptLoad = React.useCallback((): void => {
    setState({
      loaded: true,
      error: false,
    });
  }, []);

  const onScriptError = React.useCallback((): void => {
    delete loadedScripts.src;

    // eslint-disable-next-line no-console
    console.log(`Flutterwave script download failed. Attempt: ${attempt}`);

    if (attempt < maxAttempt) {
      ++attempt;
      setTimeout(() => downloadScript(), (retryDuration * 1000));
    } else {
      setState({
        loaded: true,
        error: true,
      });
    }
  }, []);

  return [state.loaded, state.error] as const;
}
