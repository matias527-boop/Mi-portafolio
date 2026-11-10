/* =========================================
   1. MODO CLARO / OSCURO
   ========================================= */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

setTheme(initialTheme);

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

/* =========================================
   2. MENÚ MÓVIL
   ========================================= */
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

/* =========================================
   3. ENLACE ACTIVO SEGÚN EL SCROLL
   ========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

/* =========================================
   4. ANIMACIÓN DE APARICIÓN AL SCROLL
   ========================================= */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
  revealObserver.observe(el);
});

/* =========================================
   5. AÑO AUTOMÁTICO EN EL FOOTER
   ========================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================
   6. SOMBRA DEL HEADER AL HACER SCROLL
   ========================================= */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });