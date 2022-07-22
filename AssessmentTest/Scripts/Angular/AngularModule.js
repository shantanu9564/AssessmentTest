var app = angular.module('MyApp', ['ngRoute', 'angularUtils.directives.dirPagination']);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});


