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
    { href: 'Members.html', ar: 'مجلس الطلاب' },
    { href: 'initiatives.html', ar: 'مبادراتنا' },
    { href: 'Visual Identity.html', ar: 'الهوية البصرية' },
  ];

  /* ══════════════════════════════
     NAVIGATION
  ══════════════════════════════ */
  function buildNav() {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'التنقل الرئيسي');

    const desktopLinks = navLinks.map(l =>
      `<a class="nav-link${isActive(l.href) ? ' active' : ''}" href="${l.href}">${l.ar}</a>`
    ).join('');

    const mobileLinks = navLinks.map(l =>
      `<a class="nav-mobile-link${isActive(l.href) ? ' active' : ''}" href="${l.href}">${l.ar}</a>`
    ).join('');

    const logoSrc = isHomePage ? 'Assets/Blue H Logo.png' : 'Assets/White H Logo.png';

    nav.innerHTML = `
    <div class="nav-inner">
      <a class="nav-brand" href="index.html">
        <img src="${logoSrc}" alt="FMCSA">
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

    // On non-home pages: start transparent, go navy on scroll
    if (!isHomePage) nav.classList.add('nav-over-dark');

    document.body.prepend(nav);

    // Mobile overlay & drawer
    const overlay = document.createElement('div');
    overlay.className = 'nav-mobile-overlay';
    document.body.appendChild(overlay);

    const mobile = document.createElement('div');
    mobile.className = 'nav-mobile' + (!isHomePage ? ' nav-mobile-dark' : '');
    mobile.innerHTML = `
    <div class="nav-mobile-header">
      <a class="nav-brand" href="index.html">
        <img src="${logoSrc}" alt="FMCSA">
      </a>
      <button class="nav-mobile-close" aria-label="إغلاق القائمة">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="nav-mobile-links">${mobileLinks}</div>`;
    document.body.appendChild(mobile);

    // Toggle logic (same as before)
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

    // Scroll shadow
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ══════════════════════════════
     FOOTER
  ══════════════════════════════ */
  function buildFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
    <div class="container">
      <div class="footer-simple">
        <div class="footer-social">
          <a class="footer-social-link" href="#" target="_blank" rel="noopener" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a class="footer-social-link" href="#" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/></svg>
          </a>
          <a class="footer-social-link" href="https://www.facebook.com/profile.php?id=61582223769511" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
          </a>
        </div>
        <div class="footer-logo">
          <img src="Assets/White Logo.png" alt="FMCSA">
          <p>© 2026 رابطة طلاب كلية العلوم الرياضية والحاسوب</p>
        </div>
        <button class="footer-top-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="أعلى">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
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