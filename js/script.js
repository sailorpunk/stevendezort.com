(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  // var navbarCollapse = function() {
  //   if ($("#mainNav").offset().top > 100) {
  //     $("#mainNav").addClass("navbar-shrink");
  //   } else {
  //     $("#mainNav").removeClass("navbar-shrink");
  //   }
  // };
  // // Collapse now if page is not at top
  // navbarCollapse();
  // // Collapse the navbar when page is scrolled
  // $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

/* Auto full-page scroll snapping: wheel, touch and keyboard handlers */
(function() {
  const selectors = 'header, section';
  const sections = Array.from(document.querySelectorAll(selectors));
  if (!sections.length) return;
  // stop snap behavior at/after the contact section
  const contactIndex = sections.findIndex(s => s.id === 'contact');

  let isThrottled = false;
  let touchStartY = 0;

  function getCurrentIndex() {
    let index = 0;
    let minDist = Infinity;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      const dist = Math.abs(rect.top);
      if (dist < minDist) { minDist = dist; index = i; }
    });
    return index;
  }

  function scrollToIndex(i) {
    if (i < 0 || i >= sections.length) return;
    // don't allow snapping past the contact section
    if (contactIndex >= 0 && i > contactIndex) i = contactIndex;
    isThrottled = true;
    sections[i].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isThrottled = false; }, 900);
  }

  window.addEventListener('wheel', function(e) {
    if (isThrottled) return;
    const tag = e.target.tagName.toLowerCase();
    if (['input','textarea','select','button'].includes(tag)) return;
    const idx = getCurrentIndex();
    // if we're at or past the contact section, don't intercept scrolling
    if (contactIndex >= 0 && idx >= contactIndex) return;
    // Prevent native scrolling to avoid competing motions when we will snap
    e.preventDefault();
    if (e.deltaY > 0) scrollToIndex(idx + 1);
    else if (e.deltaY < 0) scrollToIndex(idx - 1);
  }, { passive: false });

  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    if (isThrottled) return;
    const touchEndY = (e.changedTouches && e.changedTouches[0].clientY) || 0;
    const delta = touchStartY - touchEndY;
    if (Math.abs(delta) < 50) return;
    const idx = getCurrentIndex();
    // if we're at or past the contact section, don't intercept touch
    if (contactIndex >= 0 && idx >= contactIndex) return;
    // Prevent default momentum scrolling when we will snap
    e.preventDefault();
    if (delta > 0) scrollToIndex(idx + 1);
    else scrollToIndex(idx - 1);
  }, { passive: false });

  window.addEventListener('keydown', e => {
    if (isThrottled) return;
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    const idx = getCurrentIndex();
    // if we're at/after contact, don't intercept keyboard navigation
    if (contactIndex >= 0 && idx >= contactIndex) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToIndex(idx + 1);
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToIndex(idx - 1);
    }
  });

})();
