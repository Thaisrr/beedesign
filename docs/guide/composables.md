# Composables

La logique d'accessibilité des composants superposés (modale, drawer) est extraite dans deux composables, exportés par la librairie. Vous pouvez les utiliser pour vos propres composants.

```ts
import { useFocusTrap, useScrollLock } from "beedesign";
```

## useScrollLock

Bloque le scroll de la page tant que la valeur est vraie, puis restaure les valeurs d'origine. Un compteur interne garde la page bloquée tant qu'une superposition reste ouverte, même si plusieurs sont empilées.

```ts
const open = ref(false);

useScrollLock(open);
```

| Paramètre | Type                        | Description                               |
| --------- | --------------------------- | ----------------------------------------- |
| `locked`  | `MaybeRefOrGetter<boolean>` | Le scroll est bloqué tant que c'est vrai. |

## useFocusTrap

Enferme le focus clavier dans un conteneur, gère Échap, et rend le focus à la fermeture. Si plusieurs pièges sont actifs, seul le dernier ouvert réagit au clavier.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useFocusTrap } from "beedesign";

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

| Option         | Type                                    | Description                                                                    |
| -------------- | --------------------------------------- | ------------------------------------------------------------------------------ |
| `container`    | `Ref<HTMLElement \| null>`              | Élément qui retient le focus. Il doit avoir `tabindex="-1"`.                   |
| `active`       | `MaybeRefOrGetter<boolean>`             | Le piège est actif tant que c'est vrai.                                        |
| `initialFocus` | `Ref<HTMLElement \| null>`              | Élément focalisé à l'ouverture. Par défaut, le premier élément focusable.      |
| `returnFocus`  | `MaybeRefOrGetter<HTMLElement \| null>` | Élément refocalisé à la fermeture. Par défaut, celui qui avait le focus avant. |
| `onEscape`     | `() => void`                            | Appelé quand l'utilisateur appuie sur Échap.                                   |

Les deux composables ne font rien côté serveur (rendu SSR), il n'y a donc pas besoin de vérifier `import.meta.client` ou `typeof document` avant de les appeler.