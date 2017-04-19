angular.module('aif-select-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/select-input.html',
    "<div class=select-wrapper><select class=select ng-model=model ng-disabled=disable id=\"{{ fieldId }}\" name=\"{{ fieldId }}\" ng-focus=\"form.fieldId.hasFocus = true\" ng-blur=\"form.fieldId.hasFocus = false\" ng-options=\"choice.value as choice.display_name for choice in choices\"><option value=\"\" ng-if=emptyLabel ng-bind=emptyLabel></option></select></div>"
  );

}]);
