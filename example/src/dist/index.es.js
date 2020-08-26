import { useState, useEffect, createElement } from 'react';

/**
 * Check out {@link https://developer.flutterwave.com/docs/flutterwave-standard} for more information.
 */

var types = /*#__PURE__*/Object.freeze({
  __proto__: null
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var loadedScripts = {};
var src = 'https://checkout.flutterwave.com/v3.js';
function useFWScript() {
    var _a = useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        if (loadedScripts.hasOwnProperty(src)) {
            setState({
                loaded: true,
                error: false,
            });
        }
        else {
            loadedScripts.src = src;
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.async = true;
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false,
                });
            };
            var onScriptError_1 = function () {
                delete loadedScripts.src;
                setState({
                    loaded: true,
                    error: true,
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('complete', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            document.body.appendChild(script_1);
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
            };
        }
    }, []);
    return [state.loaded, state.error];
}

/**
 *
 * @param config takes in configuration for flutterwave
 * @returns handleFlutterwavePayment function
 */
function useFlutterwave(flutterWaveConfig) {
    var _a = useFWScript(), loaded = _a[0], error = _a[1];
    useEffect(function () {
        if (error)
            throw new Error('Unable to load flutterwave payment modal');
    }, [error]);
    /**
     *
     * @param object - {callback, onClose}
     */
    function handleFlutterwavePayment(_a) {
        var _b, _c;
        var callback = _a.callback, onClose = _a.onClose;
        if (error)
            throw new Error('Unable to load flutterwave payment modal');
        if (loaded) {
            var flutterwaveArgs = __assign(__assign({}, flutterWaveConfig), { amount: (_b = flutterWaveConfig.amount) !== null && _b !== void 0 ? _b : 0, callback: callback, onclose: onClose, payment_options: (_c = flutterWaveConfig === null || flutterWaveConfig === void 0 ? void 0 : flutterWaveConfig.payment_options) !== null && _c !== void 0 ? _c : 'card, ussd, mobilemoney' });
            return (
            // @ts-ignore
            window.FlutterwaveCheckout &&
                // @ts-ignore
                window.FlutterwaveCheckout(flutterwaveArgs));
        }
    }
    return handleFlutterwavePayment;
}

var FlutterWaveButton = function (_a) {
    var text = _a.text, className = _a.className, children = _a.children, callback = _a.callback, onClose = _a.onClose, disabled = _a.disabled, config = __rest(_a, ["text", "className", "children", "callback", "onClose", "disabled"]);
    var handleFlutterwavePayment = useFlutterwave(config);
    return (createElement("button", { disabled: disabled, className: className, onClick: function () { return handleFlutterwavePayment({ callback: callback, onClose: onClose }); } }, text || children));
};

export { FlutterWaveButton, types as FlutterWaveTypes, useFlutterwave };
