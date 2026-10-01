<script setup>
import Variants from "../examples/button/variants.vue";
import Rounded from "../examples/button/rounded.vue";
import States from "../examples/button/states.vue";
</script>

# BeeButton

Un bouton avec trois variantes, une forme arrondie, un état de chargement et un état désactivé.

```ts
import { BeeButton } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Variantes

`primary` pour l'action principale d'un écran, `secondary` pour les actions alternatives, `ghost` pour les actions discrètes.

<Demo>
  <Variants />

<template #code>

<<< @/examples/button/variants.vue

  </template>
</Demo>

## Forme arrondie

Par défaut, les coins sont légèrement arrondis. La prop `rounded` passe le bouton en forme de pilule (`--bd-radius-full`). Elle fonctionne avec toutes les variantes.

<Demo>
  <Rounded />

<template #code>

<<< @/examples/button/rounded.vue

  </template>
</Demo>

## États

Pendant le chargement, le bouton garde sa largeur, affiche un spinner et ignore les clics. Il expose `aria-busy` aux lecteurs d'écran.

<Demo>
  <States />

<template #code>

<<< @/examples/button/states.vue

  </template>
</Demo>

## API

### Props

| Nom        | Type                                  | Défaut      | Description                           |
| ---------- | ------------------------------------- | ----------- | ------------------------------------- |
| `variant`  | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Style visuel du bouton.               |
| `type`     | `"button" \| "submit" \| "reset"`     | `"button"`  | Attribut `type` du `<button>` natif.  |
| `rounded`  | `boolean`                             | `false`     | Bouton en forme de pilule.            |
| `disabled` | `boolean`                             | `false`     | Désactive le bouton.                  |
| `loading`  | `boolean`                             | `false`     | Affiche un spinner, bloque les clics. |

### Événements

| Nom     | Payload      | Description                                                  |
| ------- | ------------ | ------------------------------------------------------------ |
| `click` | `MouseEvent` | Émis au clic, sauf si le bouton est `disabled` ou `loading`. |

### Slots

| Nom       | Description        |
| --------- | ------------------ |
| `default` | Libellé du bouton. |

### Variables CSS utilisées

`--bd-color-primary`, `--bd-color-primary-hover`, `--bd-color-primary-edge`, `--bd-color-on-primary`, `--bd-color-primary-dark`, `--bd-color-primary-light`, `--bd-color-border`, `--bd-color-text-muted`, `--bd-color-focus`, `--bd-font-main`, `--bd-radius-md`, `--bd-radius-full`, `--bd-space-sm`, `--bd-transition-fast`.

## Accessibilité

- Cible tactile d'au moins 44 px de haut.
- Anneau de focus visible au clavier (`:focus-visible`).
- `aria-busy` pendant le chargement.
- Animations réduites si `prefers-reduced-motion` est activé.