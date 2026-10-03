<script setup>
import Basic from "../../examples/en/grid/basic.vue";
import Gap from "../../examples/en/grid/gap.vue";
import Span from "../../examples/en/grid/span.vue";
import Responsive from "../../examples/en/grid/responsive.vue";
</script>

# BeeGrid

A grid of equal-width columns that collapses to a single column on small screens.

```ts
import { BeeGrid } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Usage

The `columns` prop is required. Items go in the default slot and fill the grid row by row.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/grid/basic.vue

  </template>
</Demo>

## Gap

The `gap` prop accepts a keyword (`none`, `sm`, `md`, `lg`) tied to the spacing tokens, or a number in pixels.

<Demo>
  <Gap />

<template #code>

<<< @/examples/en/grid/gap.vue

  </template>
</Demo>

## Spanning an item

An item can take up several columns with `grid-column` in your own CSS.

<Demo>
  <Span />

<template #code>

<<< @/examples/en/grid/span.vue

  </template>
</Demo>

## Responsive

By default, below 1000px wide, the grid switches to a single column. Items that spanned several columns go back to a normal position. Turn this off with `:responsive="false"`.

<Demo>
  <Responsive />

<template #code>

<<< @/examples/en/grid/responsive.vue

  </template>
</Demo>

## API

### Props

| Name         | Type                                       | Default | Description                     |
| ------------ | ------------------------------------------ | ------- | ------------------------------- |
| `columns`    | `number`                                   |         | Number of columns. Required.    |
| `gap`        | `"none" \| "sm" \| "md" \| "lg" \| number` | `"lg"`  | Spacing. A number is in pixels. |
| `responsive` | `boolean`                                  | `true`  | Single column below 1000px.     |

### Slots

| Name      | Description        |
| --------- | ------------------ |
| `default` | Items of the grid. |

### CSS variables used

`--bd-space-sm`, `--bd-space-md`, `--bd-space-lg`.