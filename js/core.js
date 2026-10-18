// Eines comunes: aritmètica, aleatoris i dibuixos SVG de fraccions.
window.QM = { units: {} };

QM.gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
QM.lcm = (a, b) => a / QM.gcd(a, b) * b;
QM.rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
QM.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
QM.simp = (n, d) => { const g = QM.gcd(n, d) || 1; const s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
// Tria el text segons l'idioma: T(lang, 'català', 'castellà', 'English')
QM.T = (lang, ca, es, en) => (lang === 'es' ? es : lang === 'en' ? (en ?? ca) : ca);
// Variable en cursiva matemàtica
QM.v = (s) => `<i class="v">${s}</i>`;

// Fracció apilada
const plain = (s) => String(s).replace(/<[^>]*>/g, '').replace(/"/g, '');
QM.F = (n, d) => `<span class="frac" role="math" aria-label="${plain(n)}/${plain(d)}"><span class="fn">${n}</span><span class="fd">${d}</span></span>`;
// Fracció simplificada (mostra enter si el denominador és 1)
QM.Fs = (n, d) => { const [a, b] = QM.simp(n, d); return b === 1 ? `<span class="mono">${a}</span>` : QM.F(a, b); };
QM.op = (s) => `<span class="op">${s}</span>`;

// Barra dividida en d parts amb n pintades (si n > d, diverses barres)
QM.bar = (n, d, w = 260, h = 38, cls = 'sh') => {
  const bars = Math.max(1, Math.ceil(n / d));
  const gap = 10, H = bars * h + (bars - 1) * gap + 4;
  let s = `<svg width="${w + 4}" height="${H}" viewBox="0 0 ${w + 4} ${H}" role="img" aria-label="${n}/${d}">`;
  for (let b = 0; b < bars; b++) {
    const y = 2 + b * (h + gap);
    for (let i = 0; i < d; i++) {
      const filled = b * d + i < n;
      s += `<rect x="${2 + i * w / d}" y="${y}" width="${w / d}" height="${h}" class="${filled ? cls : 'em'}"/>`;
      s += `<rect x="${2 + i * w / d}" y="${y}" width="${w / d}" height="${h}" class="ed"/>`;
    }
  }
  return s + '</svg>';
};

// Pastís de d sectors amb n pintats
QM.pie = (n, d, size = 130, cls = 'sh') => {
  const r = size / 2 - 3, c = size / 2;
  let s = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${n}/${d}">`;
  if (d === 1) {
    s += `<circle cx="${c}" cy="${c}" r="${r}" class="${n >= 1 ? cls : 'em'}"/><circle cx="${c}" cy="${c}" r="${r}" class="ed"/>`;
    return s + '</svg>';
  }
  const pt = (a) => [c + r * Math.cos(a), c + r * Math.sin(a)];
  for (let i = 0; i < d; i++) {
    const a0 = -Math.PI / 2 + 2 * Math.PI * i / d, a1 = -Math.PI / 2 + 2 * Math.PI * (i + 1) / d;
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const path = `M${c},${c} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
    s += `<path d="${path}" class="${i < n ? cls : 'em'}"/><path d="${path}" class="ed"/>`;
  }
  return s + '</svg>';
};

// Recta numèrica de 0 a max amb una marca al valor v
QM.line = (v, d, max = 3, w = 420) => {
  const pad = 20, H = 64, scale = (w - 2 * pad) / max;
  let s = `<svg width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" role="img" aria-label="${v}">`;
  s += `<line x1="${pad}" y1="30" x2="${w - pad}" y2="30" class="ax"/>`;
  for (let k = 0; k <= max * d; k++) {
    const x = pad + k * scale / d, whole = k % d === 0;
    s += `<line x1="${x}" y1="${whole ? 22 : 26}" x2="${x}" y2="${whole ? 38 : 34}" class="ax"/>`;
    if (whole) s += `<text x="${x}" y="56" text-anchor="middle" class="tk">${k / d}</text>`;
  }
  const xv = pad + Math.min(v, max) * scale;
  s += `<circle cx="${xv}" cy="30" r="7" class="mk"/>`;
  return s + '</svg>';
};

// Gràfica d'una funció f en uns eixos de coordenades, amb punts marcats a l'eix x
QM.plot = (f, marks = [], o = {}) => {
  const xmin = o.xmin ?? -8, xmax = o.xmax ?? 8, ymin = o.ymin ?? -10, ymax = o.ymax ?? 10;
  const w = o.w ?? 440, h = o.h ?? 300, pad = 6;
  const X = (x) => pad + (x - xmin) / (xmax - xmin) * (w - 2 * pad);
  const Y = (y) => pad + (ymax - y) / (ymax - ymin) * (h - 2 * pad);
  const id = 'clip' + Math.random().toString(36).slice(2, 8);
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="plot">
    <defs><clipPath id="${id}"><rect x="${pad}" y="${pad}" width="${w - 2 * pad}" height="${h - 2 * pad}"/></clipPath></defs>
    <rect x="${pad}" y="${pad}" width="${w - 2 * pad}" height="${h - 2 * pad}" class="em"/>`;
  for (let x = Math.ceil(xmin); x <= xmax; x++) s += `<line x1="${X(x)}" y1="${pad}" x2="${X(x)}" y2="${h - pad}" class="gr"/>`;
  for (let y = Math.ceil(ymin); y <= ymax; y++) s += `<line x1="${pad}" y1="${Y(y)}" x2="${w - pad}" y2="${Y(y)}" class="gr"/>`;
  s += `<line x1="${pad}" y1="${Y(0)}" x2="${w - pad}" y2="${Y(0)}" class="ax"/><line x1="${X(0)}" y1="${pad}" x2="${X(0)}" y2="${h - pad}" class="ax"/>`;
  for (let x = Math.ceil(xmin) + 1; x < xmax; x += 2) if (x) s += `<text x="${X(x)}" y="${Y(0) + 14}" text-anchor="middle" class="tk">${x < 0 ? '−' + (-x) : x}</text>`;
  for (let y = Math.ceil(ymin) + 2; y < ymax; y += 4) if (y) s += `<text x="${X(0) - 5}" y="${Y(y) + 4}" text-anchor="end" class="tk">${y < 0 ? '−' + (-y) : y}</text>`;
  let d = '';
  for (let i = 0; i <= 400; i++) {
    const x = xmin + (xmax - xmin) * i / 400, y = Math.max(ymin - 50, Math.min(ymax + 50, f(x)));
    d += (i ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1);
  }
  s += `<path d="${d}" class="cv" clip-path="url(#${id})"/>`;
  marks.forEach((m) => { if (m >= xmin && m <= xmax) s += `<circle cx="${X(m)}" cy="${Y(0)}" r="6" class="mk"/>`; });
  return s + '</svg>';
};
