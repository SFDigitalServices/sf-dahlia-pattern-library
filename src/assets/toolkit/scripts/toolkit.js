/**
 * Toolkit JavaScript
 */

'use strict';

// For Node Modules
// Because no path was specified, Module will be included from "node_modules"
//var $ = require('jquery');

// For Bower Components
// Because Bower does not force a module structure, you have use a more specific path.

// we're now requiring it from the vendor directory
var $ = require('../../vendor/jquery/dist/jquery.min.js');
window.jQuery = $;

// Loading modernizr via a custom node build that is dropped into the local toolkit/script directory.
var Modernizr = require('./modernizr.js');

// Loading foundation from bower in order to support modernizr module
var foundation = require('../../vendor/foundation/js/foundation/foundation.js');
var foundationAccordion = require('../../vendor/foundation/js/foundation/foundation.accordion.js');
var foundationReveal = require('../../vendor/foundation/js/foundation/foundation.reveal.js');
var foundationAbide = require('../../vendor/foundation/js/foundation/foundation.abide.js');
var foundationTooltip = require('../../vendor/foundation/js/foundation/foundation.tooltip.js');
var foundationEqualizer = require('../../vendor/foundation/js/foundation/foundation.equalizer.js');
var foundationTopbar = require('../../vendor/foundation/js/foundation/foundation.topbar.js');
var Dropdown = require('../../vendor/foundation/js/foundation/foundation.dropdown.js');


//require('smoothstate/jquery.smoothState.min.js');
// var smoothState = require('./jquery.smoothState.min.js');

window.foundation = foundation;
// console.log($);
// $('h1').fadeOut(2000);

// Use for custom Pattern Libary Modules
// var fooModule = require('./foo-module');
// var bar = fooModule.foo();

// Finally, you can drop test JavaScript here...
$(document).ready(function () {
  //console.log('Script kiddies of the world unite.')
  $(document).foundation(
    {
      equalizer : {
        // Specify if Equalizer should make elements equal height once they become stacked.
        equalize_on_stack: true
      }
  });

  $("body").on("click", ".toggler", function() {
    $(".toggled").toggle(); /*shows or hides #box*/
  });

  $('body').addClass('js');
    var $menu = $('.toggle-nav'),
    $menulink = $('.toggle-nav-link');

    $menulink.click(function() {
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });
});


//
//
//  Angular Support
//
//

// Angular (Loaded from node_modules)
require('angular/angular.js');
require('angular-animate/angular-animate.js');

// Angular Foundation Directives (Loaded from bower)
require('../../vendor/angular-foundation/mm-foundation-tpls.min.js');
require('../../vendor/hammerjs/hammer.min.js'); // for touch interaction w/ angular-carousel
require('../../vendor/lifely-angular-carousel/angular-carousel.js');
//require('angular-pageslide-directive');

angular.module('dahlia', ['mm.foundation', 'angular-carousel', 'ngAnimate'])
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
  })
  .controller('SharedController', function($scope) {
    $scope.focusOnMainContent = function() {
      var main;
      main = angular.element(document.getElementById('main-content'));
      if (!main) {
        return;
      }
      return $scope.focusOnElement(main);
    };
    $scope.focusOnElement = function(el) {
      el.attr('tabindex', -1);
      el.on('blur focusout', function() {
        return angular.element(this).removeAttr('tabindex');
      });
      el[0].focus();
      return el[0].blur();
    };
    $scope.focusOnBody = function() {
      var body;
      body = angular.element(document.body);
      return $scope.focusOnElement(body);
    };
  })
  .controller('AccordionSampleController', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: "Dynamic Group Header - 1",
        content: "Dynamic Group Body - 1"
      },
      {
        title: "Dynamic Group Header - 2",
        content: "Dynamic Group Body - 2"
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };
  })
  // .controller('TabsSampleController', function($scope) {
  //   $scope.tabs = [
  //     { title:"Dynamic Title 1", content:"Dynamic content 1" },
  //     { title:"Dynamic Title 2", content:"Dynamic content 2" }
  //   ];

  //   $scope.alertMe = function() {
  //     setTimeout(function() {
  //       alert("You've selected the alert tab!");
  //     });
  //   };
  // })
  .controller('ModalInstanceController', function ($scope, $modalInstance) {
    $scope.closeModal = function () {
      $modalInstance.close();
    };
  })
  .controller('ModalController', function ($scope, $modal) {
    $scope.openModal = function (templateUrl, windowClass) {
      console.log("at open modal");
      var modalInstance = $modal.open({
        templateUrl: templateUrl,
        controller: 'ModalInstanceController',
        windowClass: windowClass
      });
    };
  })
  .controller('CarouselSampleController', ['$scope', 'Carousel', function($scope, Carousel) {
    $scope.images = [
      '/assets/toolkit/images/property4-16x9.jpg',
      '/assets/toolkit/images/property4-16x9.jpg',
      '/assets/toolkit/images/property4-16x9.jpg',
    ]

    $scope.Carousel = Carousel;

  }])
  .controller('AnimateController', ['$scope', function($scope) {
    $scope.hidden = {};
    $scope.isHidden = function(id) {
      return !! $scope.hidden[id]
    }
    $scope.delete = function(id) {
      $scope.hidden[id] = true
    }
    $scope.hasApplications = function() {
      return Object.keys($scope.hidden).length < 3
    }
  }])
  .directive('reflowAfterLoad', ['$window', function($window) {
    return {
      link: function(scope, element, attrs) {
        element.adjustCarouselHeight = function() {
          element.parent().parent().parent().css('height', element.height())
        }
        element.bind('load', element.adjustCarouselHeight);
        angular.element($window).bind('resize', element.adjustCarouselHeight);

      }
    }
  }])
