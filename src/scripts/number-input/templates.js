angular.module('aif-number-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/number-input/template..html',
    "<div><label class=\"control-label input-wrapper\"><input type=number ng-model=model ng-disabled=disable></label></div>"
  );

}]);
