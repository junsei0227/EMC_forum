// EMC共創フォーラム 企画説明スライド：表示と操作
(function () {
  const deck = document.getElementById('deck');
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const total = slides.length;
  const currentEl = document.getElementById('current');
  document.getElementById('total').textContent = total;

  // 上部の目次バー（現在の章をハイライト）
  const chapters = [
    ['intro', '導入'],
    ['why', 'なぜやるのか'],
    ['what', '何をするのか'],
    ['goal', '目指す状態'],
    ['next', '今後の進め方'],
  ];

  // 各スライドに目次バー・ロゴ・ページ番号を差し込む（番号は並び順から自動）
  slides.forEach((slide, i) => {
    const current = slide.dataset.chapter;
    if (current) {
      const toc = document.createElement('ol');
      toc.className = 'frame__toc';
      chapters.forEach(([key, label]) => {
        const li = document.createElement('li');
        li.textContent = label;
        if (key === current) li.className = 'is-current';
        toc.appendChild(li);
      });
      slide.appendChild(toc);
    }

    if (i > 0) {
      const brand = document.createElement('p');
      brand.className = 'frame__brand';
      brand.innerHTML = '<img src="assets/logo/favicon-32x32.png" alt="">EMC共創フォーラム';
      slide.appendChild(brand);

      const page = document.createElement('p');
      page.className = 'frame__page';
      page.textContent = (i + 1) + ' / ' + total;
      slide.appendChild(page);
    }
  });

  // 2枚目の「このあとの流れ」に各章のページ範囲を自動で入れる
  document.querySelectorAll('[data-for]').forEach((el) => {
    const pages = slides
      .map((s, i) => (s.dataset.chapter === el.dataset.for ? i + 1 : null))
      .filter(Boolean);
    if (!pages.length) return;
    const first = pages[0], last = pages[pages.length - 1];
    el.textContent = first === last ? 'p.' + first : 'p.' + first + '–' + last;
  });

  // 画面サイズに合わせて 1920×1080 を拡大縮小
  function fit() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    deck.style.setProperty('--scale', scale);
  }

  let index = 0;
  function show(n) {
    index = Math.max(0, Math.min(total - 1, n));
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    currentEl.textContent = index + 1;
    const hash = '#' + (index + 1);
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
        e.preventDefault(); show(index + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); show(index - 1); break;
      case 'Home': show(0); break;
      case 'End': show(total - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
    }
  });

  document.querySelector('.controls').addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'prev') show(index - 1);
    if (action === 'next') show(index + 1);
    if (action === 'fullscreen') toggleFullscreen();
  });

  // スマホ：左右スワイプでめくる
  let touchX = null;
  window.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  window.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // マウスを動かしたときだけ操作ボタンをはっきり表示
  let uiTimer;
  window.addEventListener('mousemove', () => {
    document.body.classList.add('show-ui');
    clearTimeout(uiTimer);
    uiTimer = setTimeout(() => document.body.classList.remove('show-ui'), 1800);
  });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', () => show(fromHash()));
  fit();
  show(fromHash());
})();
