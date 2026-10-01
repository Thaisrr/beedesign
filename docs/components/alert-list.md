<script setup>
import UseAlert from "../examples/alert/use-alert.vue";
</script>

# BeeAlertList et useAlert

Des notifications temporaires qui s'empilent dans un coin de l'écran. On monte un `BeeAlertList` une seule fois dans l'application, puis on déclenche les alertes depuis n'importe où avec `useAlert()`.

```ts
import { BeeAlertList, useAlert } from "beedesign";
import "beedesign/style.css";
```

## Mise en place

Montez `BeeAlertList` une fois, à la racine de l'application.

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <BeeAlertList position="top-right" />
</template>
```

Ensuite, appelez `useAlert()` dans n'importe quel composant ou fichier de logique. Il n'y a rien à fournir ni à injecter.

```ts
const { success, error } = useAlert();

async function save() {
  try {
    await api.save(draft);
    success("Brouillon enregistré");
  } catch {
    error("L'enregistrement a échoué");
  }
}
```

## Essayer

Chaque bouton déclenche une alerte. Les boutons de position déplacent la pile.

<Demo>
  <UseAlert />

<template #code>

<<< @/examples/alert/use-alert.vue

  </template>
</Demo>

## Position

La prop `position` de `BeeAlertList` choisit où s'empilent les alertes : `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` (par défaut) ou `bottom-right`. Les alertes arrivent dans l'ordre : la plus ancienne en haut de la pile, la plus récente en dessous.

## Durée

Chaque alerte se ferme seule après 5 secondes. Passez `duration` en millisecondes pour changer ce délai, ou `0` pour une alerte qui reste jusqu'à sa fermeture. Le délai est suspendu tant que l'alerte est survolée ou qu'elle a le focus.

```ts
success("Enregistré", { duration: 2000 });
error("Connexion perdue", { duration: 0 });
```

## Avec Nuxt

`BeeAlertList` se téléporte dans `body`. En rendu serveur, enveloppez-le dans `<ClientOnly>` :

```vue
<ClientOnly>
  <BeeAlertList position="top-right" />
</ClientOnly>
```

N'appelez les méthodes de `useAlert()` que côté client (dans un gestionnaire d'événement, par exemple). L'état est partagé par toute l'application, une alerte créée pendant le rendu serveur pourrait être vue par plusieurs visiteurs.

## API

### useAlert()

Retourne ces méthodes :

| Méthode                      | Retour   | Description                                            |
| ---------------------------- | -------- | ------------------------------------------------------ |
| `success(message, options?)` | `number` | Affiche une alerte de succès.                          |
| `error(message, options?)`   | `number` | Affiche une alerte d'erreur.                           |
| `warning(message, options?)` | `number` | Affiche un avertissement.                              |
| `info(message, options?)`    | `number` | Affiche une information.                               |
| `dismiss(id)`                | `void`   | Ferme l'alerte dont l'id a été retourné à sa création. |
| `clear()`                    | `void`   | Ferme toutes les alertes.                              |

Options :

| Nom        | Type     | Défaut | Description                                                   |
| ---------- | -------- | ------ | ------------------------------------------------------------- |
| `duration` | `number` | `5000` | Durée en millisecondes. 0 : l'alerte reste jusqu'à fermeture. |

Le message est du texte simple. Pour un contenu riche (lien, mise en forme), utilisez [BeeAlert](./alert) directement.

### BeeAlertList : props

| Nom        | Type            | Défaut            | Description                             |
| ---------- | --------------- | ----------------- | --------------------------------------- |
| `position` | `AlertPosition` | `"bottom-center"` | Coin ou bord où s'empilent les alertes. |

`AlertPosition` vaut `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`.

### Variables CSS utilisées

Celles de [BeeAlert](./alert), plus `--bd-z-alert`, `--bd-shadow-2`, `--bd-space-md` et `--bd-transition-base`.

## Accessibilité

Les alertes reprennent les rôles de [BeeAlert](./alert) : `alert` pour les erreurs et avertissements, `status` pour le reste. La zone qui contient la pile ne capte pas les clics, la page reste utilisable en dessous. Les animations sont désactivées si `prefers-reduced-motion` est activé.