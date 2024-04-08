"use strict";
// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudbilling_v1beta = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */
const googleapis_common_1 = require("googleapis-common");
var cloudbilling_v1beta;
(function (cloudbilling_v1beta) {
    /**
     * Cloud Billing API
     *
     * Allows developers to manage billing for their Google Cloud Platform projects programmatically.
     *
     * @example
     * ```js
     * const {google} = require('googleapis');
     * const cloudbilling = google.cloudbilling('v1beta');
     * ```
     */
    class Cloudbilling {
        constructor(options, google) {
            this.context = {
                _options: options || {},
                google,
            };
            this.billingAccounts = new Resource$Billingaccounts(this.context);
            this.v1beta = new Resource$V1beta(this.context);
        }
    }
    cloudbilling_v1beta.Cloudbilling = Cloudbilling;
    class Resource$Billingaccounts {
        constructor(context) {
            this.context = context;
        }
        estimateCostScenario(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://cloudbilling.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1beta/{+billingAccount}:estimateCostScenario').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST',
                }, options),
                params,
                requiredParams: ['billingAccount'],
                pathParams: ['billingAccount'],
                context: this.context,
            };
            if (callback) {
                (0, googleapis_common_1.createAPIRequest)(parameters, callback);
            }
            else {
                return (0, googleapis_common_1.createAPIRequest)(parameters);
            }
        }
    }
    cloudbilling_v1beta.Resource$Billingaccounts = Resource$Billingaccounts;
    class Resource$V1beta {
        constructor(context) {
            this.context = context;
        }
        estimateCostScenario(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://cloudbilling.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1beta:estimateCostScenario').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST',
                }, options),
                params,
                requiredParams: [],
                pathParams: [],
                context: this.context,
            };
            if (callback) {
                (0, googleapis_common_1.createAPIRequest)(parameters, callback);
            }
            else {
                return (0, googleapis_common_1.createAPIRequest)(parameters);
            }
        }
    }
    cloudbilling_v1beta.Resource$V1beta = Resource$V1beta;
})(cloudbilling_v1beta = exports.cloudbilling_v1beta || (exports.cloudbilling_v1beta = {}));
