// (function($) {
//   "use strict"; // Start of use strict

//   // Smooth scrolling using jQuery easing
//   $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//       if (target.length) {
//           // Use native scrollIntoView for full-page sections/headers so CSS scroll-snap applies
//           try {
//             if (target.is('section, header')) {
//               target[0].scrollIntoView({ behavior: 'smooth' });
//               return false;
//             }
//           } catch (e) {
//             // if anything goes wrong, fall back to jQuery animate
//           }
//         $('html, body').animate({
//           scrollTop: (target.offset().top )
//         }, 1000, "easeInOutExpo"); 
//         return false;
//       }
//     }
//   });

//   // Closes responsive menu when a scroll trigger link is clicked
//   $('.js-scroll-trigger').click(function() {
//     $('.navbar-collapse').collapse('hide');
//   });

//   // Activate scrollspy to add active class to navbar items on scroll
//   $('body').scrollspy({
//     target: '#mainNav',
//     offset: 100
//   });

// })(jQuery); // End of use strict