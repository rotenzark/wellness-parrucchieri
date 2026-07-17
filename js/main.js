/* Wellness Parrucchieri — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate) + codice-firma: counter dei
   rating/recensioni che salgono allo scroll (il wow «numeri in vetrina»).
   GSAP registrato SUBITO; reveal once; watchdog 1,5s; contenuto mai dipendente
   dall'animazione (i numeri partono già col valore finale nel DOM). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'wellness-parrucchieri',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [],
      1: [],
      2: [['09:00', '19:00']], 3: [['09:00', '19:00']], 4: [['09:00', '19:00']], 5: [['09:00', '19:00']],
      6: [['09:00', '18:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.unico': 'One place', 'nav.team': 'The team', 'nav.gallery': 'The salon',
      'nav.recensioni': 'Reviews', 'nav.dove': 'Where & when', 'nav.prenota': 'Book',
      'hero.eyebrow': 'Hair · Beauty · Piazza De Angeli, Milan',
      'hero.su1': 'from', 'hero.su2': 'verified reviews',
      'hero.title': 'The salon <em>all of De Angeli</em> trusts.',
      'hero.sub': 'Hair, face and body under one roof — with a team who each, number by number, earned their stars one appointment at a time.',
      'hero.cta1': 'Book: +39 02 9780 3147', 'hero.cta2': 'Meet the team',
      'ticker.t1': 'hair · face · body', 'ticker.t2': 'M1 De Angeli',
      'ticker.t1b': 'hair · face · body', 'ticker.t2b': 'M1 De Angeli',
      'unico.kicker': 'One place', 'unico.t1': 'Four worlds,', 'unico.t2': 'a single door',
      'm1.t': 'Hair', 'm1.p': 'Cut, colour and highlights, treatments and keratin straightening. Women and men, with Davines and Lisap products.', 'm1.prezzo': 'highlights from € 75.60',
      'm2.t': 'Face', 'm2.p': 'Cleansing, oxygen and ozone therapy: skin that breathes again, between one colour and the next.', 'm2.prezzo': 'oxygen therapy € 50',
      'm3.t': 'Body', 'm3.p': 'Massages, pressotherapy and lymphatic drainage, scrubs and treatments: the wellbeing you deserve.', 'm3.prezzo': 'body scrub from € 32',
      'm4.t': 'Hands & feet', 'm4.p': 'Manicure and pedicure cared for in detail — «perfect and long-lasting», as clients have said for years.', 'm4.prezzo': 'manicure & pedicure',
      'unico.nota': '28 services on the menu · off-peak discounts',
      'team.kicker': 'The team', 'team.t1': 'Each with their numbers,', 'team.t2': 'each with their hands',
      'team.lead': 'It isn’t the salon that has 4.9 stars: it’s the people. These are their real scores, earned one appointment at a time.',
      'team.maria': 'Beauty & wellbeing', 'team.simona': 'Hair', 'team.stefy': 'Hands & feet', 'team.roberto': 'Hair', 'team.rita': 'Beauty', 'team.erminia': 'Beauty',
      'team.rec': 'reviews', 'team.rec2': 'reviews', 'team.rec3': 'reviews', 'team.rec4': 'reviews', 'team.rec5': 'reviews', 'team.rec6': 'reviews',
      'team.foot': '…and Wafa. All under one roof, at Piazza De Angeli.',
      'gallery.kicker': 'The salon', 'gallery.t1': 'Inside, among', 'gallery.t2': 'marble and red chairs',
      'rec.kicker': 'The voices', 'rec.t2': 'and it’s not a cold figure',
      'rec.r1': '«I’ve trusted this place for 7 years now. There must be a reason 😁 Stefy is treating a problem with my toe far better than the podiatrist who’d seen me.»',
      'rec.r2': '«I absolutely recommend this centre. Maria is brilliant, professional and so sweet, she puts you at ease straight away. The place is perfect to relax and recharge.»',
      'rec.r3': '«A hugely relieving massage, Maria is really good.»',
      'rec.r4': '«Perfect as always: perfect, long-lasting manicure.»',
      'dove.kicker': 'Where & when', 'dove.t1': 'Right above the', 'dove.t2': 'De Angeli stop',
      'dove.metro': 'Piazza De Angeli 1, 20146 Milan · M1 De Angeli',
      'dove.chiama': 'Call +39 02 9780 3147', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday',
      'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed', 'giorni.chiuso2': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do you do only hair or beauty too?', 'faq.a1': 'Both: hair (cut, colour, treatments), face, body (massages, pressotherapy) and hands-feet, all in one place.',
      'faq.q2': 'How do I book?', 'faq.a2': 'By calling the salon directly on +39 02 9780 3147: we’ll set the appointment with the professional you prefer.',
      'faq.q3': 'What products do you use?', 'faq.a3': 'We work with Davines and Lisap Milano for hair care and colour.',
      'faq.q4': 'What are your opening hours?', 'faq.a4': 'Tuesday–Friday 9:00–19:00, Saturday 9:00–18:00. Closed Monday and Sunday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'Piazza De Angeli 1, right above the M1 De Angeli station.',
      'foot.dove': 'Piazza De Angeli 1, 20146 Milan · +39 02 9780 3147',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.prenota': 'Book', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------- counter helper (rispetta la lingua per il separatore) ---------- */
  function formatNum(v, decimals) {
    if (decimals > 0) return v.toFixed(decimals).replace('.', root.lang === 'en' ? '.' : ',');
    return Math.round(v).toLocaleString(root.lang === 'en' ? 'en-US' : 'it-IT');
  }
  // salva i valori finali dal DOM (già scritti: il contenuto non dipende dall'anim)
  var counters = [].slice.call(document.querySelectorAll('[data-count]')).map(function (el) {
    return { el: el, to: parseFloat(el.getAttribute('data-count')), dec: parseInt(el.getAttribute('data-decimals') || '0', 10) };
  });
  function runCounter(c) {
    if (!hasGsap || reducedMotion) { c.el.textContent = formatNum(c.to, c.dec); return; }
    var obj = { v: 0 };
    gsap.to(obj, { v: c.to, duration: 1.1, ease: 'power2.out', onUpdate: function () { c.el.textContent = formatNum(obj.v, c.dec); } });
  }

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { if (hasST) { els.forEach(function (el) { ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); }); }); } gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
    // il watchdog forza i numeri al valore finale (mai vuoti/a zero)
    counters.forEach(function (c) { c.el.textContent = formatNum(c.to, c.dec); });
  }
  setTimeout(showAllReveals, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    // GESTO-FIRMA: counter allo scroll, una volta per elemento
    counters.forEach(function (c) {
      ScrollTrigger.create({ trigger: c.el, start: 'top 92%', once: true, onEnter: function () { runCounter(c); } });
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
    counters.forEach(function (c) { c.el.textContent = formatNum(c.to, c.dec); });
  }

  /* ---------- hero entrance ---------- */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: .5 }, .05)
      .fromTo('.hero-score', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, onStart: function () { counters.filter(function (c) { return c.el.closest('.hero-score'); }).forEach(runCounter); } }, .2)
      .to('.hero-title', { opacity: 1, y: 0, duration: .6 }, .6)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .8)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, 1.0);
  }

  var intro = document.getElementById(SITE.introId);
  function hideIntro() {
    if (!intro) return; var el = intro; intro = null;
    el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance();
  }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* ---------- burger ---------- */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* ---------- orari dinamici Europe/Rome (PLUMBING_V 1) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < e) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* ---------- i18n overlay (PLUMBING_V 1) — supporta <b>/<em> via innerHTML sicuro ---------- */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    // i counter possono essere stati riscritti dall'innerHTML: riporta i valori finali
    counters.forEach(function (c) { c.el.textContent = formatNum(c.to, c.dec); });
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
