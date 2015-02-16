/* globals module */
/**
 * @module baasicApplicationSettingsRouteService
**/

/** 
 * @overview Application settings route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicApplicationSettingsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses get route, this route doesn't expose any properties.
                * @method        
                * @example baasicLoginRouteService.get.expand({});               
                **/ 			
                get: uriTemplateService.parse('applications/{?embed,fields}'),
                /**
                * Parses update route, this route doesn't expose any properties.
                * @method        
                * @example baasicLoginRouteService.update.expand({});               
                **/ 					
                update: uriTemplateService.parse('applications/'),		
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                **/  				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));