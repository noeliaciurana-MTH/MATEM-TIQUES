// ---------- AL PATI: una activitat a l'aire lliure per unitat ----------
// U.outdoor(L) → { title, lead, time, group, materials[], steps[{html, ce, tr}], tool?, init?, close }
(function () {
  const { F, T, v } = QM;
  const fmt = (x, L, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toLocaleString(L === 'es' ? 'es-ES' : L === 'en' ? 'en-GB' : 'ca-ES');

  // ===== FRACCIONS: la recta numèrica gegant =====
  const FCARDS = [[1, 2], [2, 4], [1, 4], [3, 4], [6, 8], [1, 3], [2, 6], [2, 3], [1, 5], [2, 5], [4, 10], [3, 5], [4, 5], [5, 4], [3, 2], [6, 4], [5, 3], [7, 4], [2, 1], [4, 2], [3, 8], [5, 8], [7, 10], [9, 6]];
  QM.units['1eso-fraccions'].outdoor = (L) => ({
    title: T(L, 'La recta numèrica gegant', 'La recta numérica gigante', 'The giant number line'),
    lead: T(L,
      'Al pati, dibuixem amb guix una recta del 0 al 2 de 8 metres. Cada alumne rep una targeta amb una fracció i s\'hi ha de col·locar a sobre. Qui coincideix al mateix lloc?',
      'En el patio, dibujamos con tiza una recta del 0 al 2 de 8 metros. Cada alumno recibe una tarjeta con una fracción y debe colocarse encima. ¿Quién coincide en el mismo sitio?',
      'In the playground, draw a chalk number line from 0 to 2, 8 metres long. Each student gets a fraction card and must stand on it. Who ends up in the same place?'),
    time: '50 min', group: T(L, 'Tota la classe, en equips de 4', 'Toda la clase, en equipos de 4', 'Whole class, teams of 4'),
    materials: [T(L, 'Guix', 'Tiza', 'Chalk'), T(L, 'Cinta mètrica (10 m)', 'Cinta métrica (10 m)', 'Tape measure (10 m)'), T(L, 'Targetes de fraccions (imprimiu-les a sota)', 'Tarjetas de fracciones (imprimidlas abajo)', 'Fraction cards (print them below)'), T(L, 'Llibreta i llapis', 'Libreta y lápiz', 'Notebook and pencil')],
    steps: [
      { ce: [6, 9], tr: ['emp'], html: T(L,
        'Cada equip dibuixa un tram de la recta: marqueu el 0, l\'1 (a 4 m) i el 2 (a 8 m). Com dividireu cada metre per poder situar quarts, terços i cinquens?',
        'Cada equipo dibuja un tramo de la recta: marcad el 0, el 1 (a 4 m) y el 2 (a 8 m). ¿Cómo dividiréis cada metro para poder situar cuartos, tercios y quintos?',
        'Each team draws part of the line: mark 0, 1 (at 4 m) and 2 (at 8 m). How will you split each metre to place quarters, thirds and fifths?') },
      { ce: [5, 7], tr: ['cpsaa'], html: T(L,
        `Cada alumne agafa una targeta i es col·loca al seu punt. Abans de moure's, calculeu a quants metres del 0 està: per exemple, ${F(3, 4)} → ${F(3, 4)} · 4 m = 3 m.`,
        `Cada alumno coge una tarjeta y se coloca en su punto. Antes de moverse, calculad a cuántos metros del 0 está: por ejemplo, ${F(3, 4)} → ${F(3, 4)} · 4 m = 3 m.`,
        `Each student takes a card and stands on its point. Before moving, work out how many metres from 0 it is: for example, ${F(3, 4)} → ${F(3, 4)} · 4 m = 3 m.`) },
      { ce: [3, 2], tr: ['cpsaa', 'ciu'], html: T(L,
        'Qui està al mateix lloc? Formuleu una regla per saber quan dues fraccions són equivalents i comproveu-la amb les altres parelles. Si algú està mal situat, l\'equip li ho explica sense donar la resposta.',
        '¿Quién está en el mismo sitio? Formulad una regla para saber cuándo dos fracciones son equivalentes y comprobadla con las otras parejas. Si alguien está mal situado, el equipo se lo explica sin dar la respuesta.',
        'Who is in the same place? Make up a rule for when two fractions are equivalent and test it on the other pairs. If someone is in the wrong place, the team explains why without giving the answer.') },
      { ce: [1, 7], tr: ['cpsaa'], html: T(L,
        'Ordeneu-vos de menor a major sense parlar. Després, feu una foto des de dalt i copieu la recta a la llibreta amb totes les fraccions.',
        'Ordenaos de menor a mayor sin hablar. Después, haced una foto desde arriba y copiad la recta en la libreta con todas las fracciones.',
        'Line up from smallest to largest without talking. Then take a photo from above and copy the line into your notebook with every fraction.') },
    ],
    tool: `<h3>${T(L, 'Targetes per imprimir i retallar', 'Tarjetas para imprimir y recortar', 'Cards to print and cut out')}</h3>
      <div class="cards">${FCARDS.map(([a, b]) => `<div class="card">${F(a, b)}</div>`).join('')}</div>
      <p class="muted">${T(L, 'Hi ha parelles equivalents (½ i 2/4, ¾ i 6/8...) perquè coincideixin al mateix punt.', 'Hay parejas equivalentes (½ y 2/4, ¾ y 6/8...) para que coincidan en el mismo punto.', 'There are equivalent pairs (½ and 2/4, ¾ and 6/8...) so they meet at the same point.')}</p>`,
    close: T(L, 'De tornada a classe: per què ' + F(4, 2) + ' i 2 estan al mateix lloc?', 'De vuelta en clase: ¿por qué ' + F(4, 2) + ' y 2 están en el mismo sitio?', 'Back in class: why are ' + F(4, 2) + ' and 2 in the same place?'),
  });

  // ===== EQUACIONS: cursa d'orientació =====
  // Cada estació té una equació; la solució és el número de la propera estació.
  function course(n, seed) {
    return QM.seeded(seed, () => {
      const order = [...Array(n).keys()].map((i) => i + 1);
      for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      return order.map((st, i) => {
        const x = order[(i + 1) % n];
        const a = QM.rnd(2, 6), b = QM.rnd(-9, 12) || 3, c = a * x + b;
        const kind = Math.random() < 0.5 ? 0 : 1;
        let eq;
        if (kind === 0) eq = `${a}${v('x')} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}`;
        else { const d = QM.rnd(1, a - 1), e = c - d * x; eq = `${a}${v('x')} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${d === 1 ? '' : d}${v('x')}${e === 0 ? '' : ` ${e < 0 ? '−' : '+'} ${Math.abs(e)}`}`; }
        return { st, eq, x };
      });
    });
  }
  QM.units['2eso-equacions'].outdoor = (L) => ({
    title: T(L, 'Cursa d\'orientació d\'equacions', 'Carrera de orientación de ecuaciones', 'Equation orienteering race'),
    lead: T(L,
      'Amagueu 8 estacions numerades pel pati. A cada estació hi ha una equació: la solució us diu a quina estació heu d\'anar. Si us equivoqueu, arribareu a una estació que no toca i ho notareu de seguida.',
      'Esconded 8 estaciones numeradas por el patio. En cada estación hay una ecuación: la solución os dice a qué estación tenéis que ir. Si os equivocáis, llegaréis a una estación que no toca y lo notaréis enseguida.',
      'Hide 8 numbered stations around the playground. Each station has an equation: its solution tells you which station to go to next. If you get it wrong, you reach a station that does not fit and you notice straight away.'),
    time: '50 min', group: T(L, 'Parelles o equips de 3', 'Parejas o equipos de 3', 'Pairs or teams of 3'),
    materials: [T(L, 'Les 8 targetes d\'estació (imprimiu-les a sota)', 'Las 8 tarjetas de estación (imprimidlas abajo)', 'The 8 station cards (print them below)'), T(L, 'Cinta adhesiva', 'Cinta adhesiva', 'Tape'), T(L, 'Full de ruta i llapis per equip', 'Hoja de ruta y lápiz por equipo', 'Route sheet and pencil per team'), T(L, 'Cronòmetre (opcional)', 'Cronómetro (opcional)', 'Stopwatch (optional)')],
    steps: [
      { ce: [9], tr: ['cpsaa'], html: T(L,
        'Cada equip comença en una estació diferent i apunta al full de ruta el número d\'inici. Repartiu-vos els papers: qui resol, qui comprova i qui orienta.',
        'Cada equipo empieza en una estación distinta y apunta en la hoja de ruta el número de inicio. Repartid los papeles: quién resuelve, quién comprueba y quién orienta.',
        'Each team starts at a different station and writes the starting number on the route sheet. Share the roles: solver, checker and navigator.') },
      { ce: [1, 7], tr: ['cpsaa'], html: T(L,
        'A cada estació, resoleu l\'equació al full de ruta, escrivint tots els passos.',
        'En cada estación, resolved la ecuación en la hoja de ruta, escribiendo todos los pasos.',
        'At each station, solve the equation on the route sheet, writing every step.') },
      { ce: [2], tr: ['cpsaa'], html: T(L,
        `Abans de córrer, comproveu la solució substituint ${v('x')} a l'equació. Si la solució no és un nombre de l'1 al 8, hi ha un error: busqueu-lo.`,
        `Antes de correr, comprobad la solución sustituyendo ${v('x')} en la ecuación. Si la solución no es un número del 1 al 8, hay un error: buscadlo.`,
        `Before running, check the solution by substituting ${v('x')} into the equation. If the solution is not a number from 1 to 8, there is a mistake: find it.`) },
      { ce: [8, 2], tr: ['emp'], html: T(L,
        'Quan torneu a l\'estació inicial, heu acabat el circuit. Si us hi heu perdut, analitzeu al full de ruta en quin pas us vau equivocar.',
        'Cuando volváis a la estación inicial, habréis terminado el circuito. Si os habéis perdido, analizad en la hoja de ruta en qué paso os equivocasteis.',
        'When you get back to your starting station, you have finished the circuit. If you got lost, use the route sheet to find which step went wrong.') },
    ],
    tool: `<h3>${T(L, 'Targetes d\'estació', 'Tarjetas de estación', 'Station cards')}</h3>
      <div class="actions noprint"><button type="button" class="btn ghost" id="od-new">${T(L, 'Nou circuit', 'Nuevo circuito', 'New circuit')}</button>
        <label class="check"><input type="checkbox" id="od-key"> ${T(L, 'Mostra les solucions (només docent)', 'Muestra las soluciones (solo docente)', 'Show answers (teacher only)')}</label></div>
      <div class="cards wide" id="od-cards"></div>`,
    init(root) {
      let seed = 1000 + Math.floor(Math.random() * 9000);
      const draw = () => {
        const key = root.querySelector('#od-key').checked;
        root.querySelector('#od-cards').innerHTML = course(8, seed).map((c) =>
          `<div class="card station"><span class="stn">${T(L, 'Estació', 'Estación', 'Station')} ${c.st}</span><span class="calc">${c.eq}</span>${key ? `<span class="muted">→ ${c.x}</span>` : ''}</div>`).join('');
      };
      root.querySelector('#od-new').onclick = () => { seed = 1000 + Math.floor(Math.random() * 9000); draw(); };
      root.querySelector('#od-key').onchange = draw; draw();
    },
    close: T(L, 'De tornada a classe: quin error us ha fet perdre més vegades? Apunteu-lo a «El meu informe».', 'De vuelta en clase: ¿qué error os ha hecho perder más veces? Apuntadlo en «Mi informe».', 'Back in class: which mistake made you get lost most often? Note it in "My report".'),
  });

  // ===== PITÀGORES: la corda de 12 nusos i la diagonal de la pista =====
  QM.units['2eso-pitagores'].outdoor = (L) => ({
    title: T(L, 'La corda de 12 nusos', 'La cuerda de 12 nudos', 'The 12-knot rope'),
    lead: T(L,
      'Fa més de 3.000 anys, els agrimensors egipcis feien angles rectes amb una corda de 12 nusos. Nosaltres la farem servir per comprovar si les cantonades de la pista són rectes i, després, calcularem la diagonal de la pista abans de mesurar-la.',
      'Hace más de 3.000 años, los agrimensores egipcios hacían ángulos rectos con una cuerda de 12 nudos. Nosotros la usaremos para comprobar si las esquinas de la pista son rectas y, después, calcularemos la diagonal de la pista antes de medirla.',
      'Over 3,000 years ago, Egyptian surveyors made right angles with a 12-knot rope. We will use one to check whether the corners of the court are square and then work out the court\'s diagonal before measuring it.'),
    time: '55 min', group: T(L, 'Equips de 4', 'Equipos de 4', 'Teams of 4'),
    materials: [T(L, 'Una corda d\'uns 13 m per equip', 'Una cuerda de unos 13 m por equipo', 'A rope about 13 m long per team'), T(L, 'Cinta mètrica llarga (20 m o més)', 'Cinta métrica larga (20 m o más)', 'Long tape measure (20 m or more)'), T(L, 'Guix', 'Tiza', 'Chalk'), T(L, 'Llibreta i llapis', 'Libreta y lápiz', 'Notebook and pencil')],
    steps: [
      { ce: [6, 9], tr: ['emp'], html: T(L,
        'Feu 12 nusos a la corda, separats 1 m (12 trams iguals, tancant-la en un anell). Estireu-la entre tres companys formant un triangle de costats 3, 4 i 5 trams.',
        'Haced 12 nudos en la cuerda, separados 1 m (12 tramos iguales, cerrándola en un anillo). Estiradla entre tres compañeros formando un triángulo de lados 3, 4 y 5 tramos.',
        'Tie 12 knots in the rope, 1 m apart (12 equal sections, closed into a loop). Stretch it between three classmates into a triangle with sides of 3, 4 and 5 sections.') },
      { ce: [3, 5], tr: ['cpsaa'], html: T(L,
        `Quin angle es forma? Proveu ara amb 2, 5 i 5 trams, o amb 3, 3 i 6. Per què només 3-4-5 dona un angle recte? Relacioneu-ho amb ${v('a')}² = ${v('b')}² + ${v('c')}².`,
        `¿Qué ángulo se forma? Probad ahora con 2, 5 y 5 tramos, o con 3, 3 y 6. ¿Por qué solo 3-4-5 da un ángulo recto? Relacionadlo con ${v('a')}² = ${v('b')}² + ${v('c')}².`,
        `What angle do you get? Now try 2, 5 and 5 sections, or 3, 3 and 6. Why does only 3-4-5 give a right angle? Link it to ${v('a')}² = ${v('b')}² + ${v('c')}².`) },
      { ce: [2, 6], tr: ['ciu'], html: T(L,
        'Poseu la corda a les cantonades de la pista de bàsquet o de futbol. Són angles rectes de debò? Apunteu-ho.',
        'Poned la cuerda en las esquinas de la pista de baloncesto o de fútbol. ¿Son ángulos rectos de verdad? Apuntadlo.',
        'Place the rope at the corners of the basketball or football court. Are they really right angles? Write it down.') },
      { ce: [1, 2], tr: ['cpsaa', 'dig'], html: T(L,
        'Mesureu la llargada i l\'amplada de la pista. Calculeu la diagonal amb Pitàgores i, després, mesureu-la. Entreu les dades a la taula de sota per veure l\'error que heu fet.',
        'Medid el largo y el ancho de la pista. Calculad la diagonal con Pitágoras y, después, medidla. Introducid los datos en la tabla de abajo para ver el error cometido.',
        'Measure the length and width of the court. Work out the diagonal with Pythagoras, then measure it. Enter the data in the table below to see your error.') },
    ],
    tool: `<h3>${T(L, 'Calcula i compara', 'Calcula y compara', 'Calculate and compare')}</h3>
      <div class="tool-grid">
        <div class="ctrl">
          <label for="od-l">${T(L, 'Llargada mesurada (m)', 'Largo medido (m)', 'Measured length (m)')}<input class="txt" id="od-l" inputmode="decimal" value="28"></label>
          <label for="od-w">${T(L, 'Amplada mesurada (m)', 'Ancho medido (m)', 'Measured width (m)')}<input class="txt" id="od-w" inputmode="decimal" value="15"></label>
          <label for="od-d">${T(L, 'Diagonal mesurada (m)', 'Diagonal medida (m)', 'Measured diagonal (m)')}<input class="txt" id="od-d" inputmode="decimal" placeholder="?"></label>
        </div>
        <div class="viz"><div class="readout" id="od-out"></div></div>
      </div>`,
    init(root) {
      const num = (id) => parseFloat(String(root.querySelector('#' + id).value).replace(',', '.').replace('−', '-'));
      const draw = () => {
        const l = num('od-l'), w = num('od-w'), d = num('od-d');
        const ok = l > 0 && w > 0, calc = ok ? Math.hypot(l, w) : NaN;
        const err = ok && d > 0 ? Math.abs(d - calc) / calc * 100 : NaN;
        root.querySelector('#od-out').innerHTML = `
          <div><span>${T(L, 'Diagonal calculada', 'Diagonal calculada', 'Calculated diagonal')}</span><b>${ok ? fmt(calc, L) + ' m' : '—'}</b></div>
          <div><span>${T(L, 'Diferència', 'Diferencia', 'Difference')}</span><b>${isNaN(err) ? '—' : fmt(Math.abs(d - calc), L) + ' m'}</b></div>
          <div><span>${T(L, 'Error relatiu', 'Error relativo', 'Relative error')}</span><b>${isNaN(err) ? '—' : fmt(err, L, 1) + ' %'}</b></div>`;
      };
      ['od-l', 'od-w', 'od-d'].forEach((id) => root.querySelector('#' + id).addEventListener('input', draw)); draw();
    },
    close: T(L, 'De tornada a classe: per què la diagonal mesurada no coincideix exactament amb la calculada? D\'on poden venir les diferències?', 'De vuelta en clase: ¿por qué la diagonal medida no coincide exactamente con la calculada? ¿De dónde pueden venir las diferencias?', 'Back in class: why doesn\'t the measured diagonal match the calculated one exactly? Where could the differences come from?'),
  });
})();
