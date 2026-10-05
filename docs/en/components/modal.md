<script setup>
import Basic from "../../examples/en/modal/basic.vue";
import Width from "../../examples/en/modal/width.vue";
import HideTitle from "../../examples/en/modal/hide-title.vue";
</script>

# BeeModal

A centered dialog that blocks the page behind it. Keyboard focus stays inside, Escape closes it, and focus returns to the button that opened it.

```ts
import { BeeModal } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Usage

Opening is controlled with `v-model:open`. The title is required: it appears in the header and serves as the dialog's accessible name. Content goes in the default slot.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/modal/basic.vue

  </template>
</Demo>

## Width

The `width` prop accepts any CSS width. The default value, `min(90vw, var(--bd-overlay-width))` (448 px by default), keeps a margin on mobile.

<Demo>
  <Width />

<template #code>

<<< @/examples/en/modal/width.vue

  </template>
</Demo>

## Hidden title

With `hide-title`, the title is no longer visible but is still announced by screen readers. It is useful when the display is self-explanatory, such as a navigation menu.

<Demo>
  <HideTitle />

<template #code>

<<< @/examples/en/modal/hide-title.vue

  </template>
</Demo>

## Returning focus

On closing, focus automatically returns to the element that had it on opening, usually the trigger button. If the trigger is no longer on the page or must be another element, pass it with `return-focus-el`.

## API

### Props

| Name            | Type                  | Default              | Description                                            |
| --------------- | --------------------- |----------------------| ------------------------------------------------------ |
| `title`         | `string`              |                      | Title and accessible name of the modal. Required.      |
| `open`          | `boolean`             |                      | Open state, to use with `v-model:open`. Required.      |
| `width`         | `string`              | `"min(90vw, 418px)"` | CSS width of the modal.                                |
| `hideTitle`     | `boolean`             | `false`              | Hides the title visually, keeps it for screen readers. |
| `closeLabel`    | `string`              | `"Close"`            | Accessible text of the close button.                   |
| `returnFocusEl` | `HTMLElement \| null` | `null`               | Element that gets the focus back on closing.           |
| `panelId`       | `string`              | generated            | Id of the panel, for an external `aria-controls`.      |

To localize it, pass the text of your language, for example `close-label="Fermer"`.

### Events

| Name          | Payload   | Description                                                                       |
| ------------- | --------- | --------------------------------------------------------------------------------- |
| `update:open` | `boolean` | Emitted with `false` on click on the backdrop, on the close button, or on Escape. |

### Slots

| Name      | Description           |
| --------- | --------------------- |
| `default` | Content of the modal. |

### CSS variables used

`--bd-color-overlay`, `--bd-z-modal`, `--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-color-primary-light`, `--bd-color-primary-medium`, `--bd-color-primary-dark`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-title`, `--bd-font-size-lg`, `--bd-radius-md`, `--bd-radius-full`, `--bd-space-md`, `--bd-shadow-3`, `--bd-transition-fast`, `--bd-transition-base`, `--bd-border-width`, `--bd-close-size`, `--bd-overlay-width`, `--bd-focus-ring-width`, `--bd-focus-ring-width`, `--bd-focus-ring-offset`.

## Accessibility

- `role="dialog"` and `aria-modal="true"`, named by its title.
- Focus moves to the close button on opening, and Tab and Shift+Tab loop inside the modal.
- Escape closes the modal, and focus is given back on closing.
- Page scrolling is locked while the modal is open.
- Transitions are disabled when `prefers-reduced-motion` is enabled.