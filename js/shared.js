/* ══════════════════════════════════════════════════════════════
   FMCSA — Shared Components (Nav + Footer)
   Static site: inject shared HTML via JS
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Detect current page for active nav link ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isHomePage = (path === '' || path === 'index.html');

  function isActive(href) {
    const h = href.split('/').pop();
    if (h === 'index.html' && isHomePage) return true;
    return h === path;
  }

  const navLinks = [
    { href: 'index.html', ar: 'الرئيسية' },
    { href: 'about.html', ar: 'عن الكلية' },
    { href: 'academics.html', ar: 'الأقسام الأكاديمية' },
    { href: 'Members.html', ar: 'مجلس الطلاب' },
    { href: 'initiatives.html', ar: 'مبادراتنا' },
    { href: 'contact.html', ar: 'تواصل معنا' },
  ];

  /* ══════════════════════════════
     NAVIGATION
  ══════════════════════════════ */
  function buildNav() {
    const nav = document.createElement('nav');
    /* All pages: transparent nav over hero, becomes solid on scroll */
    nav.className = 'site-nav nav-transparent';
    nav.setAttribute('aria-label', 'التنقل الرئيسي');

    const desktopLinks = navLinks.map(l =>
      `<a class="nav-link${isActive(l.href) ? ' active' : ''}" href="${l.href}">${l.ar}</a>`
    ).join('');

    const mobileLinks = navLinks.map(l =>
      `<a class="nav-mobile-link${isActive(l.href) ? ' active' : ''}" href="${l.href}">${l.ar}</a>`
    ).join('');

    nav.innerHTML = `
      <div class="nav-inner">
        <a class="nav-brand" href="index.html">
          <img src="Assets/White H Logo.png" alt="FMCSA">
        </a>
        <div class="nav-links">
          ${desktopLinks}
        </div>
        <button class="nav-toggle" aria-label="فتح القائمة" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>`;

    document.body.prepend(nav);

    /* Mobile overlay + drawer */
    const overlay = document.createElement('div');
    overlay.className = 'nav-mobile-overlay';
    document.body.appendChild(overlay);

    const mobile = document.createElement('div');
    mobile.className = 'nav-mobile';
    mobile.innerHTML = `
      <div class="nav-mobile-header">
        <a class="nav-brand" href="index.html">
          <img src="Assets/White H Logo.png" alt="FMCSA" style="height:2rem">
        </a>
        <button class="nav-mobile-close" aria-label="إغلاق القائمة">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="nav-mobile-links">${mobileLinks}</div>`;
    document.body.appendChild(mobile);

    /* Toggle logic */
    const toggle = nav.querySelector('.nav-toggle');
    const close = mobile.querySelector('.nav-mobile-close');

    function openMobile() {
      overlay.style.display = 'block';
      mobile.style.display = 'block';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        overlay.classList.add('open');
        mobile.classList.add('open');
      }));
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMobile() {
      overlay.classList.remove('open');
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => {
        overlay.style.display = 'none';
        mobile.style.display = 'none';
      }, 350);
    }

    toggle.addEventListener('click', openMobile);
    close.addEventListener('click', closeMobile);
    overlay.addEventListener('click', closeMobile);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });

    /* Scroll behavior — transparent over hero, solid on scroll */
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 60) {
        nav.classList.add('nav-scrolled');
        nav.classList.remove('nav-transparent');
      } else {
        nav.classList.remove('nav-scrolled');
        nav.classList.add('nav-transparent');
      }
    }, { passive: true });

    /* No body padding — nav overlays the hero on all pages.
       Each page's hero section uses padding-top to clear the nav. */
  }

  /* ══════════════════════════════
     FOOTER
  ══════════════════════════════ */
  function buildFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="Assets/White H Logo.png" alt="FMCSA">
            <div class="footer-brand-name">
              كلية العلوم الرياضية والحاسوب
              <span>Faculty of Mathematical Sciences & Computer<br>University of Gezira</span>
            </div>
            <p class="footer-desc">رابطة طلاب كلية العلوم الرياضية والحاسوب بجامعة الجزيرة. نسعى لبناء مجتمع طلابي متميز يدعم التعلم والابتكار والتطوير الأكاديمي.</p>
            <div class="footer-social">
              <a class="footer-social-link" href="https://www.facebook.com/profile.php?id=61582223769511" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="footer-col-title">روابط سريعة</h3>
            <div class="footer-links">
              <a class="footer-link" href="index.html">الرئيسية</a>
              <a class="footer-link" href="about.html">عن الكلية</a>
              <a class="footer-link" href="academics.html">الأقسام الأكاديمية</a>
              <a class="footer-link" href="Members.html">مجلس الطلاب</a>
            </div>
          </div>

          <div>
            <h3 class="footer-col-title">الأقسام</h3>
            <div class="footer-links">
              <a class="footer-link" href="academics.html#math">الرياضيات وعلوم الحاسوب</a>
              <a class="footer-link" href="academics.html#stats">الإحصاء وعلوم الحاسوب</a>
              <a class="footer-link" href="academics.html#cs">علوم الحاسوب</a>
            </div>
          </div>

          <div>
            <h3 class="footer-col-title">المزيد</h3>
            <div class="footer-links">
              <a class="footer-link" href="contact.html">تواصل معنا</a>
              <a class="footer-link" href="initiatives.html">مبادراتنا</a>
              <a class="footer-link" href="Visual Identity.html">الهوية البصرية</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="footer-copy">© 2026 FMCSA — رابطة طلاب كلية العلوم الرياضية والحاسوب · جامعة الجزيرة</span>
          <div class="footer-university">
            <img src="Assets/UofG Logo.png" alt="University of Gezira">
            <span>University of Gezira</span>
          </div>
        </div>
      </div>`;

    document.body.appendChild(footer);
  }

  /* ══════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════ */
  function initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════
     INIT
  ══════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    initReveal();
  });
})();
