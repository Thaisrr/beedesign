<script setup>
import Basic from "../../examples/en/drawer/basic.vue";
import Sides from "../../examples/en/drawer/sides.vue";
import Size from "../../examples/en/drawer/size.vue";
import HideTitle from "../../examples/en/drawer/hide-title.vue";
</script>

# BeeDrawer

A panel that slides in from an edge of the screen, for filters, a menu or a secondary form. Like `BeeModal`, it blocks the page behind it, keeps keyboard focus inside and closes with Escape.

```ts
import { BeeDrawer } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Usage

Opening is controlled with `v-model:open`. The title is required: it appears in the header and serves as the panel's accessible name. The header stays visible, only the content scrolls.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/drawer/basic.vue

  </template>
</Demo>

## Side

The `side` prop picks the edge: `right` (default), `left`, `top` or `bottom`. Left and right panels take the full height, top and bottom panels take the full width.

<Demo>
  <Sides />

<template #code>

<<< @/examples/en/drawer/sides.vue

  </template>
</Demo>

## Size

The `size` prop sets the width for `left` and `right`, and the maximum height for `top` and `bottom`. It accepts any CSS length. Without `size`, the width is `min(90vw, 28rem)` and the maximum height is `60vh`.

<Demo>
  <Size />

<template #code>

<<< @/examples/en/drawer/size.vue

  </template>
</Demo>

## Hidden title

With `hide-title`, the title is no longer visible but is still announced by screen readers. It is useful for a navigation menu.

<Demo>
  <HideTitle />

<template #code>

<<< @/examples/en/drawer/hide-title.vue

  </template>
</Demo>

## API

### Props

| Name            | Type                                     | Default   | Description                                                  |
| --------------- | ---------------------------------------- | --------- | ------------------------------------------------------------ |
| `title`         | `string`                                 |           | Title and accessible name of the panel. Required.            |
| `open`          | `boolean`                                |           | Open state, to use with `v-model:open`. Required.            |
| `side`          | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Edge the panel slides in from.                               |
| `size`          | `string`                                 |           | Width (`left`, `right`) or maximum height (`top`, `bottom`). |
| `hideTitle`     | `boolean`                                | `false`   | Hides the title visually, keeps it for screen readers.       |
| `closeLabel`    | `string`                                 | `"Close"` | Accessible text of the close button.                         |
| `returnFocusEl` | `HTMLElement \| null`                    | `null`    | Element that gets the focus back on closing.                 |
| `panelId`       | `string`                                 | generated | Id of the panel, for an external `aria-controls`.            |

To localize it, pass the text of your language, for example `close-label="Fermer"`.

### Events

| Name          | Payload   | Description                                                                       |
| ------------- | --------- | --------------------------------------------------------------------------------- |
| `update:open` | `boolean` | Emitted with `false` on click on the backdrop, on the close button, or on Escape. |

### Slots

| Name      | Description           |
| --------- | --------------------- |
| `default` | Content of the panel. |

### CSS variables used

`--bd-color-overlay`, `--bd-z-modal`, `--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-color-primary-light`, `--bd-color-primary-medium`, `--bd-color-primary-dark`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-title`, `--bd-font-size-lg`, `--bd-radius-full`, `--bd-space-md`, `--bd-shadow-3`, `--bd-transition-fast`, `--bd-transition-base`.

## Accessibility

- `role="dialog"` and `aria-modal="true"`, named by its title.
- Focus moves to the close button on opening, and Tab and Shift+Tab loop inside the panel.
- Escape closes the panel, and focus is given back on closing.
- Page scrolling is locked while the panel is open.
- Transitions are disabled when `prefers-reduced-motion` is enabled.