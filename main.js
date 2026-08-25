// ── Theme switch ────────────────────────────────────────────
// With no stored choice the page follows the OS via prefers-color-scheme;
// the toggle stores an explicit override in localStorage.
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const systemPrefersDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const currentTheme = () =>
  root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');

function labelToggle() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) { /* storage blocked - the choice just won't persist */ }
  labelToggle();
});

// Track the OS setting while no explicit choice has been made.
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!root.hasAttribute('data-theme')) labelToggle();
  });
}

labelToggle();

// ── Mobile nav ──────────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

toggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Footer year ─────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
