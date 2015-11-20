/**
 * Toolkit JavaScript
 */

'use strict';

// For Node Modules
// Because no path was specified, Module will be included from "node_modules"
//var $ = require('jquery');

// For Bower Components
// Because Bower does not force a module structure, you have use a more specific path.

// we're now requiring it from the node_modules directory
var $ = require('jquery/dist/jquery.min.js');

window.jQuery = $;

var foundation = require('foundation-sites/js/foundation.min.js');
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
});

$("body").on("click", ".toggler", function() {
  $(".toggled").toggle(); /*shows or hides #box*/
});

// Smooth State
// $(function(){
//   'use strict';
//   var $page = $('#main'),
//     options = {
//     debug: true,
//     prefetch: true,
//     cacheLength: 2,
//     onStart: {
//       duration: 250, // Duration of our animation
//       render: function ($container) {
//         // Add your CSS animation reversing class
//         $container.addClass('is-exiting');
//         // Restart your animation
//         smoothState.restartCSSAnimations();
//       }
//     },
//     onReady: {
//       duration: 0,
//       render: function ($container, $newContent) {
//         // Remove your CSS animation reversing class
//         $container.removeClass('is-exiting');
//         // Inject the new content
//         $container.html($newContent);
//       }
//     }
//   }
//   smoothState = $page.smoothState(options).data('smoothState');
// });
