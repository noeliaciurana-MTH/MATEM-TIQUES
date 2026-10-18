// Temari de matemàtiques d'ESO, per cursos i blocs.
// Per afegir una unitat nova: crea js/units/<curs>-<id>.js, afegeix-la a index.html i posa ready: true aquí.
// Blocs = sentits dels sabers del Decret 175/2022 (Matemàtiques ESO)
QM.blocks = {
  num: { ca: 'Sentit numèric', es: 'Sentido numérico', en: 'Number sense', icon: 'π', color: 'var(--b-num)' },
  alg: { ca: 'Sentit algebraic', es: 'Sentido algebraico', en: 'Algebraic sense', icon: 'x²', color: 'var(--b-alg)' },
  geo: { ca: 'Sentit espacial i de la mesura', es: 'Sentido espacial y de la medida', en: 'Spatial and measurement sense', icon: '△', color: 'var(--b-geo)' },
  fun: { ca: 'Sentit algebraic: relacions i funcions', es: 'Sentido algebraico: relaciones y funciones', en: 'Algebraic sense: relations and functions', icon: 'f(x)', color: 'var(--b-fun)' },
  est: { ca: 'Sentit estocàstic', es: 'Sentido estocástico', en: 'Stochastic sense', icon: 'σ', color: 'var(--b-est)' },
};

// Competències específiques de Matemàtiques (Decret 175/2022). Títols abreujats.
QM.CE = {
  1: { ca: 'Interpretar, modelitzar i resoldre problemes', es: 'Interpretar, modelizar y resolver problemas', en: 'Interpret, model and solve problems' },
  2: { ca: 'Analitzar i validar les solucions', es: 'Analizar y validar las soluciones', en: 'Analyse and check solutions' },
  3: { ca: 'Formular i comprovar conjectures', es: 'Formular y comprobar conjeturas', en: 'Make and test conjectures' },
  4: { ca: 'Pensament computacional', es: 'Pensamiento computacional', en: 'Computational thinking' },
  5: { ca: 'Connexions entre elements matemàtics', es: 'Conexiones entre elementos matemáticos', en: 'Connections within mathematics' },
  6: { ca: 'Matemàtiques en altres àmbits i en situacions reals', es: 'Matemáticas en otros ámbitos y en situaciones reales', en: 'Maths in other subjects and real situations' },
  7: { ca: 'Representar i comunicar', es: 'Representar y comunicar', en: 'Represent and communicate' },
  8: { ca: 'Destreses personals: gestió de les emocions', es: 'Destrezas personales: gestión de las emociones', en: 'Personal skills: managing emotions' },
  9: { ca: 'Destreses socials: treball en equip', es: 'Destrezas sociales: trabajo en equipo', en: 'Social skills: teamwork' },
};
// Competències transversals i vectors del currículum (Decret 175/2022)
QM.TRANSV = {
  ciu: { ca: 'Competència ciutadana', es: 'Competencia ciudadana', en: 'Citizenship competence' },
  emp: { ca: 'Competència emprenedora', es: 'Competencia emprendedora', en: 'Entrepreneurship competence' },
  cpsaa: { ca: 'Competència personal, social i d\'aprendre a aprendre', es: 'Competencia personal, social y de aprender a aprender', en: 'Personal, social and learning-to-learn competence' },
  dig: { ca: 'Competència digital', es: 'Competencia digital', en: 'Digital competence' },
};
QM.VECTORS = {
  comp: { ca: 'Aprenentatges competencials', es: 'Aprendizajes competenciales', en: 'Competence-based learning' },
  gen: { ca: 'Perspectiva de gènere', es: 'Perspectiva de género', en: 'Gender perspective' },
  univ: { ca: 'Universalitat del currículum', es: 'Universalidad del currículo', en: 'Universal curriculum' },
  ling: { ca: 'Qualitat de l\'educació de les llengües', es: 'Calidad de la educación de las lenguas', en: 'Quality language education' },
  ciut: { ca: 'Ciutadania democràtica i consciència global', es: 'Ciudadanía democrática y conciencia global', en: 'Democratic citizenship and global awareness' },
  ben: { ca: 'Benestar emocional', es: 'Bienestar emocional', en: 'Emotional wellbeing' },
};

// El Decret 175/2022 presenta els sabers de 1r a 3r junts i els de 4t a part.
// La distribució per cursos d'aquesta web és una proposta de seqüenciació (cada centre la concreta).
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
