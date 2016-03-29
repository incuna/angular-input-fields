/* global angular, describe, beforeEach, module, inject, it, expect, _, moment */

(function () {
    'use strict';

    var $ = function (haystack, query) {
        return angular.element(haystack[0].querySelectorAll(query));
    };

    var $compile;
    var $scope;
    var $rootScope;
    var template;
    var compiledTemplate;
    var $templateCache;

    var compile = function (template) {
        return $compile(template)($scope);
    };

    describe('Input types directives', function () {

        beforeEach(module('vr.directives.slider'));
        beforeEach(module('angular-bind-html-compile'));
        beforeEach(module('angular-input-fields'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $templateCache = _$templateCache_;

        }));

        describe('single-choice-input', function () {
            it('should compile and have a input element and a select element', function () {

                $scope.choices = [1];

                $scope.questionName = 'question';

                template = '<div aif-single-choice-input choices="choices"></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input').length).toBe(1);
                expect($(compiledTemplate, 'select').length).toBe(1);
            });
        });

        describe('number input', function () {
            it('should compile and have a number input element', function () {
                template = '<div aif-number-input></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="number"]').length).toBe(1);

            });
        });

        describe('text input', function () {
            it('should compile and have a text input element', function () {
                template = '<div aif-text-input></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="text"]').length).toBe(1);
            });
        });

        describe('slider input', function () {
            it('should have a slider', function () {
                template = '<div aif-slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="range"]').length).toBe(1);
            });

            it('should have default labels for lowest and highest values', function () {
                template = '<div aif-slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, '.step.perc-0').html()).toContain('none');
                expect($(compiledTemplate, '.step.perc-100').html()).toContain('very severe');

            });

            it('should have a default value of ceiling', function () {
                template = '<div aif-slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, '[slider]').attr('ceiling')).toBe('10');
            });

            it('should have a default I=O translate-fn', function () {
                template = '<div aif-slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();
                var translateFn = compiledTemplate.isolateScope().translateFn;

                expect(translateFn).toBeDefined();
                expect(translateFn(10)).toBe(10);
                expect(translateFn(2)).toBe(2);

            });

            it('should accept a translate-fn attribute and change the default translate-fn', function () {
                $scope.translateFunction = function (input) {
                    return input * 2;
                };

                template = '<div aif-slider-input model="any" translate-fn="translateFunction"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();
                var translateFn = compiledTemplate.isolateScope().translateFn;

                expect(translateFn).toBeDefined();
                expect(translateFn(10)).toBe(20);
                expect(translateFn(2)).toBe(4);

            });

            it('should accept a className attribute and attach it as a class', function () {
                template = '<div aif-slider-input model="any" class-name="someClass"></div>';
                compiledTemplate = compile(template);
                $rootScope.$digest();
                expect($(compiledTemplate, '.slider-wrapper > div').attr('class')).toContain('someClass');

            });

            it('should have changable labels for lowest and highest values', function () {
                template = '<div aif-slider-input model="any" slider-low-label="No problem" slider-high-label="Worst problem"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, '.step.perc-0').html()).toContain('No problem');
                expect($(compiledTemplate, '.step.perc-100').html()).toContain('Worst problem');
            });

        });

        describe('boolean input', function () {
            it('should compile and have a input element and a select element', function () {
                $scope.model = {
                    question: true
                };

                template = '<div aif-boolean-input model="model"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input').length).toBe(2);
                expect($(compiledTemplate, 'option').length).toBe(3);

            });
        });

        describe('radio input', function () {
            it('should have value set from parent model', function () {
                template = '<div aif-radio-input model="model"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                // Set model after compiling
                $scope.model = 2;

                $rootScope.$digest();
                expect(compiledTemplate.isolateScope().localModel.value).toBe(2);
            });

            it('should set the value on the parent model', function () {
                $scope.model = '';

                template = '<div aif-radio-input model="model"></div>';
                compiledTemplate = compile(template);
                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();

                // Set model after compiling
                isolated.localModel.value = 'test';

                $rootScope.$digest();
                expect($scope.model).toBe('test');
            });
        });

        describe('switch input', function () {

            it('should generate a div.switch-wrapper with two btn-radio directives with correct values', function () {
                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                $scope.switchValues = [
                    {
                        value: 'switch1',
                        display_name: 'Switch 1'
                    },
                    {
                        value: 'switch2',
                        display_name: 'Switch 2'
                    }
                ];
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                template = '<div><div aif-switch-input choices="switchValues"></div></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'div.switch-wrapper').length).toBe(1);
                expect($(compiledTemplate, '[uib-btn-radio]').length).toBe(2);

                expect($(compiledTemplate, '[uib-btn-radio]:first-child').html()).toBe('Switch 1');
                expect($(compiledTemplate, '[uib-btn-radio]:nth-child(2)').html()).toBe('Switch 2');

            });

            it('should generate a div.switch-wrapper with two btn-radio directives with correct values when in a group', function () {
                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                $scope.switchValues = [
                    {
                        value: 'switch1',
                        display_name: 'Switch 1'
                    },
                    {
                        value: 'switch2',
                        display_name: 'Switch 2'
                    }
                ];
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                template = '<div><div aif-switch-input model="any" choices="switchValues"></div></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'div.switch-wrapper').length).toBe(1);
                expect($(compiledTemplate, '[uib-btn-radio]').length).toBe(2);

                expect($(compiledTemplate, '[uib-btn-radio]:first-child').html()).toBe('Switch 1');
                expect($(compiledTemplate, '[uib-btn-radio]:nth-child(2)').html()).toBe('Switch 2');

            });
        });

        describe('checkbox input', function () {
            it('should compile and have a checkbox input element and a label', function () {
                $scope.label = 'A label';

                template = '<div aif-checkbox-input label="label"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="checkbox"]').length).toBe(1);
                expect($(compiledTemplate, 'label span').html()).toContain('A label');

            });
        });

        describe('moment-select ', function () {
            it('should compile and have 2 select elements', function () {

                template = '<div aif-moment-select model="moment" ></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'select').length).toBe(2);
            });

            it('should be disabled if `disable` is set', function () {

                template = '<div aif-moment-select model="moment" disable="true" ></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'select[disabled]').length).toBe(2);
            });

            it('should set hour and minute based on the model of duration type', function () {

                $scope.duration = moment.duration({
                    hours: 2,
                    minutes: 5
                });
                template = '<div aif-moment-select model="duration" use-duration="true"></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();
                expect(isolated.hours).toBe(2);
                expect(isolated.minutes).toBe(5);
            });

            it('should set hour and minute based on the model of duration string', function () {

                $scope.duration = '01:30:00';
                template = '<div aif-moment-select model="duration" use-duration="true"></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();
                expect(isolated.hours).toBe(1);
                expect(isolated.minutes).toBe(30);
                expect($scope.duration.toString()).toBe('PT1H30M');
            });

            it('should set hour and minute based on the model of date string', function () {

                $scope.date = '2013-02-08 09:30:26';
                template = '<div aif-moment-select model="date" ></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();
                expect(isolated.hours).toBe(9);
                expect(isolated.minutes).toBe(30);
            });

            it('should set hour and minute based on the model of date type', function () {

                $scope.date = moment('2013-02-08 09:30:26');
                template = '<div aif-moment-select model="date" ></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();
                expect(isolated.hours).toBe(9);
                expect(isolated.minutes).toBe(30);
            });

            it('should return a duration object with hours and minutes', function () {
                $scope.duration = {};
                template = '<div aif-moment-select model="duration" use-duration="true"></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();
                isolated.hours = 9;
                isolated.minutes = 30;

                $rootScope.$digest();

                expect($scope.duration.toString()).toBe('PT9H30M');
            });

            it('should return a moment object with hours and minutes', function () {
                $scope.date = {};
                template = '<div aif-moment-select model="date"></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                var isolated = compiledTemplate.isolateScope();
                isolated.hours = 9;
                isolated.minutes = 30;

                $rootScope.$digest();

                expect($scope.date.toString()).toContain('09:30:00');
            });

            describe('should have minute choices ', function () {
                it('that default to 0 .. 59', function () {

                    template = '<div aif-moment-select model="moment" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.minuteChoices.length).toBe(60);
                    expect(isolated.minuteChoices).toEqual(_.range(0, 60));

                });

                it('that depended on minute-step', function () {

                    template = '<div aif-moment-select model="moment" minute-step="10" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.minuteChoices.length).toBe(6);
                    expect(isolated.minuteChoices).toEqual(_.range(0, 60, 10));
                });

                it('that depended on minute-min', function () {

                    template = '<div aif-moment-select model="moment" minute-min="10" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.minuteChoices.length).toBe(50);
                    expect(isolated.minuteChoices).toEqual(_.range(10, 60));
                });

                it('that depended on minute-max', function () {

                    template = '<div aif-moment-select model="moment" minute-max="10" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.minuteChoices.length).toBe(10);
                    expect(isolated.minuteChoices).toEqual(_.range(0, 10));
                });

                it('that are not trailed with 0s by default', function () {
                    template = '<div aif-moment-select model="moment" hour-max="12"></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    expect($(compiledTemplate, 'select[ng-model="minutes"] option:nth-child(1)').attr('label')).toBe('0');
                    expect($(compiledTemplate, 'select[ng-model="minutes"] option:nth-child(11)').attr('label')).toBe('10');
                });

                it('that can be trailed with 0s with pad-minutes attribute', function () {
                    template = '<div aif-moment-select model="moment" hour-max="12" minutes-len="2"></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    expect($(compiledTemplate, 'select[ng-model="minutes"] option:nth-child(1)').attr('label')).toBe('00');
                    expect($(compiledTemplate, 'select[ng-model="minutes"] option:nth-child(11)').attr('label')).toBe('10');
                });
            });

            it('should watch the model and set hour and minute accordingly', function () {
                 $scope.duration = '01:30:00';
                 template = '<div aif-moment-select model="duration" use-duration="true"></div>';

                 compiledTemplate = compile(template);

                 $rootScope.$digest();

                 var isolated = compiledTemplate.isolateScope();

                 $scope.duration = '00:00:00';

                 $rootScope.$digest();
                 expect(isolated.hours).toBe(0);
                 expect(isolated.minutes).toBe(0);
             });

            describe('should have hour choices ', function () {
                it('that default to 0 .. 24', function () {

                    template = '<div aif-moment-select model="moment" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.hourChoices.length).toBe(24);
                    expect(isolated.hourChoices).toEqual(_.range(0, 24));
                });

                it('that depended on hour-step', function () {

                    template = '<div aif-moment-select model="moment" hour-step="2" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.hourChoices.length).toBe(12);
                    expect(isolated.hourChoices).toEqual(_.range(0, 24, 2));
                });

                it('that depended on hour-min', function () {

                    template = '<div aif-moment-select model="moment" hour-min="10" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.hourChoices.length).toBe(14);
                    expect(isolated.hourChoices).toEqual(_.range(10, 24));
                });

                it('that depended on hour-max', function () {

                    template = '<div aif-moment-select model="moment" hour-max="10" ></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    var isolated = compiledTemplate.isolateScope();

                    expect(isolated.hourChoices.length).toBe(10);
                    expect(isolated.hourChoices).toEqual(_.range(0, 10));
                });

                it('that can be trailed with 0s with pad-hours attribute', function () {
                    template = '<div aif-moment-select model="moment" hour-max="12" hours-len="2"></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    expect($(compiledTemplate, 'select[ng-model="hours"] option:nth-child(1)').attr('label')).toBe('00');
                    expect($(compiledTemplate, 'select[ng-model="hours"] option:nth-child(11)').attr('label')).toBe('10');
                });

                it('that are not trailed with 0s by default', function () {
                    template = '<div aif-moment-select model="moment" hour-max="12"></div>';

                    compiledTemplate = compile(template);

                    $rootScope.$digest();

                    expect($(compiledTemplate, 'select[ng-model="hours"] option:nth-child(1)').attr('label')).toBe('0');
                    expect($(compiledTemplate, 'select[ng-model="hours"] option:nth-child(11)').attr('label')).toBe('10');
                });
            });

        });

        describe('Number padding filter', function () {
            var numberPaddingFilter;

            beforeEach(function () {
                inject(function (_aifNumberPaddingFilter_) {
                    numberPaddingFilter = _aifNumberPaddingFilter_;
                });
            });

            it('should add leading 0s to single digits', function () {
                expect(numberPaddingFilter(0, '2')).toBe('00');
                expect(numberPaddingFilter(0, 2)).toBe('00');
            });

            it('should not add leading 0s to double digits', function () {
                expect(numberPaddingFilter(11, '2')).toBe('11');
                expect(numberPaddingFilter(11, 2)).toBe('11');
            });

            it('should not add leading 0s if second argument is 0 or 1', function () {
                expect(numberPaddingFilter(0, '0')).toBe('0');
                expect(numberPaddingFilter(0, '1')).toBe('0');
                expect(numberPaddingFilter(0, 0)).toBe('0');
            });

            it('should not trim the double digit number if second argument is 0 or 1', function () {
                expect(numberPaddingFilter(10, '0')).toBe('10');
                expect(numberPaddingFilter(10, '1')).toBe('10');
                expect(numberPaddingFilter(10, 0)).toBe('10');
            });

        });

    });
}());
