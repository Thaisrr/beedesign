<script setup>
import Basic from "../examples/drawer/basic.vue";
import Sides from "../examples/drawer/sides.vue";
import Size from "../examples/drawer/size.vue";
import HideTitle from "../examples/drawer/hide-title.vue";
</script>

# BeeDrawer

Un panneau qui glisse depuis un bord de l'écran, pour des filtres, un menu ou un formulaire secondaire. Comme `BeeModal`, il bloque la page derrière lui, garde le focus clavier à l'intérieur et se ferme avec Échap.

```ts
import { BeeDrawer } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Utilisation

L'ouverture se pilote avec `v-model:open`. Le titre est obligatoire : il s'affiche dans l'en-tête et sert de nom accessible au panneau. L'en-tête reste visible, seul le contenu défile.

<Demo>
  <Basic />

<template #code>

<<< @/examples/drawer/basic.vue

  </template>
</Demo>

## Côté d'apparition

La prop `side` choisit le bord : `right` (par défaut), `left`, `top` ou `bottom`. Les panneaux de gauche et de droite occupent toute la hauteur, ceux du haut et du bas toute la largeur.

<Demo>
  <Sides />

<template #code>

<<< @/examples/drawer/sides.vue

  </template>
</Demo>

## Taille

La prop `size` règle la largeur pour `left` et `right`, et la hauteur maximale pour `top` et `bottom`. Elle accepte n'importe quelle longueur CSS. Sans `size`, la largeur est `min(90vw, var(--bd-overlay-width))` (448 px par défaut) et la hauteur maximale `60vh`.

<Demo>
  <Size />

<template #code>

<<< @/examples/drawer/size.vue

  </template>
</Demo>

## Titre masqué

Avec `hide-title`, le titre n'est plus visible mais reste annoncé par les lecteurs d'écran. C'est utile pour un menu de navigation.

<Demo>
  <HideTitle />

<template #code>

<<< @/examples/drawer/hide-title.vue

  </template>
</Demo>

## API

### Props

| Nom             | Type                                     | Défaut    | Description                                                      |
| --------------- | ---------------------------------------- |-----------| ---------------------------------------------------------------- |
| `title`         | `string`                                 |           | Titre et nom accessible du panneau. Obligatoire.                 |
| `open`          | `boolean`                                |           | Ouverture, à utiliser avec `v-model:open`. Obligatoire.          |
| `side`          | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Bord depuis lequel le panneau apparaît.                          |
| `size`          | `string`                                 |           | Largeur (`left`, `right`) ou hauteur maximale (`top`, `bottom`). |
| `hideTitle`     | `boolean`                                | `false`   | Cache le titre visuellement, le garde pour les lecteurs d'écran. |
| `closeLabel`    | `string`                                 | `"Close"` | Texte accessible du bouton de fermeture.                         |
| `returnFocusEl` | `HTMLElement \| null`                    | `null`    | Élément qui reprend le focus à la fermeture.                     |
| `panelId`       | `string`                                 | généré    | Id du panneau, pour un `aria-controls` externe.                  |

### Événements

| Nom           | Payload   | Description                                                                      |
| ------------- | --------- | -------------------------------------------------------------------------------- |
| `update:open` | `boolean` | Émis avec `false` au clic sur le fond, sur le bouton de fermeture, ou sur Échap. |

### Slots

| Nom       | Description         |
| --------- | ------------------- |
| `default` | Contenu du panneau. |

### Variables CSS utilisées

`--bd-color-overlay`, `--bd-z-modal`, `--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-color-primary-light`, `--bd-color-primary-medium`, `--bd-color-primary-dark`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-title`, `--bd-font-size-lg`, `--bd-radius-full`, `--bd-space-md`, `--bd-shadow-3`, `--bd-transition-fast`, `--bd-transition-base`, `--bd-border-width`, `--bd-close-size`, `--bd-overlay-width`, `--bd-focus-ring-width`, `--bd-focus-ring-width`, `--bd-focus-ring-offset`.

## Accessibilité

- `role="dialog"` et `aria-modal="true"`, nommé par son titre.
- Le focus entre sur le bouton de fermeture à l'ouverture, Tab et Shift+Tab bouclent dans le panneau.
- Échap ferme le panneau, le focus est rendu à la fermeture.
- Le scroll de la page est bloqué tant que le panneau est ouvert.
- Les transitions sont désactivées si `prefers-reduced-motion` est activé.