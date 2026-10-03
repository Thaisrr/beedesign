# Premiers pas

Beedesign est une bibliothèque de composants Vue 3, accessibles par défaut et thémables avec des variables CSS. Cette page vous mène de l'installation à votre premier écran.

## Prérequis

- **Vue 3.5.2 ou plus récent.**
- **Un outil de build qui gère l'ESM et les fichiers `.vue`** : Vite, Nuxt, Vitest...
- **TypeScript** est facultatif. Si vous l'utilisez, `moduleResolution` doit valoir `"bundler"`, ce qui est déjà le cas dans les projets Vite et Nuxt récents.

## Installation

```bash
npm install @thaisrr/beedesign
```

## Importer la feuille de styles

À faire **une seule fois**, à l'entrée de votre application :

```ts
// main.ts
import { createApp } from "vue";
import "@thaisrr/beedesign/style.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

Les couleurs, les espacements, les ombres et le mode sombre viennent de cette feuille. Sans elle, les composants s'affichent sans style.

## Utiliser des composants

Importez uniquement ceux dont vous avez besoin :

```vue
<script setup lang="ts">
import { BeeButton, BeeCard, BeeFlex } from "@thaisrr/beedesign";
</script>

<template>
  <BeeFlex>
    <BeeCard :elevation="1">Bienvenue</BeeCard>
    <BeeButton>Commencer</BeeButton>
  </BeeFlex>
</template>
```

Votre outil de build n'embarque que les composants que vous importez. La feuille de styles, elle, est un fichier unique d'environ 16 ko (3 ko compressés).

## Afficher des notifications

Montez un `BeeAlertList` **une seule fois**, à la racine de l'application, puis déclenchez les alertes depuis n'importe où avec `useAlert()` :

```vue
<!-- App.vue -->
<script setup lang="ts">
import { BeeAlertList, BeeButton, useAlert } from "@thaisrr/beedesign";

const { success } = useAlert();
</script>

<template>
  <BeeButton @click="success('Enregistré !')">Enregistrer</BeeButton>
  <BeeAlertList position="top-right" />
</template>
```

Plus de détails dans [BeeAlertList et useAlert](/components/alert-list).

## Mode sombre

Ajoutez la classe `dark` sur `<html>` pour activer le mode sombre :

```ts
document.documentElement.classList.toggle("dark");
```

Beedesign ne suit pas automatiquement la préférence du système. Pour la respecter au démarrage :

```ts
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
}
```

Pour changer les couleurs, voir [Thème et tokens](./theming).

## Avec Nuxt

Déclarez la feuille de styles dans `nuxt.config.ts`, puis importez les composants là où vous les utilisez :

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@thaisrr/beedesign/style.css"],
});
```

Aucun autre réglage n'est nécessaire.

Les composants sont rendus côté serveur. Appelez les méthodes de `useAlert()` seulement côté client (dans un gestionnaire d'événement, par exemple) : l'état des alertes est partagé par toute l'application.

## Traduire les textes intégrés

Le seul texte intégré est le nom accessible du bouton de fermeture, en anglais par défaut (`"Close"`). Dans une interface en français :

```vue
<BeeModal v-model:open="open" title="Titre" close-label="Fermer">...</BeeModal>
```

La même prop existe sur `BeeDrawer` et `BeeAlert`.

## La suite

- [Parcourir les composants](/components/button)
- [Personnaliser le thème](./theming)
- [Les composables](./composables)