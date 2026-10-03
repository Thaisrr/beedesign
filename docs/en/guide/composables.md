# Composables

The accessibility logic of layered components (modal, drawer) lives in two composables exported by the library. You can use them in your own components.

```ts
import { useFocusTrap, useScrollLock } from "@thaisrr/beedesign";
```

## useScrollLock

Locks page scrolling while the value is true, then restores the original values. An internal counter keeps the page locked as long as one overlay remains open, even when several are stacked.

```ts
const open = ref(false);

useScrollLock(open);
```

| Parameter | Type                        | Description                             |
| --------- | --------------------------- | --------------------------------------- |
| `locked`  | `MaybeRefOrGetter<boolean>` | Scrolling is locked while this is true. |

## useFocusTrap

Keeps keyboard focus inside a container, handles Escape, and gives focus back when it closes. When several traps are active, only the most recently opened one reacts to the keyboard.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useFocusTrap } from "@thaisrr/beedesign";

const open = ref(false);
const panel = ref<HTMLElement | null>(null);

useFocusTrap({
  container: panel,
  active: open,
  onEscape: () => (open.value = false),
});
</script>

<template>
  <div v-if="open" ref="panel" tabindex="-1" role="dialog" aria-modal="true">
    ...
  </div>
</template>
```

| Option         | Type                                    | Description                                                               |
| -------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| `container`    | `Ref<HTMLElement \| null>`              | Element that holds the focus. It must have `tabindex="-1"`.               |
| `active`       | `MaybeRefOrGetter<boolean>`             | The trap is active while this is true.                                    |
| `initialFocus` | `Ref<HTMLElement \| null>`              | Element focused on opening. Defaults to the first focusable element.      |
| `returnFocus`  | `MaybeRefOrGetter<HTMLElement \| null>` | Element refocused on closing. Defaults to the one focused before opening. |
| `onEscape`     | `() => void`                            | Called when the user presses Escape.                                      |

Neither composable does anything on the server (SSR), so there is no need to check `import.meta.client` or `typeof document` before calling them.