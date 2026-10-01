<script setup>
import Basic from "../examples/modal/basic.vue";
import Width from "../examples/modal/width.vue";
import HideTitle from "../examples/modal/hide-title.vue";
</script>

# BeeModal

Une boîte de dialogue centrée, qui bloque la page derrière elle. Le focus clavier reste à l'intérieur, Échap la ferme, et le focus revient sur le bouton qui l'a ouverte.

```ts
import { BeeModal } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Utilisation

L'ouverture se pilote avec `v-model:open`. Le titre est obligatoire : il s'affiche dans l'en-tête et sert de nom accessible à la boîte de dialogue. Le contenu se place dans le slot par défaut.

<Demo>
  <Basic />

<template #code>

<<< @/examples/modal/basic.vue

  </template>
</Demo>

## Largeur

La prop `width` accepte n'importe quelle largeur CSS. La valeur par défaut, `min(90vw, 28rem)`, garde une marge sur mobile.

<Demo>
  <Width />

<template #code>

<<< @/examples/modal/width.vue

  </template>
</Demo>

## Titre masqué

Avec `hide-title`, le titre n'est plus visible mais reste annoncé par les lecteurs d'écran. C'est utile quand l'affichage se suffit à lui-même, comme un menu de navigation.

<Demo>
  <HideTitle />

<template #code>

<<< @/examples/modal/hide-title.vue

  </template>
</Demo>

## Retour du focus

À la fermeture, le focus revient automatiquement sur l'élément qui l'avait à l'ouverture, généralement le bouton déclencheur. Si le déclencheur n'est plus dans la page ou doit être un autre élément, passez-le avec `return-focus-el`.

## API

### Props

| Nom             | Type                  | Défaut               | Description                                                      |
| --------------- | --------------------- | -------------------- | ---------------------------------------------------------------- |
| `title`         | `string`              |                      | Titre et nom accessible de la modale. Obligatoire.               |
| `open`          | `boolean`             |                      | Ouverture, à utiliser avec `v-model:open`. Obligatoire.          |
| `width`         | `string`              | `"min(90vw, 28rem)"` | Largeur CSS de la modale.                                        |
| `hideTitle`     | `boolean`             | `false`              | Cache le titre visuellement, le garde pour les lecteurs d'écran. |
| `closeLabel`    | `string`              | `"Fermer"`           | Texte accessible du bouton de fermeture.                         |
| `returnFocusEl` | `HTMLElement \| null` | `null`               | Élément qui reprend le focus à la fermeture.                     |
| `panelId`       | `string`              | généré               | Id du panneau, pour un `aria-controls` externe.                  |

### Événements

| Nom           | Payload   | Description                                                                      |
| ------------- | --------- | -------------------------------------------------------------------------------- |
| `update:open` | `boolean` | Émis avec `false` au clic sur le fond, sur le bouton de fermeture, ou sur Échap. |

### Slots

| Nom       | Description           |
| --------- | --------------------- |
| `default` | Contenu de la modale. |

### Variables CSS utilisées

`--bd-color-overlay`, `--bd-z-modal`, `--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-color-primary-light`, `--bd-color-primary-medium`, `--bd-color-primary-dark`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-title`, `--bd-font-size-lg`, `--bd-radius-md`, `--bd-radius-full`, `--bd-space-md`, `--bd-shadow-3`, `--bd-transition-fast`, `--bd-transition-base`.

## Accessibilité

- `role="dialog"` et `aria-modal="true"`, nommée par son titre.
- Le focus entre sur le bouton de fermeture à l'ouverture, Tab et Shift+Tab bouclent dans la modale.
- Échap ferme la modale, le focus est rendu à la fermeture.
- Le scroll de la page est bloqué tant que la modale est ouverte.
- Les transitions sont désactivées si `prefers-reduced-motion` est activé.