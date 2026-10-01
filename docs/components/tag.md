<script setup>
import Basic from "../examples/tag/basic.vue";
import Rounded from "../examples/tag/rounded.vue";
import InCard from "../examples/tag/in-card.vue";
</script>

# BeeTag

Une petite étiquette pour qualifier un contenu : une catégorie, un mot-clé, un statut.

```ts
import { BeeTag } from "beedesign";
import "beedesign/style.css";
```

## Utilisation

Le libellé se place dans le slot par défaut.

<Demo>
  <Basic />

<template #code>

<<< @/examples/tag/basic.vue

  </template>
</Demo>

## Forme arrondie

La prop `rounded` passe le tag en forme de pilule (`--bd-radius-full`).

<Demo>
  <Rounded />

<template #code>

<<< @/examples/tag/rounded.vue

  </template>
</Demo>

## Dans une carte

<Demo>
  <InCard />

<template #code>

<<< @/examples/tag/in-card.vue

  </template>
</Demo>

## API

### Props

| Nom       | Type      | Défaut  | Description             |
| --------- | --------- | ------- | ----------------------- |
| `rounded` | `boolean` | `false` | Tag en forme de pilule. |

### Slots

| Nom       | Description     |
| --------- | --------------- |
| `default` | Libellé du tag. |

### Variables CSS utilisées

`--bd-color-primary-light`, `--bd-color-primary-medium`, `--bd-color-primary-dark`, `--bd-font-main`, `--bd-font-size-sm`, `--bd-radius-sm`, `--bd-radius-full`.