angular.module('aif-radio-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/radio-input.html',
    "<div class=radio-wrapper><div class=radio ng-repeat=\"choice in choices\"><input class=radio-input type=radio ng-model=localModel.value ng-value=choice.value ng-disabled=disable id=\"{{ fieldId }}\" name=\"{{ fieldId }}\"><label class=control-label for=\"{{ fieldId }}\">{{ choice.display_name }}</label></div></div>"
  );

}]);
