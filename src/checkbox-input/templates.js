angular.module('aif-checkbox-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/checkbox-input.html',
    "<div class=checkbox><input class=checkbox-input type=checkbox ng-model=model ng-disabled=disable id=\"{{ fieldId }}\"><label class=\"control-label input-wrapper\" for=\"{{ fieldId }}\"><span bind-html-compile=label></span></label></div>"
  );

}]);
