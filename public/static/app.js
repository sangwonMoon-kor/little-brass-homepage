function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}

function initMobileMenu() {
  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const nav = document.getElementById('main-nav');
  if (!button || !menu || !nav) return;

  function setOpen(open, restoreFocus = false) {
    menu.classList.toggle('hidden', !open);
    button.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    if (restoreFocus) button.focus();
  }

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('pointerdown', (event) => {
    if (button.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
}

function initHeroVideo(reducedMotion) {
  const video = document.getElementById('hero-video');
  if (!video) return;

  video.muted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  function syncPlayback() {
    if (reducedMotion.matches) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }

  syncPlayback();
  video.addEventListener('canplay', syncPlayback, { once: true });
  reducedMotion.addEventListener('change', syncPlayback);
}

function initNavigationScrollState() {
  const mainNav = document.getElementById('main-nav');
  if (!mainNav || window.location.pathname !== '/') return;

  let framePending = false;
  function update() {
    const scrolled = window.scrollY > 48;
    mainNav.classList.toggle('nav-scrolled', scrolled);
    framePending = false;
  }

  mainNav.classList.remove('nav-scrolled');
  update();
  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
}

function initReveals(reducedMotion) {
  const elements = [...document.querySelectorAll('.reveal')];
  if (elements.length === 0) return;

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -48px' });

  elements.forEach((element) => observer.observe(element));
}

function initCurriculumTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];

  function selectTab(tab, moveFocus) {
    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.setAttribute('aria-selected', String(selected));
      candidate.setAttribute('tabindex', selected ? '0' : '-1');
      candidate.classList.toggle('tab-active', selected);
      candidate.classList.toggle('tab-inactive', !selected);
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });

    if (moveFocus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab, false));
    tab.addEventListener('keydown', (event) => {
      let targetIndex = index;
      if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') targetIndex = 0;
      else if (event.key === 'End') targetIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      selectTab(tabs[targetIndex], true);
    });
  });
}

onReady(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  initMobileMenu();
  initHeroVideo(reducedMotion);
  initNavigationScrollState();
  initReveals(reducedMotion);
  initCurriculumTabs();
});
