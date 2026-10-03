<script setup>
import Basic from "../../examples/en/alert/basic.vue";
import Closable from "../../examples/en/alert/closable.vue";
</script>

# BeeAlert

A status message displayed in the flow of the page: success, error, warning or information. For temporary notifications that stack in a corner of the screen, see [BeeAlertList](./alert-list).

```ts
import { BeeAlert } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Types

The `type` prop sets the color and the icon. The default value is `info`.

<Demo>
  <Basic />

<template #code>

<<< @/examples/en/alert/basic.vue

  </template>
</Demo>

## Closing

With `closable`, a close button appears and emits `close`. It is up to you to remove the alert, for example with a `v-if`.

<Demo>
  <Closable />

<template #code>

<<< @/examples/en/alert/closable.vue

  </template>
</Demo>

## Automatic closing

The `duration` prop closes the alert after a delay in milliseconds, by emitting `close`. The delay is paused while the alert is hovered or has focus, to leave time to read it. Without `duration`, the alert stays.

```vue
<BeeAlert type="success" :duration="4000" @close="visible = false">
  Saved.
</BeeAlert>
```

## API

### Props

| Name         | Type                                          | Default   | Description                                         |
| ------------ | --------------------------------------------- | --------- | --------------------------------------------------- |
| `type`       | `"success" \| "error" \| "warning" \| "info"` | `"info"`  | Nature of the message: color and icon.              |
| `closable`   | `boolean`                                     | `false`   | Shows a close button.                               |
| `duration`   | `number`                                      | `0`       | Automatic closing after this delay in ms. 0: never. |
| `closeLabel` | `string`                                      | `"Close"` | Accessible text of the close button.                |

To localize the close button, pass the text of your language, for example `close-label="Fermer"`.

### Events

| Name    | Payload | Description                                                        |
| ------- | ------- | ------------------------------------------------------------------ |
| `close` | none    | Emitted on click on the close button, or at the end of `duration`. |

### Slots

| Name      | Description           |
| --------- | --------------------- |
| `default` | Content of the alert. |

### CSS variables used

`--bd-color-success`, `--bd-color-error`, `--bd-color-warning`, `--bd-color-info`, `--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-size-md`, `--bd-radius-md`, `--bd-radius-full`, `--bd-space-sm`, `--bd-transition-fast`.

## Accessibility

- Errors and warnings have `role="alert"` and are announced right away. Successes and information messages have `role="status"` and are announced politely.
- Color is never the only indicator: each type also has an icon.
- Automatic closing is paused on hover and on focus.