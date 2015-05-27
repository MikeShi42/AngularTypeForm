'use strict';

var sdHacksApp = angular.module('sdHacksApp', ['ui.router', 'duScroll', 'ui.bootstrap']);

sdHacksApp.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active="active }"> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);

//Angular UI Router Config
sdHacksApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){
    //TODO: Remove Debugging
    $logProvider.debugEnabled(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('register', {
            url: '/',
            title: 'Register for SD Hacks!',
            views: {
                'header':{
                    //templateUrl: 'app/global/index/index_header.php'
                },
                'content':{
                    templateUrl: 'register/register.html',
                    controller: 'registerController'
                },
                'footer':{
                    //templateUrl: 'app/global/index/index_footer.php',
                    //controller: 'indexController'
                }
            }
        });

    $locationProvider.html5Mode(true);
});
