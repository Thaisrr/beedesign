<script setup>
import Basic from "../examples/alert/basic.vue";
import Closable from "../examples/alert/closable.vue";
</script>

# BeeAlert

Un message d'état affiché dans le flux de la page : succès, erreur, avertissement ou information. Pour des notifications temporaires qui s'empilent dans un coin de l'écran, voir [BeeAlertList](./alert-list).

```ts
import { BeeAlert } from "@thaisrr/beedesign";
import "@thaisrr/beedesign/style.css";
```

## Types

La prop `type` choisit la couleur et l'icône. La valeur par défaut est `info`.

<Demo>
  <Basic />

  <template #code>

<<< @/examples/alert/basic.vue

  </template>
</Demo>

## Fermeture

Avec `closable`, un bouton de fermeture apparaît et émet `close`. C'est à vous de retirer l'alerte, par exemple avec un `v-if`.

<Demo>
  <Closable />

  <template #code>

<<< @/examples/alert/closable.vue

  </template>
</Demo>

## Fermeture automatique

La prop `duration` ferme l'alerte au bout d'un délai en millisecondes, en émettant `close`. Le délai est suspendu tant que l'alerte est survolée ou qu'elle a le focus, pour laisser le temps de la lire. Sans `duration`, l'alerte reste.

```vue
<BeeAlert type="success" :duration="4000" @close="visible = false">
  Enregistré.
</BeeAlert>
```

## API

### Props

| Nom          | Type                                          | Défaut     | Description                                             |
| ------------ | --------------------------------------------- | ---------- | ------------------------------------------------------- |
| `type`       | `"success" \| "error" \| "warning" \| "info"` | `"info"`   | Nature du message : couleur et icône.                   |
| `closable`   | `boolean`                                     | `false`    | Affiche un bouton de fermeture.                         |
| `duration`   | `number`                                      | `0`        | Fermeture automatique après ce délai en ms. 0 : jamais. |
| `closeLabel` | `string`                                      | `"Fermer"` | Texte accessible du bouton de fermeture.                |

### Événements

| Nom     | Payload | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| `close` | aucun   | Émis au clic sur le bouton de fermeture, ou à la fin de `duration`. |

### Slots

| Nom       | Description          |
| --------- | -------------------- |
| `default` | Contenu de l'alerte. |

### Variables CSS utilisées

`--bd-color-success`, `--bd-color-error`, `--bd-color-warning`, `--bd-color-info`, `--bd-color-surface`, `--bd-color-border`, `--bd-color-text`, `--bd-color-focus`, `--bd-font-main`, `--bd-font-size-md`, `--bd-radius-md`, `--bd-radius-full`, `--bd-space-sm`, `--bd-transition-fast`.

## Accessibilité

- Les erreurs et les avertissements ont `role="alert"` et sont annoncés tout de suite. Les succès et les informations ont `role="status"` et sont annoncés poliment.
- La couleur n'est jamais le seul indicateur : chaque type a aussi une icône.
- La fermeture automatique est suspendue au survol et au focus.