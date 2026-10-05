<script setup>
import Variants from "../../examples/en/button/variants.vue";
import Rounded from "../../examples/en/button/rounded.vue";
import States from "../../examples/en/button/states.vue";
</script>

# BeeButton

A button with three variants, a rounded shape, a loading state and a disabled state.

```ts
import { BeeButton } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Variants

`primary` for the main action of a screen, `secondary` for alternative actions, `ghost` for discreet actions.

<Demo>
  <Variants />

<template #code>

<<< @/examples/en/button/variants.vue

  </template>
</Demo>

## Rounded shape

By default, the corners are slightly rounded. The `rounded` prop turns the button into a pill (`--bd-radius-full`). It works with every variant.

<Demo>
  <Rounded />

<template #code>

<<< @/examples/en/button/rounded.vue

  </template>
</Demo>

## States

While loading, the button keeps its width, shows a spinner and ignores clicks. It exposes `aria-busy` to screen readers.

<Demo>
  <States />

<template #code>

<<< @/examples/en/button/states.vue

  </template>
</Demo>

## API

### Props

| Name       | Type                                  | Default     | Description                                |
| ---------- | ------------------------------------- | ----------- | ------------------------------------------ |
| `variant`  | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Visual style of the button.                |
| `type`     | `"button" \| "submit" \| "reset"`     | `"button"`  | `type` attribute of the native `<button>`. |
| `rounded`  | `boolean`                             | `false`     | Pill-shaped button.                        |
| `disabled` | `boolean`                             | `false`     | Disables the button.                       |
| `loading`  | `boolean`                             | `false`     | Shows a spinner and blocks clicks.         |

### Events

| Name    | Payload      | Description                                                     |
| ------- | ------------ | --------------------------------------------------------------- |
| `click` | `MouseEvent` | Emitted on click, unless the button is `disabled` or `loading`. |

### Slots

| Name      | Description          |
| --------- | -------------------- |
| `default` | Label of the button. |

### CSS variables used

`--bd-color-primary`, `--bd-color-primary-hover`, `--bd-color-primary-edge`, `--bd-color-on-primary`, `--bd-color-primary-dark`, `--bd-color-primary-light`, `--bd-color-border`, `--bd-color-text-muted`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-size-md`, `--bd-radius-full`, `--bd-space-sm`, `--bd-space-md`, `--bd-control-height`, `--bd-border-width-strong`, `--bd-focus-ring-width`, `--bd-focus-ring-offset`, `--bd-button-edge`, `--bd-transition-fast`.

## Accessibility

- Touch target at least 44 px tall.
- Visible focus ring on keyboard navigation (`:focus-visible`).
- `aria-busy` while loading.
- Reduced animations when `prefers-reduced-motion` is enabled.