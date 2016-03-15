angular.module('aif-switch-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/switch-input/template.html',
    "<div class=\"input-wrapper switch-wrapper\"><div class=switch><div ng-repeat=\"choice in choices\" class=option ng-model=data.model uib-btn-radio=choice.value>{{ choice.display_name }}</div></div></div>"
  );

}]);
