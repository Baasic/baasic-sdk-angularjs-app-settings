(function (angular, module, undefined) {
    "use strict";
    module.service("baasicApplicationSettingsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("applications/{?embed,fields}"),
                update: uriTemplateService.parse("applications/"),				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));