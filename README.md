# Beedesign

Une petite librairie de composants Vue 3, accessible par défaut (focus visible,
gestion du clavier, `prefers-reduced-motion` respecté partout), et entièrement
thémable par variables CSS.

> Projet personnel maintenu sur mon temps libre. Les PR et issues sont
> bienvenues, mais je ne garantis pas un temps de réponse rapide.

## Installation

```bash
npm install @thaisrr/beedesign
```

## Documentation

Retrouvez la documentation des composants ici :  
<a href="https://thaisrr.github.io/beedesign/">https://thaisrr.github.io/beedesign/</a>

## Utilisation

```ts
import { BeeButton } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

```vue
<template>
  <BeeButton variant="primary" @click="save">Enregistrer</BeeButton>
</template>
```

## Personnaliser le thème

Tous les composants s'appuient sur des variables CSS préfixées `--bd-`.
Redéfinissez-les dans le CSS global de votre projet, après l'import de
`@thaisrr/beedesign/style.css` :

```css
:root {
  --bd-color-primary: #6242f0;
  --bd-color-primary-dark: #171738;
  --bd-color-accent: #f6bd60;
  --bd-font-title: "Libre Bodoni", serif;
  --bd-radius-full: 999px;
}
```

La liste complète des variables est dans
[`src/styles/tokens.css`](./src/styles/tokens.css).

## Composants disponibles

| Composant   | Statut       |
|-------------|--------------|
| `BeeButton` | ✅ disponible |
| `BeeCard`   | ✅ disponible |
| `BeeTag`    | ✅ disponible |
| `BeeFlex`   | ✅ disponible |
| `BeeGrid`   | ✅ disponible |
| `BeeModal`  | ✅ disponible |
| `BeeDrawer` | ✅ disponible |

## Développement

```bash
npm install
npm run dev     # bac à sable local
npm run build   # build de la librairie (dist/)
```

## Tests

```bash
npm test                # une fois
npm run test:watch      # en continu
npm run test:coverage   # avec la couverture
npm run typecheck       # types de la lib, des tests et de la doc
```

## Compatibilité

- Vue 3.5.2 ou plus récent.
- Paquet ESM uniquement.
- Les types supposent `moduleResolution: "bundler"`, la valeur par défaut des projets Vite et Nuxt. En `node16` ou `nodenext`, les types des composants peuvent ne pas se résoudre.

## Licence

MIT
