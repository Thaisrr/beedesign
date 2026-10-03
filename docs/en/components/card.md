<script setup>
import Basic from "../../examples/en/card/basic.vue";
import Elevation from "../../examples/en/card/elevation.vue";
import Padding from "../../examples/en/card/padding.vue";
import WithActions from "../../examples/en/card/with-actions.vue";
</script>

# BeeCard

A container to group content: rounded corners, a subtle border, a surface background, and an optional elevation.

```ts
import { BeeCard } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Usage

Put any content in the default slot. The default padding is `md`.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/card/basic.vue

  </template>
</Demo>

## Elevation

The `elevation` prop adds a shadow, from `0` (none, the default) to `3`. In dark mode, shadows are deeper so they stay visible.

With a number, use the `:elevation="2"` syntax (with the colon), otherwise the value is read as text.

<Demo>
  <Elevation />

<template #code>

<<< @/examples/en/card/elevation.vue

  </template>
</Demo>

## Padding

The `padding` prop sets the inner spacing. Use `none` when the content must touch the edges, for example an image.

<Demo>
  <Padding />

<template #code>

<<< @/examples/en/card/padding.vue

  </template>
</Demo>

## With actions

A card combines well with the other components of the library.

<Demo>
  <WithActions />

<template #code>

<<< @/examples/en/card/with-actions.vue

  </template>
</Demo>

## API

### Props

| Name        | Type                             | Default | Description        |
| ----------- | -------------------------------- | ------- | ------------------ |
| `elevation` | `0 \| 1 \| 2 \| 3`               | `0`     | Drop shadow level. |
| `padding`   | `"none" \| "sm" \| "md" \| "lg"` | `"md"`  | Inner spacing.     |

### Slots

| Name      | Description          |
| --------- | -------------------- |
| `default` | Content of the card. |

### CSS variables used

`--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-font-main`, `--bd-radius-md`, `--bd-space-md`, `--bd-space-lg`, `--bd-shadow-1`, `--bd-shadow-2`, `--bd-shadow-3`.