'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/**
 * Check out {@link https://developer.flutterwave.com/docs/flutterwave-standard} for more information.
 */

var types = /*#__PURE__*/Object.freeze({
  __proto__: null
});

/******************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var srcUrl = 'https://checkout.flutterwave.com/v3.js';
var MAX_ATTEMPT_DEFAULT_VALUE = 3;
var INTERVAL_DEFAULT_VALUE = 1;
var attempt = 1; // Track the attempt count
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumber(value) {
    return typeof value === 'number';
}
function useFWScript(_a) {
    var _b = _a.maxAttempt, maxAttempt = _b === void 0 ? MAX_ATTEMPT_DEFAULT_VALUE : _b, _c = _a.interval, interval = _c === void 0 ? INTERVAL_DEFAULT_VALUE : _c;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            // Validate and sanitize variables
            maxAttempt = isNumber(maxAttempt) ? Math.max(1, maxAttempt) : MAX_ATTEMPT_DEFAULT_VALUE; // Ensure minimum of 1 for maxAttempt, revert to the default value otherwise
            interval = isNumber(interval) ? Math.max(1, interval) : INTERVAL_DEFAULT_VALUE; // Ensure minimum of 1 for retryDuration, revert to the default value otherwise
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var script = document.createElement('script');
                    script.src = srcUrl;
                    script.async = true;
                    var onScriptLoad = function () {
                        script.removeEventListener('load', onScriptLoad);
                        script.removeEventListener('error', onScriptError);
                        resolve();
                    };
                    var onScriptError = function () {
                        document.body.removeChild(script);
                        // eslint-disable-next-line no-console
                        console.log("Flutterwave script download failed. Attempt: " + attempt);
                        if (attempt < maxAttempt) {
                            ++attempt;
                            setTimeout(function () { return useFWScript({ maxAttempt: maxAttempt, interval: interval }).then(resolve).catch(reject); }, (interval * 1000));
                        }
                        else {
                            reject(new Error('Failed to load payment modal. Check your internet connection and retry later.'));
                        }
                    };
                    script.addEventListener('load', onScriptLoad);
                    script.addEventListener('error', onScriptError);
                    document.body.appendChild(script);
                })];
        });
    });
}

var isFWScriptLoading = false;
/**
 *
 * @param config takes in configuration for flutterwave
 * @returns handleFlutterwavePayment function
 */
function useFlutterwave(flutterWaveConfig) {
    /**
     *
     * @param object - {callback, onClose}
     */
    return function handleFlutterwavePayment(_a) {
        var _b, _c;
        var callback = _a.callback, onClose = _a.onClose;
        return __awaiter(this, void 0, void 0, function () {
            var flutterwaveArgs;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (isFWScriptLoading) {
                            return [2 /*return*/];
                        }
                        if (!!window.FlutterwaveCheckout) return [3 /*break*/, 2];
                        isFWScriptLoading = true;
                        return [4 /*yield*/, useFWScript(__assign({}, flutterWaveConfig.retry))];
                    case 1:
                        _d.sent();
                        isFWScriptLoading = false;
                        _d.label = 2;
                    case 2:
                        flutterwaveArgs = __assign(__assign({}, flutterWaveConfig), { amount: (_b = flutterWaveConfig.amount) !== null && _b !== void 0 ? _b : 0, callback: function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(response.status === 'successful')) return [3 /*break*/, 2];
                                            callback(response);
                                            return [4 /*yield*/, fetch('https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
                                                    method: 'post',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        publicKey: flutterWaveConfig.public_key,
                                                        language: 'Flutterwave-React-v3',
                                                        version: '1.0.7',
                                                        title: "" + ((flutterWaveConfig === null || flutterWaveConfig === void 0 ? void 0 : flutterWaveConfig.payment_options.split(',').length) > 1 ? 'Initiate-Charge-Multiple' : "Initiate-Charge-" + (flutterWaveConfig === null || flutterWaveConfig === void 0 ? void 0 : flutterWaveConfig.payment_options)),
                                                        message: '15s'
                                                    })
                                                })];
                                        case 1:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 2:
                                            callback(response);
                                            return [4 /*yield*/, fetch('https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
                                                    method: 'post',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        publicKey: (_a = flutterWaveConfig.public_key) !== null && _a !== void 0 ? _a : '',
                                                        language: 'Flutterwave-React-v3',
                                                        version: '1.0.7',
                                                        title: "" + ((flutterWaveConfig === null || flutterWaveConfig === void 0 ? void 0 : flutterWaveConfig.payment_options.split(',').length) > 1 ? 'Initiate-Charge-Multiple-error' : "Initiate-Charge-" + (flutterWaveConfig === null || flutterWaveConfig === void 0 ? void 0 : flutterWaveConfig.payment_options) + "-error"),
                                                        message: '15s'
                                                    })
                                                })];
                                        case 3:
                                            _b.sent();
                                            _b.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, onclose: onClose, payment_options: (_c = flutterWaveConfig === null || flutterWaveConfig === void 0 ? void 0 : flutterWaveConfig.payment_options) !== null && _c !== void 0 ? _c : 'card, ussd, mobilemoney' });
                        // @ts-ignore
                        window.FlutterwaveCheckout(flutterwaveArgs);
                        return [2 /*return*/];
                }
            });
        });
    };
}

var FlutterWaveButton = function (_a) {
    var text = _a.text, className = _a.className, children = _a.children, callback = _a.callback, onClose = _a.onClose, disabled = _a.disabled, config = __rest(_a, ["text", "className", "children", "callback", "onClose", "disabled"]);
    var handleFlutterPayment = useFlutterwave(config);
    return (React__namespace.createElement("button", { disabled: disabled, className: className, onClick: function () { return handleFlutterPayment({ callback: callback, onClose: onClose }); } }, text || children));
};

/**
 * function to be called when you want to close payment
 */
function closePaymentModal() {
    document.getElementsByName('checkout').forEach(function (item) {
        item.setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
        item.setAttribute('id', 'flwpugpaidid');
        item.setAttribute('src', 'https://checkout.flutterwave.com/?');
        document.body.style.overflow = '';
    });
}

exports.FlutterWaveButton = FlutterWaveButton;
exports.FlutterWaveTypes = types;
exports.closePaymentModal = closePaymentModal;
exports.useFlutterwave = useFlutterwave;
