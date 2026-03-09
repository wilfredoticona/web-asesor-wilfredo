/**
 * main.js — AsesorTesis Website
 *
 * Features:
 *  1. Navbar — transparent on hero, solid on scroll
 *  2. Mobile menu — hamburger toggle with animation
 *  3. Smooth close — close mobile menu on link click
 *  4. Scroll-reveal — fade-in elements as they enter the viewport
 */

(function () {
  'use strict';

  /* ── DOM References ─────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  /* ── 1. NAVBAR: Transparent → Solid on Scroll ───────────── */
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  // Run once on load (in case user refreshes mid-page)
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  /* ── 2. MOBILE MENU: Hamburger Toggle ───────────────────── */
  if (navToggle && navLinks) {

    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

  }


  /* ── 3. CLOSE MOBILE MENU ON LINK CLICK ─────────────────── */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Also close if user clicks outside the menu
  document.addEventListener('click', function (e) {
    if (
      navLinks &&
      navLinks.classList.contains('is-open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });


  /* ── 4. SCROLL-REVEAL (IntersectionObserver) ─────────────── */
  /*
   * CSS class `.reveal` starts elements as opacity:0 + translateY(28px).
   * This observer adds `.is-visible` once 15% of the element enters viewport,
   * triggering the CSS transition defined in style.css.
   */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing after reveal — no need to re-trigger
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,      // trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px'  // slightly before bottom edge
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback: make all elements visible immediately (old browsers)
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

})();
