import * as React from 'react';

const loadedScripts: {
  src?: string;
} = {};

interface ScriptStatusInterface {
  loaded: boolean;
  error: boolean;
}

const srcUrl = 'https://checkout.flutterwave.com/v3.js';
const maxAttempts = 3; // Set the maximum number of attempts
let attempt = 1;// Track the attempt count

export default function useFWScript(): readonly [boolean, boolean] {
  const [state, setState] = React.useState<ScriptStatusInterface>({
    loaded: false,
    error: false,
  });

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

    console.log(`Flutterwave script download failed. Attempt: ${attempt}`);

    if (attempt < maxAttempts) {
      ++attempt;

      setTimeout(() => downloadScript(), (attempt * 1000)); // Progressively increase the delay before retry
    } else {
      setState({
        loaded: true,
        error: true,
      });
    }
  }, []);

  return [state.loaded, state.error] as const;
}
