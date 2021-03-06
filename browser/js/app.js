'use strict';

var app = angular.module("StoreApp", ['ui.bootstrap', 'ui.router', 'fsaPreBuilt', 'ngKookies']);


app.controller('MainCtrl', function($scope, ProductFactory, AuthService, Session, $kookies, OrderFactory, $state) {


  // Given to the <navbar> directive to show the menu.
  $scope.menuItems = [{
    label: 'Home',
    state: 'home'
      // glyphicon: 'glyphicon glyphicon-home'
  }, {
    label: 'About',
    state: 'about'
      // glyphicon: 'glyphicon glyphicon-info-sign'
  }, {
    label: 'Products',
    state: 'products.all'
      // glyphicon: 'glyphicon glyphicon-gift'
  }, {
    label: '',
    state: 'cart',
    glyphicon: 'glyphicon glyphicon-shopping-cart'
  }];


  $scope.dashboard = {
    states: [{
      label: 'Site',
      state: 'admin.site'
    }, {
      label: 'Products',
      state: 'admin.products'
    }, {
      label: 'Orders',
      state: 'admin.orders'
    }, {
      label: 'Users',
      state: 'admin.users'
    }]
  }


  $scope.sessionId = Session.id;
  console.log($scope.sessionId);

  ProductFactory.getProducts().then(function (products) {
    $scope.products = products.map(function(product) {
      product.stars = _.range(Math.floor(Math.random() * 5 + 1));
      return product;
    }); 
  });

  console.log("here are all cookies", $kookies.get());

  $scope.addToCart = function(item) {
    console.log("is it there", item);
    OrderFactory.addToCart(item);
  };

  $scope.removeFromCart = function(item) {
    OrderFactory.removeFromCart(item);
  };

  $scope.updateCart = function(cartItems) {
    OrderFactory.updateCart(cartItems);
  }
});


app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

app.config(['$kookiesProvider',
  function($kookiesProvider) {
    $kookiesProvider.config.json = true;
  }
]);
