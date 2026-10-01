<script setup>
import Basic from "../examples/grid/basic.vue";
import Gap from "../examples/grid/gap.vue";
import Span from "../examples/grid/span.vue";
import Responsive from "../examples/grid/responsive.vue";
</script>

# BeeGrid

Une grille de colonnes de largeur égale, qui passe sur une seule colonne sur petit écran.

```ts
import { BeeGrid } from "beedesign";
import "beedesign/style.css";
```

## Utilisation

La prop `columns` est obligatoire. Les éléments se placent dans le slot par défaut et remplissent la grille ligne par ligne.

<Demo>
  <Basic />

<template #code>

<<< @/examples/grid/basic.vue

  </template>
</Demo>

## Gap

La prop `gap` accepte un mot-clé (`none`, `sm`, `md`, `lg`) lié aux tokens d'espacement, ou un nombre en pixels.

<Demo>
  <Gap />

<template #code>

<<< @/examples/grid/gap.vue

  </template>
</Demo>

## Étendre un élément

Un élément peut occuper plusieurs colonnes avec `grid-column` dans votre propre CSS.

<Demo>
  <Span />

<template #code>

<<< @/examples/grid/span.vue

  </template>
</Demo>

## Responsive

Par défaut, sous 1000px de large, la grille passe sur une seule colonne. Les éléments qui s'étendaient sur plusieurs colonnes reprennent une place normale. Désactivez ce comportement avec `:responsive="false"`.

<Demo>
  <Responsive />

<template #code>

<<< @/examples/grid/responsive.vue

  </template>
</Demo>

## API

### Props

| Nom          | Type                                       | Défaut | Description                          |
| ------------ | ------------------------------------------ | ------ | ------------------------------------ |
| `columns`    | `number`                                   |        | Nombre de colonnes. Obligatoire.     |
| `gap`        | `"none" \| "sm" \| "md" \| "lg" \| number` | `"lg"` | Espacement. Un nombre est en pixels. |
| `responsive` | `boolean`                                  | `true` | Une seule colonne sous 1000px.       |

### Slots

| Nom       | Description            |
| --------- | ---------------------- |
| `default` | Éléments de la grille. |

### Variables CSS utilisées

`--bd-space-sm`, `--bd-space-md`, `--bd-space-lg`.