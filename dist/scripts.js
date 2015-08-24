!function(a,b){"use strict";var c=a.module("incuna-input-fields",["gettext"]);c.directive("singleChoiceInput",[function(){return{restrict:"A",replace:!0,scope:{model:"=",choices:"=",disable:"=?",emptyLabel:"=?"},templateUrl:"templates/type/single-choice-input.html"}}]),c.directive("selectInput",[function(){return{restrict:"A",scope:{model:"=",choices:"=",disable:"=?",emptyLabel:"=?"},templateUrl:"templates/type/select-input.html"}}]),c.directive("groupedSelectInput",["gettextCatalog",function(c){return{restrict:"A",replace:!0,scope:{model:"=",groupedChoices:"=",disable:"=?",emptyLabel:"=?"},templateUrl:"templates/type/grouped-select-input.html",link:function(d,e,f){var g=function(c,d){return a.isDefined(c)?b.findWhere(c.choices,{value:d}):void 0};d.$watch("groupedChoices",function(b){if(d.groups=[],d.group={choices:[]},a.isDefined(b)){var e=[];a.forEach(b,function(b){a.isDefined(b.choices)?(d.emptyLabel&&a.isUndefined(g(b,""))&&b.choices.unshift({display_name:d.emptyLabel,value:""}),b.value=b,d.groups.push(b)):e.push(b)}),e.length&&d.groups.push({display_name:c.getString("Other"),choices:e})}}),d.$watch("model",function(b){a.isDefined(b)&&null!==b&&a.forEach(d.groupedChoices,function(c){a.isDefined(g(c,b))&&(d.group=c)})}),d.$watch("group",function(b){null!==b&&a.isDefined(g(b,d.model))||(d.model=null)})}}}]),c.directive("radioInput",[function(){return{restrict:"A",scope:{model:"=",choices:"=",disable:"=?"},templateUrl:"templates/type/radio-input.html",link:function(a){a.localModel={value:a.model},a.$watch("localModel.value",function(b){a.model=b})}}}]),c.directive("checkboxInput",[function(){return{restrict:"A",replace:!0,scope:{model:"=",label:"=",disable:"=?"},templateUrl:"templates/type/checkbox-input.html"}}]),c.directive("booleanInput",[function(){return{restrict:"A",replace:!0,templateUrl:"templates/type/boolean-input.html",scope:{model:"=",disable:"=?"},link:function(a,b,c){a.$watch("boolValue",function(){var b=!1;"true"===a.boolValue&&(b=!0),a.model=b})}}}]),c.directive("textInput",[function(){return{restrict:"A",replace:!0,scope:{model:"=",disable:"=?"},templateUrl:"templates/type/text-input.html"}}]),c.directive("numberInput",[function(){return{restrict:"A",replace:!0,scope:{model:"=",disable:"=?"},templateUrl:"templates/type/number-input.html"}}]),c.directive("sliderInput",["gettextCatalog",function(b){return{restrict:"A",replace:!0,templateUrl:"templates/type/slider-input.html",scope:{model:"=",disable:"=?",ceiling:"=?",translateFn:"=?",className:"@"},link:function(c,d,e){a.isUndefined(c.translateFn)&&(c.translateFn=function(a){return a}),a.isUndefined(c.className)&&(c.className=null),a.isUndefined(c.ceiling)&&(c.ceiling=10),c.sliderLowLabel=e.sliderLowLabel||b.getString("none"),c.sliderMiddleLabel=e.sliderMiddleLabel,c.sliderHighLabel=e.sliderHighLabel||b.getString("very severe")}}}]),c.directive("switchInput",[function(){return{restrict:"A",replace:!0,scope:{model:"=",choices:"=",disable:"=?"},templateUrl:"templates/type/switch-input.html",link:function(b,c,d){b.data={model:b.model},b.$watch("model",function(c){a.isDefined(c)&&(b.data.model=c)}),b.$watch("data.model",function(c){a.isDefined(c)&&(b.model=c)})}}}])}(window.angular,window._);