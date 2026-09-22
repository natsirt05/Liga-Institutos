/* Liga Matemática de Institutos — EHULER
   Vanilla JS: mobile nav, language chooser redirect, scroll reveal */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Tiny helper for the language chooser: remember the last choice
  document.querySelectorAll('[data-lang-link]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('ehuler-liga-lang', a.getAttribute('data-lang-link')); } catch (e) {}
    });
  });

  // Optionally auto-redirect from the chooser if a preference was stored
  var chooser = document.querySelector('[data-chooser]');
  if (chooser) {
    var stored = null;
    try { stored = localStorage.getItem('ehuler-liga-lang'); } catch (e) {}
    // Respect an explicit ?lang= query param, otherwise redirect returning visitors
    var params = new URLSearchParams(window.location.search);
    var forced = params.get('lang');
    var target = forced || stored;
    if (target) {
      var link = document.querySelector('[data-lang-link="' + target + '"]');
      if (link) { window.location.replace(link.getAttribute('href')); }
    }
  }

  // Scroll reveal: sections enter from left/right successively
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && !prefersReduced.matches) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-in'); });
    }
  }
})();