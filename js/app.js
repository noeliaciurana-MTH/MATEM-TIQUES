// Aplicació: navegació, idiomes, pràctica, repte i gamificació.
(function () {
  const store = {
    get(k, def) { try { const v = localStorage.getItem('qm_' + k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem('qm_' + k, JSON.stringify(v)); } catch (e) { /* sense emmagatzematge */ } },
  };
  const LANGS = ['ca', 'es', 'en'];
  const S = {
    lang: LANGS.includes(store.get('lang', '')) ? store.get('lang', 'ca') : 'ca',
    course: store.get('course', '2eso'),
    tab: 'teoria',
    level: 1,
    points: store.get('points', 0),
    streak: 0,
    badges: store.get('badges', []),
  };

  const UI = {
    ca: {
      title: 'Quadern de Mates', titleA: 'Quadern de', titleB: 'Mates',
      tagline: 'Matemàtiques d\'ESO amb teoria clara, laboratoris per experimentar i exercicis que no s\'acaben mai: cada vegada que hi entres, en surten de nous.',
      chooseCourse: 'Tria el curs', points: 'punts', streak: 'ratxa', medals: 'medalles', units: 'unitats llestes',
      available: 'Disponible', soon: 'En preparació', unit: 'Unitat', ready: 'llestes',
      home: 'Inici', theory: 'Teoria', explore: 'Explora', practice: 'Practica', challenge: 'Repte',
      lv1: 'Bàsic', lv2: 'Mitjà', lv3: 'Avançat',
      lv1d: 'Entendre i representar', lv2d: 'Aplicar i operar', lv3d: 'Combinar i resoldre problemes',
      exercise: 'Exercici', check: 'Comprova', next: 'Següent', hint: 'Pista', showSol: 'Veure la solució',
      correct: 'Correcte!', wrong: 'Encara no.', almost: 'Gairebé!', solution: 'Solució', tryAgain: 'Equivocar-se és part d\'aprendre. Revisa-ho i torna-ho a provar, o demana una pista.',
      numerator: 'Numerador', denominator: 'Denominador', answer: 'Resposta',
      session: 'Aquesta sessió', mastery: 'Domini per nivells', infinite: 'Els exercicis es generen a l\'atzar: mai no n\'hi haurà dos d\'iguals.',
      chTitle: 'Repte de 10 preguntes', chText: 'Deu exercicis de dificultat creixent, un sol intent per a cadascun. El cronòmetre compta! Aconsegueix la medalla d\'or amb 9 o 10 encerts.',
      start: 'Comença el repte', best: 'Millor resultat', none: 'encara cap', gold: 'Or', silver: 'Plata', bronze: 'Bronze',
      result: 'Resultat', again: 'Torna-ho a provar', time: 'Temps', q: 'Pregunta',
      badgeNew: 'Nova medalla!', footer: 'Quadern de Mates · Matemàtiques d\'ESO', progressNote: 'El progrés es guarda en aquest navegador.',
      emptyAnswer: 'Escriu una resposta abans de comprovar.', diagLabel: 'On és l\'error?', situation: 'Situació real', curriculum: 'Currículum', report: 'El meu informe', teacher: 'Per al docent',
      history: 'Matemàtiques amb història', ce: 'Competències específiques', sabers: 'Sabers (Decret 175/2022)', transv: 'Competències transversals', vectors: 'Vectors', ods: 'ODS',
      seqNote: 'El Decret 175/2022 agrupa els sabers de 1r a 3r d\'ESO. La distribució per cursos d\'aquesta web és una proposta de seqüenciació.',
      repTitle: 'El meu informe', repIntro: 'Escriu el teu nom i copia el codi. Envia\'l al teu professor o professora (per exemple, pel Classroom). El codi resumeix què has practicat i quins errors fas més sovint.',
      name: 'Nom i cognom', copy: 'Copia el codi', copied: 'Codi copiat', noData: 'Encara no hi ha activitat. Practica una mica i torna-hi!',
      exercises: 'exercicis encertats', bestCh: 'millor repte', topErr: 'Errors més freqüents', none2: 'cap error detectat',
      tTitle: 'Per al docent', tIntro: 'Enganxa aquí els codis que t\'envia l\'alumnat (un per línia) per veure el resum del grup.', tPaste: 'Codis de l\'alumnat', tRead: 'Analitza el grup',
      tStudents: 'alumnes', tClassErr: 'Errors més freqüents del grup', tMap: 'Mapa curricular de les unitats', tUse: 'Com fer-la servir a l\'aula', tInvalid: 'codis no vàlids',
      student: 'Alumne/a', unitCol: 'Unitat', times: 'vegades', zeroDen: 'El denominador no pot ser 0.',
    },
    es: {
      title: 'Cuaderno de Mates', titleA: 'Cuaderno de', titleB: 'Mates',
      tagline: 'Matemáticas de ESO con teoría clara, laboratorios para experimentar y ejercicios que no se acaban nunca: cada vez que entras, salen nuevos.',
      chooseCourse: 'Elige el curso', points: 'puntos', streak: 'racha', medals: 'medallas', units: 'unidades listas',
      available: 'Disponible', soon: 'En preparación', unit: 'Unidad', ready: 'listas',
      home: 'Inicio', theory: 'Teoría', explore: 'Explora', practice: 'Practica', challenge: 'Reto',
      lv1: 'Básico', lv2: 'Medio', lv3: 'Avanzado',
      lv1d: 'Entender y representar', lv2d: 'Aplicar y operar', lv3d: 'Combinar y resolver problemas',
      exercise: 'Ejercicio', check: 'Comprueba', next: 'Siguiente', hint: 'Pista', showSol: 'Ver la solución',
      correct: '¡Correcto!', wrong: 'Todavía no.', almost: '¡Casi!', solution: 'Solución', tryAgain: 'Equivocarse es parte de aprender. Revísalo y vuelve a intentarlo, o pide una pista.',
      numerator: 'Numerador', denominator: 'Denominador', answer: 'Respuesta',
      session: 'Esta sesión', mastery: 'Dominio por niveles', infinite: 'Los ejercicios se generan al azar: nunca habrá dos iguales.',
      chTitle: 'Reto de 10 preguntas', chText: 'Diez ejercicios de dificultad creciente, un solo intento para cada uno. ¡El cronómetro cuenta! Consigue la medalla de oro con 9 o 10 aciertos.',
      start: 'Empieza el reto', best: 'Mejor resultado', none: 'todavía ninguno', gold: 'Oro', silver: 'Plata', bronze: 'Bronce',
      result: 'Resultado', again: 'Vuelve a intentarlo', time: 'Tiempo', q: 'Pregunta',
      badgeNew: '¡Nueva medalla!', footer: 'Cuaderno de Mates · Matemáticas de ESO', progressNote: 'El progreso se guarda en este navegador.',
      emptyAnswer: 'Escribe una respuesta antes de comprobar.', diagLabel: '¿Dónde está el error?', situation: 'Situación real', curriculum: 'Currículo', report: 'Mi informe', teacher: 'Para el docente',
      history: 'Matemáticas con historia', ce: 'Competencias específicas', sabers: 'Saberes (Decreto 175/2022)', transv: 'Competencias transversales', vectors: 'Vectores', ods: 'ODS',
      seqNote: 'El Decreto 175/2022 agrupa los saberes de 1.º a 3.º de ESO. La distribución por cursos de esta web es una propuesta de secuenciación.',
      repTitle: 'Mi informe', repIntro: 'Escribe tu nombre y copia el código. Envíaselo a tu profesor o profesora (por ejemplo, por Classroom). El código resume qué has practicado y qué errores cometes más a menudo.',
      name: 'Nombre y apellido', copy: 'Copia el código', copied: 'Código copiado', noData: 'Todavía no hay actividad. ¡Practica un poco y vuelve!',
      exercises: 'ejercicios acertados', bestCh: 'mejor reto', topErr: 'Errores más frecuentes', none2: 'ningún error detectado',
      tTitle: 'Para el docente', tIntro: 'Pega aquí los códigos que te envía el alumnado (uno por línea) para ver el resumen del grupo.', tPaste: 'Códigos del alumnado', tRead: 'Analiza el grupo',
      tStudents: 'alumnos', tClassErr: 'Errores más frecuentes del grupo', tMap: 'Mapa curricular de las unidades', tUse: 'Cómo usarla en el aula', tInvalid: 'códigos no válidos',
      student: 'Alumno/a', unitCol: 'Unidad', times: 'veces', zeroDen: 'El denominador no puede ser 0.',
    },
    en: {
      title: 'Maths Notebook', titleA: 'Maths', titleB: 'Notebook',
      tagline: 'Secondary school maths with clear theory, labs to experiment with, and exercises that never run out: every time you come back, there are new ones.',
      chooseCourse: 'Choose your year', points: 'points', streak: 'streak', medals: 'medals', units: 'units ready',
      available: 'Available', soon: 'Coming soon', unit: 'Unit', ready: 'ready',
      home: 'Home', theory: 'Theory', explore: 'Explore', practice: 'Practice', challenge: 'Challenge',
      lv1: 'Basic', lv2: 'Intermediate', lv3: 'Advanced',
      lv1d: 'Understand and represent', lv2d: 'Apply and calculate', lv3d: 'Combine and solve problems',
      exercise: 'Exercise', check: 'Check', next: 'Next', hint: 'Hint', showSol: 'Show the solution',
      correct: 'Correct!', wrong: 'Not yet.', almost: 'Almost!', solution: 'Solution', tryAgain: 'Mistakes are part of learning. Check your work and try again, or ask for a hint.',
      numerator: 'Numerator', denominator: 'Denominator', answer: 'Answer',
      session: 'This session', mastery: 'Mastery by level', infinite: 'Exercises are generated at random: you will never see the same one twice.',
      chTitle: '10-question challenge', chText: 'Ten exercises that get harder, one try each. The clock is running! Get 9 or 10 right for a gold medal.',
      start: 'Start the challenge', best: 'Best result', none: 'none yet', gold: 'Gold', silver: 'Silver', bronze: 'Bronze',
      result: 'Result', again: 'Try again', time: 'Time', q: 'Question',
      badgeNew: 'New medal!', footer: 'Maths Notebook · Secondary school maths', progressNote: 'Progress is saved in this browser.',
      emptyAnswer: 'Type an answer before checking.', diagLabel: 'What went wrong?', situation: 'Real situation', curriculum: 'Curriculum', report: 'My report', teacher: 'For teachers',
      history: 'Maths with history', ce: 'Specific competences', sabers: 'Content (Decree 175/2022)', transv: 'Cross-curricular competences', vectors: 'Curriculum vectors', ods: 'SDGs',
      seqNote: 'Catalan Decree 175/2022 groups the content for years 1 to 3 together. The year-by-year split on this site is a suggested sequence.',
      repTitle: 'My report', repIntro: 'Type your name and copy the code. Send it to your teacher (for example, via Classroom). The code sums up what you have practised and the mistakes you make most often.',
      name: 'Full name', copy: 'Copy the code', copied: 'Code copied', noData: 'No activity yet. Do some practice and come back!',
      exercises: 'correct exercises', bestCh: 'best challenge', topErr: 'Most frequent mistakes', none2: 'no mistakes detected',
      tTitle: 'For teachers', tIntro: 'Paste the codes your students send you (one per line) to see a summary of the group.', tPaste: 'Student codes', tRead: 'Analyse the group',
      tStudents: 'students', tClassErr: 'Most frequent mistakes in the group', tMap: 'Curriculum map of the units', tUse: 'How to use it in class', tInvalid: 'invalid codes',
      student: 'Student', unitCol: 'Unit', times: 'times', zeroDen: 'The denominator can\'t be 0.',
    },
  };
  const t = (k) => UI[S.lang][k] ?? UI.ca[k] ?? k;
  const tr = (o) => o[S.lang] ?? o.ca;

  const BADGES = [
    { id: 'first', ca: 'Primer encert', es: 'Primer acierto', en: 'First correct' },
    { id: 'streak5', ca: 'Ratxa de 5', es: 'Racha de 5', en: 'Streak of 5' },
    { id: 'streak10', ca: 'Ratxa de 10', es: 'Racha de 10', en: 'Streak of 10' },
    { id: 'adv10', ca: '10 avançats', es: '10 avanzados', en: '10 advanced' },
    { id: 'gold', ca: 'Repte d\'or', es: 'Reto de oro', en: 'Gold challenge' },
    { id: 'p500', ca: '500 punts', es: '500 puntos', en: '500 points' },
  ];

  const app = document.getElementById('app');
  const header = document.getElementById('topbar');
  const footer = document.getElementById('foot');

  // Dibuix de guix per a la pissarra de la portada
  const CHALK_ART = `
  <svg class="art chalk-svg" viewBox="0 0 520 300" role="img" aria-label="a² + b² = c², x = (−b ± √Δ)/2a, π ≈ 3,14159">
    <defs><filter id="chalky"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter></defs>
    <g filter="url(#chalky)">
      <text x="14" y="40" font-size="30">π ≈ 3,14159…</text>
      <text x="250" y="44" font-size="32" class="y">x = <tspan>−b ± √Δ</tspan></text>
      <line x1="300" y1="54" x2="420" y2="54" class="sy"/>
      <text x="345" y="84" font-size="30" class="y">2a</text>
      <polygon points="40,230 160,230 40,140" class="s"/>
      <polyline points="40,216 54,216 54,230" class="s"/>
      <text x="92" y="258" font-size="26">b</text>
      <text x="16" y="192" font-size="26">c</text>
      <text x="108" y="176" font-size="26" class="p">a</text>
      <text x="14" y="292" font-size="28" class="p">a² = b² + c²</text>
      <line x1="230" y1="250" x2="410" y2="250" class="s"/>
      <line x1="320" y1="110" x2="320" y2="290" class="s"/>
      <path d="M250,130 Q320,370 390,130" class="sb"/>
      <circle cx="282" cy="250" r="5" class="y"/><circle cx="358" cy="250" r="5" class="y"/>
      <circle cx="462" cy="170" r="40" class="s"/>
      <line x1="462" y1="170" x2="502" y2="170" class="sp"/>
      <text x="476" y="164" font-size="22">r</text>
      <text x="425" y="240" font-size="24">A = πr²</text>
      <text x="345" y="292" font-size="22">1, 1, 2, 3, 5, 8, 13…</text>
      <text x="410" y="118" font-size="22" class="b">√2 ≈ 1,41</text>
    </g>
  </svg>`;

  // ---------- Gamificació ----------
  function toast(title, sub) {
    const el = document.createElement('div');
    el.className = 'toast'; el.setAttribute('role', 'status');
    el.innerHTML = `<strong>${title}</strong>${sub ? `<span>${sub}</span>` : ''}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  function award(id) {
    if (S.badges.includes(id)) return;
    S.badges.push(id); store.set('badges', S.badges);
    toast(t('badgeNew'), tr(BADGES.find((x) => x.id === id)));
  }
  function addPoints(p) {
    S.points += p; store.set('points', S.points);
    if (S.points >= 500) award('p500');
    renderHeader();
  }
  function progress(unitKey) { return store.get('prog_' + unitKey, { 1: 0, 2: 0, 3: 0 }); }
  function bumpProgress(unitKey, level) {
    const p = progress(unitKey); p[level] = (p[level] || 0) + 1; store.set('prog_' + unitKey, p);
    if (level === 3 && p[3] >= 10) award('adv10');
  }

  // ---------- Capçalera i peu ----------
  function renderHeader() {
    header.innerHTML = `<div class="wrap">
      <a class="brand" href="#"><span class="brand-mark">∑</span>${t('title')}</a>
      <nav class="hlinks"><a href="#informe">${t('report')}</a><a href="#docent">${t('teacher')}</a></nav>
      <div class="score"><span><b>${S.points}</b><span class="lbl">${t('points')}</span></span><span><b>${S.streak}</b><span class="lbl">${t('streak')}</span></span></div>
      <div class="seg" role="group" aria-label="Idioma / Language">
        ${LANGS.map((l) => `<button type="button" data-lang="${l}" aria-pressed="${S.lang === l}">${l.toUpperCase()}</button>`).join('')}
      </div></div>`;
    header.querySelectorAll('[data-lang]').forEach((b) => b.onclick = () => {
      S.lang = b.dataset.lang; store.set('lang', S.lang); route();
    });
  }
  function renderFooter() {
    footer.innerHTML = `<div class="wrap"><span>${t('footer')}</span><span>${t('progressNote')}</span></div>`;
  }

  // ---------- Inici ----------
  function renderHome() {
    const course = QM.courses.find((c) => c.id === S.course) || QM.courses[0];
    const byBlock = {};
    course.units.forEach((u, i) => { (byBlock[u.b] = byBlock[u.b] || []).push({ ...u, i: i + 1 }); });
    const readyTotal = QM.courses.reduce((a, c) => a + c.units.filter((u) => u.ready).length, 0);
    app.innerHTML = `
      <div class="wrap">
        <section class="board hero">
          <div>
            <h1 class="chalk">${t('titleA')} <span class="u">${t('titleB')}</span></h1>
            <p class="lead">${t('tagline')}</p>
          </div>
          ${CHALK_ART}
        </section>
        <section class="notebook">
          <div class="stat"><b>${S.points}</b><span>${t('points')}</span></div>
          <div class="stat"><b>${S.badges.length}</b><span>${t('medals')}</span></div>
          <div class="stat"><b>${readyTotal}</b><span>${t('units')}</span></div>
          <div class="badges">${BADGES.map((b) => `<span class="badge ${S.badges.includes(b.id) ? 'on' : ''}">${tr(b)}</span>`).join('')}</div>
        </section>
        <p class="section-label">${t('chooseCourse')}</p>
        <div class="courses" role="group" aria-label="${t('chooseCourse')}">
          ${QM.courses.map((c) => {
            const r = c.units.filter((u) => u.ready).length;
            return `<button type="button" class="course-btn" data-course="${c.id}" aria-pressed="${c.id === course.id}"><b>${S.lang === 'en' ? c.id[0] : c.n}</b><span>ESO</span>${r ? `<span class="cnt">${r} ${t('ready')}</span>` : ''}</button>`;
          }).join('')}
        </div>
        <p class="muted seqnote">${t('seqNote')}</p>
        <div class="blocks">
          ${Object.keys(QM.blocks).filter((b) => byBlock[b]).map((b) => {
            const B = QM.blocks[b];
            return `<section class="block" style="--bc:${B.color}">
              <h2><span class="glyph">${B.icon}</span>${tr(B)}</h2>
              <div class="units">
                ${byBlock[b].map((u) => {
                  const key = course.id + '-' + u.id, inner = `<span class="glyph">${B.icon}</span><span class="n">${t('unit')} ${u.i}</span><strong>${tr(u)}</strong>`;
                  return u.ready && QM.units[key]
                    ? `<a class="unit-card ready" href="#${key}">${inner}<span class="st">${t('available')}</span></a>`
                    : `<div class="unit-card" aria-disabled="true">${inner}<span class="st">${t('soon')}</span></div>`;
                }).join('')}
              </div>
            </section>`;
          }).join('')}
        </div>
      </div>`;
    app.querySelectorAll('[data-course]').forEach((b) => b.onclick = () => {
      S.course = b.dataset.course; store.set('course', S.course); renderHome();
    });
  }

  // ---------- Unitat ----------
  function renderUnit(key) {
    const [cid, uid] = key.split('-');
    const course = QM.courses.find((c) => c.id === cid);
    const meta = course && course.units.find((u) => u.id === uid);
    const unit = QM.units[key];
    if (!meta || !unit) { location.hash = ''; return; }
    const p = progress(key);
    const tabs = [['situacio', t('situation')], ['teoria', t('theory')], ['explora', t('explore')], ['practica', t('practice')], ['repte', t('challenge')], ['curriculum', t('curriculum')]];
    document.title = `${tr(meta)} · ${t('title')}`;
    app.innerHTML = `
      <div class="wrap">
        <header class="board unit-board">
          <nav class="crumbs"><a href="#">${t('home')}</a> / ${tr(course)} / ${tr(QM.blocks[meta.b])}</nav>
          <h1>${tr(meta)}</h1>
          <div class="formula">${unit.board ? unit.board() : ''}</div>
          <div class="mastery" aria-label="${t('mastery')}">
            ${[1, 2, 3].map((l) => `<div class="m"><span>${t('lv' + l)} · ${p[l] || 0}</span><div class="meter"><i style="width:${Math.min(100, (p[l] || 0) * 10)}%"></i></div></div>`).join('')}
          </div>
        </header>
        <div class="tabs" role="tablist">
          ${tabs.map(([id, label]) => `<button type="button" role="tab" data-tab="${id}" aria-selected="${S.tab === id}">${label}</button>`).join('')}
        </div>
        <div class="panel" id="panel"></div>
      </div>`;
    app.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => { S.tab = b.dataset.tab; renderUnit(key); });
    const panel = app.querySelector('#panel');
    if (S.tab === 'situacio') renderSituation(panel, unit);
    else if (S.tab === 'curriculum') renderCurriculum(panel, unit);
    else if (S.tab === 'teoria') renderTheory(panel, unit);
    else if (S.tab === 'explora') unit.explore(panel, S.lang);
    else if (S.tab === 'practica') renderPractice(panel, unit, key);
    else renderChallenge(panel, unit, key);
  }

  function renderTheory(panel, unit) {
    const secs = unit.theory(S.lang);
    panel.innerHTML = `<div class="theory">
      <nav class="toc">${secs.map((s) => `<a href="#" data-go="${s.id}">${s.title}</a>`).join('')}</nav>
      <article class="sheet">${secs.map((s, i) => `<section id="th-${s.id}"><h2><span class="k">§${i + 1}</span>${s.title}</h2>${s.html}</section>`).join('')}
        ${unit.history ? `<aside class="hist"><span class="t">${t('history')}</span><p>${unit.history(S.lang)}</p></aside>` : ''}</article>
    </div>`;
    panel.querySelectorAll('[data-go]').forEach((a) => a.onclick = (e) => {
      e.preventDefault(); panel.querySelector('#th-' + a.dataset.go).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function renderSituation(panel, unit) {
    if (!unit.situation) { S.tab = 'teoria'; renderTheory(panel, unit); return; }
    const sit = unit.situation(S.lang);
    panel.innerHTML = `<article class="sheet situation"><h2>${sit.title}</h2>${sit.html}</article>`;
    if (sit.init) sit.init(panel);
  }

  function curriculumHTML(unit) {
    const c = unit.cur; if (!c) return '';
    return `<div class="curgrid">
      <div class="box"><h3>${t('ce')}</h3><ul class="ce">${c.ce.map((n) => `<li><b>CE${n}</b> ${tr(QM.CE[n])}</li>`).join('')}</ul></div>
      <div class="box"><h3>${t('sabers')}</h3><ul>${c.sabers.map((x) => `<li>${x}</li>`).join('')}</ul></div>
      <div class="box"><h3>${t('transv')}</h3><ul>${c.transv.map((k) => `<li>${tr(QM.TRANSV[k])}</li>`).join('')}</ul></div>
      <div class="box"><h3>${t('vectors')}</h3><ul>${c.vectors.map((k) => `<li>${tr(QM.VECTORS[k])}</li>`).join('')}</ul>${c.ods ? `<p class="muted">${t('ods')}: ${c.ods.join(', ')}</p>` : ''}</div>
    </div>`;
  }
  function renderCurriculum(panel, unit) {
    panel.innerHTML = `${curriculumHTML(unit)}<p class="muted" style="margin-top:14px">${t('seqNote')}</p>`;
  }

  // ---------- Informe de l'alumne ----------
  function readyUnits() {
    const out = [];
    QM.courses.forEach((c) => c.units.forEach((u) => { const key = c.id + '-' + u.id; if (u.ready && QM.units[key]) out.push({ key, meta: u, course: c }); }));
    return out;
  }
  function collect() {
    const u = {};
    readyUnits().forEach(({ key }) => {
      const p = store.get('prog_' + key, null), b = store.get('best_' + key, null), e = store.get('err_' + key, null);
      if (p || b || e) u[key] = { p: p || {}, b: b ? b.score : null, e: e || {} };
    });
    return u;
  }
  const encode = (obj) => 'QM1-' + btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  const decode = (code) => JSON.parse(decodeURIComponent(escape(atob(code.trim().replace(/^QM1-/, '')))));
  const unitName = (key) => { const r = readyUnits().find((x) => x.key === key); return r ? `${tr(r.course)} · ${tr(r.meta)}` : key; };
  const topErrors = (e, n = 3) => Object.entries(e || {}).sort((a, b) => b[1] - a[1]).slice(0, n);

  function renderReport() {
    const data = collect(), keys = Object.keys(data);
    app.innerHTML = `<div class="wrap page">
      <h1>${t('repTitle')}</h1><p class="muted">${t('repIntro')}</p>
      ${keys.length ? keys.map((k) => {
        const d = data[k], total = (d.p[1] || 0) + (d.p[2] || 0) + (d.p[3] || 0), errs = topErrors(d.e);
        return `<section class="box"><h3>${unitName(k)}</h3>
          <p><b class="mono">${total}</b> ${t('exercises')} (${t('lv1')} ${d.p[1] || 0} · ${t('lv2')} ${d.p[2] || 0} · ${t('lv3')} ${d.p[3] || 0})${d.b != null ? ` · ${t('bestCh')}: <b class="mono">${d.b}/10</b>` : ''}</p>
          <p class="muted">${t('topErr')}:</p>${errs.length ? `<ul>${errs.map(([m, n]) => `<li>${m} <span class="muted">(${n})</span></li>`).join('')}</ul>` : `<p>${t('none2')}</p>`}</section>`;
      }).join('') : `<p class="box">${t('noData')}</p>`}
      <div class="box">
        <label for="rep-name"><b>${t('name')}</b></label>
        <input id="rep-name" class="txt" autocomplete="name" value="${(store.get('name', '') || '').replace(/"/g, '')}">
        <textarea id="rep-code" class="code" rows="3" readonly></textarea>
        <div class="actions"><button type="button" class="btn" id="rep-copy">${t('copy')}</button><span id="rep-ok" class="good"></span></div>
      </div></div>`;
    const name = app.querySelector('#rep-name'), code = app.querySelector('#rep-code');
    const upd = () => { store.set('name', name.value); code.value = encode({ n: name.value.trim(), t: new Date().toISOString().slice(0, 10), u: data }); };
    name.addEventListener('input', upd); upd();
    app.querySelector('#rep-copy').onclick = () => {
      const done = () => { app.querySelector('#rep-ok').textContent = t('copied'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code.value).then(done, () => { code.select(); });
      else code.select();
    };
  }

  // ---------- Pàgina per al docent ----------
  function renderTeacher() {
    const units = readyUnits();
    app.innerHTML = `<div class="wrap page">
      <h1>${t('tTitle')}</h1>
      <section class="box"><h3>${t('tPaste')}</h3><p class="muted">${t('tIntro')}</p>
        <textarea id="tc-in" class="code" rows="5" placeholder="QM1-..."></textarea>
        <div class="actions"><button type="button" class="btn" id="tc-go">${t('tRead')}</button></div>
        <div id="tc-out"></div></section>
      <section><h2>${t('tMap')}</h2><p class="muted">${t('seqNote')}</p>
        ${units.map(({ key, meta, course }) => `<details class="mapu"><summary><b>${tr(course)} · ${tr(meta)}</b> <span class="muted">(${tr(QM.blocks[meta.b])})</span></summary>${curriculumHTML(QM.units[key])}</details>`).join('')}
      </section>
      <section class="box"><h3>${t('tUse')}</h3>${S.lang === 'en' ? `<ol>
        <li>Open each unit with the <b>Real situation</b>: the driving question gives meaning to what comes next.</li>
        <li>Use <b>Theory</b> and <b>Explore</b> for the class explanation (the labs work well on a projector).</li>
        <li>In <b>Practice</b>, each student works at their own level; the site detects their typical mistakes.</li>
        <li>Collect the <b>report codes</b> and paste them here: the group's most frequent mistakes tell you what to revisit.</li>
        <li>Use the <b>Challenge</b> as self-assessment at the end of the unit.</li></ol>` : S.lang === 'es' ? `<ol>
        <li>Empieza cada unidad con la <b>Situación real</b>: la pregunta motriz da sentido a lo que viene después.</li>
        <li>Usa <b>Teoría</b> y <b>Explora</b> para la explicación en clase (los laboratorios funcionan bien en el proyector).</li>
        <li>En <b>Practica</b>, cada alumno trabaja a su nivel; la web detecta sus errores típicos.</li>
        <li>Recoge los <b>códigos de informe</b> y pégalos aquí: los errores más frecuentes del grupo te dicen qué hay que reforzar.</li>
        <li>Usa el <b>Reto</b> como autoevaluación al final de la unidad.</li></ol>` : `<ol>
        <li>Comença cada unitat amb la <b>Situació real</b>: la pregunta motriu dona sentit al que ve després.</li>
        <li>Fes servir <b>Teoria</b> i <b>Explora</b> per a l'explicació a classe (els laboratoris funcionen bé al projector).</li>
        <li>A <b>Practica</b>, cada alumne treballa al seu nivell; la web detecta els seus errors típics.</li>
        <li>Recull els <b>codis d'informe</b> i enganxa'ls aquí: els errors més freqüents del grup et diuen què cal reforçar.</li>
        <li>Fes servir el <b>Repte</b> com a autoavaluació al final de la unitat.</li></ol>`}</section>
    </div>`;
    app.querySelector('#tc-go').onclick = () => {
      const lines = app.querySelector('#tc-in').value.split(/\s+/).filter((x) => x.startsWith('QM1-'));
      const studs = []; let bad = 0;
      lines.forEach((l) => { try { studs.push(decode(l)); } catch (e) { bad++; } });
      const keys = [...new Set(studs.flatMap((s) => Object.keys(s.u || {})))];
      const classErr = {};
      studs.forEach((s) => Object.entries(s.u || {}).forEach(([k, d]) => Object.entries(d.e || {}).forEach(([m, n]) => {
        const id = k + '|' + m; classErr[id] = classErr[id] || { k, m, n: 0, who: 0 }; classErr[id].n += n; classErr[id].who++;
      })));
      const errs = Object.values(classErr).sort((a, b) => b.who - a.who || b.n - a.n).slice(0, 8);
      app.querySelector('#tc-out').innerHTML = `<p><b class="mono">${studs.length}</b> ${t('tStudents')}${bad ? ` · ${bad} ${t('tInvalid')}` : ''}</p>
        ${errs.length ? `<h3>${t('tClassErr')}</h3><ul>${errs.map((e) => `<li><b>${e.who}/${studs.length}</b> ${t('tStudents')} · ${e.m} <span class="muted">(${unitName(e.k)}, ${e.n} ${t('times')})</span></li>`).join('')}</ul>` : ''}
        ${studs.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>${t('student')}</th>${keys.map((k) => `<th>${unitName(k)}</th>`).join('')}</tr></thead><tbody>
          ${studs.map((s) => `<tr><td>${(s.n || '—').replace(/</g, '&lt;')}</td>${keys.map((k) => { const d = (s.u || {})[k]; return `<td>${d ? `${d.p[1] || 0} · ${d.p[2] || 0} · ${d.p[3] || 0}${d.b != null ? ` <span class="muted">(${d.b}/10)</span>` : ''}` : '—'}</td>`; }).join('')}</tr>`).join('')}
        </tbody></table></div><p class="muted">${t('lv1')} · ${t('lv2')} · ${t('lv3')} (${t('challenge')})</p>` : ''}`;
    };
  }

  // Llegeix un nombre escrit per l'alumne (accepta coma decimal i el signe −)
  const parseNum = (s) => { s = s.trim().replace(/[−–]/g, '-').replace(',', '.'); return s === '' ? NaN : Number(s); };

  // Construeix la zona de resposta i retorna una funció que llegeix el valor
  function answerUI(box, ex) {
    if (ex.kind === 'frac') {
      box.innerHTML = `<div class="fin"><input id="a-n" inputmode="numeric" aria-label="${t('numerator')}" autocomplete="off"><span class="bar"></span><input id="a-d" inputmode="numeric" aria-label="${t('denominator')}" autocomplete="off"></div>`;
      return () => {
        const n = box.querySelector('#a-n').value.trim(), d = box.querySelector('#a-d').value.trim();
        if (n === '' || d === '') return { empty: true };
        return { n: parseNum(n), d: parseNum(d) };
      };
    }
    if (ex.kind === 'num') {
      box.innerHTML = `<input id="a-x" class="nin" inputmode="decimal" aria-label="${t('answer')}" autocomplete="off">`;
      return () => { const v = box.querySelector('#a-x').value; return v.trim() === '' ? { empty: true } : parseNum(v); };
    }
    if (ex.kind === 'nums') {
      box.innerHTML = `<div class="pair">
        <label for="a-x1"><i class="v">x</i><sub>1</sub> =<input id="a-x1" class="nin" inputmode="decimal" autocomplete="off"></label>
        <label for="a-x2"><i class="v">x</i><sub>2</sub> =<input id="a-x2" class="nin" inputmode="decimal" autocomplete="off"></label></div>`;
      return () => {
        const a = box.querySelector('#a-x1').value, b = box.querySelector('#a-x2').value;
        if (a.trim() === '' || b.trim() === '') return { empty: true };
        return { x1: parseNum(a), x2: parseNum(b) };
      };
    }
    let chosen = null;
    box.innerHTML = `<div class="choices">${ex.options.map((o, i) => `<button type="button" class="choice" data-i="${i}" aria-pressed="false">${o}</button>`).join('')}</div>`;
    box.querySelectorAll('.choice').forEach((b) => b.onclick = () => {
      chosen = ex.options[+b.dataset.i]; box.querySelectorAll('.choice').forEach((x) => x.setAttribute('aria-pressed', x === b));
    });
    return () => (chosen == null ? { empty: true } : chosen);
  }

  // Detecta l'error típic i el guarda per a l'informe de la unitat
  function diagnose(ex, val, key) {
    if (!ex.diagnose) return null;
    const d = ex.diagnose(val);
    if (!d) return null;
    const errs = store.get('err_' + key, {}); errs[d.key] = (errs[d.key] || 0) + 1; store.set('err_' + key, errs);
    return d.msg;
  }

  function evaluate(ex, val) {
    if (val && val.empty) return { state: 'empty' };
    if (ex.kind === 'frac' && (isNaN(val.n) || isNaN(val.d))) return { state: 'ko' };
    if (ex.kind === 'frac' && val.d === 0) return { state: 'zero' };
    if (ex.kind === 'num' && isNaN(val)) return { state: 'ko' };
    if (ex.kind === 'nums' && (isNaN(val.x1) || isNaN(val.x2))) return { state: 'ko' };
    const r = ex.check(val);
    return { state: r === true ? 'ok' : r === 'partial' ? 'partial' : 'ko' };
  }

  function renderPractice(panel, unit, key) {
    let ex, tries = 0, solved = false, count = 0;
    const hist = [];
    panel.innerHTML = `<div class="practice">
      <div>
        <div class="levels" role="group">
          ${[1, 2, 3].map((l) => `<button type="button" class="lv" data-lv="${l}" aria-pressed="${S.level === l}"><span class="dotsLv">${'●'.repeat(l)}${'○'.repeat(3 - l)}</span>${t('lv' + l)}<small>${t('lv' + l + 'd')}</small></button>`).join('')}
        </div>
        <div class="ex" id="ex"></div>
      </div>
      <aside class="side">
        <div class="box"><h3>${t('session')}</h3><div class="big" id="sess">0 / 0</div><div class="dots" id="dots"></div></div>
        <div class="box"><h3>${t('points')}</h3><div class="big" id="pts">${S.points}</div></div>
        <div class="box"><p style="font-size:.9rem;color:var(--ink-soft)">${t('infinite')}</p></div>
      </aside>
    </div>`;
    const exEl = panel.querySelector('#ex');
    panel.querySelectorAll('[data-lv]').forEach((b) => b.onclick = () => {
      S.level = +b.dataset.lv;
      panel.querySelectorAll('[data-lv]').forEach((x) => x.setAttribute('aria-pressed', x === b));
      next();
    });
    function side() {
      const ok = hist.filter(Boolean).length;
      panel.querySelector('#sess').textContent = `${ok} / ${hist.length}`;
      panel.querySelector('#dots').innerHTML = hist.slice(-20).map((h) => `<i class="${h ? 'ok' : 'ko'}"></i>`).join('');
      panel.querySelector('#pts').textContent = S.points;
    }
    function next() {
      ex = QM.pick(unit.levels[S.level])(S.lang); tries = 0; solved = false; count++;
      exEl.innerHTML = `
        <div class="qn"><span>${t('exercise')} ${count}</span><span>${t('lv' + S.level)}</span></div>
        <div class="q">${ex.q}</div>
        <div class="answer" id="ans"></div>
        <div class="actions">
          <button type="button" class="btn" id="b-check">${t('check')}</button>
          <button type="button" class="btn ghost" id="b-hint">${t('hint')}</button>
          <button type="button" class="btn ghost" id="b-next">${t('next')}</button>
        </div>
        <div id="fb" aria-live="polite"></div>`;
      const read = answerUI(exEl.querySelector('#ans'), ex);
      const fb = exEl.querySelector('#fb');
      const check = () => {
        if (solved) { next(); return; }
        const val = read(), r = evaluate(ex, val);
        if (r.state === 'empty') { fb.innerHTML = `<div class="fb hint"><strong>${t('emptyAnswer')}</strong></div>`; return; }
        if (r.state === 'zero') { fb.innerHTML = `<div class="fb ko"><strong>${t('zeroDen')}</strong></div>`; return; }
        tries++;
        if (r.state === 'ok') {
          solved = true; S.streak++;
          const pts = Math.round(S.level * 10 * (tries === 1 ? 1 : 0.5) + (S.streak >= 5 ? 5 : 0));
          if (tries === 1) hist.push(true);
          addPoints(pts); bumpProgress(key, S.level);
          award('first'); if (S.streak >= 5) award('streak5'); if (S.streak >= 10) award('streak10');
          fb.innerHTML = `<div class="fb ok"><strong>${t('correct')} +${pts}</strong><div>${ex.sol}</div></div>`;
          exEl.querySelector('#b-check').textContent = t('next');
        } else if (r.state === 'partial') {
          fb.innerHTML = `<div class="fb hint"><strong>${t('almost')}</strong><div>${ex.partial}</div></div>`;
        } else {
          if (tries === 1) hist.push(false);
          S.streak = 0; renderHeader();
          const dg = diagnose(ex, val, key);
          fb.innerHTML = `<div class="fb ko"><strong>${t('wrong')}</strong>${dg ? `<div class="diag"><span>${t('diagLabel')}</span>${dg}</div>` : ''}<div>${t('tryAgain')}</div>
            ${tries >= 2 ? `<button type="button" class="btn ghost" id="b-sol" style="justify-self:start">${t('showSol')}</button>` : ''}</div>`;
          const bs = fb.querySelector('#b-sol');
          if (bs) bs.onclick = () => { solved = true; fb.innerHTML = `<div class="fb hint"><strong>${t('solution')}</strong><div>${ex.sol}</div></div>`; exEl.querySelector('#b-check').textContent = t('next'); };
        }
        side();
      };
      exEl.querySelector('#b-check').onclick = check;
      exEl.querySelector('#b-next').onclick = next;
      exEl.querySelector('#b-hint').onclick = () => { fb.innerHTML = `<div class="fb hint"><strong>${t('hint')}</strong><div>${ex.hint}</div></div>`; };
      exEl.querySelectorAll('input').forEach((i) => i.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); }));
      const first = exEl.querySelector('input'); if (first && count > 1) first.focus();
    }
    next(); side();
  }

  // ---------- Repte ----------
  function medalOf(score) { return score >= 9 ? 'or' : score >= 7 ? 'plata' : score >= 5 ? 'bronze' : null; }
  function renderChallenge(panel, unit, key) {
    const best = store.get('best_' + key, null);
    const medalName = (m) => ({ or: t('gold'), plata: t('silver'), bronze: t('bronze') }[m]);
    panel.innerHTML = `<div class="challenge-intro">
      <h2>${t('chTitle')}</h2><p>${t('chText')}</p>
      <div class="medals">
        <span class="medal"><i class="m-or"></i>${t('gold')} 9–10</span>
        <span class="medal"><i class="m-plata"></i>${t('silver')} 7–8</span>
        <span class="medal"><i class="m-bronze"></i>${t('bronze')} 5–6</span>
      </div>
      <p>${t('best')}: <b class="mono">${best ? `${best.score}/10 · ${best.time} s` : t('none')}</b></p>
      <div><button type="button" class="btn" id="b-start">${t('start')}</button></div>
    </div>`;
    panel.querySelector('#b-start').onclick = () => run();

    function run() {
      const plan = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3];
      let i = 0, score = 0; const marks = []; const t0 = Date.now();
      function ask() {
        if (i >= plan.length) return finish();
        const ex = QM.pick(unit.levels[plan[i]])(S.lang);
        panel.innerHTML = `<div class="practice"><div class="ex">
          <div class="qn"><span>${t('q')} ${i + 1} / 10</span><span>${t('lv' + plan[i])}</span></div>
          <div class="q">${ex.q}</div><div class="answer" id="ans"></div>
          <div class="actions"><button type="button" class="btn" id="b-ok">${t('check')}</button></div>
          <div id="fb" aria-live="polite"></div></div>
          <aside class="side"><div class="box"><h3>${t('time')}</h3><div class="big" id="clock">0 s</div><div class="dots">${marks.map((m) => `<i class="${m ? 'ok' : 'ko'}"></i>`).join('')}</div></div></aside></div>`;
        const read = answerUI(panel.querySelector('#ans'), ex);
        const btn = panel.querySelector('#b-ok'), fb = panel.querySelector('#fb');
        let done = false;
        const go = () => {
          if (done) { i++; ask(); return; }
          const val = read(), r = evaluate(ex, val);
          if (r.state === 'empty') { fb.innerHTML = `<div class="fb hint"><strong>${t('emptyAnswer')}</strong></div>`; return; }
          if (r.state === 'zero') { fb.innerHTML = `<div class="fb ko"><strong>${t('zeroDen')}</strong></div>`; return; }
          done = true; let dg = null; const ok = r.state === 'ok'; marks.push(ok); if (ok) score++;
          fb.innerHTML = ok ? `<div class="fb ok"><strong>${t('correct')}</strong></div>`
                            : `<div class="fb ko"><strong>${r.state === 'partial' ? t('almost') : t('wrong')}</strong>${r.state === 'ko' && (dg = diagnose(ex, val, key)) ? `<div class="diag"><span>${t('diagLabel')}</span>${dg}</div>` : ''}<div>${t('solution')}: ${ex.sol}</div></div>`;
          btn.textContent = t('next');
        };
        btn.onclick = go;
        panel.querySelectorAll('input').forEach((x) => x.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); }));
        const f = panel.querySelector('input'); if (f) f.focus();
      }
      const timer = setInterval(() => {
        const c = panel.querySelector('#clock'); if (!c) return clearInterval(timer);
        c.textContent = Math.round((Date.now() - t0) / 1000) + ' s';
      }, 500);
      function finish() {
        clearInterval(timer);
        const time = Math.round((Date.now() - t0) / 1000), m = medalOf(score);
        const prev = store.get('best_' + key, null);
        if (!prev || score > prev.score || (score === prev.score && time < prev.time)) store.set('best_' + key, { score, time });
        addPoints(score * 15);
        if (m === 'or') award('gold');
        panel.innerHTML = `<div class="challenge-intro" style="justify-items:start">
          <h2>${t('result')}</h2>
          <div class="result-medal ${m ? 'm-' + m : ''}" style="${m ? '' : 'background:var(--line);color:var(--ink)'}">${score}/10</div>
          <p>${m ? `<b>${medalName(m)}</b> · ` : ''}${t('time')}: <span class="mono">${time} s</span> · +${score * 15} ${t('points')}</p>
          <button type="button" class="btn" id="b-again">${t('again')}</button></div>`;
        panel.querySelector('#b-again').onclick = run;
      }
      ask();
    }
  }

  // ---------- Navegació ----------
  let lastKey = null;
  function route() {
    const key = location.hash.slice(1);
    document.documentElement.lang = S.lang;
    document.title = t('title');
    renderHeader(); renderFooter();
    if (key && QM.units[key]) {
      if (key !== lastKey) { S.tab = 'situacio'; lastKey = key; window.scrollTo(0, 0); }
      renderUnit(key);
    } else if (key === 'informe') { lastKey = null; renderReport(); }
    else if (key === 'docent') { lastKey = null; renderTeacher(); }
    else { lastKey = null; renderHome(); }
  }
  window.addEventListener('hashchange', route);
  route();
})();
