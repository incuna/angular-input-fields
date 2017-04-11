angular.module('aif-text-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/text-input.html',
    "<div><label class=\"control-label input-wrapper\"><input type=text ng-model=model ng-disabled=disable></label></div>"
  );

}]);
