(function (angular, undefined) { /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.appSettings` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
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
     * @description Baasic App Settings Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `baasiAapplicationSettingsService` uses `baasicApplicationSettingsRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
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
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicApplicationSettingsRouteService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module)); /* globals module */
    /**
     * @module baasicApplicationSettingsService
     * @description Baasic App Settings Service provides an easy way to consume Baasic App Settings REST API.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
                /**
                 * Provides direct access to `baasicApplicationSettingsService`.
                 * @method        
                 * @example baasicApplicationSettingsService.routeService.get.expand(expandObject);
                 **/
                routeService: applicationSettingsRouteService,
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
                 * Returns a promise that is resolved once the update application settings action has been performed. This action updates the application setting resource.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.allowAnyOrigin = true;
                 baasicApplicationSettingsService.update(existingResource)
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
                /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed the resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicApplicationSettingsService.remove(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.delete(model.links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the activate action has been performed. If the action is successfully completed the application is activated.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicApplicationSettingsService.activate(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                activate: function (data) {
                    var params = baasicApiService.updateParams(data);
                    var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('activate').href);
                },
                /**
                 * Returns a promise that is resolved once the deactivate action has been performed. If the action is successfully completed the application is deactivated.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicApplicationSettingsService.deactivate(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                deactivate: function (data) {
                    var params = baasicApiService.updateParams(data);
                    var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('deactivate').href);
                }
            };
        }]);
    }(angular, module));
})(angular);