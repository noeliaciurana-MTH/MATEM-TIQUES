// ---------- QUÈ S'AVALUA A CADA MOMENT ----------
// Per a cada moment de la unitat: competències específiques (ce), competències
// transversals (tr) i l'evidència que en recull el docent (how).
// U.cur.ce i U.cur.transv es calculen com la unió de tots els moments.
(function () {
  const H = (ca, es, en) => ({ ca, es, en });

  // Moments comuns a totes les unitats (mateixa lògica didàctica)
  const COMMON = {
    teoria: { ce: [5, 7], tr: ['cpsaa'], how: H(
      'Lectura guiada i exemples resolts. L\'alumnat reformula la regla amb les seves paraules a la llibreta.',
      'Lectura guiada y ejemplos resueltos. El alumnado reformula la regla con sus palabras en la libreta.',
      'Guided reading and worked examples. Students restate the rule in their own words in their notebook.') },
    repte: { ce: [1, 8], tr: ['cpsaa'], how: H(
      '10 preguntes amb temps. Puntuació i temps queden a l\'informe; es valora la millora, no la nota.',
      '10 preguntas con tiempo. Puntuación y tiempo quedan en el informe; se valora la mejora, no la nota.',
      '10 timed questions. Score and time go to the report; improvement is what counts, not the mark.') },
    paper: { ce: [2, 7], tr: ['cpsaa'], how: H(
      'Procés escrit a la llibreta (revisió del docent) i autocorrecció dels resultats amb el codi de la fitxa.',
      'Proceso escrito en la libreta (revisión del docente) y autocorrección de los resultados con el código de la ficha.',
      'Working written in the notebook (teacher review) and self-marking of answers with the worksheet code.') },
    informe: { ce: [8], tr: ['cpsaa', 'dig'], how: H(
      'L\'alumnat llegeix els seus errors freqüents i escriu un objectiu de millora. El docent agrega els codis.',
      'El alumnado lee sus errores frecuentes y escribe un objetivo de mejora. El docente agrega los códigos.',
      'Students read their common mistakes and write an improvement goal. The teacher aggregates the codes.') },
  };
  const PRACT_HOW = H(
    'Encerts al primer intent i errors diagnosticats (registre automàtic a l\'informe).',
    'Aciertos al primer intento y errores diagnosticados (registro automático en el informe).',
    'First-try success and diagnosed mistakes (logged automatically in the report).');

  const M = {
    '1eso-fraccions': {
      situacio: { ce: [1, 6, 9], tr: ['ciu', 'emp'] },
      steps: [
        { ce: [5], tr: ['cpsaa'] },
        { ce: [1, 2, 9], tr: ['cpsaa', 'dig'] },
        { ce: [1, 6], tr: ['ciu'] },
        { ce: [8], tr: ['cpsaa'] },
      ],
      product: { ce: [6, 7], tr: ['ciu', 'emp'], how: H(
        'Fitxa de recepta del grup: quantitats correctes en fracció i decimal, i proposta contra el malbaratament.',
        'Ficha de receta del grupo: cantidades correctas en fracción y decimal, y propuesta contra el desperdicio.',
        'Group recipe card: correct amounts as fractions and decimals, and a proposal against food waste.') },
      explora: { ce: [3, 5, 7], tr: ['dig'], how: H(
        'Al laboratori, l\'alumnat formula una conjectura (quan dues fraccions són equivalents?) i la comprova.',
        'En el laboratorio, el alumnado formula una conjetura (¿cuándo dos fracciones son equivalentes?) y la comprueba.',
        'In the lab, students make a conjecture (when are two fractions equivalent?) and test it.') },
      practica: { 1: { ce: [5, 7, 8], tr: ['cpsaa', 'dig'] }, 2: { ce: [1, 2, 8], tr: ['cpsaa', 'dig'] }, 3: { ce: [1, 2, 6, 8], tr: ['cpsaa', 'dig'] } },
    },
    '2eso-equacions': {
      situacio: { ce: [1, 6, 9], tr: ['emp', 'ciu'] },
      steps: [
        { ce: [1, 7], tr: ['cpsaa'] },
        { ce: [1, 2], tr: ['cpsaa'] },
        { ce: [2, 5], tr: ['dig'] },
        { ce: [1, 3], tr: ['emp'] },
      ],
      product: { ce: [6, 7, 9], tr: ['ciu', 'emp'], how: H(
        'Informe per a l\'AMPA: equacions, gràfica i recomanació argumentada segons el nombre d\'alumnes.',
        'Informe para el AMPA: ecuaciones, gráfica y recomendación argumentada según el número de alumnos.',
        'Report for the parents\' association: equations, graph and a reasoned recommendation.') },
      explora: { ce: [3, 5], tr: ['dig'], how: H(
        'Amb la balança i la paràbola, l\'alumnat prediu què passarà abans de moure els controls i ho comprova.',
        'Con la balanza y la parábola, el alumnado predice qué pasará antes de mover los controles y lo comprueba.',
        'With the balance and the parabola, students predict what will happen before moving the controls, then check.') },
      practica: { 1: { ce: [1, 2, 8], tr: ['cpsaa', 'dig'] }, 2: { ce: [1, 2, 5, 8], tr: ['cpsaa', 'dig'] }, 3: { ce: [1, 6, 7, 8], tr: ['cpsaa', 'dig'] } },
    },
    '2eso-pitagores': {
      situacio: { ce: [1, 6, 9], tr: ['ciu', 'emp'] },
      steps: [
        { ce: [6, 9], tr: ['emp'] },
        { ce: [2, 6], tr: ['dig', 'ciu'] },
        { ce: [1, 5], tr: ['cpsaa'] },
        { ce: [1, 3], tr: ['emp'] },
      ],
      product: { ce: [6, 7], tr: ['ciu', 'emp'], how: H(
        'Proposta a la direcció: plànol a escala, càlculs amb Pitàgores i justificació amb la normativa.',
        'Propuesta a la dirección: plano a escala, cálculos con Pitágoras y justificación con la normativa.',
        'Proposal to the head: scale drawing, Pythagoras calculations and how it meets the rules.') },
      explora: { ce: [3, 5, 7], tr: ['dig'], how: H(
        'Amb els quadrats sobre els costats, l\'alumnat comprova la relació a² = b² + c² i busca quan falla.',
        'Con los cuadrados sobre los lados, el alumnado comprueba la relación a² = b² + c² y busca cuándo falla.',
        'With squares on the sides, students check a² = b² + c² and look for when it fails.') },
      practica: { 1: { ce: [1, 2, 8], tr: ['cpsaa', 'dig'] }, 2: { ce: [1, 2, 5, 8], tr: ['cpsaa', 'dig'] }, 3: { ce: [1, 6, 7, 8], tr: ['cpsaa', 'dig'] } },
    },
  };

  const PATI_HOW = H(
    'Observació a l\'aire lliure amb llista de control (treball en equip, ús del llenguatge matemàtic) i registre a la llibreta.',
    'Observación al aire libre con lista de control (trabajo en equipo, uso del lenguaje matemático) y registro en la libreta.',
    'Outdoor observation with a checklist (teamwork, use of mathematical language) and notebook record.');
  const SIT_HOW = H(
    'Observació del treball en equip (rúbrica) i resposta argumentada a la pregunta motriu.',
    'Observación del trabajo en equipo (rúbrica) y respuesta argumentada a la pregunta motriz.',
    'Observation of teamwork (rubric) and a reasoned answer to the driving question.');

  Object.keys(M).forEach((key) => {
    const U = QM.units[key]; if (!U || !U.cur) return;
    const m = Object.assign({}, COMMON, M[key]);
    m.situacio.how = m.situacio.how || SIT_HOW;
    [1, 2, 3].forEach((l) => { m.practica[l].how = m.practica[l].how || PRACT_HOW; });
    if (U.outdoor) {
      const od = U.outdoor('ca'), c2 = new Set(), t2 = new Set();
      od.steps.forEach((x) => { x.ce.forEach((n) => c2.add(n)); x.tr.forEach((k) => t2.add(k)); });
      m.pati = { ce: [...c2].sort((a, b) => a - b), tr: [...t2], how: PATI_HOW, steps: od.steps.map((x) => ({ ce: x.ce, tr: x.tr })) };
    }
    U.cur.moments = m;
    // Unió de totes les CE i transversals que apareixen als moments
    const ce = new Set(), tr = new Set();
    const add = (x) => { (x.ce || []).forEach((n) => ce.add(n)); (x.tr || []).forEach((k) => tr.add(k)); };
    ['situacio', 'product', 'teoria', 'explora', 'pati', 'repte', 'paper'].forEach((k) => m[k] && add(m[k]));
    m.steps.forEach(add); [1, 2, 3].forEach((l) => add(m.practica[l]));
    U.cur.ce = [...ce].sort((a, b) => a - b);
    const order = ['ciu', 'emp', 'cpsaa', 'dig'];
    U.cur.transv = order.filter((k) => tr.has(k));
  });

  QM.TRANSV_SHORT = {
    ciu: H('Ciutadana', 'Ciudadana', 'Citizenship'),
    emp: H('Emprenedora', 'Emprendedora', 'Entrepreneurship'),
    cpsaa: H('Aprendre a aprendre', 'Aprender a aprender', 'Learning to learn'),
    dig: H('Digital', 'Digital', 'Digital'),
  };
})();
