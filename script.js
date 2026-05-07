window.addEventListener('DOMContentLoaded', () => {
  /* ── Page Loader ── */
  const loaderEl = document.getElementById('loaderText');
  const loaderText = 'AKHILESH.';
  loaderText.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'loader-char';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = `${i * 0.06}s`;
    // accent last char
    if (ch === '.') span.style.color = '#c8f135';
    loaderEl.appendChild(span);
  });
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('done');
    }, 1000);
  });

  /* ── Custom Cursor ── */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    cursor.style.left = mx - 5 + 'px';
    cursor.style.top = my - 5 + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 18 + 'px';
    ring.style.top = ry - 18 + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor scale on interactive elements
  document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .stat-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      ring.style.transform = 'scale(1.5)';
      ring.style.borderColor = '#c8f135';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
      ring.style.borderColor = '#c8f135';
    });
  });

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  /* ── Theme Toggle Logic ── */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  } else if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Optional: Auto-detect system preference if no saved theme
    // body.classList.add('light-mode');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 150) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? '#c8f135' : '';
    });
  });

  /* ── Mobile Menu Toggle ── */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function closeMenu() {
    mobileNav.classList.remove('active');
    menuToggle.querySelector('svg').innerHTML = '<line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />';
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = mobileNav.classList.contains('active');
    if (isActive) {
      closeMenu();
    } else {
      mobileNav.classList.add('active');
      menuToggle.querySelector('svg').innerHTML = '<line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />';
    }
  });

  // Close on backdrop click (clicking outside the links)
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      closeMenu();
    }
  });

  // Close menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
