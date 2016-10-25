(function (angular, undefined) { /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.appSettings` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @module baasic.appSettings
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.appSettings', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicApplicationSettingsRouteService
     * @description Baasic Application Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Application Settings Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicApplicationSettingsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicApplicationSettingsRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('applications/{?embed,fields}'),
                /**
                 * Parses update route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicApplicationSettingsRouteService.update.expand({});               
                 **/
                update: uriTemplateService.parse('applications/'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicApplicationSettingsRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicApplicationSettingsService
     * @description Baasic Application Settings Service provides an easy way to consume Baasic Application Settings REST API end-points. In order to obtain a needed routes `baasicApplicationSettingsService` uses `baasicApplicationSettingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the application settings resource.
                 * @method        
                 * @example 
                 baasicApplicationSettingsService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(options))).success(function (appSettings) {
                        appSettings.origins = appSettings.origins || [];
                    });
                },
                /**
                 * Returns a promise that is resolved once the update application settings action has been performed. This action updates the application setting resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't use `baasicApplicationSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects::
                 ```
                 var params = baasicApiService.removeParams(appSettings);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // appSettings is a resource previously fetched using get action.
                 appSettings.allowAnyOrigin = true;
                 baasicApplicationSettingsService.update(appSettings)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('put').href, model);
                },

                routeService: applicationSettingsRouteService
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

})(angular);