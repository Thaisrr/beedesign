<script setup>
import Basic from "../../examples/en/tag/basic.vue";
import Rounded from "../../examples/en/tag/rounded.vue";
import InCard from "../../examples/en/tag/in-card.vue";
</script>

# BeeTag

A small label to qualify content: a category, a keyword, a status.

```ts
import { BeeTag } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Usage

The label goes in the default slot.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/tag/basic.vue

  </template>
</Demo>

## Rounded shape

The `rounded` prop turns the tag into a pill (`--bd-radius-full`).

<Demo>
  <Rounded />

<template #code>

<<< @/examples/en/tag/rounded.vue

  </template>
</Demo>

## In a card

<Demo>
  <InCard />

<template #code>

<<< @/examples/en/tag/in-card.vue

  </template>
</Demo>

## API

### Props

| Name      | Type      | Default | Description      |
| --------- | --------- | ------- | ---------------- |
| `rounded` | `boolean` | `false` | Pill-shaped tag. |

### Slots

| Name      | Description       |
| --------- | ----------------- |
| `default` | Label of the tag. |

### CSS variables used

`--bd-color-primary-light`, `--bd-color-primary-medium`, `--bd-color-primary-dark`, `--bd-font-main`, `--bd-font-size-sm`, `--bd-radius-sm`, `--bd-radius-full`, `--bd-border-width`