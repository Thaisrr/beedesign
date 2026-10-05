<script setup>
import Basic from "../examples/card/basic.vue";
import Elevation from "../examples/card/elevation.vue";
import Padding from "../examples/card/padding.vue";
import WithActions from "../examples/card/with-actions.vue";
</script>

# BeeCard

Un conteneur pour regrouper un contenu : coins arrondis, bordure discrète, fond de surface, et une élévation optionnelle.

```ts
import { BeeCard } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Utilisation

Placez n'importe quel contenu dans le slot par défaut. Le padding par défaut est `md`.

<Demo>
  <Basic />

<template #code>

<<< @/examples/card/basic.vue

  </template>
</Demo>

## Élévation

La prop `elevation` ajoute une ombre, de `0` (aucune, par défaut) à `3`. En mode sombre, les ombres sont plus profondes pour rester visibles.

Avec un nombre, utilisez la syntaxe `:elevation="2"` (avec les deux-points), sinon la valeur est lue comme du texte.

<Demo>
  <Elevation />

<template #code>

<<< @/examples/card/elevation.vue

  </template>
</Demo>

## Padding

La prop `padding` règle l'espace intérieur. Utilisez `none` quand le contenu doit toucher les bords, par exemple une image.

<Demo>
  <Padding />

<template #code>

<<< @/examples/card/padding.vue

  </template>
</Demo>

## Avec des actions

Une carte se combine avec les autres composants de la librairie.

<Demo>
  <WithActions />

<template #code>

<<< @/examples/card/with-actions.vue

  </template>
</Demo>

## API

### Props

| Nom         | Type                             | Défaut | Description            |
| ----------- | -------------------------------- | ------ | ---------------------- |
| `elevation` | `0 \| 1 \| 2 \| 3`               | `0`    | Niveau d'ombre portée. |
| `padding`   | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Espace intérieur.      |

### Slots

| Nom       | Description          |
| --------- | -------------------- |
| `default` | Contenu de la carte. |

### Variables CSS utilisées

`--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-font-main`, `--bd-radius-md`, `--bd-space-md`, `--bd-space-lg`, `--bd-shadow-1`, `--bd-shadow-2`, `--bd-shadow-3`, `--bd-border-width`.