/* ===========================================================
   KAYA LI — shared site script
   =========================================================== */
(function () {
  var root = document.documentElement;

  /* ---------- Language ---------- */
  function applyLang(lang) {
    root.classList.remove('lang-en', 'lang-zh');
    root.classList.add('lang-' + lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-set') === lang);
      b.setAttribute('aria-pressed', b.getAttribute('data-set') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('kaya-lang', lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('kaya-lang'); } catch (e) {}
  applyLang(saved === 'zh' || saved === 'en' ? saved : 'en');

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang-toggle button');
    if (b) applyLang(b.getAttribute('data-set'));
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var panel = document.querySelector('.mobile-panel');
  if (menuBtn && panel) {
    menuBtn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (window.IntersectionObserver && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (r) { ro.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  /* ---------- WeChat popover ---------- */
  var pop = document.querySelector('.wechat-pop');
  if (pop) {
    document.querySelectorAll('[data-wechat]').forEach(function (t) {
      t.addEventListener('click', function (e) { e.preventDefault(); pop.classList.add('open'); });
    });
    pop.addEventListener('click', function (e) {
      if (e.target === pop || e.target.closest('.close')) pop.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') pop.classList.remove('open'); });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = '2026';
})();
