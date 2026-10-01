<script setup>
import Basic from "../examples/flex/basic.vue";
import Justify from "../examples/flex/justify.vue";
import Align from "../examples/flex/align.vue";
import Gap from "../examples/flex/gap.vue";
import Direction from "../examples/flex/direction.vue";
import Responsive from "../examples/flex/responsive.vue";
</script>

# BeeFlex

Un conteneur flexbox pour aligner et espacer des éléments, avec un passage automatique en colonne sur petit écran.

```ts
import { BeeFlex } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Utilisation

Les éléments se placent dans le slot par défaut. Par défaut, ils sont centrés, espacés de `lg`, et passent à la ligne si la place manque.

<Demo>
  <Basic />

<template #code>

<<< @/examples/flex/basic.vue

  </template>
</Demo>

## Justify

La prop `justify` règle la répartition sur l'axe principal.

<Demo>
  <Justify />

<template #code>

<<< @/examples/flex/justify.vue

  </template>
</Demo>

## Align

La prop `align` règle l'alignement sur l'axe secondaire.

<Demo>
  <Align />

<template #code>

<<< @/examples/flex/align.vue

  </template>
</Demo>

## Gap

La prop `gap` accepte un mot-clé (`none`, `sm`, `md`, `lg`) lié aux tokens d'espacement, ou un nombre en pixels.

<Demo>
  <Gap />

<template #code>

<<< @/examples/flex/gap.vue

  </template>
</Demo>

## Direction

Avec `direction="column"`, les éléments s'empilent verticalement.

<Demo>
  <Direction />

<template #code>

<<< @/examples/flex/direction.vue

  </template>
</Demo>

## Responsive

Par défaut, sous 768px de large, le conteneur passe en colonne et centre ses éléments. Désactivez ce comportement avec `:responsive="false"`.

<Demo>
  <Responsive />

<template #code>

<<< @/examples/flex/responsive.vue

  </template>
</Demo>

## API

### Props

| Nom          | Type                                                        | Défaut     | Description                          |
| ------------ | ----------------------------------------------------------- | ---------- | ------------------------------------ |
| `justify`    | `"flex-start" \| "flex-end" \| "center" \| "space-between"` | `"center"` | Répartition sur l'axe principal.     |
| `align`      | `"flex-start" \| "flex-end" \| "center" \| "stretch"`       | `"center"` | Alignement sur l'axe secondaire.     |
| `direction`  | `"row" \| "column"`                                         | `"row"`    | Direction de l'axe principal.        |
| `gap`        | `"none" \| "sm" \| "md" \| "lg" \| number`                  | `"lg"`     | Espacement. Un nombre est en pixels. |
| `responsive` | `boolean`                                                   | `true`     | Passe en colonne centrée sous 768px. |

### Slots

| Nom       | Description          |
| --------- | -------------------- |
| `default` | Éléments à disposer. |

### Variables CSS utilisées

`--bd-space-sm`, `--bd-space-md`, `--bd-space-lg`.