angular.module('aif-grouped-select-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/grouped-select-input.html',
    "<div class=grouped-select-wrapper><div class=primary aif-select-input model=group choices=groups disable=disable empty-label=emptyLabel></div><div class=secondary aif-select-input model=model choices=group.choices disable=\"disable || !group.choices.length\"></div></div>"
  );

}]);
