# Getting started

Beedesign is a library of Vue 3 components, accessible by default and themeable with CSS variables. This page takes you from installation to your first screen.

## Requirements

- **Vue 3.5.2 or newer.**
- **A build tool that handles ESM and `.vue` files**: Vite, Nuxt, Vitest...
- **TypeScript** is optional. If you use it, `moduleResolution` must be `"bundler"`, which is already the case in recent Vite and Nuxt projects.

## Installation

```bash
npm install @thaisrr/beedesign
```

## Import the stylesheet

Do this **once**, at the entry point of your application:

```ts
// main.ts
import { createApp } from "vue";
import "@thaisrr/beedesign/style.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

Colors, spacing, shadows and dark mode all come from this stylesheet. Without it, the components render unstyled.

## Use components

Import only the ones you need:

```vue
<script setup lang="ts">
import { BeeButton, BeeCard, BeeFlex } from "@thaisrr/beedesign";
</script>

<template>
  <BeeFlex>
    <BeeCard :elevation="1">Welcome</BeeCard>
    <BeeButton>Get started</BeeButton>
  </BeeFlex>
</template>
```

Your build tool only bundles the components you import. The stylesheet, on the other hand, is a single file of about 16 kB (3 kB compressed).

## Show notifications

Mount one `BeeAlertList` **once**, at the root of the application, then trigger alerts from anywhere with `useAlert()`:

```vue
<!-- App.vue -->
<script setup lang="ts">
import { BeeAlertList, BeeButton, useAlert } from "@thaisrr/beedesign";

const { success } = useAlert();
</script>

<template>
  <BeeButton @click="success('Saved!')">Save</BeeButton>
  <BeeAlertList position="top-right" />
</template>
```

More details in [BeeAlertList and useAlert](/en/components/alert-list).

## Dark mode

Add the `dark` class on `<html>` to turn on dark mode:

```ts
document.documentElement.classList.toggle("dark");
```

Beedesign does not follow the system preference automatically. To respect it at startup:

```ts
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
}
```

To change the colors, see [Theme and tokens](./theming).

## With Nuxt

Declare the stylesheet in `nuxt.config.ts`, then import the components where you use them:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@thaisrr/beedesign/style.css"],
});
```

No other setting is needed.

The components render on the server. Only call the `useAlert()` methods on the client side (in an event handler, for example): the alert state is shared by the whole application.

## Translating built-in texts

The only built-in text is the accessible name of the close button, which is in English by default (`"Close"`). In a French interface:

```vue
<BeeModal v-model:open="open" title="Titre" close-label="Fermer">...</BeeModal>
```

The same prop exists on `BeeDrawer` and `BeeAlert`.

## Next steps

- [Browse the components](/en/components/button)
- [Customize the theme](./theming)
- [The composables](./composables)