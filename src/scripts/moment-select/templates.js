angular.module('aif-moment-select').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/moment-select/template.html',
    "<div class=duration-select-wrapper><table><tbody><tr><td><select class=select ng-model=hours ng-disabled=disable ng-options=\"hour as (hour|aifNumberPadding:hoursLen) for hour in hourChoices\"></select></td><td><select class=select ng-model=minutes ng-disabled=disable ng-options=\"minute as (minute|aifNumberPadding:minutesLen) for minute in minuteChoices\"></select></td></tr></tbody></table></div>"
  );

}]);
