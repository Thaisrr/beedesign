<script setup>
import UseAlert from "../../examples/en/alert/use-alert.vue";
</script>

# BeeAlertList and useAlert

Temporary notifications that stack in a corner of the screen. You mount one `BeeAlertList` once in the application, then trigger alerts from anywhere with `useAlert()`.

```ts
import { BeeAlertList, useAlert } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Setup

Mount `BeeAlertList` once, at the root of the application.

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <BeeAlertList position="top-right" />
</template>
```

Then call `useAlert()` in any component or logic file. There is nothing to provide or inject.

```ts
const { success, error } = useAlert();

async function save() {
  try {
    await api.save(draft);
    success("Draft saved");
  } catch {
    error("Saving failed");
  }
}
```

## Try it

Each button triggers an alert. The position buttons move the stack.

<Demo>
  <UseAlert />

<template #code>

<<< @/examples/en/alert/use-alert.vue

  </template>
</Demo>

## Position

The `position` prop of `BeeAlertList` sets where the alerts stack: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` (default) or `bottom-right`. Alerts arrive in order: the oldest at the top of the stack, the most recent below it.

## Duration

Each alert closes by itself after 5 seconds. Pass `duration` in milliseconds to change this delay, or `0` for an alert that stays until it is closed. The delay is paused while the alert is hovered or has focus.

```ts
success("Saved", { duration: 2000 });
error("Connection lost", { duration: 0 });
```

## With Nuxt

Only call the `useAlert()` methods on the client side (in an event handler, for example). The state is shared by the whole application, so an alert created during server rendering could be seen by several visitors.

## API

### useAlert()

Returns these methods:

| Method                       | Returns  | Description                                         |
| ---------------------------- | -------- | --------------------------------------------------- |
| `success(message, options?)` | `number` | Shows a success alert.                              |
| `error(message, options?)`   | `number` | Shows an error alert.                               |
| `warning(message, options?)` | `number` | Shows a warning.                                    |
| `info(message, options?)`    | `number` | Shows an information message.                       |
| `dismiss(id)`                | `void`   | Closes the alert whose id was returned at creation. |
| `clear()`                    | `void`   | Closes all alerts.                                  |

Options:

| Name       | Type     | Default | Description                                                |
| ---------- | -------- | ------- | ---------------------------------------------------------- |
| `duration` | `number` | `5000`  | Duration in milliseconds. 0: the alert stays until closed. |

The message is plain text. For rich content (a link, formatting), use [BeeAlert](./alert) directly.

### BeeAlertList: props

| Name       | Type            | Default           | Description                            |
| ---------- | --------------- | ----------------- | -------------------------------------- |
| `position` | `AlertPosition` | `"bottom-center"` | Corner or edge where the alerts stack. |

`AlertPosition` is `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`.

### CSS variables used

Those of [BeeAlert](./alert), plus `--bd-z-alert`, `--bd-shadow-2`, `--bd-space-md` and `--bd-transition-base`.

## Accessibility

Alerts use the roles of [BeeAlert](./alert): `alert` for errors and warnings, `status` for the rest. The area that holds the stack does not capture clicks, so the page stays usable underneath. Animations are disabled when `prefers-reduced-motion` is enabled.