// Temari de matemàtiques d'ESO, per cursos i blocs.
// Per afegir una unitat nova: crea js/units/<curs>-<id>.js, afegeix-la a index.html i posa ready: true aquí.
QM.blocks = {
  num: { ca: 'Nombres', es: 'Números', en: 'Numbers', icon: 'π', color: 'var(--b-num)' },
  alg: { ca: 'Àlgebra', es: 'Álgebra', en: 'Algebra', icon: 'x²', color: 'var(--b-alg)' },
  geo: { ca: 'Geometria i mesura', es: 'Geometría y medida', en: 'Geometry and measurement', icon: '△', color: 'var(--b-geo)' },
  fun: { ca: 'Funcions', es: 'Funciones', en: 'Functions', icon: 'f(x)', color: 'var(--b-fun)' },
  est: { ca: 'Estadística i probabilitat', es: 'Estadística y probabilidad', en: 'Statistics and probability', icon: 'σ', color: 'var(--b-est)' },
};

QM.courses = [
  { id: '1eso', ca: '1r ESO', es: '1º ESO', en: 'Year 1 ESO', n: '1r', units: [
    { id: 'divisibilitat', b: 'num', ca: 'Nombres naturals i divisibilitat', es: 'Números naturales y divisibilidad', en: 'Natural numbers and divisibility' },
    { id: 'enters', b: 'num', ca: 'Nombres enters', es: 'Números enteros', en: 'Integers' },
    { id: 'fraccions', b: 'num', ca: 'Fraccions', es: 'Fracciones', en: 'Fractions', ready: true },
    { id: 'decimals', b: 'num', ca: 'Nombres decimals', es: 'Números decimales', en: 'Decimal numbers' },
    { id: 'proporcionalitat', b: 'num', ca: 'Proporcionalitat i percentatges', es: 'Proporcionalidad y porcentajes', en: 'Proportionality and percentages' },
    { id: 'algebra', b: 'alg', ca: 'Iniciació a l\'àlgebra', es: 'Iniciación al álgebra', en: 'Introduction to algebra' },
    { id: 'angles', b: 'geo', ca: 'Angles i figures planes', es: 'Ángulos y figuras planas', en: 'Angles and plane shapes' },
    { id: 'arees', b: 'geo', ca: 'Perímetres i àrees', es: 'Perímetros y áreas', en: 'Perimeters and areas' },
    { id: 'grafiques', b: 'fun', ca: 'Coordenades i gràfiques', es: 'Coordenadas y gráficas', en: 'Coordinates and graphs' },
    { id: 'estadistica', b: 'est', ca: 'Estadística i atzar', es: 'Estadística y azar', en: 'Statistics and chance' },
  ]},
  { id: '2eso', ca: '2n ESO', es: '2º ESO', en: 'Year 2 ESO', n: '2n', units: [
    { id: 'potencies', b: 'num', ca: 'Potències i arrels', es: 'Potencias y raíces', en: 'Powers and roots' },
    { id: 'proporcionalitat', b: 'num', ca: 'Proporcionalitat directa i inversa', es: 'Proporcionalidad directa e inversa', en: 'Direct and inverse proportion' },
    { id: 'expressions', b: 'alg', ca: 'Expressions algebraiques', es: 'Expresiones algebraicas', en: 'Algebraic expressions' },
    { id: 'equacions', b: 'alg', ca: 'Equacions de primer i segon grau', es: 'Ecuaciones de primer y segundo grado', en: 'Linear and quadratic equations', ready: true },
    { id: 'sistemes', b: 'alg', ca: 'Sistemes d\'equacions', es: 'Sistemas de ecuaciones', en: 'Systems of equations' },
    { id: 'pitagores', b: 'geo', ca: 'Teorema de Pitàgores', es: 'Teorema de Pitágoras', en: 'Pythagoras\' theorem', ready: true },
    { id: 'semblanca', b: 'geo', ca: 'Semblança i Tales', es: 'Semejanza y Tales', en: 'Similarity and Thales' },
    { id: 'cossos', b: 'geo', ca: 'Cossos geomètrics i volums', es: 'Cuerpos geométricos y volúmenes', en: 'Solids and volumes' },
    { id: 'funcions', b: 'fun', ca: 'Funcions i gràfiques', es: 'Funciones y gráficas', en: 'Functions and graphs' },
    { id: 'estadistica', b: 'est', ca: 'Estadística i probabilitat', es: 'Estadística y probabilidad', en: 'Statistics and probability' },
  ]},
  { id: '3eso', ca: '3r ESO', es: '3º ESO', en: 'Year 3 ESO', n: '3r', units: [
    { id: 'racionals', b: 'num', ca: 'Nombres racionals i irracionals', es: 'Números racionales e irracionales', en: 'Rational and irrational numbers' },
    { id: 'notacio', b: 'num', ca: 'Potències i notació científica', es: 'Potencias y notación científica', en: 'Powers and scientific notation' },
    { id: 'successions', b: 'num', ca: 'Successions i progressions', es: 'Sucesiones y progresiones', en: 'Sequences and progressions' },
    { id: 'polinomis', b: 'alg', ca: 'Polinomis', es: 'Polinomios', en: 'Polynomials' },
    { id: 'equacions', b: 'alg', ca: 'Equacions i sistemes', es: 'Ecuaciones y sistemas', en: 'Equations and systems' },
    { id: 'moviments', b: 'geo', ca: 'Moviments en el pla', es: 'Movimientos en el plano', en: 'Transformations in the plane' },
    { id: 'espai', b: 'geo', ca: 'Geometria de l\'espai', es: 'Geometría del espacio', en: 'Solid geometry' },
    { id: 'funcions', b: 'fun', ca: 'Funcions lineals i quadràtiques', es: 'Funciones lineales y cuadráticas', en: 'Linear and quadratic functions' },
    { id: 'estadistica', b: 'est', ca: 'Estadística', es: 'Estadística', en: 'Statistics' },
    { id: 'probabilitat', b: 'est', ca: 'Probabilitat', es: 'Probabilidad', en: 'Probability' },
  ]},
  { id: '4eso', ca: '4t ESO', es: '4º ESO', en: 'Year 4 ESO', n: '4t', units: [
    { id: 'reals', b: 'num', ca: 'Nombres reals', es: 'Números reales', en: 'Real numbers' },
    { id: 'polinomis', b: 'alg', ca: 'Polinomis i fraccions algebraiques', es: 'Polinomios y fracciones algebraicas', en: 'Polynomials and algebraic fractions' },
    { id: 'inequacions', b: 'alg', ca: 'Equacions, inequacions i sistemes', es: 'Ecuaciones, inecuaciones y sistemas', en: 'Equations, inequalities and systems' },
    { id: 'trigonometria', b: 'geo', ca: 'Trigonometria', es: 'Trigonometría', en: 'Trigonometry' },
    { id: 'analitica', b: 'geo', ca: 'Geometria analítica', es: 'Geometría analítica', en: 'Analytic geometry' },
    { id: 'funcions', b: 'fun', ca: 'Funcions', es: 'Funciones', en: 'Functions' },
    { id: 'exponencials', b: 'fun', ca: 'Funcions exponencials i logarítmiques', es: 'Funciones exponenciales y logarítmicas', en: 'Exponential and logarithmic functions' },
    { id: 'combinatoria', b: 'est', ca: 'Combinatòria i probabilitat', es: 'Combinatoria y probabilidad', en: 'Combinatorics and probability' },
    { id: 'bidimensional', b: 'est', ca: 'Estadística bidimensional', es: 'Estadística bidimensional', en: 'Bivariate statistics' },
  ]},
];
