<script setup>
import Basic from "../../examples/en/flex/basic.vue";
import Justify from "../../examples/en/flex/justify.vue";
import Align from "../../examples/en/flex/align.vue";
import Gap from "../../examples/en/flex/gap.vue";
import Direction from "../../examples/en/flex/direction.vue";
import Responsive from "../../examples/en/flex/responsive.vue";
</script>

# BeeFlex

A flexbox container to align and space items, with an automatic switch to a column on small screens.

```ts
import { BeeFlex } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Usage

Items go in the default slot. By default they are centered, spaced by `lg`, and wrap to the next line when there is not enough room.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/flex/basic.vue

  </template>
</Demo>

## Justify

The `justify` prop sets the distribution along the main axis.

<Demo>
  <Justify />

<template #code>

<<< @/examples/en/flex/justify.vue

  </template>
</Demo>

## Align

The `align` prop sets the alignment along the cross axis.

<Demo>
  <Align />

<template #code>

<<< @/examples/en/flex/align.vue

  </template>
</Demo>

## Gap

The `gap` prop accepts a keyword (`none`, `sm`, `md`, `lg`) tied to the spacing tokens, or a number in pixels.

<Demo>
  <Gap />

<template #code>

<<< @/examples/en/flex/gap.vue

  </template>
</Demo>

## Direction

With `direction="column"`, items stack vertically.

<Demo>
  <Direction />

<template #code>

<<< @/examples/en/flex/direction.vue

  </template>
</Demo>

## Responsive

By default, below 768px wide, the container switches to a column and centers its items. Turn this off with `:responsive="false"`.

<Demo>
  <Responsive />

<template #code>

<<< @/examples/en/flex/responsive.vue

  </template>
</Demo>

## API

### Props

| Name         | Type                                                        | Default    | Description                                |
| ------------ | ----------------------------------------------------------- | ---------- | ------------------------------------------ |
| `justify`    | `"flex-start" \| "flex-end" \| "center" \| "space-between"` | `"center"` | Distribution along the main axis.          |
| `align`      | `"flex-start" \| "flex-end" \| "center" \| "stretch"`       | `"center"` | Alignment along the cross axis.            |
| `direction`  | `"row" \| "column"`                                         | `"row"`    | Direction of the main axis.                |
| `gap`        | `"none" \| "sm" \| "md" \| "lg" \| number`                  | `"lg"`     | Spacing. A number is in pixels.            |
| `responsive` | `boolean`                                                   | `true`     | Switches to a centered column below 768px. |

### Slots

| Name      | Description       |
| --------- | ----------------- |
| `default` | Items to lay out. |

### CSS variables used

`--bd-space-sm`, `--bd-space-md`, `--bd-space-lg`.