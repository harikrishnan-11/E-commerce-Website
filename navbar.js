// =========================================================
// Stackly — navbar.js
// Mobile menu toggle, scroll-reveal animations,
// back-to-top button, and the deals countdown timer.
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && navLinks && navOverlay) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    // Close the drawer whenever a nav link is tapped
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on resize back to desktop width
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Scroll-reveal animations ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Back-to-top button ---------- */
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Deals-of-the-day countdown ---------- */
  var daysEl = document.getElementById('days');
  var hoursEl = document.getElementById('hours');
  var minsEl = document.getElementById('mins');
  var secsEl = document.getElementById('secs');

  if (daysEl && hoursEl && minsEl && secsEl) {
    // Count down from whatever is currently in the markup
    var totalSeconds =
      (parseInt(daysEl.textContent, 10) || 0) * 86400 +
      (parseInt(hoursEl.textContent, 10) || 0) * 3600 +
      (parseInt(minsEl.textContent, 10) || 0) * 60 +
      (parseInt(secsEl.textContent, 10) || 0);

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function renderCountdown() {
      if (totalSeconds <= 0) {
        daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
        return;
      }
      var d = Math.floor(totalSeconds / 86400);
      var h = Math.floor((totalSeconds % 86400) / 3600);
      var m = Math.floor((totalSeconds % 3600) / 60);
      var s = totalSeconds % 60;
      daysEl.textContent = pad(d);
      hoursEl.textContent = pad(h);
      minsEl.textContent = pad(m);
      secsEl.textContent = pad(s);
    }

    setInterval(function () {
      totalSeconds = Math.max(0, totalSeconds - 1);
      renderCountdown();
    }, 1000);
  }

});

const loginPage=document.getElementById('userIcon')
loginPage.addEventListener('click',()=>{
  window.location.href='login.html'
})

const searchBtn=document.querySelector('.fa-magnifying-glass')
searchBtn.addEventListener('click',()=>{
  window.location.href='404.html'
})