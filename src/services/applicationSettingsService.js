/* globals module */

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
				routeService: applicationSettingsRouteService,                
                get: function (options) {
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(options)))
                        .success(function (appSettings) {
                            appSettings.origins = appSettings.origins || [];
                        });
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
					var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('put').href, model);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
					var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.delete(model.links('delete').href);
                },
				activate: function (data) {
					var params = baasicApiService.updateParams(data);
					var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('activate').href);
				},
				deactivate: function (data) {
					var params = baasicApiService.updateParams(data);
					var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('deactivate').href);
				}
            };
        }]);
}(angular, module));