// Unitat: Equacions de primer i segon grau (2n ESO)
(function () {
  const { F, op, rnd, pick, gcd, lcm, T, v } = QM;
  const X = v('x');
  const n = (k) => (k < 0 ? '−' + (-k) : String(k));
  // a·x escrit bé: x, −x, 3x, −3x
  const cx = (a, s = X) => (a === 1 ? s : a === -1 ? '−' + s : n(a) + s);
  // terme amb signe al davant: " + 3x", " − x", " + 5"
  const sx = (a, s = X) => (a === 0 ? '' : a > 0 ? ` + ${cx(a, s)}` : ` − ${cx(-a, s)}`);
  const sc = (b) => (b === 0 ? '' : b > 0 ? ` + ${b}` : ` − ${-b}`);
  const X2 = `${X}<sup>2</sup>`;
  const nz = (a, b) => { let r; do { r = rnd(a, b); } while (r === 0); return r; };
  const SOLVE = (L) => T(L, 'Resol l\'equació:', 'Resuelve la ecuación:', 'Solve the equation:');
  const SOLVE2 = (L) => T(L, 'Resol l\'equació (té dues solucions):', 'Resuelve la ecuación (tiene dos soluciones):', 'Solve the equation (it has two solutions):');
  const pair = (r1, r2) => (a) => (a.x1 === r1 && a.x2 === r2) || (a.x1 === r2 && a.x2 === r1);

  // ---------- TEORIA ----------
  function theory(L) {
    const s = [];
    s.push({ id: 'que', title: T(L, 'Què és una equació?', '¿Qué es una ecuación?', 'What is an equation?'), html: `
      <div class="rule"><span class="t">${T(L, 'Definició', 'Definición', 'Definition')}</span>
        ${T(L, 'Una <mark>equació</mark> és una igualtat amb una o més lletres (incògnites) que només és certa per a alguns valors. Aquests valors són les <mark>solucions</mark>.',
               'Una <mark>ecuación</mark> es una igualdad con una o más letras (incógnitas) que solo es cierta para algunos valores. Esos valores son las <mark>soluciones</mark>.',
               'An <mark>equation</mark> is an equality with one or more letters (unknowns) that is only true for some values. Those values are the <mark>solutions</mark>.')}
      </div>
      <div class="calc">3${X} + 2 = 14 &nbsp;&nbsp; <span class="note">${T(L, '1r membre = 2n membre', '1.er miembro = 2.º miembro', 'left side = right side')}</span></div>
      <p>${T(L, `La solució és ${X} = 4, perquè 3 · 4 + 2 = 14. Comprovar la solució substituint-la és sempre una bona idea.`,
                `La solución es ${X} = 4, porque 3 · 4 + 2 = 14. Comprobar la solución sustituyéndola es siempre una buena idea.`,
                `The solution is ${X} = 4, because 3 · 4 + 2 = 14. Checking the solution by substituting it back is always a good idea.`)}</p>
      <p>${T(L, 'Una equació és com una balança en equilibri: si fem el mateix als dos plats, continua equilibrada.',
                'Una ecuación es como una balanza en equilibrio: si hacemos lo mismo en los dos platos, sigue equilibrada.',
                'An equation is like a balanced scale: if we do the same thing to both pans, it stays balanced.')}</p>` });

    s.push({ id: 'transp', title: T(L, 'Transposició de termes', 'Transposición de términos', 'Moving terms across'), html: `
      <ul>
        <li>${T(L, 'Un terme que <b>suma</b> passa a l\'altre membre <b>restant</b>, i al revés.', 'Un término que <b>suma</b> pasa al otro miembro <b>restando</b>, y al revés.', 'A term that is <b>added</b> moves to the other side <b>subtracted</b>, and vice versa.')}</li>
        <li>${T(L, 'Un nombre que <b>multiplica</b> passa a l\'altre membre <b>dividint</b>, i al revés.', 'Un número que <b>multiplica</b> pasa al otro miembro <b>dividiendo</b>, y al revés.', 'A number that <b>multiplies</b> moves to the other side <b>dividing</b>, and vice versa.')}</li>
      </ul>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <div class="calc">5${X} − 7 = 2${X} + 8</div>
        <div class="calc">5${X} − 2${X} = 8 + 7</div>
        <div class="calc">3${X} = 15</div>
        <div class="calc">${X} = ${F(15, 3)} = 5</div>
      </div>` });

    s.push({ id: 'passos', title: T(L, 'Equacions de primer grau: passos', 'Ecuaciones de primer grado: pasos', 'Linear equations: step by step'), html: `
      <ol>
        <li>${T(L, 'Treu els <b>parèntesis</b>.', 'Quita los <b>paréntesis</b>.', 'Remove the <b>brackets</b>.')}</li>
        <li>${T(L, 'Treu els <b>denominadors</b> multiplicant tots els termes pel m.c.m.', 'Quita los <b>denominadores</b> multiplicando todos los términos por el m.c.m.', 'Clear the <b>denominators</b> by multiplying every term by the LCM.')}</li>
        <li>${T(L, '<b>Agrupa</b> les ' + X + ' en un membre i els nombres a l\'altre.', '<b>Agrupa</b> las ' + X + ' en un miembro y los números en el otro.', '<b>Collect</b> the ' + X + ' terms on one side and the numbers on the other.')}</li>
        <li>${T(L, '<b>Redueix</b> i <b>aïlla</b> la ' + X + '.', '<b>Reduce</b> y <b>despeja</b> la ' + X + '.', '<b>Simplify</b> and <b>isolate</b> ' + X + '.')}</li>
      </ol>
      <div class="example"><span class="t">${T(L, 'Exemple amb denominadors', 'Ejemplo con denominadores', 'Example with denominators')}</span>
        <div class="calc">${F(X, 2)} + ${F(X, 3)} = 10 &nbsp;→&nbsp; ${T(L, 'm.c.m.', 'm.c.m.', 'LCM')}(2, 3) = 6</div>
        <div class="calc">3${X} + 2${X} = 60 &nbsp;→&nbsp; 5${X} = 60 &nbsp;→&nbsp; ${X} = 12</div>
      </div>
      <div class="warn"><b>${T(L, 'Error freqüent', 'Error frecuente', 'Common mistake')}:</b> ${T(L, 'en treure el parèntesis, el nombre de fora multiplica <b>tots</b> els termes: ', 'al quitar el paréntesis, el número de fuera multiplica <b>todos</b> los términos: ', 'when removing brackets, the number outside multiplies <b>every</b> term: ')} 3(${X} + 2) = 3${X} + 6, ${T(L, 'no', 'no', 'not')} 3${X} + 2.</div>` });

    s.push({ id: 'segon', title: T(L, 'Equacions de segon grau', 'Ecuaciones de segundo grado', 'Quadratic equations'), html: `
      <p>${T(L, `Tenen la forma general <span class="calc inl">${v('a')}${X2} + ${v('b')}${X} + ${v('c')} = 0</span>, amb ${v('a')} ≠ 0. Es resolen amb la fórmula:`,
                `Tienen la forma general <span class="calc inl">${v('a')}${X2} + ${v('b')}${X} + ${v('c')} = 0</span>, con ${v('a')} ≠ 0. Se resuelven con la fórmula:`,
                `They have the general form <span class="calc inl">${v('a')}${X2} + ${v('b')}${X} + ${v('c')} = 0</span>, with ${v('a')} ≠ 0. They are solved with the formula:`)}</p>
      <div class="rule"><span class="t">${T(L, 'Fórmula', 'Fórmula', 'Formula')}</span>
        <div class="calc big-formula">${X} = ${F(`−${v('b')} ± √<span class="ov">${v('b')}<sup>2</sup> − 4${v('a')}${v('c')}</span>`, `2${v('a')}`)}</div>
      </div>
      <p>${T(L, `El nombre Δ = ${v('b')}<sup>2</sup> − 4${v('a')}${v('c')} és el <mark>discriminant</mark> i ens diu quantes solucions hi ha:`,
                `El número Δ = ${v('b')}<sup>2</sup> − 4${v('a')}${v('c')} es el <mark>discriminante</mark> y nos dice cuántas soluciones hay:`,
                `The number Δ = ${v('b')}<sup>2</sup> − 4${v('a')}${v('c')} is the <mark>discriminant</mark> and tells us how many solutions there are:`)}</p>
      <ul>
        <li>Δ &gt; 0: ${T(L, 'dues solucions', 'dos soluciones', 'two solutions')}</li>
        <li>Δ = 0: ${T(L, 'una solució (doble)', 'una solución (doble)', 'one (repeated) solution')}</li>
        <li>Δ &lt; 0: ${T(L, 'cap solució real', 'ninguna solución real', 'no real solutions')}</li>
      </ul>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <div class="calc">${X2} − 5${X} + 6 = 0 &nbsp;→&nbsp; Δ = 25 − 24 = 1</div>
        <div class="calc">${X} = ${F('5 ± 1', 2)} &nbsp;→&nbsp; ${X}<sub>1</sub> = 3, ${X}<sub>2</sub> = 2</div>
      </div>` });

    s.push({ id: 'incompl', title: T(L, 'Equacions incompletes', 'Ecuaciones incompletas', 'Incomplete quadratics'), html: `
      <p>${T(L, 'Si falta algun terme, no cal la fórmula:', 'Si falta algún término, no hace falta la fórmula:', 'If a term is missing, you don\'t need the formula:')}</p>
      <div class="example"><span class="t">${T(L, 'Sense terme en x', 'Sin término en x', 'No x term')} (${v('b')} = 0)</span>
        <div class="calc">2${X2} − 50 = 0 &nbsp;→&nbsp; ${X2} = 25 &nbsp;→&nbsp; ${X} = ±5</div>
      </div>
      <div class="example"><span class="t">${T(L, 'Sense terme independent', 'Sin término independiente', 'No constant term')} (${v('c')} = 0)</span>
        <div class="calc">${X2} − 7${X} = 0 &nbsp;→&nbsp; ${X}(${X} − 7) = 0 &nbsp;→&nbsp; ${X} = 0, ${X} = 7</div>
      </div>
      <div class="warn"><b>${T(L, 'Compte', 'Cuidado', 'Watch out')}:</b> ${T(L, 'si divideixes per ' + X + ', perds la solució ' + X + ' = 0. Treu factor comú!', 'si divides por ' + X + ', pierdes la solución ' + X + ' = 0. ¡Saca factor común!', 'if you divide by ' + X + ', you lose the solution ' + X + ' = 0. Factorise instead!')}</div>` });

    s.push({ id: 'probl', title: T(L, 'Resoldre problemes', 'Resolver problemas', 'Solving word problems'), html: `
      <ol>
        <li>${T(L, 'Llegeix i decideix què és la ' + X + '.', 'Lee y decide qué es la ' + X + '.', 'Read it and decide what ' + X + ' stands for.')}</li>
        <li>${T(L, 'Tradueix l\'enunciat a una equació.', 'Traduce el enunciado a una ecuación.', 'Translate the text into an equation.')}</li>
        <li>${T(L, 'Resol l\'equació.', 'Resuelve la ecuación.', 'Solve the equation.')}</li>
        <li>${T(L, 'Comprova que la solució té sentit (edats positives, longituds positives...).', 'Comprueba que la solución tiene sentido (edades positivas, longitudes positivas...).', 'Check the answer makes sense (positive ages, positive lengths...).')}</li>
      </ol>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <p>${T(L, 'La suma de tres nombres consecutius és 48. Quins són?', 'La suma de tres números consecutivos es 48. ¿Cuáles son?', 'Three consecutive numbers add up to 48. What are they?')}</p>
        <div class="calc">${X} + (${X} + 1) + (${X} + 2) = 48 &nbsp;→&nbsp; 3${X} + 3 = 48 &nbsp;→&nbsp; ${X} = 15</div>
        <p>${T(L, 'Són 15, 16 i 17.', 'Son 15, 16 y 17.', 'They are 15, 16 and 17.')}</p>
      </div>` });
    return s;
  }

  // ---------- GENERADORS ----------
  function oneStep(L) {
    const x = nz(-10, 10), kind = pick(['add', 'mul']);
    if (kind === 'add') {
      const a = nz(-12, 12), b = x + a;
      return { q: `<p>${SOLVE(L)}</p><div class="calc">${X}${sc(a)} = ${n(b)}</div>`, kind: 'num', check: (r) => r === x,
        hint: T(L, `Passa el ${n(a)} a l'altre membre canviant-li el signe.`, `Pasa el ${n(a)} al otro miembro cambiándole el signo.`, `Move the ${n(a)} to the other side and change its sign.`),
        diagnose: QM.diag(L, [
        [(r) => r === b + a, `Quan passes un terme a l'altre membre, ha de canviar de signe.`, `Cuando pasas un término al otro miembro, tiene que cambiar de signo.`, `When you move a term to the other side, its sign changes.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${X} = ${n(b)}${sc(-a)} = ${n(x)}</div>` };
    }
    const a = pick([2, 3, 4, 5, 6, 7, 8, 9, -2, -3, -4, -5]), b = a * x;
    return { q: `<p>${SOLVE(L)}</p><div class="calc">${cx(a)} = ${n(b)}</div>`, kind: 'num', check: (r) => r === x,
      hint: T(L, `El ${n(a)} multiplica: passa a l'altre membre dividint.`, `El ${n(a)} multiplica: pasa al otro miembro dividiendo.`, `The ${n(a)} is multiplying: move it across by dividing.`),
      diagnose: QM.diag(L, [
        [(r) => r === b - a, `El nombre que multiplica la x passa dividint, no restant.`, `El número que multiplica a la x pasa dividiendo, no restando.`, `The number multiplying x moves across by dividing, not subtracting.`],
        [(r) => r === b * a, `El nombre que multiplica la x passa dividint, no multiplicant.`, `El número que multiplica a la x pasa dividiendo, no multiplicando.`, `The number multiplying x moves across by dividing, not multiplying.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${X} = ${F(n(b), n(a))} = ${n(x)}</div>` };
  }

  function twoStep(L) {
    const x = nz(-9, 9), a = pick([2, 3, 4, 5, 6, 7]), b = nz(-15, 15), c = a * x + b;
    return { q: `<p>${SOLVE(L)}</p><div class="calc">${cx(a)}${sc(b)} = ${n(c)}</div>`, kind: 'num', check: (r) => r === x,
      hint: T(L, 'Primer passa el nombre que suma o resta; després divideix.', 'Primero pasa el número que suma o resta; después divide.', 'First move the number being added or subtracted; then divide.'),
      diagnose: QM.diag(L, [
        [(r) => QM.ap(r, (c + b) / a), `En passar el nombre a l'altre membre, ha de canviar de signe.`, `Al pasar el número al otro miembro, tiene que cambiar de signo.`, `When you move the number across, its sign changes.`],
        [(r) => QM.ap(r, c / a - b), `Primer passa el terme que suma o resta, i després divideix.`, `Primero pasa el término que suma o resta, y después divide.`, `First move the term being added or subtracted, then divide.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${cx(a)} = ${n(c)}${sc(-b)} = ${n(c - b)} &nbsp;→&nbsp; ${X} = ${F(n(c - b), a)} = ${n(x)}</div>` };
  }

  function thinkNumber(L) {
    const x = rnd(2, 20), a = rnd(2, 6), b = rnd(1, 20), c = a * x + b;
    return { q: `<p>${T(L, `Penso un nombre, el multiplico per ${a} i hi sumo ${b}. Obtinc ${c}. Quin nombre he pensat?`,
                         `Pienso un número, lo multiplico por ${a} y le sumo ${b}. Obtengo ${c}. ¿Qué número he pensado?`,
                         `I think of a number, multiply it by ${a} and add ${b}. I get ${c}. What was my number?`)}</p>`,
      kind: 'num', check: (r) => r === x,
      hint: T(L, `Escriu l'equació: ${a}${X} + ${b} = ${c}.`, `Escribe la ecuación: ${a}${X} + ${b} = ${c}.`, `Write the equation: ${a}${X} + ${b} = ${c}.`),
      diagnose: QM.diag(L, [
        [(r) => QM.ap(r, (c + b) / a), `Has sumat el nombre en lloc de restar-lo.`, `Has sumado el número en lugar de restarlo.`, `You added the number instead of subtracting it.`],
        [(r) => QM.ap(r, c / a - b), `Primer resta, i després divideix.`, `Primero resta, y después divide.`, `Subtract first, then divide.`],
      ]),
      sol: `<div class="calc">${a}${X} + ${b} = ${c} → ${a}${X} = ${c - b} → ${X} = ${x}</div>` };
  }

  function bothSides(L) {
    const x = nz(-8, 8); let a, c; do { a = nz(-7, 9); c = nz(-7, 9); } while (a === c);
    const b = nz(-12, 12), d = (a - c) * x + b;
    return { q: `<p>${SOLVE(L)}</p><div class="calc">${cx(a)}${sc(b)} = ${cx(c)}${sc(d)}</div>`, kind: 'num', check: (r) => r === x,
      hint: T(L, `Agrupa les ${X} a l'esquerra i els nombres a la dreta.`, `Agrupa las ${X} a la izquierda y los números a la derecha.`, `Collect the ${X} terms on the left and the numbers on the right.`),
      diagnose: QM.diag(L, [
        [(r) => QM.ap(r, (d - b) / (a + c)), `En passar el terme en x a l'altre membre, també canvia de signe.`, `Al pasar el término en x al otro miembro, también cambia de signo.`, `When you move the x term across, its sign changes too.`],
        [(r) => QM.ap(r, (d + b) / (a - c)), `En passar el nombre a l'altre membre, canvia de signe.`, `Al pasar el número al otro miembro, cambia de signo.`, `When you move the number across, its sign changes.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${cx(a)}${sx(-c)} = ${n(d)}${sc(-b)}</div><div class="calc">${cx(a - c)} = ${n(d - b)} → ${X} = ${n(x)}</div>` };
  }

  function brackets(L) {
    const x = nz(-8, 8), a = pick([2, 3, 4, 5, -2, -3]), b = nz(-6, 6), c = nz(-10, 10);
    let d; do { d = nz(-5, 5); } while (d === a);
    const e = a * (x + b) + c - d * x;
    const inner = `${X}${sc(b)}`;
    return { q: `<p>${SOLVE(L)}</p><div class="calc">${n(a)}(${inner})${sc(c)} = ${cx(d)}${sc(e)}</div>`, kind: 'num', check: (r) => r === x,
      hint: T(L, `Primer multiplica el ${n(a)} per cada terme del parèntesi.`, `Primero multiplica el ${n(a)} por cada término del paréntesis.`, `First multiply ${n(a)} by each term inside the brackets.`),
      diagnose: QM.diag(L, [
        [(r) => QM.ap(r, (e - b - c) / (a - d)), `El nombre de fora del parèntesi multiplica tots els termes de dins.`, `El número de fuera del paréntesis multiplica todos los términos de dentro.`, `The number outside the brackets multiplies every term inside.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${cx(a)}${sc(a * b)}${sc(c)} = ${cx(d)}${sc(e)}</div><div class="calc">${cx(a - d)} = ${n(e - a * b - c)} → ${X} = ${n(x)}</div>` };
  }

  function incomplete(L) {
    const t = pick(['sq', 'sq', 'fac']);
    if (t === 'sq') {
      const r = rnd(1, 10), a = pick([1, 1, 2, 3, 4]), c = a * r * r;
      return { q: `<p>${SOLVE2(L)}</p><div class="calc">${cx(a, X2)} − ${c} = 0</div>`, kind: 'nums', check: pair(r, -r),
        hint: T(L, `Aïlla ${X2} i fes l'arrel quadrada. No t'oblidis del signe ±.`, `Despeja ${X2} y haz la raíz cuadrada. No olvides el signo ±.`, `Isolate ${X2} and take the square root. Don't forget ±.`),
        diagnose: QM.diag(L, [
        [(p) => [p.x1, p.x2].includes(r) !== [p.x1, p.x2].includes(-r), `Hi ha dues solucions: una positiva i una negativa (±).`, `Hay dos soluciones: una positiva y una negativa (±).`, `There are two solutions: one positive and one negative (±).`],
        [(p) => [p.x1, p.x2].includes(r * r), `Recorda fer l'arrel quadrada al final.`, `Recuerda hacer la raíz cuadrada al final.`, `Remember to take the square root at the end.`],
      ]),
      sol: `<div class="calc">${X2} = ${F(c, a)} = ${r * r} → ${X} = ±${r}</div>` };
    }
    const a = pick([1, 1, 2, 3]), r = nz(-9, 9), b = -a * r;
    return { q: `<p>${SOLVE2(L)}</p><div class="calc">${cx(a, X2)}${sx(b)} = 0</div>`, kind: 'nums', check: pair(0, r),
      hint: T(L, `Treu ${X} factor comú.`, `Saca ${X} factor común.`, `Factor out ${X}.`),
      diagnose: QM.diag(L, [
        [(p) => p.x1 !== 0 && p.x2 !== 0, `Has perdut la solució x = 0. Treu factor comú en lloc de dividir per x.`, `Has perdido la solución x = 0. Saca factor común en lugar de dividir por x.`, `You lost the solution x = 0. Factorise instead of dividing by x.`],
        [(p) => [p.x1, p.x2].includes(-r), `Revisa el signe de la segona solució.`, `Revisa el signo de la segunda solución.`, `Check the sign of the second solution.`],
      ]),
      sol: `<div class="calc">${X}(${cx(a)}${sc(b)}) = 0 → ${X} = 0, ${X} = ${n(r)}</div>` };
  }

  function withDen(L) {
    if (Math.random() < 0.5) {
      let a, b; do { a = rnd(2, 6); b = rnd(2, 6); } while (a === b);
      const m = lcm(a, b), x = m * nz(-4, 5), c = x / a + x / b;
      return { q: `<p>${SOLVE(L)}</p><div class="calc">${F(X, a)} ${op('+')} ${F(X, b)} = ${n(c)}</div>`, kind: 'num', check: (r) => r === x,
        hint: T(L, `Multiplica tots els termes per ${m}, el m.c.m. de ${a} i ${b}.`, `Multiplica todos los términos por ${m}, el m.c.m. de ${a} y ${b}.`, `Multiply every term by ${m}, the LCM of ${a} and ${b}.`),
        diagnose: QM.diag(L, [
        [(r) => QM.ap(r, c / (m / a + m / b)), `Quan treus denominadors, multiplica TOTS els termes pel m.c.m., també el del segon membre.`, `Al quitar denominadores, multiplica TODOS los términos por el m.c.m., también el del segundo miembro.`, `When clearing denominators, multiply EVERY term by the LCM, including the right-hand side.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${cx(m / a)} + ${cx(m / b)} = ${n(c * m)} → ${cx(m / a + m / b)} = ${n(c * m)} → ${X} = ${n(x)}</div>` };
    }
    let a, b; do { a = rnd(2, 5); b = rnd(2, 5); } while (a === b);
    const p = nz(-5, 5), q = nz(-5, 5), m = lcm(a, b);
    // (x + p)/a = (x + q)/b  →  b(x + p) = a(x + q)  →  x = (a q − b p)/(b − a)
    if ((a * q - b * p) % (b - a) !== 0) return withDen(L);
    const x = (a * q - b * p) / (b - a);
    return { q: `<p>${SOLVE(L)}</p><div class="calc">${F(X + sc(p), a)} = ${F(X + sc(q), b)}</div>`, kind: 'num', check: (r) => r === x,
      hint: T(L, 'Quan només hi ha una fracció a cada costat, pots multiplicar en creu.', 'Cuando solo hay una fracción a cada lado, puedes multiplicar en cruz.', 'With just one fraction on each side, you can cross multiply.'),
      diagnose: QM.diag(L, [
        [(r) => QM.ap(r, (q - p) / (b - a)), `En multiplicar en creu, el nombre multiplica tot el parèntesi.`, `Al multiplicar en cruz, el número multiplica todo el paréntesis.`, `When cross multiplying, the number multiplies the whole bracket.`],
        [(r) => r === -x && x !== 0, `Gairebé! Revisa el signe de la solució.`, `¡Casi! Revisa el signo de la solución.`, `Almost! Check the sign of your answer.`],]),
      sol: `<div class="calc">${b}(${X}${sc(p)}) = ${a}(${X}${sc(q)}) → ${cx(b)}${sc(b * p)} = ${cx(a)}${sc(a * q)}</div><div class="calc">${cx(b - a)} = ${n(a * q - b * p)} → ${X} = ${n(x)}</div>` };
  }

  function complete(L) {
    let r1, r2; do { r1 = nz(-7, 7); r2 = nz(-7, 7); } while (r1 === r2);
    const a = pick([1, 1, 1, 2]), b = -a * (r1 + r2), c = a * r1 * r2, D = b * b - 4 * a * c, sq = Math.round(Math.sqrt(D));
    return { q: `<p>${SOLVE2(L)}</p><div class="calc">${cx(a, X2)}${sx(b)}${sc(c)} = 0</div>`, kind: 'nums', check: pair(r1, r2),
      hint: T(L, `Fes servir la fórmula amb ${v('a')} = ${a}, ${v('b')} = ${n(b)}, ${v('c')} = ${n(c)}. Comença calculant Δ.`, `Usa la fórmula con ${v('a')} = ${a}, ${v('b')} = ${n(b)}, ${v('c')} = ${n(c)}. Empieza calculando Δ.`, `Use the formula with ${v('a')} = ${a}, ${v('b')} = ${n(b)}, ${v('c')} = ${n(c)}. Start by working out Δ.`),
      diagnose: QM.diag(L, [
        [(p) => pair(-r1, -r2)(p), `Les dues solucions tenen el signe canviat. Recorda que la fórmula comença amb −b.`, `Las dos soluciones tienen el signo cambiado. Recuerda que la fórmula empieza con −b.`, `Both solutions have the wrong sign. Remember the formula starts with −b.`],
        [(p) => pair(2 * r1, 2 * r2)(p) || (a > 1 && pair(a * r1, a * r2)(p)), `Revisa el denominador: cal dividir entre 2a = ${2 * a}.`, `Revisa el denominador: hay que dividir entre 2a = ${2 * a}.`, `Check the denominator: divide by 2a = ${2 * a}.`],
      ]),
      sol: `<div class="calc">Δ = (${n(b)})<sup>2</sup> − 4 · ${a} · (${n(c)}) = ${D}</div>
            <div class="calc">${X} = ${F(`${n(-b)} ± ${sq}`, 2 * a)} → ${X}<sub>1</sub> = ${n(Math.max(r1, r2))}, ${X}<sub>2</sub> = ${n(Math.min(r1, r2))}</div>` };
  }

  function wordProblem(L) {
    const t = pick(['age', 'consec', 'rect', 'prod']);
    if (t === 'age') {
      const f = rnd(4, 14), x = rnd(2, 15), m = 2 * f + x;
      return { q: `<p>${T(L, `La mare té ${m} anys i la seva filla en té ${f}. D'aquí a quants anys la mare tindrà el doble d'edat que la filla?`,
                             `La madre tiene ${m} años y su hija tiene ${f}. ¿Dentro de cuántos años la madre tendrá el doble de edad que la hija?`,
                             `A mother is ${m} and her daughter is ${f}. In how many years will the mother be twice as old as her daughter?`)}</p>`,
        kind: 'num', check: (r) => r === x,
        hint: T(L, `D'aquí a ${X} anys: ${m} + ${X} = 2(${f} + ${X}).`, `Dentro de ${X} años: ${m} + ${X} = 2(${f} + ${X}).`, `In ${X} years: ${m} + ${X} = 2(${f} + ${X}).`),
        diagnose: QM.diag(L, [
        [(r) => r === m - f, `Fixa't que d'aquí a x anys les dues persones hauran fet x anys més.`, `Fíjate en que dentro de x años las dos personas tendrán x años más.`, `Notice that in x years both people will be x years older.`],
      ]),
      sol: `<div class="calc">${m} + ${X} = ${2 * f} + 2${X} → ${X} = ${m - 2 * f}</div>` };
    }
    if (t === 'consec') {
      const x = rnd(5, 60), S = 3 * x + 3;
      return { q: `<p>${T(L, `La suma de tres nombres consecutius és ${S}. Quin és el més petit?`, `La suma de tres números consecutivos es ${S}. ¿Cuál es el menor?`, `Three consecutive numbers add up to ${S}. What is the smallest?`)}</p>`,
        kind: 'num', check: (r) => r === x,
        hint: T(L, `Anomena'ls ${X}, ${X} + 1 i ${X} + 2.`, `Llámalos ${X}, ${X} + 1 y ${X} + 2.`, `Call them ${X}, ${X} + 1 and ${X} + 2.`),
        diagnose: QM.diag(L, [
        [(r) => QM.ap(r, S / 3), `Aquest és el nombre del mig. Recorda que són x, x + 1 i x + 2.`, `Ese es el número del medio. Recuerda que son x, x + 1 y x + 2.`, `That's the middle number. Remember they are x, x + 1 and x + 2.`],
      ]),
      sol: `<div class="calc">3${X} + 3 = ${S} → 3${X} = ${S - 3} → ${X} = ${x}</div>` };
    }
    if (t === 'rect') {
      const x = rnd(3, 20), w = rnd(2, 12), P = 2 * (2 * x + w);
      return { q: `<p>${T(L, `Un rectangle fa ${w} cm més de llarg que d'ample i el seu perímetre és ${P} cm. Quants centímetres fa d'ample?`,
                             `Un rectángulo mide ${w} cm más de largo que de ancho y su perímetro es ${P} cm. ¿Cuántos centímetros mide de ancho?`,
                             `A rectangle is ${w} cm longer than it is wide, and its perimeter is ${P} cm. How wide is it, in cm?`)}</p>`,
        kind: 'num', check: (r) => r === x,
        hint: T(L, `Amplada ${X}, llargada ${X} + ${w}. El perímetre és la suma dels quatre costats.`, `Ancho ${X}, largo ${X} + ${w}. El perímetro es la suma de los cuatro lados.`, `Width ${X}, length ${X} + ${w}. The perimeter is the sum of all four sides.`),
        diagnose: QM.diag(L, [
        [(r) => QM.ap(r, P / 4), `Això seria un quadrat. La llargada és x + ${w}, no x.`, `Eso sería un cuadrado. El largo es x + ${w}, no x.`, `That would be a square. The length is x + ${w}, not x.`],
        [(r) => QM.ap(r, (P - w) / 4), `La llargada surt dues vegades al perímetre: 2(x + ${w}).`, `El largo aparece dos veces en el perímetro: 2(x + ${w}).`, `The length appears twice in the perimeter: 2(x + ${w}).`],
      ]),
      sol: `<div class="calc">2${X} + 2(${X} + ${w}) = ${P} → 4${X} = ${P - 2 * w} → ${X} = ${x}</div>` };
    }
    const x = rnd(3, 25), N = x * (x + 1);
    return { q: `<p>${T(L, `El producte de dos nombres naturals consecutius és ${N}. Quin és el més petit?`, `El producto de dos números naturales consecutivos es ${N}. ¿Cuál es el menor?`, `The product of two consecutive natural numbers is ${N}. What is the smaller one?`)}</p>`,
      kind: 'num', check: (r) => r === x,
      hint: T(L, `${X}(${X} + 1) = ${N} és una equació de segon grau.`, `${X}(${X} + 1) = ${N} es una ecuación de segundo grado.`, `${X}(${X} + 1) = ${N} is a quadratic equation.`),
      diagnose: QM.diag(L, [
        [(r) => r === x + 1, `Aquest és el més gran dels dos.`, `Ese es el mayor de los dos.`, `That's the bigger of the two.`],
      ]),
      sol: `<div class="calc">${X2} + ${X} − ${N} = 0 → ${X} = ${F(`−1 ± ${2 * x + 1}`, 2)} → ${X} = ${x} ${T(L, '(l\'altra és negativa)', '(la otra es negativa)', '(the other is negative)')}</div>` };
  }

  // ---------- LABORATORI ----------
  function explore(root, L) {
    root.innerHTML = `
      <div class="lab">
        <div class="lab-card">
          <h2>${T(L, 'La balança', 'La balanza', 'The balance')}</h2>
          <p>${T(L, 'Prova valors de x fins que la balança quedi equilibrada. Aquest valor és la solució.', 'Prueba valores de x hasta que la balanza quede equilibrada. Ese valor es la solución.', 'Try values of x until the scale balances. That value is the solution.')}</p>
          <div class="calc big-formula" id="bal-eq"></div>
          <div class="lab-grid">
            <div class="ctrl">
              <label for="bal-x">${X} = <output id="bal-xo"></output><input type="range" id="bal-x" min="-10" max="10" value="0"></label>
              <div class="readout">
                <div><span>${T(L, '1r membre', '1.er miembro', 'Left side')}</span><b id="bal-l"></b></div>
                <div><span>${T(L, '2n membre', '2.º miembro', 'Right side')}</span><b id="bal-r"></b></div>
              </div>
              <button type="button" class="btn ghost" id="bal-new">${T(L, 'Una altra equació', 'Otra ecuación', 'Another equation')}</button>
            </div>
            <div class="viz" id="bal-viz"></div>
          </div>
        </div>
        <div class="lab-card">
          <h2>${T(L, 'La paràbola i les solucions', 'La parábola y las soluciones', 'The parabola and its solutions')}</h2>
          <p>${T(L, `Les solucions de ${v('a')}${X2} + ${v('b')}${X} + ${v('c')} = 0 són els punts on la paràbola talla l'eix ${X}. Mou els coeficients i mira què passa amb el discriminant.`,
                    `Las soluciones de ${v('a')}${X2} + ${v('b')}${X} + ${v('c')} = 0 son los puntos donde la parábola corta el eje ${X}. Mueve los coeficientes y mira qué pasa con el discriminante.`,
                    `The solutions of ${v('a')}${X2} + ${v('b')}${X} + ${v('c')} = 0 are where the parabola crosses the ${X}-axis. Move the coefficients and watch the discriminant.`)}</p>
          <div class="lab-grid">
            <div class="ctrl">
              <label for="pa-a">${v('a')} = <output id="pa-ao"></output><input type="range" id="pa-a" min="-3" max="3" step="0.5" value="1"></label>
              <label for="pa-b">${v('b')} = <output id="pa-bo"></output><input type="range" id="pa-b" min="-8" max="8" step="1" value="-2"></label>
              <label for="pa-c">${v('c')} = <output id="pa-co"></output><input type="range" id="pa-c" min="-9" max="9" step="1" value="-3"></label>
              <div class="readout">
                <div><span>Δ</span><b id="pa-d"></b></div>
                <div><span>${T(L, 'Solucions', 'Soluciones', 'Solutions')}</span><b id="pa-s"></b></div>
              </div>
            </div>
            <div class="viz"><div class="calc" id="pa-eq"></div><div id="pa-viz"></div></div>
          </div>
        </div>
      </div>`;
    const $ = (id) => root.querySelector('#' + id);
    const fmt = (k) => n(Math.round(k * 100) / 100).replace('.', L === 'en' ? '.' : ',');
    // Balança: a x + b = c x + d
    let E;
    function newEq() {
      const x = nz(-8, 8); let a, c; do { a = rnd(1, 5); c = rnd(0, 4); } while (a === c);
      const b = nz(-9, 9); E = { a, b, c, d: (a - c) * x + b };
      $('bal-eq').innerHTML = `${cx(E.a)}${sc(E.b)} = ${E.c ? cx(E.c) + sc(E.d) : n(E.d)}`;
      bal();
    }
    function bal() {
      const x = +$('bal-x').value, l = E.a * x + E.b, r = E.c * x + E.d;
      $('bal-xo').textContent = n(x); $('bal-l').textContent = n(l); $('bal-r').textContent = n(r);
      const ang = Math.max(-14, Math.min(14, (r - l) * 1.5)), ok = l === r;
      $('bal-viz').innerHTML = `<svg width="360" height="200" viewBox="0 0 360 200" role="img" aria-label="${n(l)} / ${n(r)}">
        <polygon points="180,70 160,180 200,180" class="em ed"/>
        <rect x="120" y="180" width="120" height="10" class="ed"/>
        <g transform="rotate(${-ang} 180 70)">
          <line x1="50" y1="70" x2="310" y2="70" class="beam"/>
          <line x1="60" y1="70" x2="40" y2="120" class="ax"/><line x1="60" y1="70" x2="80" y2="120" class="ax"/>
          <line x1="300" y1="70" x2="280" y2="120" class="ax"/><line x1="300" y1="70" x2="320" y2="120" class="ax"/>
          <rect x="25" y="120" width="70" height="8" rx="3" class="sh"/><rect x="265" y="120" width="70" height="8" rx="3" class="sh"/>
          <text x="60" y="112" text-anchor="middle" class="tk big">${n(l)}</text>
          <text x="300" y="112" text-anchor="middle" class="tk big">${n(r)}</text>
        </g>
        <circle cx="180" cy="70" r="6" class="${ok ? 'okf' : 'mk'}"/>
      </svg>
      <p class="${ok ? 'good' : 'muted'}">${ok ? T(L, `Equilibri! La solució és ${X} = ${n(x)}.`, `¡Equilibrio! La solución es ${X} = ${n(x)}.`, `Balanced! The solution is ${X} = ${n(x)}.`) : T(L, 'Encara no està equilibrada.', 'Todavía no está equilibrada.', 'Not balanced yet.')}</p>`;
    }
    $('bal-x').addEventListener('input', bal); $('bal-new').addEventListener('click', newEq);
    newEq();
    // Paràbola
    function par() {
      let a = +$('pa-a').value; const b = +$('pa-b').value, c = +$('pa-c').value;
      if (a === 0) { a = 0.5; $('pa-a').value = 0.5; }
      $('pa-ao').textContent = fmt(a); $('pa-bo').textContent = n(b); $('pa-co').textContent = n(c);
      const D = b * b - 4 * a * c;
      const roots = D > 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)] : D === 0 ? [-b / (2 * a)] : [];
      $('pa-d').textContent = fmt(D);
      $('pa-s').innerHTML = roots.length ? roots.map((r) => fmt(r)).join(' ; ') : T(L, 'cap', 'ninguna', 'none');
      $('pa-eq').innerHTML = `${v('y')} = ${a === 1 ? '' : fmt(a)}${X2}${b ? sx(b) : ''}${sc(c)}`;
      $('pa-viz').innerHTML = QM.plot((x) => a * x * x + b * x + c, roots);
    }
    ['pa-a', 'pa-b', 'pa-c'].forEach((id) => $(id).addEventListener('input', par));
    par();
  }

  QM.units['2eso-equacions'] = {
    theory, explore,
    board: () => `${X} = ${F(`−${v('b')} ± √<span class="ov">${v('b')}<sup>2</sup> − 4${v('a')}${v('c')}</span>`, `2${v('a')}`)}`,
    levels: {
      1: [oneStep, twoStep, thinkNumber],
      2: [bothSides, brackets, incomplete],
      3: [withDen, complete, wordProblem],
    },
  };
})();

// ---------- CURRÍCULUM, SITUACIÓ D'APRENENTATGE I HISTÒRIA ----------
(function () {
  const { F, T, v } = QM;
  const X = v('x');
  const U = QM.units['2eso-equacions'];
  U.cur = {
    ce: [1, 2, 3, 5, 6, 7, 9],
    sabers: [
      'Sentit algebraic. Igualtat i desigualtat: «Ús de l’àlgebra simbòlica per representar relacions lineals i quadràtiques en situacions contextualitzades».',
      'Sentit algebraic. Igualtat i desigualtat: «Cerca de solucions en equacions o sistemes lineals i equacions quadràtiques».',
    ],
    transv: ['emp', 'cpsaa', 'dig', 'ciu'],
    vectors: ['comp', 'gen', 'univ', 'ling', 'ciut'],
    ods: [12],
  };
  U.situation = (L) => ({
    title: T(L, 'El viatge de final de curs', 'El viaje de fin de curso', 'The end-of-year trip'),
    html: `
      <p class="lead2">${T(L,
        'El grup organitza el viatge de final de curs i heu demanat pressupost a dues empreses d\'autocars. L\'empresa A cobra una quantitat fixa més poc per alumne; l\'empresa B, una quantitat fixa més petita però més per alumne. Encara no sabeu quants alumnes s\'hi apuntaran.',
        'El grupo organiza el viaje de fin de curso y habéis pedido presupuesto a dos empresas de autocares. La empresa A cobra una cantidad fija más poco por alumno; la empresa B, una cantidad fija menor pero más por alumno. Todavía no sabéis cuántos alumnos se apuntarán.',
        'Your group is organising the end-of-year trip and you have quotes from two coach companies. Company A charges a fixed amount plus a little per student; company B charges a smaller fixed amount but more per student. You don\'t know yet how many students will sign up.')}</p>
      <div class="rule"><span class="t">${T(L, 'Pregunta motriu', 'Pregunta motriz', 'Driving question')}</span>
        ${T(L, 'A partir de quants alumnes surt més a compte cada empresa? Quina recomanació fareu a l\'AMPA?', '¿A partir de cuántos alumnos sale más a cuenta cada empresa? ¿Qué recomendación haréis al AMPA?', 'From how many students is each company the better deal? What will you recommend to the parents\' association?')}</div>
      <h3>${T(L, 'Què fareu', 'Qué haréis', 'What you will do')}</h3>
      <ol>
        <li>${T(L, `Escriviu el preu de cada empresa com una expressió amb ${X} = nombre d'alumnes.`, `Escribid el precio de cada empresa como una expresión con ${X} = número de alumnos.`, `Write each company's price as an expression with ${X} = number of students.`)}</li>
        <li>${T(L, `Igualeu les dues expressions i resoleu l'equació. Què vol dir la solució?`, `Igualad las dos expresiones y resolved la ecuación. ¿Qué significa la solución?`, `Set the two expressions equal and solve. What does the solution mean?`)}</li>
        <li>${T(L, 'Comproveu-ho amb la gràfica de sota: on es tallen les dues rectes?', 'Comprobadlo con la gráfica de abajo: ¿dónde se cortan las dos rectas?', 'Check with the graph below: where do the two lines cross?')}</li>
        <li>${T(L, `Repte extra: la pancarta del viatge ha de fer 12 m² i ha de ser 1 m més llarga que ampla. Quines mides té? (${X}(${X} + 1) = 12)`, `Reto extra: la pancarta del viaje tiene que medir 12 m² y ser 1 m más larga que ancha. ¿Qué medidas tiene? (${X}(${X} + 1) = 12)`, `Extra challenge: the trip banner must be 12 m² and 1 m longer than it is wide. What are its dimensions? (${X}(${X} + 1) = 12)`)}</li>
      </ol>
      <div class="tool">
        <h3>${T(L, 'Compara els pressupostos', 'Compara los presupuestos', 'Compare the quotes')}</h3>
        <div class="tool-grid">
          <div class="ctrl">
            <label for="bus-af">A: ${T(L, 'fix', 'fijo', 'fixed')} (€) <output id="bus-afo"></output><input type="range" id="bus-af" min="0" max="600" step="20" value="300"></label>
            <label for="bus-ap">A: ${T(L, 'per alumne', 'por alumno', 'per student')} (€) <output id="bus-apo"></output><input type="range" id="bus-ap" min="0" max="40" value="12"></label>
            <label for="bus-bf">B: ${T(L, 'fix', 'fijo', 'fixed')} (€) <output id="bus-bfo"></output><input type="range" id="bus-bf" min="0" max="600" step="20" value="180"></label>
            <label for="bus-bp">B: ${T(L, 'per alumne', 'por alumno', 'per student')} (€) <output id="bus-bpo"></output><input type="range" id="bus-bp" min="0" max="40" value="18"></label>
          </div>
          <div class="viz"><div class="calc" id="bus-eq"></div><div id="bus-plot"></div><p id="bus-res" class="good"></p></div>
        </div>
      </div>
      <div class="rule product"><span class="t">${T(L, 'Producte final', 'Producto final', 'Final product')}</span>
        ${T(L, 'Un informe breu per a l\'AMPA amb les equacions, la gràfica i una recomanació argumentada segons el nombre d\'alumnes.', 'Un informe breve para el AMPA con las ecuaciones, la gráfica y una recomendación argumentada según el número de alumnos.', 'A short report for the parents\' association with the equations, the graph and a reasoned recommendation depending on the number of students.')}</div>
      <p class="muted">${T(L, 'Connexió amb l\'ODS 12: consum responsable i presa de decisions informades.', 'Conexión con el ODS 12: consumo responsable y toma de decisiones informadas.', 'Link to SDG 12: responsible consumption and informed decisions.')}</p>`,
    init(root) {
      const $ = (id) => root.querySelector('#' + id);
      const draw = () => {
        const af = +$('bus-af').value, ap = +$('bus-ap').value, bf = +$('bus-bf').value, bp = +$('bus-bp').value;
        $('bus-afo').textContent = af; $('bus-apo').textContent = ap; $('bus-bfo').textContent = bf; $('bus-bpo').textContent = bp;
        $('bus-eq').innerHTML = `${af} + ${ap}${X} = ${bf} + ${bp}${X}`;
        const pts = []; let msg;
        if (ap === bp) msg = af === bf ? T(L, 'Les dues empreses costen sempre el mateix.', 'Las dos empresas cuestan siempre lo mismo.', 'Both companies always cost the same.') : T(L, 'Les rectes són paral·leles: una empresa és sempre més barata.', 'Las rectas son paralelas: una empresa es siempre más barata.', 'The lines are parallel: one company is always cheaper.');
        else {
          const x = (bf - af) / (ap - bp), y = af + ap * x;
          if (x > 0) {
            pts.push([x, y]);
            const xr = Math.round(x * 100) / 100, cheapAfter = ap < bp ? 'A' : 'B', cheapBefore = cheapAfter === 'A' ? 'B' : 'A';
            msg = T(L, `Costen igual amb ${xr} alumnes. Amb menys, surt més a compte l'empresa ${cheapBefore}; amb més, la ${cheapAfter}.`, `Cuestan lo mismo con ${xr} alumnos. Con menos, sale más a cuenta la empresa ${cheapBefore}; con más, la ${cheapAfter}.`, `They cost the same with ${xr} students. With fewer, company ${cheapBefore} is cheaper; with more, company ${cheapAfter}.`);
          } else msg = T(L, 'No es tallen amb un nombre positiu d\'alumnes: una empresa és sempre més barata.', 'No se cortan con un número positivo de alumnos: una empresa es siempre más barata.', 'They don\'t cross at a positive number of students: one company is always cheaper.');
        }
        $('bus-plot').innerHTML = QM.plot([(x) => af + ap * x, (x) => bf + bp * x], [], { xmin: 0, xmax: 40, ymin: 0, ymax: 1600, gx: 5, gy: 200, lx: 10, ly: 400, w: 420, h: 280, pts });
        $('bus-res').textContent = msg;
      };
      ['bus-af', 'bus-ap', 'bus-bf', 'bus-bp'].forEach((id) => $(id).addEventListener('input', draw)); draw();
    },
  });
  U.history = (L) => T(L,
    '<b>Hipàtia d\'Alexandria</b> (segle IV) va ser matemàtica, astrònoma i mestra. Va escriure comentaris a l\'<i>Aritmètica</i> de Diofant, el llibre on apareixen moltes de les primeres equacions. El nom «àlgebra» ve del llibre d\'<b>al-Khwarizmi</b> (segle IX), que explicava com resoldre equacions de segon grau completant quadrats.',
    '<b>Hipatia de Alejandría</b> (siglo IV) fue matemática, astrónoma y maestra. Escribió comentarios a la <i>Aritmética</i> de Diofanto, el libro donde aparecen muchas de las primeras ecuaciones. El nombre «álgebra» viene del libro de <b>al-Juarismi</b> (siglo IX), que explicaba cómo resolver ecuaciones de segundo grado completando cuadrados.',
    '<b>Hypatia of Alexandria</b> (4th century) was a mathematician, astronomer and teacher. She wrote commentaries on Diophantus\' <i>Arithmetica</i>, the book where many of the first equations appear. The word "algebra" comes from the book by <b>al-Khwarizmi</b> (9th century), who explained how to solve quadratic equations by completing the square.');
})();
