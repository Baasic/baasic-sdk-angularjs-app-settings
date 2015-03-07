/* globals module */
/**
 * @module baasicApplicationSettingsService
**/

/** 
 * @overview Application settings service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
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
                 * Returns a promise that is resolved once the update application settings action has been performed.
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
                 * Returns a promise that is resolved once the deactivate action has been performed. If the action is successfully completed the application deactivated.
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