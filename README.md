# Quadern de Mates

Web de matemàtiques d'ESO (1r a 4t) en català, castellà i anglès. HTML, CSS i JavaScript sense instal·lar res: obre `index.html` al navegador.

## Què té cada unitat
- **Situació real**: situació d'aprenentatge amb pregunta motriu, passos, eina interactiva i producte final (connectada amb els ODS).
- **Teoria**: explicacions curtes amb exemples, dibuixos i errors freqüents.
- **Explora**: laboratoris interactius per experimentar (p. ex. la mateixa fracció en barra, pastís, recta i decimal).
- **Practica**: exercicis generats a l'atzar en 3 nivells (Bàsic, Mitjà, Avançat), amb correcció immediata, **diagnòstic de l'error típic**, pistes i solució pas a pas.
- **Repte**: 10 preguntes de dificultat creixent amb cronòmetre i medalles (or, plata, bronze).
- **Fitxa en paper**: fitxa imprimible amb codi; l'alumnat la fa a la llibreta i després hi entra els resultats per corregir-los i diagnosticar els errors.
- **Currículum**: competències específiques, sabers, competències transversals i vectors del Decret 175/2022.

A més: **El meu informe** (l'alumne genera un codi amb el seu progrés i els seus errors freqüents) i **Per al docent** (enganxes els codis del grup i veus els errors més comuns i el mapa curricular).

Punts, ratxes i medalles es guarden al navegador de cada alumne (no cal registre).

## Estructura
```
index.html
css/style.css
js/core.js            eines comunes (fraccions, dibuixos SVG)
js/curriculum.js      llista de cursos i unitats
js/units/1eso-fraccions.js   Fraccions (1r ESO)
js/units/2eso-equacions.js   Equacions de 1r i 2n grau (2n ESO)
js/units/2eso-pitagores.js   Teorema de Pitàgores (2n ESO)
js/app.js             navegació, idiomes, pràctica, repte, punts
```

## Afegir una unitat
1. Copia `js/units/1eso-fraccions.js` amb el nom nou (p. ex. `1eso-enters.js`) i canvia la teoria i els generadors.
2. A `js/curriculum.js`, posa `ready: true` a la unitat.
3. Afegeix `<script src="js/units/1eso-enters.js"></script>` a `index.html`, abans de `app.js`.

## Publicar-la a internet (perquè surti a Google)
**Opció ràpida (5 minuts, gratis):**
1. Descarrega `quadern-de-mates.zip` i descomprimeix-lo.
2. Ves a https://app.netlify.com/drop i arrossega-hi la carpeta.
3. Crea un compte gratuït perquè la web no caduqui. Pots canviar el nom de l'adreça (p. ex. `quadern-de-mates.netlify.app`).

**Perquè Google la trobi:** entra a https://search.google.com/search-console, afegeix l'adreça de la web i demana la indexació. Google sol trigar uns dies a mostrar-la.

**Opció GitHub Pages:** si connectes GitHub a Claude, Claude la pot publicar i actualitzar directament cada vegada que hi afegim unitats.

## Llicència
Material educatiu obert amb llicència Creative Commons BY-SA 4.0: es pot compartir i adaptar citant l'autoria.
