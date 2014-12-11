# Baasic App Settings AngularJS SDK

Baasic AngularJS App Settings library provides access to application settings Baasic Service [REST API](https://api.baasic.com).

## Dependencies

Baasic AngularJS App Settings library has the following dependencies:

* [Baasic Core AngularJS SDK](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS App Settings library to your project. If you prefer learning by example please skip to [Demo Section](#demo).

### Adding the Library to your Project

Please add the _Baasic App Settings_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-app-settings-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.appSettings_) dependency to your AngularJS module. This will allow you to use library services described in [Modules Section](#baasic-modules).

```javascript
angular.module('my-module', ["baasic.api", "baasic.appSettings"])
```

## App Settings Module

Baasic AngularJS App Settings services and their functions can be found bellow. For further details please check the [API documentation](#tba)

##### applicationSettingsService

Baasic App Settings Service provides an easy way to consume Baasic App Settings REST routes.

* `get` - Gets application settings
* `update` - Updates application settings
* `remove` - Removes application settings
* `activate` - Activates application settings
* `deactivate` - Deactivates application settings
* `routeService` - Provides direct access to `applicationSettingsRouteService`

Here are a few examples on how to use the `applicationSettingsService`:

```javascript
baasiAapplicationSettingsService.get()
    .success(function(data) {
        // data variable contains application settings object
    });
```

```javascript
baasiAapplicationSettingsService.deactivate(appSettingsObject)
    .success(function(data) {
        // on application deactivated
    });
```

For functions such as `remove` and `activate` that don't use `applicationSettingsRouteService` for obtaining route templates, routes can be obtained from application settings (HAL enabled) objects like this:

```javascript
var params = baasicApiService.removeParams(appSettingsObject);
var uri = params["model"].links('delete').href;
// i.e. if the appSettingsObject had the following id: "73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
// the uri would yield "/applications/73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
```

##### applicationSettingsRouteService

Baasic App Settings Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `baasiAapplicationSettingsService` uses `applicationSettingsRouteService` to obtain a part of needed routes while the other part is obtained through HAL. `applicationSettingsRouteService` by convention uses the same function names as `baasiAapplicationSettingsService`.

Here is a list of all the `applicationSettingsRouteService` functions:

* `get`, `update`
* `parse` - Provides direct access to the `uriTemplateService`

URI templates can be expanded manually like this:

```javascript
var params = { searchQuery: "myQuery", page: 4, rpp: 3 };
var uri = baasicApplicationSettingsRouteService.find.expand(params);
// uri will yield "/applications/?searchQuery=myQuery&page=4&rpp=3"
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#pull-requests-are-always-welcome)
* Please [report](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#issue-reporting) any issues you might  have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
