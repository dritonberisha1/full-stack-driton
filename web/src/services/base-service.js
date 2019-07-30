import _ from 'lodash';
import AuthService from './auth-service';

/**
 * @abstract
 * Represetns a base implementation for all client side services
 */
class BaseService {

    constructor() {
        this.apiRootPath = process.env.REACT_APP_API_ENDPOINT;
    }

    /**
     * @protected
     * Performs a REST DELETE call
     * @param {Object} options Call parameters
     * @returns {Promise}
     */
    _apiDelete(options) {
        options.verb = 'DELETE';
        return this.__apiProxy(options);
    }

    /**
     * @protected
     * Performs a REST GET call
     * @param {Object} options Call parameters
     * @returns {Promise}
     */
    _apiGet(options) {
        options.verb = 'GET';
        return this.__apiProxy(options);
    }

    /**
     * @protected
     * Performs a REST PATCH call
     * @param {Object} options Call parameters
     * @returns {Promise}
     */
    _apiPatch(options) {
        options.verb = 'PATCH';
        return this.__apiProxy(options);
    }

    /**
     * @protected
     * Performs a REST POST call
     * @param {Object} options Call parameters
     * @returns {Promise}
     */
    _apiPost(options) {
        options.verb = 'POST';
        return this.__apiProxy(options);
    }

    /**
     * @protected
     * Performs a REST PUT call
     * @param {Object} options Call parameters
     * @returns {Promise}
     */
    _apiPut(options) {
        options.verb = 'PUT';
        return this.__apiProxy(options);
    }

    /**
     * @private
     * Proxies a call to the appropriate method, depending on whether authentication is required or not
     * @param {Object} options API call params
     */
    __apiProxy(options) {
        return options.auth !== false ? this.__makeAuthRequest(options) : this.__makeRequest(options);
    }

    /**
     * @private
     * Adds authentication headers prior to making a generic API call
     * @param {Object} options API request params
     */
    __makeAuthRequest(options) {
        const authOptions = _.merge({}, options);
        authOptions.headers = authOptions.headers || [];
        // Just in case it was added, remove and place latest token
        _.remove(authOptions.headers, function (header) {
            header.hasOwnProperty('Authorization')
        });

        return new Promise((resolve, reject) => {
            AuthService.getCurrentSession()
                .then(session => {
                    authOptions.headers.push({
                        Authorization: `Bearer ${session.token}`
                    });
                    this.__makeRequest(authOptions)
                        .then(resolve)
                        .catch(reject);
                }).catch(reject);
        })
    }

    /**
     * @private
     * Makes a generic call to an API. All information is assumed, e.g. if no authentication header exists, the
     * call will not be authenticated.
     * @param {Object} options API request params
     * @returns {Promise}
     */
    __makeRequest(options) {

        var request = {
            method: options.verb || options.method || 'GET',
            headers: options.headers,
            body: options.body || options.data,
            mode: 'cors'
        };

        if (!options.preserveData && typeof request.body === 'object') {
            request.body = JSON.stringify(request.body);
        }

        if (!options.headers) options.headers = [];
        if (!options.noContentType && !_.find(options.headers, function (header) {
            return header.hasOwnProperty('Content-Type');
        })) {
            options.headers.push({ 'Content-Type': 'application/json; charset=utf-8' });
        }

        if (options.locale) {
            options.headers.push({ 'Accept-Language': options.locale });
        }

        request.headers = new Headers();

        if (options.headers && options.headers.length) {
            options.headers.forEach(function (header) {
                let label = Object.getOwnPropertyNames(header)[0];
                request.headers.append(label, header[label])
            });
        }

        var url = (options.rootPath || this.apiRootPath) + options.path;

        if (options.params && options.params.length) {
            if (url.indexOf('?') === -1) url += '?';
            var needsAmpersand = url.substring(url.length) !== '&';
            options.params.forEach(function (param) {
                if (needsAmpersand) url += '&';
                needsAmpersand = false;
                url += Object.keys(param)[0] + '=' + param[Object.keys(param)[0]];
            })
        }

        return fetch(url, request)
            .then(function (result) {
                //console.log('RESPONSE', result);
                if (!result.ok) {
                    return new Promise((resolve, reject) => {
                        if (result.status === 403) {
                            return reject("Unauthorized");
                        }

                        result.json().then((json) => {
                            //console.log('ERROR RESPONSE', json);
                            var errorResponse = {
                                headers: {},
                                status: result.status,
                                message: json.message || '',
                                code: json.code
                            };
                            // Display the key/value pairs
                            for (var header of result.headers.entries()) {
                                errorResponse.headers[header[0]] = header[1];
                            }
                            if (json.errors && json.errors.length) {
                                errorResponse.message += json.errors.join(',');
                            }
                            reject(errorResponse);
                        }).catch(reject);
                    })
                }
                return result.json();
            });
    }

}

export default BaseService;