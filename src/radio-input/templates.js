angular.module('aif-radio-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/radio-input.html',
    "<div class=radio-wrapper><div class=radio ng-repeat=\"choice in choices\"><label class=control-label><input type=radio ng-model=localModel.value ng-value=choice.value ng-disabled=disable> {{ choice.display_name }}</label></div></div>"
  );

}]);
