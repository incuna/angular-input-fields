angular.module('aif-single-choice-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/single-choice-input/template.html',
    "<div class=single-choice-wrapper><div aif-radio-input model=model choices=choices disable=disable></div><div aif-select-input model=model empty-label=emptyLabel choices=choices disable=disable></div></div>"
  );

}]);
