// Unitat: Fraccions (1r ESO)
// Conté: teoria, laboratori interactiu i generadors d'exercicis per nivells.
(function () {
  const { F, Fs, op, bar, pie, rnd, pick, gcd, lcm, simp, T } = QM;

  // ---------- TEORIA ----------
  function theory(L) {
    const s = [];
    s.push({ id: 'que', title: T(L, 'Què és una fracció?', '¿Qué es una fracción?', 'What is a fraction?'), html: `
      <div class="rule"><span class="t">${T(L, 'Definició', 'Definición', 'Definition')}</span>
      ${T(L,
        `Una fracció expressa una o diverses parts iguals d'una unitat. El <mark>denominador</mark> diu en quantes parts iguals dividim la unitat, i el <mark>numerador</mark> diu quantes parts en prenem.`,
        `Una fracción expresa una o varias partes iguales de una unidad. El <mark>denominador</mark> dice en cuántas partes iguales dividimos la unidad, y el <mark>numerador</mark> dice cuántas partes tomamos.`,
        `A fraction expresses one or more equal parts of a whole. The <mark>denominator</mark> tells us how many equal parts the whole is divided into, and the <mark>numerator</mark> tells us how many parts we take.`)}</div>
      <div class="figs">
        <figure>${pie(3, 4, 120)}<figcaption>${F(3, 4)} ${T(L, 'tres quarts', 'tres cuartos', 'three quarters')}</figcaption></figure>
        <figure>${bar(2, 5, 220, 34)}<figcaption>${F(2, 5)} ${T(L, 'dos cinquens', 'dos quintos', 'two fifths')}</figcaption></figure>
      </div>
      <p>${T(L,
          `Si el numerador és més petit que el denominador, la fracció és <b>pròpia</b> (val menys que 1). Si és més gran, és <b>impròpia</b> (val més que 1). Si són iguals, la fracció val exactament 1.`,
          `Si el numerador es menor que el denominador, la fracción es <b>propia</b> (vale menos que 1). Si es mayor, es <b>impropia</b> (vale más que 1). Si son iguales, la fracción vale exactamente 1.`,
          `If the numerator is smaller than the denominator, the fraction is <b>proper</b> (worth less than 1). If it is bigger, it is <b>improper</b> (worth more than 1). If they are equal, the fraction is exactly 1.`)}</p>
      <p>${T(L,
        `Una fracció també és una divisió: ${F(3, 4)} = 3 : 4 = 0,75. Per això podem situar qualsevol fracció a la recta numèrica.`,
        `Una fracción también es una división: ${F(3, 4)} = 3 : 4 = 0,75. Por eso podemos situar cualquier fracción en la recta numérica.`,
        `A fraction is also a division: ${F(3, 4)} = 3 ÷ 4 = 0.75. That is why we can place any fraction on the number line.`)}</p>
      <div class="viz">${QM.line(0.75, 4, 2, 360)}</div>` });

    s.push({ id: 'equiv', title: T(L, 'Fraccions equivalents', 'Fracciones equivalentes', 'Equivalent fractions'), html: `
      <p>${T(L,
        `Dues fraccions són <mark>equivalents</mark> si representen la mateixa quantitat. Les obtenim multiplicant o dividint el numerador i el denominador pel mateix nombre.`,
        `Dos fracciones son <mark>equivalentes</mark> si representan la misma cantidad. Las obtenemos multiplicando o dividiendo el numerador y el denominador por el mismo número.`,
        `Two fractions are <mark>equivalent</mark> if they represent the same amount. We get them by multiplying or dividing the numerator and the denominator by the same number.`)}</p>
      <div class="figs">
        <figure>${bar(1, 2, 200, 30)}<figcaption>${F(1, 2)}</figcaption></figure>
        <figure>${bar(2, 4, 200, 30)}<figcaption>${F(2, 4)}</figcaption></figure>
        <figure>${bar(4, 8, 200, 30)}<figcaption>${F(4, 8)}</figcaption></figure>
      </div>
      <div class="rule"><span class="t">${T(L, 'Propietat', 'Propiedad', 'Property')}</span>
        <div class="calc">${F(QM.v('a'), QM.v('b'))} = ${F(QM.v('c'), QM.v('d'))} ⟺ ${QM.v('a')} · ${QM.v('d')} = ${QM.v('b')} · ${QM.v('c')}</div>
        ${T(L, '(multiplicació en creu)', '(multiplicación en cruz)', '(cross multiplication)')}
      </div>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <div class="calc">${F(2, 3)} ${op('?')} ${F(8, 12)} <span>→</span> 2 · 12 = 24 , 3 · 8 = 24 <span>✓</span></div>
      </div>` });

    s.push({ id: 'simp', title: T(L, 'Simplificar fraccions', 'Simplificar fracciones', 'Simplifying fractions'), html: `
      <p>${T(L,
        `Simplificar és dividir numerador i denominador pel mateix nombre fins que no es pugui més. La fracció que en surt és <mark>irreductible</mark>. El camí més ràpid és dividir pel màxim comú divisor (m.c.d.).`,
        `Simplificar es dividir numerador y denominador por el mismo número hasta que no se pueda más. La fracción que resulta es <mark>irreducible</mark>. El camino más rápido es dividir por el máximo común divisor (m.c.d.).`,
        `To simplify, divide the numerator and denominator by the same number until you can't any more. The result is in <mark>lowest terms</mark>. The fastest way is to divide by the greatest common divisor (GCD).`)}</p>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <div class="calc">${F(18, 24)} = ${F('18 : 2', '24 : 2')} = ${F(9, 12)} = ${F('9 : 3', '12 : 3')} = ${F(3, 4)}</div>
        <p>${T(L, 'O d\'un sol cop: m.c.d.(18, 24) = 6, i ', 'O de una vez: m.c.d.(18, 24) = 6, y ', 'Or in one go: GCD(18, 24) = 6, and ')}${F('18 : 6', '24 : 6')} = ${F(3, 4)}</p>
      </div>` });

    s.push({ id: 'comp', title: T(L, 'Comparar fraccions', 'Comparar fracciones', 'Comparing fractions'), html: `
      <ul>
        <li>${T(L, '<b>Mateix denominador</b>: és més gran la que té el numerador més gran.', '<b>Mismo denominador</b>: es mayor la que tiene el numerador mayor.', '<b>Same denominator</b>: the one with the bigger numerator is bigger.')} ${F(5, 7)} &gt; ${F(3, 7)}</li>
        <li>${T(L, '<b>Mateix numerador</b>: és més gran la que té el denominador més petit (les parts són més grans).', '<b>Mismo numerador</b>: es mayor la que tiene el denominador menor (las partes son más grandes).', '<b>Same numerator</b>: the one with the smaller denominator is bigger (the parts are bigger).')} ${F(2, 3)} &gt; ${F(2, 5)}</li>
        <li>${T(L, '<b>Cas general</b>: les reduïm a comú denominador (amb el m.c.m.) i comparem numeradors.', '<b>Caso general</b>: las reducimos a común denominador (con el m.c.m.) y comparamos numeradores.', '<b>General case</b>: rewrite them with a common denominator (using the LCM) and compare numerators.')}</li>
      </ul>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <div class="calc">${F(3, 4)} ${op('?')} ${F(5, 6)} <span>→</span> ${T(L, 'm.c.m.', 'm.c.m.', 'LCM')}(4, 6) = 12 <span>→</span> ${F(9, 12)} &lt; ${F(10, 12)} <span>→</span> ${F(3, 4)} &lt; ${F(5, 6)}</div>
      </div>` });

    s.push({ id: 'suma', title: T(L, 'Sumar i restar', 'Sumar y restar', 'Adding and subtracting'), html: `
      <p>${T(L,
        `Només podem sumar o restar parts <mark>de la mateixa mida</mark>, és a dir, fraccions amb el mateix denominador. Si no el tenen, primer les reduïm a comú denominador.`,
        `Solo podemos sumar o restar partes <mark>del mismo tamaño</mark>, es decir, fracciones con el mismo denominador. Si no lo tienen, primero las reducimos a común denominador.`,
        `We can only add or subtract parts <mark>of the same size</mark>, that is, fractions with the same denominator. If they don't have one, we first find a common denominator.`)}</p>
      <div class="example"><span class="t">${T(L, 'Mateix denominador', 'Mismo denominador', 'Same denominator')}</span>
        <div class="calc">${F(2, 9)} ${op('+')} ${F(5, 9)} = ${F('2 + 5', 9)} = ${F(7, 9)}</div>
      </div>
      <div class="example"><span class="t">${T(L, 'Denominador diferent', 'Denominador distinto', 'Different denominators')}</span>
        <div class="calc">${F(1, 4)} ${op('+')} ${F(5, 6)} = ${F(3, 12)} ${op('+')} ${F(10, 12)} = ${F(13, 12)}</div>
        <p>${T(L, 'm.c.m.(4, 6) = 12. Cada fracció es transforma en una d\'equivalent amb denominador 12.', 'm.c.m.(4, 6) = 12. Cada fracción se transforma en una equivalente con denominador 12.', 'LCM(4, 6) = 12. Each fraction becomes an equivalent one with denominator 12.')}</p>
      </div>
      <div class="warn"><b>${T(L, 'Error freqüent', 'Error frecuente', 'Common mistake')}:</b> ${F(1, 2)} ${op('+')} ${F(1, 3)} ≠ ${F(2, 5)}. ${T(L, 'Els denominadors no se sumen mai!', '¡Los denominadores no se suman nunca!', 'Never add the denominators!')}</div>` });

    s.push({ id: 'mult', title: T(L, 'Multiplicar i dividir', 'Multiplicar y dividir', 'Multiplying and dividing'), html: `
      <div class="rule"><span class="t">${T(L, 'Producte', 'Producto', 'Product')}</span>
        <div class="calc">${F(QM.v('a'), QM.v('b'))} ${op('·')} ${F(QM.v('c'), QM.v('d'))} = ${F(`${QM.v('a')} · ${QM.v('c')}`, `${QM.v('b')} · ${QM.v('d')}`)}</div>
      </div>
      <div class="rule"><span class="t">${T(L, 'Quocient (en creu)', 'Cociente (en cruz)', 'Quotient (cross multiply)')}</span>
        <div class="calc">${F(QM.v('a'), QM.v('b'))} ${op(':')} ${F(QM.v('c'), QM.v('d'))} = ${F(`${QM.v('a')} · ${QM.v('d')}`, `${QM.v('b')} · ${QM.v('c')}`)}</div>
      </div>
      <div class="example"><span class="t">${T(L, 'Exemples', 'Ejemplos', 'Examples')}</span>
        <div class="calc">${F(2, 3)} ${op('·')} ${F(9, 4)} = ${F(18, 12)} = ${F(3, 2)}</div>
        <div class="calc">${F(3, 5)} ${op(':')} ${F(9, 10)} = ${F(30, 45)} = ${F(2, 3)}</div>
      </div>
      <p>${T(L, '<b>Prioritat d\'operacions:</b> primer parèntesis, després multiplicacions i divisions, i finalment sumes i restes.', '<b>Prioridad de operaciones:</b> primero paréntesis, después multiplicaciones y divisiones, y por último sumas y restas.', '<b>Order of operations:</b> brackets first, then multiplication and division, and finally addition and subtraction.')}</p>` });

    s.push({ id: 'quant', title: T(L, 'Fracció d\'una quantitat', 'Fracción de una cantidad', 'Fraction of an amount'), html: `
      <p>${T(L,
        `Per calcular una fracció d'un nombre, el dividim pel denominador i el resultat el multipliquem pel numerador.`,
        `Para calcular una fracción de un número, lo dividimos por el denominador y el resultado lo multiplicamos por el numerador.`,
        `To find a fraction of a number, divide it by the denominator and multiply the result by the numerator.`)}</p>
      <div class="example"><span class="t">${T(L, 'Exemple', 'Ejemplo', 'Example')}</span>
        <div class="calc">${F(3, 5)} ${T(L, 'de', 'de', 'of')} 40 = (40 : 5) · 3 = 8 · 3 = 24</div>
        <figure style="margin:0">${bar(3, 5, 300, 34)}</figure>
        <p>${T(L, 'Cada cinquè de 40 són 8; tres cinquens són 24.', 'Cada quinto de 40 son 8; tres quintos son 24.', 'One fifth of 40 is 8, so three fifths are 24.')}</p>
      </div>` });
    return s;
  }

  // ---------- GENERADORS D'EXERCICIS ----------
  // Cada generador retorna { q, kind, check, hint, sol }.
  // kind: 'frac' (resposta n/d), 'num' (nombre), 'nums' (dos nombres) o 'choice' (opcions).
  // check(resposta) → true, false o 'partial' (correcta però no simplificada).
  const fracEq = (a, n, d) => a.d !== 0 && a.n * d === n * a.d;
  const SIMPLIFY = (L) => T(L, 'Calcula i simplifica el resultat:', 'Calcula y simplifica el resultado:', 'Work it out and simplify the result:');

  function identify(L) {
    const d = rnd(3, 10), n = rnd(1, d - 1), shape = pick(['bar', 'pie']);
    return {
      q: `<p>${T(L, 'Quina fracció de la figura està pintada?', '¿Qué fracción de la figura está pintada?', 'What fraction of the shape is shaded?')}</p>
          <div class="fig">${shape === 'bar' ? bar(n, d, 280, 44) : pie(n, d, 150)}</div>`,
      kind: 'frac', check: (a) => fracEq(a, n, d),
      hint: T(L, 'Compta en quantes parts iguals està dividida (denominador) i quantes n\'hi ha de pintades (numerador).',
                 'Cuenta en cuántas partes iguales está dividida (denominador) y cuántas hay pintadas (numerador).',
                 'Count how many equal parts it is divided into (denominator) and how many are shaded (numerator).'),
      sol: `${F(n, d)} : ${T(L, `${d} parts iguals, ${n} de pintades.`, `${d} partes iguales, ${n} pintadas.`, `${d} equal parts, ${n} shaded.`)}`,
    };
  }

  function equivalent(L) {
    let b = rnd(2, 9), a = rnd(1, b - 1); [a, b] = simp(a, b);
    const k = rnd(2, 6), askNum = Math.random() < 0.5;
    const ans = askNum ? a * k : b * k;
    const right = askNum ? F('?', b * k) : F(a * k, '?');
    return {
      q: `<p>${T(L, 'Completa perquè les fraccions siguin equivalents:', 'Completa para que las fracciones sean equivalentes:', 'Fill in the gap so the fractions are equivalent:')}</p>
          <div class="calc">${F(a, b)} = ${right}</div>`,
      kind: 'num', check: (x) => x === ans,
      hint: askNum
        ? T(L, `Per quin nombre has multiplicat ${b} per obtenir ${b * k}? Fes el mateix amb el numerador.`, `¿Por qué número has multiplicado ${b} para obtener ${b * k}? Haz lo mismo con el numerador.`, `What did you multiply ${b} by to get ${b * k}? Do the same to the numerator.`)
        : T(L, `Per quin nombre has multiplicat ${a} per obtenir ${a * k}? Fes el mateix amb el denominador.`, `¿Por qué número has multiplicado ${a} para obtener ${a * k}? Haz lo mismo con el denominador.`, `What did you multiply ${a} by to get ${a * k}? Do the same to the denominator.`),
      sol: `<div class="calc">${F(a, b)} = ${F(`${a} · ${k}`, `${b} · ${k}`)} = ${F(a * k, b * k)}</div>`,
    };
  }

  function simplify(L) {
    let d = rnd(2, 9), n = rnd(1, d - 1); [n, d] = simp(n, d);
    const k = pick([2, 3, 4, 5, 6, 8, 9, 10]), N = n * k, D = d * k;
    return {
      q: `<p>${T(L, 'Simplifica fins a obtenir la fracció irreductible:', 'Simplifica hasta obtener la fracción irreducible:', 'Simplify to lowest terms:')}</p>
          <div class="calc">${F(N, D)}</div>`,
      kind: 'frac',
      check: (a) => fracEq(a, N, D) ? (gcd(a.n, a.d) === 1 ? true : 'partial') : false,
      partial: T(L, 'És equivalent, però encara es pot simplificar més.', 'Es equivalente, pero aún se puede simplificar más.', 'It is equivalent, but you can still simplify it.'),
      hint: T(L, `Busca el m.c.d. de ${N} i ${D}.`, `Busca el m.c.d. de ${N} y ${D}.`, `Find the GCD of ${N} and ${D}.`),
      sol: `<div class="calc">${T(L, 'm.c.d.', 'm.c.d.', 'GCD')}(${N}, ${D}) = ${k} → ${F(`${N} : ${k}`, `${D} : ${k}`)} = ${F(n, d)}</div>`,
    };
  }

  function compare(L) {
    let a, b, c, d;
    if (Math.random() < 0.25) {
      b = rnd(2, 7); a = rnd(1, b - 1); [a, b] = simp(a, b); const k = rnd(2, 4); c = a * k; d = b * k;
      if (Math.random() < 0.5) [a, b, c, d] = [c, d, a, b];
    } else {
      do { b = rnd(2, 10); d = rnd(2, 10); a = rnd(1, b + 2); c = rnd(1, d + 2); } while (a * d === b * c || b === d || gcd(a, b) > 1 || gcd(c, d) > 1);
    }
    const ans = a * d > c * b ? '>' : a * d < c * b ? '<' : '=';
    const m = lcm(b, d);
    return {
      q: `<p>${T(L, 'Quin signe va al mig?', '¿Qué signo va en medio?', 'Which sign goes in the middle?')}</p>
          <div class="calc">${F(a, b)} <span class="op">□</span> ${F(c, d)}</div>`,
      kind: 'choice', options: ['<', '=', '>'], check: (x) => x === ans,
      hint: T(L, `Redueix-les a denominador ${m} (el m.c.m. de ${b} i ${d}).`, `Redúcelas a denominador ${m} (el m.c.m. de ${b} y ${d}).`, `Rewrite both with denominator ${m} (the LCM of ${b} and ${d}).`),
      sol: `<div class="calc">${F(a * m / b, m)} ${ans} ${F(c * m / d, m)} → ${F(a, b)} ${ans} ${F(c, d)}</div>`,
    };
  }

  function addsub(L) {
    let a, b, c, d; do { b = rnd(2, 10); d = rnd(2, 10); a = rnd(1, b - 1); c = rnd(1, d - 1); } while (b === d || gcd(a, b) > 1 || gcd(c, d) > 1);
    const sign = pick(['+', '−']);
    if (sign === '−' && a * d < c * b) { [a, b, c, d] = [c, d, a, b]; }
    const m = lcm(b, d), A = a * m / b, C = c * m / d, R = sign === '+' ? A + C : A - C;
    return {
      q: `<p>${SIMPLIFY(L)}</p><div class="calc">${F(a, b)} ${op(sign)} ${F(c, d)}</div>`,
      kind: 'frac',
      check: (x) => fracEq(x, R, m) ? (gcd(x.n, x.d) === 1 ? true : 'partial') : false,
      partial: T(L, 'El resultat és correcte, però es pot simplificar.', 'El resultado es correcto, pero se puede simplificar.', 'The answer is right, but it can be simplified.'),
      hint: T(L, `Primer busca el m.c.m.(${b}, ${d}) per tenir el mateix denominador.`, `Primero busca el m.c.m.(${b}, ${d}) para tener el mismo denominador.`, `First find LCM(${b}, ${d}) to get a common denominator.`),
      sol: `<div class="calc">${F(A, m)} ${op(sign)} ${F(C, m)} = ${F(R, m)}${gcd(R, m) > 1 ? ' = ' + Fs(R, m) : ''}</div>`,
    };
  }

  function ofQuantity(L) {
    let d = rnd(2, 10), n = rnd(1, d - 1); [n, d] = simp(n, d);
    const N = d * rnd(2, 12), ans = N / d * n;
    const ctx = pick([
      T(L, `Quant és ${F(n, d)} de ${N}?`, `¿Cuánto es ${F(n, d)} de ${N}?`, `What is ${F(n, d)} of ${N}?`),
      T(L, `En un institut hi ha ${N} alumnes i ${F(n, d)} vénen en bicicleta. Quants alumnes hi vénen en bicicleta?`, `En un instituto hay ${N} alumnos y ${F(n, d)} vienen en bicicleta. ¿Cuántos alumnos vienen en bicicleta?`, `A school has ${N} students and ${F(n, d)} of them cycle to school. How many students cycle?`),
      T(L, `Una pizza costa ${N} €. Si pago ${F(n, d)} del preu, quants euros pago?`, `Una pizza cuesta ${N} €. Si pago ${F(n, d)} del precio, ¿cuántos euros pago?`, `A pizza costs €${N}. If I pay ${F(n, d)} of the price, how many euros do I pay?`),
    ]);
    return {
      q: `<p>${ctx}</p>`, kind: 'num', check: (x) => x === ans,
      hint: T(L, `Divideix ${N} entre ${d} i multiplica per ${n}.`, `Divide ${N} entre ${d} y multiplica por ${n}.`, `Divide ${N} by ${d} and multiply by ${n}.`),
      sol: `<div class="calc">(${N} : ${d}) · ${n} = ${N / d} · ${n} = ${ans}</div>`,
    };
  }

  function mulDiv(L) {
    let a, b, c, d; do { a = rnd(1, 9); b = rnd(2, 9); c = rnd(1, 9); d = rnd(2, 9); } while (gcd(a, b) > 1 || gcd(c, d) > 1);
    const mul = Math.random() < 0.5;
    const N = mul ? a * c : a * d, D = mul ? b * d : b * c;
    return {
      q: `<p>${SIMPLIFY(L)}</p><div class="calc">${F(a, b)} ${op(mul ? '·' : ':')} ${F(c, d)}</div>`,
      kind: 'frac',
      check: (x) => fracEq(x, N, D) ? (gcd(x.n, x.d) === 1 ? true : 'partial') : false,
      partial: T(L, 'Correcte, però encara es pot simplificar.', 'Correcto, pero aún se puede simplificar.', 'Right, but it can still be simplified.'),
      hint: mul ? T(L, 'Numerador per numerador i denominador per denominador.', 'Numerador por numerador y denominador por denominador.', 'Numerator times numerator, denominator times denominator.')
                : T(L, 'Per dividir, multiplica en creu.', 'Para dividir, multiplica en cruz.', 'To divide, cross multiply.'),
      sol: `<div class="calc">${F(mul ? `${a} · ${c}` : `${a} · ${d}`, mul ? `${b} · ${d}` : `${b} · ${c}`)} = ${F(N, D)}${gcd(N, D) > 1 ? ' = ' + Fs(N, D) : ''}</div>`,
    };
  }

  function combined(L) {
    let a, b, c, d, e, f;
    do { a = rnd(1, 5); b = rnd(2, 6); c = rnd(1, 5); d = rnd(2, 6); e = rnd(1, 5); f = rnd(2, 6); } while (gcd(a, b) > 1 || gcd(c, d) > 1 || gcd(e, f) > 1);
    const [pn, pd] = simp(c * e, d * f);
    const m = lcm(b, pd), R = a * m / b + pn * m / pd;
    return {
      q: `<p>${T(L, 'Calcula respectant la prioritat de les operacions:', 'Calcula respetando la prioridad de las operaciones:', 'Work it out using the order of operations:')}</p>
          <div class="calc">${F(a, b)} ${op('+')} ${F(c, d)} ${op('·')} ${F(e, f)}</div>`,
      kind: 'frac',
      check: (x) => fracEq(x, R, m) ? (gcd(x.n, x.d) === 1 ? true : 'partial') : false,
      partial: T(L, 'El valor és correcte. Ara simplifica\'l.', 'El valor es correcto. Ahora simplifícalo.', 'The value is right. Now simplify it.'),
      hint: T(L, 'Primer la multiplicació, després la suma.', 'Primero la multiplicación, después la suma.', 'Multiplication first, then addition.'),
      sol: `<div class="calc">${F(a, b)} ${op('+')} ${Fs(pn, pd)} = ${F(a * m / b, m)} ${op('+')} ${F(pn * m / pd, m)} = ${F(R, m)}${gcd(R, m) > 1 ? ' = ' + Fs(R, m) : ''}</div>`,
    };
  }

  function problem(L) {
    const b = pick([3, 4, 5]), a = rnd(1, b - 1), d = pick([2, 3, 4]), c = rnd(1, d - 1), M = rnd(1, 4);
    const tot = b * d * M * pick([1, 2]), s1 = tot / b * a, R = tot - s1, s2 = R / d * c, ans = R - s2;
    const ctx = pick([
      T(L, `La Júlia té ${tot} €. Es gasta ${F(a, b)} en un llibre i ${F(c, d)} del que li queda en un berenar. Quants euros li queden?`,
           `Julia tiene ${tot} €. Se gasta ${F(a, b)} en un libro y ${F(c, d)} de lo que le queda en una merienda. ¿Cuántos euros le quedan?`,
           `Julia has €${tot}. She spends ${F(a, b)} on a book and ${F(c, d)} of what is left on a snack. How many euros does she have left?`),
      T(L, `Un dipòsit té ${tot} litres d'aigua. El matí se'n gasta ${F(a, b)} i la tarda ${F(c, d)} del que quedava. Quants litres queden?`,
           `Un depósito tiene ${tot} litros de agua. Por la mañana se gasta ${F(a, b)} y por la tarde ${F(c, d)} de lo que quedaba. ¿Cuántos litros quedan?`,
           `A tank holds ${tot} litres of water. In the morning ${F(a, b)} is used, and in the afternoon ${F(c, d)} of what was left. How many litres are left?`),
      T(L, `En Pau ha de llegir un llibre de ${tot} pàgines. Dilluns en llegeix ${F(a, b)} i dimarts ${F(c, d)} de les que falten. Quantes pàgines li falten encara?`,
           `Pau tiene que leer un libro de ${tot} páginas. El lunes lee ${F(a, b)} y el martes ${F(c, d)} de las que faltan. ¿Cuántas páginas le faltan todavía?`,
           `Pau has to read a ${tot}-page book. On Monday he reads ${F(a, b)} of it and on Tuesday ${F(c, d)} of the remaining pages. How many pages are still left?`),
    ]);
    return {
      q: `<p>${ctx}</p>`, kind: 'num', check: (x) => x === ans,
      hint: T(L, `Atenció: la segona fracció és del que queda, no del total. Primer calcula què queda després del primer pas.`,
                 `Atención: la segunda fracción es de lo que queda, no del total. Primero calcula qué queda tras el primer paso.`,
                 `Careful: the second fraction is of what is left, not of the total. First work out what is left after step one.`),
      sol: `<div class="calc">${F(a, b)} ${T(L, 'de', 'de', 'of')} ${tot} = ${s1} → ${T(L, 'queden', 'quedan', 'left')} ${R}</div>
            <div class="calc">${F(c, d)} ${T(L, 'de', 'de', 'of')} ${R} = ${s2} → ${T(L, 'queden', 'quedan', 'left')} <b>${ans}</b></div>`,
    };
  }

  // ---------- LABORATORI (pestanya Explora) ----------
  function explore(root, L) {
    root.innerHTML = `
      <div class="lab">
        <div class="lab-card">
          <h2>${T(L, 'Laboratori de fraccions', 'Laboratorio de fracciones', 'Fraction lab')}</h2>
          <p>${T(L, 'Mou els controls i observa com canvia la mateixa fracció en quatre representacions diferents.', 'Mueve los controles y observa cómo cambia la misma fracción en cuatro representaciones distintas.', 'Move the sliders and watch the same fraction change in four different representations.')}</p>
          <div class="lab-grid">
            <div class="ctrl">
              <div class="bigfrac" id="lab-frac"></div>
              <label for="lab-n">${T(L, 'Numerador', 'Numerador', 'Numerator')} <output id="lab-no"></output><input type="range" id="lab-n" min="0" max="24" value="3"></label>
              <label for="lab-d">${T(L, 'Denominador', 'Denominador', 'Denominator')} <output id="lab-do"></output><input type="range" id="lab-d" min="1" max="12" value="4"></label>
              <div class="readout">
                <div><span>${T(L, 'Decimal', 'Decimal', 'Decimal')}</span><b id="lab-dec"></b></div>
                <div><span>%</span><b id="lab-pc"></b></div>
                <div><span>${T(L, 'Irreductible', 'Irreducible', 'Lowest terms')}</span><b id="lab-irr"></b></div>
                <div><span>${T(L, 'Tipus', 'Tipo', 'Type')}</span><b id="lab-type" class="word"></b></div>
              </div>
            </div>
            <div class="viz" id="lab-viz"></div>
          </div>
        </div>
        <div class="lab-card">
          <h2>${T(L, 'Màquina d\'equivalències', 'Máquina de equivalencias', 'Equivalence machine')}</h2>
          <p>${T(L, 'Tria una fracció i un multiplicador. La part pintada no canvia: només la tallem en trossos més petits.', 'Elige una fracción y un multiplicador. La parte pintada no cambia: solo la cortamos en trozos más pequeños.', 'Pick a fraction and a multiplier. The shaded part stays the same: we just cut it into smaller pieces.')}</p>
          <div class="lab-grid">
            <div class="ctrl">
              <label for="eq-n">${T(L, 'Numerador', 'Numerador', 'Numerator')} <output id="eq-no"></output><input type="range" id="eq-n" min="1" max="5" value="2"></label>
              <label for="eq-d">${T(L, 'Denominador', 'Denominador', 'Denominator')} <output id="eq-do"></output><input type="range" id="eq-d" min="2" max="6" value="3"></label>
              <label for="eq-k">${T(L, 'Multiplica per', 'Multiplica por', 'Multiply by')} <output id="eq-ko"></output><input type="range" id="eq-k" min="1" max="5" value="2"></label>
            </div>
            <div class="viz" id="eq-viz"></div>
          </div>
        </div>
      </div>`;
    const $ = (id) => root.querySelector('#' + id);
    const fmt = (x) => (Math.round(x * 1000) / 1000).toLocaleString(L === 'es' ? 'es-ES' : L === 'en' ? 'en-GB' : 'ca-ES');
    function lab() {
      const n = +$('lab-n').value, d = +$('lab-d').value;
      $('lab-no').textContent = n; $('lab-do').textContent = d;
      $('lab-frac').innerHTML = F(n, d);
      $('lab-dec').textContent = fmt(n / d);
      $('lab-pc').textContent = fmt(n / d * 100) + '%';
      $('lab-irr').innerHTML = n === 0 ? '0' : Fs(n, d);
      $('lab-type').textContent = n < d ? T(L, 'pròpia', 'propia', 'proper') : n === d ? T(L, 'igual a 1', 'igual a 1', 'equal to 1') : T(L, 'impròpia', 'impropia', 'improper');
      const pies = Math.max(1, Math.ceil(n / d));
      let ps = ''; for (let i = 0; i < pies; i++) ps += pie(Math.min(d, Math.max(0, n - i * d)), d, 110);
      $('lab-viz').innerHTML = `<div>${bar(n, d, 320, 36)}</div><div class="figs">${ps}</div><div>${QM.line(n / d, d, Math.max(2, Math.ceil(n / d)), 440)}</div>`;
    }
    function eq() {
      const d = +$('eq-d').value; const nEl = $('eq-n'); nEl.max = d; if (+nEl.value > d) nEl.value = d;
      const n = +nEl.value, k = +$('eq-k').value;
      $('eq-no').textContent = n; $('eq-do').textContent = d; $('eq-ko').textContent = k;
      $('eq-viz').innerHTML = `
        <div class="figs"><span class="bigfrac">${F(n, d)}</span>${bar(n, d, 300, 36)}</div>
        <div class="figs"><span class="bigfrac">${F(n * k, d * k)}</span>${bar(n * k, d * k, 300, 36, 'sh2')}</div>
        <p class="calc">${F(n, d)} = ${F(`${n} · ${k}`, `${d} · ${k}`)} = ${F(n * k, d * k)}</p>`;
    }
    ['lab-n', 'lab-d'].forEach((id) => $(id).addEventListener('input', lab));
    ['eq-n', 'eq-d', 'eq-k'].forEach((id) => $(id).addEventListener('input', eq));
    lab(); eq();
  }

  QM.units['1eso-fraccions'] = {
    theory, explore,
    board: () => `${F(QM.v('a'), QM.v('b'))} · ${F(QM.v('c'), QM.v('d'))} = ${F(QM.v('a') + QM.v('c'), QM.v('b') + QM.v('d'))}`,
    levels: {
      1: [identify, equivalent, simplify],
      2: [compare, addsub, ofQuantity],
      3: [mulDiv, combined, problem],
    },
  };
})();
