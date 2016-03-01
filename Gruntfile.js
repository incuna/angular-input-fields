'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jscs');

    var concatConfig = {};
    var ngtemplatesConfig = {};
    var uglifyConfig = {};

    concatConfig.target = {
        src: [
            'src/scripts/directives.js'
        ],
        dest: 'dist/scripts.js'

    };

    ngtemplatesConfig.target = {
        cwd: 'src',
        src: 'templates/type/*.html',
        dest: 'dist/templates.js',
        options: {
            module: 'angular-input-fields'
        }
    };

    uglifyConfig.target = {
        files: [{
            expand: true,
            cwd: 'dist/',
            src: '*.js',
            dest: 'dist/'
        }]
    };

    grunt.initConfig({
        config: {
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            lib: 'bower_components',
            lintFiles: [
                'src/**/*.js',
                'tests/**/*.js'
            ]
        },
        watch: {
            templates: {
                files: 'src/templates/**',
                tasks: 'ngtemplates'
            },
            js: {
                files: 'src/scripts/*.js',
                tasks: 'dist-js'
            }
        },
        ngtemplates: _.extend({
            options: {
                htmlmin: '<%= config.htmlmin %>',
            }
        }, ngtemplatesConfig),
        concat: _.extend({}, concatConfig),
        uglify: _.extend({
            options: {
                compress: {
                    drop_console: true
                }
            }
        }, uglifyConfig),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= config.lintFiles %>'
            ]
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: '<%= config.lintFiles %>'
        },
        karma: {
            options: {
                basePath: '',
                files: [
                    '<%= config.lib %>/momentjs/moment.js',
                    '<%= config.lib %>/lodash/dist/lodash.js',
                    '<%= config.lib %>/angular/angular.js',
                    '<%= config.lib %>/angular-mocks/angular-mocks.js',
                    '<%= config.lib %>/angular-touch/angular-touch.js',
                    '<%= config.lib %>/venturocket-angular-slider/build/angular-slider.js',
                    '<%= config.lib %>/angular-bind-html-compile/angular-bind-html-compile.js',
                    '<%= config.lib %>/angular-gettext/dist/angular-gettext.js',
                    '<%= config.lib %>/angular-bootstrap/ui-bootstrap.min.js',
                    '<%= config.lib %>/angular-bootstrap/ui-bootstrap-tpls.min.js',

                    'src/**/*.js',
                    'dist/templates.js',
                    'tests/**/*.js'
                ],
                frameworks: ['jasmine'],
                plugins: [ 'karma-jasmine', 'karma-firefox-launcher' ],
                reporters: ['progress'],
                port: 9876,
                colors: true,
                browsers: ['Firefox' ]
            },
            dev: {
                autoWatch: true
            },
            ci: {
                singleRun: true,
                reporters: ['dots'],
                browsers: [ 'Firefox' ]
            }
        }
    });

    grunt.registerTask('test', [
        'jscs',
        'jshint',
        'karma:ci'
    ]);

    grunt.registerTask('dist-js', [
        'concat',
        'ngtemplates',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'dist-js',
        'test'
    ]);

};
