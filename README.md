[![Build Status](https://travis-ci.org/incuna/angular-input-fields.svg?branch=master)](https://travis-ci.org/incuna/angular-input-fields)

# angular-input-fields

# Installation
`bower install angular-input-fields --save`

* Load the dependencies in to your app.

* Load the modules in your HTML.
```html
<script src="bower_components/angular-input-fields/dist/script.js"></script>
<script src="bower_components/angular-input-fields/dist/templates.js"></script>
```

* Inject the modules as a dependency of your main app module.
```javascript
angular.module('app', [
    'angular-input-fields'
]);
```

* Please see source or tests to see what attributes are available for each field

# Development

* Before starting development on this module you will need to run `npm install`
* To run tests in watch mode use `grunt karma:dev`. To run tests once only do `grunt test`

# Release

* Before releasing, we must compile the `dist/` folder from the source javascript and templates.
* To do this, run `grunt dist-js`
* Determine the new release number using Semver
* Update `package.json`, `bower.json` and the changelog with the new version number
* Git tag the repository with the new version number
