// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/product-list.html',
                controller: 'ProductListController'
            })
            .when('/admin-session', {
                templateUrl: '/views/admin.html'
            })
            .when('/product/:id', {
                templateUrl: '/views/product-details.html',
                controller: 'ProductDetailsController'
            })
            .when('/basket', {
                templateUrl: '/views/basket.html',
                controller: 'BasketController'
            });

        $locationProvider.html5Mode(true);
    }
]);