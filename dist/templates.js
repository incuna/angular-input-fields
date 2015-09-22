angular.module('angular-input-fields').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/type/boolean-input.html',
    "<div><div class=radio><label class=control-label><input type=radio ng-model=boolValue value=true ng-disabled=disable> <span translate>Yes</span></label><label class=control-label><input type=radio ng-model=boolValue value=false ng-disabled=disable> <span translate>No</span></label></div><select class=select ng-model=boolValue ng-disabled=disable><option value=true translate>Yes</option><option value=false translate>No</option></select></div>"
  );


  $templateCache.put('templates/type/checkbox-input.html',
    "<div class=checkbox><label class=\"control-label input-wrapper\"><input type=checkbox ng-model=model ng-disabled=disable> <span bind-html-compile=label></span></label></div>"
  );


  $templateCache.put('templates/type/grouped-select-input.html',
    "<div class=grouped-select-wrapper><div select-input model=group choices=groups disable=disable empty-label=emptyLabel></div><div select-input model=model choices=group.choices disable=\"disable || !group.choices.length\"></div></div>"
  );


  $templateCache.put('templates/type/moment-select.html',
    "<div class=duration-select-wrapper><table><tbody><tr><td><select class=select ng-model=hours ng-disabled=disable ng-options=\"hour as hour +  ' hr'|translate for hour in hourChoices\"></select></td><td><select class=select ng-model=minutes ng-disabled=disable ng-options=\"minute as minute +  ' min'|translate for minute in minuteChoices\"></select></td></tr></tbody></table></div>"
  );


  $templateCache.put('templates/type/number-input.html',
    "<div><label class=\"control-label input-wrapper\"><input type=number ng-model=model ng-disabled=disable></label></div>"
  );


  $templateCache.put('templates/type/radio-input.html',
    "<div class=radio-wrapper><div class=radio ng-repeat=\"choice in choices\"><label class=control-label><input type=radio ng-model=localModel.value ng-value=choice.value ng-disabled=disable> {{ choice.display_name }}</label></div></div>"
  );


  $templateCache.put('templates/type/select-input.html',
    "<div class=select-wrapper><select class=select ng-model=model ng-disabled=disable ng-options=\"choice.value as choice.display_name for choice in choices\"><option value=\"\" ng-if=emptyLabel ng-bind=emptyLabel></option></select></div>"
  );


  $templateCache.put('templates/type/single-choice-input.html',
    "<div class=single-choice-wrapper><div radio-input model=model choices=choices></div><div select-input model=model empty-label=emptyLabel choices=choices></div></div>"
  );


  $templateCache.put('templates/type/slider-input.html',
    "<div class=\"input-wrapper slider-wrapper\"><div slider ng-class=className translate-fn=translateFn ng-model=model floor=0 step=1 no-bubble-adjustment=true pointer-width-override=28 ceiling=\"{{ ceiling }}\" ng-disabled=disable></div><div class=step-indicator-container><span class=\"step perc-0\" ng-bind=sliderLowLabel></span> <span ng-if=sliderMiddleLabel class=\"step perc-50\" ng-bind=sliderMiddleLabel></span> <span class=\"step perc-100\" ng-bind=sliderHighLabel></span></div></div>"
  );


  $templateCache.put('templates/type/switch-input.html',
    "<div class=\"input-wrapper switch-wrapper\"><div class=switch><div ng-repeat=\"choice in choices\" class=option ng-model=data.model btn-radio=choice.value>{{ choice.display_name }}</div></div></div>"
  );


  $templateCache.put('templates/type/text-input.html',
    "<div><label class=\"control-label input-wrapper\"><input type=text ng-model=model ng-disabled=disable></label></div>"
  );

}]);
