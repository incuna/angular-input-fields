angular.module('aif-select-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/select-input/template.html',
    "<div class=select-wrapper><select class=select ng-model=model ng-disabled=disable ng-options=\"choice.value as choice.display_name for choice in choices\" id=\"{{ fieldId }}\" name=\"{{ fieldId }}\"><option value=\"\" ng-if=emptyLabel ng-bind=emptyLabel></option></select></div>"
  );

}]);
