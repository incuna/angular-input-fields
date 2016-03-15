angular.module('aif-checkbox-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/checkbox-input/template.html',
    "<div class=checkbox><label class=\"control-label input-wrapper\"><input type=checkbox ng-model=model ng-disabled=disable> <span bind-html-compile=label></span></label></div>"
  );

}]);
