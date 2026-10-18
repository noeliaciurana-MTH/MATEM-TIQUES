// Unitat: Teorema de Pitàgores (2n ESO)
// Notació: a = hipotenusa, b i c = catets.
(function () {
  const { F, rnd, pick, T, v } = QM;
  const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29], [15, 20, 25], [10, 24, 26]];
  const fmt = (x, L) => {
    const r = Math.round(x * 100) / 100;
    return (Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/0$/, '')).replace('.', L === 'en' ? '.' : ',');
  };
  const near = (ans) => (r) => Math.abs(r - ans) < 0.011;
  const ROUND = (L) => T(L, 'Arrodoneix a les centèsimes si cal.', 'Redondea a las centésimas si hace falta.', 'Round to two decimal places if needed.');
  const sq = (s) => `${s}<sup>2</sup>`;

  // Triangle rectangle amb quadrats sobre cada costat. b = catet horitzontal, c = catet vertical.
  function squares(b, c, size = 280, grid = false, L = 'ca') {
    const minX = -c, maxX = b + c, minY = -b, maxY = c + b;
    const s = (size - 40) / Math.max(maxX - minX, maxY - minY);
    const W = (maxX - minX) * s + 40, H = (maxY - minY) * s + 40;
    const P = (x, y) => [20 + (x - minX) * s, 20 + (maxY - y) * s];
    const poly = (pts, cls) => `<polygon points="${pts.map((p) => P(...p).map((k) => k.toFixed(1)).join(',')).join(' ')}" class="${cls}"/>`;
    const gridLines = (A, u, w) => {
      if (!grid) return '';
      const L = Math.round(Math.hypot(...u)); let g = '';
      for (let i = 1; i < L; i++) {
        const a1 = [A[0] + u[0] * i / L, A[1] + u[1] * i / L], b1 = [a1[0] + w[0], a1[1] + w[1]];
        const a2 = [A[0] + w[0] * i / L, A[1] + w[1] * i / L], b2 = [a2[0] + u[0], a2[1] + u[1]];
        g += `<line x1="${P(...a1)[0]}" y1="${P(...a1)[1]}" x2="${P(...b1)[0]}" y2="${P(...b1)[1]}" class="sqg"/>`;
        g += `<line x1="${P(...a2)[0]}" y1="${P(...a2)[1]}" x2="${P(...b2)[0]}" y2="${P(...b2)[1]}" class="sqg"/>`;
      }
      return g;
    };
    const a2 = b * b + c * c;
    const lab = (x, y, t) => { const [X, Y] = P(x, y); return `<text x="${X}" y="${Y + 6}" text-anchor="middle" class="sqt">${t}</text>`; };
    let out = `<svg width="${W.toFixed(0)}" height="${H.toFixed(0)}" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" role="img" aria-label="${sq('b')} + ${sq('c')} = ${sq('a')}">`;
    out += poly([[0, 0], [b, 0], [b, -b], [0, -b]], 'sq1') + gridLines([0, 0], [b, 0], [0, -b]);
    out += poly([[0, 0], [0, c], [-c, c], [-c, 0]], 'sq2') + gridLines([0, 0], [0, c], [-c, 0]);
    out += poly([[b, 0], [0, c], [c, c + b], [b + c, b]], 'sq3') + (Number.isInteger(Math.round(Math.sqrt(a2) * 1e6) / 1e6) ? gridLines([b, 0], [-b, c], [c, b]) : '');
    out += poly([[0, 0], [b, 0], [0, c]], 'tri');
    const k = Math.min(b, c) * 0.18; out += poly([[0, 0], [k, 0], [k, k], [0, k]], 'ra');
    out += lab(b / 2, -b / 2, fmt(b * b, L)) + lab(-c / 2, c / 2, fmt(c * c, L)) + lab((b + c) / 2, (b + c) / 2, fmt(a2, L));
    return out + '</svg>';
  }

  // Triangle rectangle sol, amb etiquetes als costats
  function tri(b, c, lb, lc, la, size = 240) {
    const s = (size - 70) / Math.max(b, c), W = b * s + 70, H = c * s + 50;
    const P = (x, y) => [40 + x * s, 15 + (c - y) * s];
    const [x0, y0] = P(0, 0), [x1, y1] = P(b, 0), [x2, y2] = P(0, c);
    const k = 12;
    return `<svg width="${W.toFixed(0)}" height="${H.toFixed(0)}" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" role="img" aria-label="triangle">
      <polygon points="${x0},${y0} ${x1},${y1} ${x2},${y2}" class="tri"/>
      <polyline points="${x0 + k},${y0} ${x0 + k},${y0 - k} ${x0},${y0 - k}" class="ra2"/>
      <text x="${(x0 + x1) / 2}" y="${y0 + 22}" text-anchor="middle" class="lbl">${lb}</text>
      <text x="${x0 - 10}" y="${(y0 + y2) / 2 + 5}" text-anchor="end" class="lbl">${lc}</text>
      <text x="${(x1 + x2) / 2 + 12}" y="${(y1 + y2) / 2 - 8}" text-anchor="start" class="lbl">${la}</text>
    </svg>`;
  }

  // ---------- TEORIA ----------
  function theory(L) {
    const s = [];
    s.push({ id: 'tri', title: T(L, 'El triangle rectangle', 'El triángulo rectángulo', 'The right-angled triangle'), html: `
      <div class="rule"><span class="t">${T(L, 'Definició', 'Definición', 'Definition')}</span>
        ${T(L, 'Un triangle és <mark>rectangle</mark> si té un angle de 90°. Els dos costats que formen l\'angle recte són els <mark>catets</mark> i el costat oposat és la <mark>hipotenusa</mark>, que sempre és el costat més llarg.',
               'Un triángulo es <mark>rectángulo</mark> si tiene un ángulo de 90°. Los dos lados que forman el ángulo recto son los <mark>catetos</mark> y el lado opuesto es la <mark>hipotenusa</mark>, que siempre es el lado más largo.',
               'A triangle is <mark>right-angled</mark> if it has a 90° angle. The two sides that form the right angle are the <mark>legs</mark>, and the opposite side is the <mark>hypotenuse</mark>, which is always the longest side.')}
      </div>
      <div class="figs"><figure>${tri(4, 3, 'b', 'c', 'a', 260)}<figcaption>${v('a')}: ${T(L, 'hipotenusa', 'hipotenusa', 'hypotenuse')} · ${v('b')}, ${v('c')}: ${T(L, 'catets', 'catetos', 'legs')}</figcaption></figure></div>` });

    s.push({ id: 'teor', title: T(L, 'El teorema', 'El teorema', 'The theorem'), html: `
      <div class="rule"><span class="t">${T(L, 'Teorema de Pitàgores', 'Teorema de Pitágoras', 'Pythagoras\' theorem')}</span>
        ${T(L, 'En un triangle rectangle, el quadrat de la hipotenusa és igual a la suma dels quadrats dels catets.', 'En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.', 'In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the legs.')}
        <div class="calc big-formula">${sq(v('a'))} = ${sq(v('b'))} + ${sq(v('c'))}</div>
      </div>
      <p>${T(L, 'Es pot veure amb àrees: si dibuixem un quadrat sobre cada costat, l\'àrea del quadrat gran és igual a la suma de les àrees dels dos petits. Amb un triangle de costats 3, 4 i 5, compta els quadradets:',
                'Se puede ver con áreas: si dibujamos un cuadrado sobre cada lado, el área del cuadrado grande es igual a la suma de las áreas de los dos pequeños. Con un triángulo de lados 3, 4 y 5, cuenta los cuadraditos:',
                'You can see it with areas: draw a square on each side, and the area of the big square equals the sum of the areas of the two small ones. With a 3-4-5 triangle, count the little squares:')}</p>
      <div class="figs"><figure>${squares(4, 3, 300, true, L)}<figcaption>16 + 9 = 25</figcaption></figure></div>` });

    s.push({ id: 'hip', title: T(L, 'Calcular la hipotenusa', 'Calcular la hipotenusa', 'Finding the hypotenuse'), html: `
      <div class="calc big-formula">${v('a')} = √<span class="ov">${sq(v('b'))} + ${sq(v('c'))}</span></div>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <p>${T(L, 'Els catets fan 6 cm i 8 cm. Quant fa la hipotenusa?', 'Los catetos miden 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?', 'The legs are 6 cm and 8 cm. How long is the hypotenuse?')}</p>
        <div class="calc">${v('a')} = √<span class="ov">6<sup>2</sup> + 8<sup>2</sup></span> = √<span class="ov">36 + 64</span> = √<span class="ov">100</span> = 10 cm</div>
      </div>` });

    s.push({ id: 'cat', title: T(L, 'Calcular un catet', 'Calcular un cateto', 'Finding a leg'), html: `
      <div class="calc big-formula">${v('b')} = √<span class="ov">${sq(v('a'))} − ${sq(v('c'))}</span></div>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <p>${T(L, 'La hipotenusa fa 13 m i un catet 5 m. Quant fa l\'altre catet?', 'La hipotenusa mide 13 m y un cateto 5 m. ¿Cuánto mide el otro cateto?', 'The hypotenuse is 13 m and one leg is 5 m. How long is the other leg?')}</p>
        <div class="calc">${v('b')} = √<span class="ov">13<sup>2</sup> − 5<sup>2</sup></span> = √<span class="ov">169 − 25</span> = √<span class="ov">144</span> = 12 m</div>
      </div>
      <div class="warn"><b>${T(L, 'Error freqüent', 'Error frecuente', 'Common mistake')}:</b> ${T(L, 'per trobar un catet es <b>resta</b>, no se suma. I sempre al quadrat de la hipotenusa li restem l\'altre.', 'para hallar un cateto se <b>resta</b>, no se suma. Y siempre al cuadrado de la hipotenusa le restamos el otro.', 'to find a leg you <b>subtract</b>, not add. Always subtract from the square of the hypotenuse.')}</div>` });

    s.push({ id: 'tipus', title: T(L, 'És rectangle? Classificar triangles', '¿Es rectángulo? Clasificar triángulos', 'Is it right-angled? Classifying triangles'), html: `
      <p>${T(L, `Si ${v('a')} és el costat més llarg d'un triangle, comparem ${sq(v('a'))} amb ${sq(v('b'))} + ${sq(v('c'))}:`, `Si ${v('a')} es el lado más largo de un triángulo, comparamos ${sq(v('a'))} con ${sq(v('b'))} + ${sq(v('c'))}:`, `If ${v('a')} is the longest side of a triangle, compare ${sq(v('a'))} with ${sq(v('b'))} + ${sq(v('c'))}:`)}</p>
      <ul>
        <li>${sq(v('a'))} = ${sq(v('b'))} + ${sq(v('c'))} → <b>${T(L, 'rectangle', 'rectángulo', 'right-angled')}</b></li>
        <li>${sq(v('a'))} &lt; ${sq(v('b'))} + ${sq(v('c'))} → <b>${T(L, 'acutangle', 'acutángulo', 'acute')}</b></li>
        <li>${sq(v('a'))} &gt; ${sq(v('b'))} + ${sq(v('c'))} → <b>${T(L, 'obtusangle', 'obtusángulo', 'obtuse')}</b></li>
      </ul>
      <div class="example"><span class="t">${T(L, 'Ternes pitagòriques', 'Ternas pitagóricas', 'Pythagorean triples')}</span>
        <p>${T(L, 'Són tres nombres naturals que compleixen el teorema. Val la pena saber-ne algunes:', 'Son tres números naturales que cumplen el teorema. Vale la pena saberse algunas:', 'Three whole numbers that satisfy the theorem. It is worth knowing a few:')} <span class="calc inl">(3, 4, 5) · (5, 12, 13) · (8, 15, 17) · (7, 24, 25)</span></p>
      </div>` });

    s.push({ id: 'apl', title: T(L, 'Aplicacions', 'Aplicaciones', 'Applications'), html: `
      <p>${T(L, 'Sempre que hi hagi un angle recte, busca el triangle rectangle amagat:', 'Siempre que haya un ángulo recto, busca el triángulo rectángulo escondido:', 'Whenever there is a right angle, look for the hidden right-angled triangle:')}</p>
      <ul>
        <li>${T(L, '<b>Diagonal d\'un rectangle</b>: els costats són els catets.', '<b>Diagonal de un rectángulo</b>: los lados son los catetos.', '<b>Diagonal of a rectangle</b>: the sides are the legs.')}</li>
        <li>${T(L, '<b>Altura d\'un triangle isòsceles</b>: la meitat de la base i l\'altura són els catets.', '<b>Altura de un triángulo isósceles</b>: la mitad de la base y la altura son los catetos.', '<b>Height of an isosceles triangle</b>: half the base and the height are the legs.')}</li>
        <li>${T(L, '<b>Una escala recolzada a la paret</b>: l\'escala és la hipotenusa.', '<b>Una escalera apoyada en la pared</b>: la escalera es la hipotenusa.', '<b>A ladder against a wall</b>: the ladder is the hypotenuse.')}</li>
        <li>${T(L, '<b>Polzades d\'una pantalla</b>: mesuren la diagonal.', '<b>Pulgadas de una pantalla</b>: miden la diagonal.', '<b>Screen size in inches</b>: it measures the diagonal.')}</li>
      </ul>` });
    return s;
  }

  // ---------- GENERADORS ----------
  const scaled = () => { const [b, c, a] = pick(TRIPLES); const k = pick([1, 1, 2]); return [b * k, c * k, a * k]; };

  function hyp(L) {
    const [b, c, a] = scaled(), u = pick(['cm', 'm']);
    return { q: `<p>${T(L, `Calcula la hipotenusa (en ${u}):`, `Calcula la hipotenusa (en ${u}):`, `Find the hypotenuse (in ${u}):`)}</p><div class="fig">${tri(b, c, `${b} ${u}`, `${c} ${u}`, '?')}</div>`,
      kind: 'num', check: near(a),
      hint: T(L, `${sq(v('a'))} = ${b}<sup>2</sup> + ${c}<sup>2</sup>. Després fes l'arrel quadrada.`, `${sq(v('a'))} = ${b}<sup>2</sup> + ${c}<sup>2</sup>. Después haz la raíz cuadrada.`, `${sq(v('a'))} = ${b}<sup>2</sup> + ${c}<sup>2</sup>. Then take the square root.`),
      sol: `<div class="calc">${v('a')} = √<span class="ov">${b * b} + ${c * c}</span> = √<span class="ov">${a * a}</span> = ${a} ${u}</div>` };
  }

  function leg(L) {
    const [b, c, a] = scaled(), u = pick(['cm', 'm']);
    return { q: `<p>${T(L, `Calcula el catet que falta (en ${u}):`, `Calcula el cateto que falta (en ${u}):`, `Find the missing leg (in ${u}):`)}</p><div class="fig">${tri(b, c, `${b} ${u}`, '?', `${a} ${u}`)}</div>`,
      kind: 'num', check: near(c),
      hint: T(L, 'Per a un catet, resta: hipotenusa al quadrat menys l\'altre catet al quadrat.', 'Para un cateto, resta: hipotenusa al cuadrado menos el otro cateto al cuadrado.', 'For a leg, subtract: hypotenuse squared minus the other leg squared.'),
      sol: `<div class="calc">${v('c')} = √<span class="ov">${a * a} − ${b * b}</span> = √<span class="ov">${c * c}</span> = ${c} ${u}</div>` };
  }

  function isRight(L) {
    let [b, c, a] = pick(TRIPLES); const yes = Math.random() < 0.5;
    if (!yes) a += pick([-1, 1]);
    const YES = T(L, 'Sí', 'Sí', 'Yes'), NO = T(L, 'No', 'No', 'No');
    const sides = [b, c, a].sort(() => Math.random() - 0.5);
    return { q: `<p>${T(L, `Un triangle té costats de ${sides.join(', ')} cm. És rectangle?`, `Un triángulo tiene lados de ${sides.join(', ')} cm. ¿Es rectángulo?`, `A triangle has sides ${sides.join(', ')} cm. Is it right-angled?`)}</p>`,
      kind: 'choice', options: [YES, NO], check: (x) => x === (yes ? YES : NO),
      hint: T(L, 'Eleva al quadrat el costat més llarg i compara\'l amb la suma dels quadrats dels altres dos.', 'Eleva al cuadrado el lado más largo y compáralo con la suma de los cuadrados de los otros dos.', 'Square the longest side and compare it with the sum of the squares of the other two.'),
      sol: `<div class="calc">${a}<sup>2</sup> = ${a * a} ${yes ? '=' : '≠'} ${b}<sup>2</sup> + ${c}<sup>2</sup> = ${b * b + c * c}</div>` };
  }

  function hypDec(L) {
    let b, c; do { b = rnd(2, 15); c = rnd(2, 15); } while (Number.isInteger(Math.sqrt(b * b + c * c)));
    const a = Math.sqrt(b * b + c * c), findLeg = Math.random() < 0.4;
    if (findLeg) {
      const big = Math.max(b, c) + rnd(1, 6), small = Math.min(b, c), ans = Math.sqrt(big * big - small * small);
      return { q: `<p>${T(L, 'Calcula el catet que falta.', 'Calcula el cateto que falta.', 'Find the missing leg.')} ${ROUND(L)}</p><div class="fig">${tri(small, ans, `${small} cm`, '?', `${big} cm`)}</div>`,
        kind: 'num', check: near(Math.round(ans * 100) / 100),
        hint: T(L, `√(${big}² − ${small}²)`, `√(${big}² − ${small}²)`, `√(${big}² − ${small}²)`),
        sol: `<div class="calc">√<span class="ov">${big * big} − ${small * small}</span> = √<span class="ov">${big * big - small * small}</span> ≈ ${fmt(ans, L)} cm</div>` };
    }
    return { q: `<p>${T(L, 'Calcula la hipotenusa.', 'Calcula la hipotenusa.', 'Find the hypotenuse.')} ${ROUND(L)}</p><div class="fig">${tri(b, c, `${b} cm`, `${c} cm`, '?')}</div>`,
      kind: 'num', check: near(Math.round(a * 100) / 100),
      hint: T(L, 'L\'arrel no és exacta: fes servir la calculadora.', 'La raíz no es exacta: usa la calculadora.', 'The root is not exact: use a calculator.'),
      sol: `<div class="calc">√<span class="ov">${b * b} + ${c * c}</span> = √<span class="ov">${b * b + c * c}</span> ≈ ${fmt(a, L)} cm</div>` };
  }

  function classify(L) {
    let x, y, z; do { x = rnd(3, 15); y = rnd(3, 15); z = rnd(Math.max(x, y), x + y - 1); } while (z < Math.max(x, y));
    if (Math.random() < 0.3) { const t = pick(TRIPLES); [x, y, z] = t; }
    const A = T(L, 'acutangle', 'acutángulo', 'acute'), R = T(L, 'rectangle', 'rectángulo', 'right'), O = T(L, 'obtusangle', 'obtusángulo', 'obtuse');
    const s2 = x * x + y * y, z2 = z * z, ans = z2 === s2 ? R : z2 < s2 ? A : O;
    return { q: `<p>${T(L, `Classifica segons els angles el triangle de costats ${x}, ${y} i ${z} cm.`, `Clasifica según sus ángulos el triángulo de lados ${x}, ${y} y ${z} cm.`, `Classify by its angles the triangle with sides ${x}, ${y} and ${z} cm.`)}</p>`,
      kind: 'choice', options: [A, R, O], check: (k) => k === ans,
      hint: T(L, `Compara ${z}<sup>2</sup> amb ${x}<sup>2</sup> + ${y}<sup>2</sup>.`, `Compara ${z}<sup>2</sup> con ${x}<sup>2</sup> + ${y}<sup>2</sup>.`, `Compare ${z}<sup>2</sup> with ${x}<sup>2</sup> + ${y}<sup>2</sup>.`),
      sol: `<div class="calc">${z}<sup>2</sup> = ${z2} ${z2 === s2 ? '=' : z2 < s2 ? '&lt;' : '&gt;'} ${s2} = ${x}<sup>2</sup> + ${y}<sup>2</sup> → ${ans}</div>` };
  }

  function rectDiag(L) {
    const [b, c, a] = scaled();
    return { q: `<p>${T(L, `Un camp de futbol sala fa ${c * 2} m de llarg i ${b * 2} m d'ample. Quants metres recorre un jugador que el travessa en diagonal?`,
                         `Una pista de fútbol sala mide ${c * 2} m de largo y ${b * 2} m de ancho. ¿Cuántos metros recorre un jugador que la cruza en diagonal?`,
                         `A futsal pitch is ${c * 2} m long and ${b * 2} m wide. How many metres does a player run crossing it diagonally?`)}</p>`,
      kind: 'num', check: near(a * 2),
      hint: T(L, 'La diagonal és la hipotenusa d\'un triangle rectangle amb els costats del camp com a catets.', 'La diagonal es la hipotenusa de un triángulo rectángulo con los lados de la pista como catetos.', 'The diagonal is the hypotenuse of a right triangle whose legs are the sides of the pitch.'),
      sol: `<div class="calc">${v('d')} = √<span class="ov">${c * 2}<sup>2</sup> + ${b * 2}<sup>2</sup></span> = √<span class="ov">${4 * a * a}</span> = ${a * 2} m</div>` };
  }

  function ladder(L) {
    const [b, c, a] = pick(TRIPLES.slice(0, 5)), k = pick([0.5, 1]), foot = Math.min(b, c) * k, len = a * k, h = Math.max(b, c) * k;
    return { q: `<p>${T(L, `Una escala de ${fmt(len, L)} m està recolzada a una paret. El peu de l'escala és a ${fmt(foot, L)} m de la paret. A quina altura arriba?`,
                         `Una escalera de ${fmt(len, L)} m está apoyada en una pared. El pie de la escalera está a ${fmt(foot, L)} m de la pared. ¿A qué altura llega?`,
                         `A ${fmt(len, L)} m ladder leans against a wall. Its foot is ${fmt(foot, L)} m from the wall. How high up the wall does it reach?`)}</p>
            <div class="fig">${tri(foot, h, `${fmt(foot, L)} m`, '?', `${fmt(len, L)} m`, 200)}</div>`,
      kind: 'num', check: near(h),
      hint: T(L, 'L\'escala és la hipotenusa; busques un catet.', 'La escalera es la hipotenusa; buscas un cateto.', 'The ladder is the hypotenuse; you want a leg.'),
      sol: `<div class="calc">${v('h')} = √<span class="ov">${fmt(len, L)}<sup>2</sup> − ${fmt(foot, L)}<sup>2</sup></span> = √<span class="ov">${fmt(h * h, L)}</span> = ${fmt(h, L)} m</div>` };
  }

  function isosceles(L) {
    const [b, c, a] = pick(TRIPLES), half = b, base = 2 * b, side = a, h = c;
    return { q: `<p>${T(L, `Un triangle isòsceles té els costats iguals de ${side} cm i la base de ${base} cm. Calcula'n l'altura.`,
                         `Un triángulo isósceles tiene los lados iguales de ${side} cm y la base de ${base} cm. Calcula su altura.`,
                         `An isosceles triangle has equal sides of ${side} cm and a base of ${base} cm. Find its height.`)}</p>`,
      kind: 'num', check: near(h),
      hint: T(L, `L'altura divideix la base en dues meitats de ${half} cm. Mira el triangle rectangle que queda.`, `La altura divide la base en dos mitades de ${half} cm. Mira el triángulo rectángulo que queda.`, `The height splits the base into two halves of ${half} cm. Look at the right triangle that forms.`),
      sol: `<div class="calc">${v('h')} = √<span class="ov">${side}<sup>2</sup> − ${half}<sup>2</sup></span> = √<span class="ov">${side * side - half * half}</span> = ${h} cm</div>` };
  }

  function screen(L) {
    const [b, c, a] = pick([[3, 4, 5], [9, 12, 15], [12, 16, 20]]), k = pick([3, 4, 5, 6]);
    const w = c * k, hh = b * k, d = a * k, inch = d / 2.54;
    return { q: `<p>${T(L, `La pantalla d'un ordinador fa ${w} cm d'amplada i ${hh} cm d'altura. Quantes polzades té? (1 polzada = 2,54 cm) ${ROUND(L)}`,
                         `La pantalla de un ordenador mide ${w} cm de ancho y ${hh} cm de alto. ¿Cuántas pulgadas tiene? (1 pulgada = 2,54 cm) ${ROUND(L)}`,
                         `A computer screen is ${w} cm wide and ${hh} cm high. What size is it in inches? (1 inch = 2.54 cm) ${ROUND(L)}`)}</p>`,
      kind: 'num', check: near(Math.round(inch * 100) / 100),
      hint: T(L, 'Primer calcula la diagonal en cm i després divideix entre 2,54.', 'Primero calcula la diagonal en cm y después divide entre 2,54.', 'First find the diagonal in cm, then divide by 2.54.'),
      sol: `<div class="calc">${v('d')} = √<span class="ov">${w}<sup>2</sup> + ${hh}<sup>2</sup></span> = ${d} cm → ${d} : 2,54 ≈ ${fmt(inch, L)}″</div>` };
  }

  function rhombus(L) {
    const [b, c, a] = pick(TRIPLES), D = 2 * c, d = 2 * b;
    return { q: `<p>${T(L, `Les diagonals d'un rombe fan ${D} cm i ${d} cm. Quant fa cada costat?`, `Las diagonales de un rombo miden ${D} cm y ${d} cm. ¿Cuánto mide cada lado?`, `The diagonals of a rhombus are ${D} cm and ${d} cm. How long is each side?`)}</p>`,
      kind: 'num', check: near(a),
      hint: T(L, 'Les diagonals d\'un rombe es tallen per la meitat i en angle recte.', 'Las diagonales de un rombo se cortan por la mitad y en ángulo recto.', 'A rhombus\'s diagonals bisect each other at right angles.'),
      sol: `<div class="calc">${v('l')} = √<span class="ov">${c}<sup>2</sup> + ${b}<sup>2</sup></span> = √<span class="ov">${a * a}</span> = ${a} cm</div>` };
  }

  // ---------- LABORATORI ----------
  function explore(root, L) {
    root.innerHTML = `
      <div class="lab">
        <div class="lab-card">
          <h2>${T(L, 'Els quadrats de Pitàgores', 'Los cuadrados de Pitágoras', 'Pythagoras\' squares')}</h2>
          <p>${T(L, 'Canvia els catets. Fixa\'t que l\'àrea del quadrat gran (verd) sempre és la suma de les àrees dels dos petits.', 'Cambia los catetos. Fíjate en que el área del cuadrado grande (verde) siempre es la suma de las áreas de los dos pequeños.', 'Change the legs. Notice that the area of the big (green) square is always the sum of the two small ones.')}</p>
          <div class="lab-grid">
            <div class="ctrl">
              <label for="py-b">${T(L, 'Catet', 'Cateto', 'Leg')} ${v('b')} = <output id="py-bo"></output><input type="range" id="py-b" min="1" max="12" step="0.5" value="4"></label>
              <label for="py-c">${T(L, 'Catet', 'Cateto', 'Leg')} ${v('c')} = <output id="py-co"></output><input type="range" id="py-c" min="1" max="12" step="0.5" value="3"></label>
              <label class="check"><input type="checkbox" id="py-g" checked> ${T(L, 'Mostra la quadrícula', 'Muestra la cuadrícula', 'Show the grid')}</label>
              <div class="readout">
                <div><span>${sq(v('b'))} + ${sq(v('c'))}</span><b id="py-s"></b></div>
                <div><span>${T(L, 'Hipotenusa', 'Hipotenusa', 'Hypotenuse')} ${v('a')}</span><b id="py-a"></b></div>
              </div>
            </div>
            <div class="viz" id="py-viz"></div>
          </div>
        </div>
      </div>`;
    const $ = (id) => root.querySelector('#' + id);
    function draw() {
      const b = +$('py-b').value, c = +$('py-c').value, a = Math.sqrt(b * b + c * c);
      $('py-bo').textContent = fmt(b, L); $('py-co').textContent = fmt(c, L);
      $('py-s').textContent = `${fmt(b * b, L)} + ${fmt(c * c, L)} = ${fmt(b * b + c * c, L)}`;
      $('py-a').textContent = (Number.isInteger(Math.round(a * 1000) / 1000) ? '' : '≈ ') + fmt(a, L);
      $('py-viz').innerHTML = squares(b, c, 380, $('py-g').checked && Number.isInteger(b) && Number.isInteger(c), L);
    }
    ['py-b', 'py-c', 'py-g'].forEach((id) => $(id).addEventListener('input', draw));
    draw();
  }

  QM.units['2eso-pitagores'] = {
    theory, explore,
    board: () => `${sq(v('a'))} = ${sq(v('b'))} + ${sq(v('c'))}`,
    levels: {
      1: [hyp, leg, isRight],
      2: [hypDec, classify, rectDiag],
      3: [ladder, isosceles, screen, rhombus],
    },
  };
})();
