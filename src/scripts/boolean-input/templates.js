angular.module('aif-boolean-input').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/aif/boolean-input/template.html',
    "<div><div class=radio><label class=control-label><input type=radio ng-model=boolValue value=true ng-disabled=disable> <span translate>Yes</span></label><label class=control-label><input type=radio ng-model=boolValue value=false ng-disabled=disable> <span translate>No</span></label></div><select class=select ng-model=boolValue ng-disabled=disable><option value=true translate>Yes</option><option value=false translate>No</option></select></div>"
  );

}]);
