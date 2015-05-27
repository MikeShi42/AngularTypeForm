//Gruntfile
module.exports = function(grunt) {

//Initializing the configuration object
    grunt.initConfig({

        //Get Package metadata
        pkg: grunt.file.readJSON('package.json'),

        // Paths variables
        paths: {
            // Development where put LESS files, etc
            assets: {
                css: './app/',
                js: './app/',
                vendor: './app/bower_components/'
            },
            // Production where Grunt output the files
            css: './app/css/',
            js: './app/js/'
        },

        // Task configuration
        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed
            },
            js_app: {
                src: [
                    //App JS
                    '<%= paths.assets.js %>app.js',
                    //Filter JS
                    '<%= paths.assets.js %>filter.js',
                    //Register JS
                    '<%= paths.assets.js %>register/**/*.js',
                ],
                dest: '<%= paths.js %>app.js'
            },
            js_vendor: {
                src: [
                    //jQuery
                    '<%= paths.assets.vendor %>jquery/dist/jquery.js',
                    //Bootstrap
                    '<%= paths.assets.vendor %>bootstrap-sass-official/assets/javascripts/bootstrap.js',
                    //Material && Ripples for MD
                    '<%= paths.assets.vendor %>bootstrap-material-design/dist/js/material.min.js',
                    '<%= paths.assets.vendor %>bootstrap-material-design/dist/js/ripples.min.js',
                    //AngularJS
                    '<%= paths.assets.vendor %>angular/angular.js',
                    //Angular UI Router
                    '<%= paths.assets.vendor %>angular-ui-router/release/angular-ui-router.min.js',
                    //Angular UI Bootstrap
                    '<%= paths.assets.vendor %>angular-bootstrap/ui-bootstrap.min.js',
                    '<%= paths.assets.vendor %>angular-bootstrap/ui-bootstrap-tpls.min.js',
                    //Angular Scroll
                    '<%= paths.assets.vendor %>angular-scroll/angular-scroll.js'
                ],
                dest: '<%= paths.js %>vendor.js'
            }
        },
        sass: {
            development: {
                options: {
                    style: 'expanded',
                    compass: false,
                },
                files: {
                    //Get all scss files in app
                    "<%= paths.css %>index.css":"<%= paths.assets.css %>app.scss",
                    //Only get vendor files in vendor.scss
                    "<%= paths.css %>vendor.css":"<%= paths.assets.vendor %>vendor.scss",
                }
            },
            production: {
                options: {
                    style: 'compressed',
                    compass: false,
                },
                files: {
                    //Get all scss files in app
                    "<%= paths.css %>index.min.css":"<%= paths.assets.css %>app.scss",
                    //Only get vendor files in vendor.scss
                    "<%= paths.css %>vendor.min.css":"<%= paths.assets.vendor %>vendor.scss",
                }
            }
        },
        uglify: {
            options: {
                mangle: false  // Use if you want the names of your functions and variables unchanged
            },
            app: {
                files: {
                    '<%= paths.js %>app.min.js': '<%= paths.js %>app.js',
                }
            },
            vendor: {
                files: {
                    '<%= paths.js %>vendor.min.js': '<%= paths.js %>vendor.js',
                }
            },
        },
        phpunit: {
            //...
        },
        watch: {
            js_app: {
                files: [
                    //watched files
                    '<%= paths.assets.js %>**/*.js'
                ],
                //tasks: ['concat:js_app','uglify:app'],     //tasks to run
                tasks: ['concat:js_app'],     //don't uglify during dev to save time
                options: {
                    livereload: true                        //reloads the browser
                }
            },
            js_vendor: {
                files: [
                    //Watch All Vendor JS Files
                    '<%= paths.assets.vendor %>**/*.js',
                ],
                //tasks: ['concat:js_vendor','uglify:vendor'],     //tasks to run
                tasks: ['concat:js_vendor'],     //don't uglify to save time during dev
                options: {
                    livereload: true                        //reloads the browser
                }
            },
            sass: {
                files: ['<%= paths.assets.css %>**/*.scss','<%= paths.assets.vendor %>**/*.scss'],  //watched files
                tasks: ['sass'],                          //tasks to run
                options: {
                    livereload: true                        //reloads the browser
                }
            },
        }
    });
    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phpunit');

    // Task definition
    grunt.registerTask('default', ['watch']);

};