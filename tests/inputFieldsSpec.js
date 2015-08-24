/* global angular, describe, beforeEach, module, inject, it, expect */

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
        beforeEach(module('incuna-input-fields'));

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

                template = '<div single-choice-input choices="choices"></div>';

                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input').length).toBe(1);
                expect($(compiledTemplate, 'select').length).toBe(1);
            });
        });

        describe('number input', function () {
            it('should compile and have a number input element', function () {
                template = '<div number-input></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="number"]').length).toBe(1);

            });
        });

        describe('text input', function () {
            it('should compile and have a text input element', function () {
                template = '<div text-input></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="text"]').length).toBe(1);
            });
        });

        describe('slider input', function () {
            it('should have a slider', function () {
                template = '<div slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="range"]').length).toBe(1);
            });

            it('should have default labels for lowest and highest values', function () {
                template = '<div slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, '.step.perc-0').html()).toContain('none');
                expect($(compiledTemplate, '.step.perc-100').html()).toContain('very severe');

            });

            it('should have a default value of ceiling', function () {
                template = '<div slider-input model="any"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, '[slider]').attr('ceiling')).toBe('10');
            });

            it('should have a default I=O translate-fn', function () {
                template = '<div slider-input model="any"></div>';
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

                template = '<div slider-input model="any" translate-fn="translateFunction"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();
                var translateFn = compiledTemplate.isolateScope().translateFn;

                expect(translateFn).toBeDefined();
                expect(translateFn(10)).toBe(20);
                expect(translateFn(2)).toBe(4);

            });

            it('should accept a className attribute and attach it as a class', function () {
                template = '<div slider-input model="any" class-name="someClass"></div>';
                compiledTemplate = compile(template);
                $rootScope.$digest();
                expect($(compiledTemplate, '.slider-wrapper > div').attr('class')).toContain('someClass');

            });

            it('should have changable labels for lowest and highest values', function () {
                template = '<div slider-input model="any" slider-low-label="No problem" slider-high-label="Worst problem"></div>';
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

                template = '<div boolean-input model="model"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input').length).toBe(2);
                expect($(compiledTemplate, 'option').length).toBe(3);

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

                template = '<div><div switch-input choices="switchValues"></div></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'div.switch-wrapper').length).toBe(1);
                expect($(compiledTemplate, '[btn-radio]').length).toBe(2);

                expect($(compiledTemplate, '[btn-radio]:first-child').html()).toBe('Switch 1');
                expect($(compiledTemplate, '[btn-radio]:nth-child(2)').html()).toBe('Switch 2');

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

                template = '<div><div switch-input model="any" choices="switchValues"></div></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'div.switch-wrapper').length).toBe(1);
                expect($(compiledTemplate, '[btn-radio]').length).toBe(2);

                expect($(compiledTemplate, '[btn-radio]:first-child').html()).toBe('Switch 1');
                expect($(compiledTemplate, '[btn-radio]:nth-child(2)').html()).toBe('Switch 2');

            });
        });

        describe('checkbox input', function () {
            it('should compile and have a checkbox input element and a label', function () {
                $scope.label = 'A label';

                template = '<div checkbox-input label="label"></div>';
                compiledTemplate = compile(template);

                $rootScope.$digest();

                expect($(compiledTemplate, 'input[type="checkbox"]').length).toBe(1);
                expect($(compiledTemplate, 'label span').html()).toContain('A label');

            });
        });
    });
}());
