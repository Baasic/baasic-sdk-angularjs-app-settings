/* globals module */
/**
 * @module baasicApplicationSettingsRouteService
 * @description Baasic App Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `baasiAapplicationSettingsService` uses `baasicApplicationSettingsRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicApplicationSettingsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                * @example baasicApplicationSettingsRouteService.parse('route/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                **/  				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));