angular.module('aif-slider-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/slider-input.html',
    "<div class=\"input-wrapper slider-wrapper\"><div slider ng-class=className translate-fn=translateFn ng-model=model floor=0 step=1 no-bubble-adjustment=true pointer-width-override=28 ceiling=\"{{ ceiling }}\" ng-disabled=disable></div><div class=step-indicator-container><span class=\"step perc-0\" ng-bind=sliderLowLabel></span> <span ng-if=sliderMiddleLabel class=\"step perc-50\" ng-bind=sliderMiddleLabel></span> <span class=\"step perc-100\" ng-bind=sliderHighLabel></span></div></div>"
  );

}]);
