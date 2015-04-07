﻿/* globals module */
/**
 * @module baasicApplicationSettingsService
 * @description Baasic App Settings Service provides an easy way to consume Baasic App Settings REST API. In order to obtain a needed routes `baasicApplicationSettingsService` uses `baasicApplicationSettingsRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
                /**
                * Provides direct access to `baasicApplicationSettingsRouteService`.
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
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(options)))
                        .success(function (appSettings) {
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
                 /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed, the application resource will be permanently removed from the system. Please note that data will be irreversibly lost once the action is successfully completed so it can only be executed by account owners. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicApplicationSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(appSettings);
var uri = params['model'].links('delete').href;				 
```				 
                 * @method        
                 * @example 
// appSettings is a resource previously fetched using get action.				 
baasicApplicationSettingsService.remove(appSettings)
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
                 * Returns a promise that is resolved once the activate action has been performed. If the action is successfully completed, the application will be activated. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicApplicationSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(appSettings);
var uri = params['model'].links('activate').href;				 
```				 
                 * @method        
                 * @example 
// appSettings is a resource previously fetched using get action.				 
baasicApplicationSettingsService.activate(appSettings)
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
                 * Returns a promise that is resolved once the deactivate action has been performed. If the action is successfully completed, the application will be deactivated. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicApplicationSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(appSettings);
var uri = params['model'].links('deactivate').href;				 
```				 
                 * @method        
                 * @example 
// appSettings is a resource previously fetched using get action.				 
baasicApplicationSettingsService.deactivate(appSettings)
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

/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
