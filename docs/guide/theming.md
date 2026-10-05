# Thème et tokens

Tout le style de Beedesign passe par des variables CSS préfixées `--bd-`. Redéfinissez-les dans le CSS global de votre projet, après l'import de `@thaisrr/beedesign/style.css` :

```css
:root {
  --bd-color-primary: #0f766e;
  --bd-color-primary-hover: #0d645d;
  --bd-color-primary-edge: #094a45;
  --bd-color-on-primary: #ffffff;
  --bd-font-title: "Libre Bodoni", serif;
}
```

## Mode sombre

Ajoutez la classe `dark` ou l'attribut `data-theme="dark"` sur `<html>` (ou n'importe quel parent). Les tokens de couleur s'inversent, le violet et l'ambre sont éclaircis pour rester lisibles.

Si vous changez `--bd-color-primary`, redéfinissez aussi sa version sombre :

```css
.dark,
[data-theme="dark"] {
  --bd-color-primary: #5eead4;
  --bd-color-on-primary: #042f2e;
}
```

## Couleurs

| Token                      | Rôle                                       |
| -------------------------- | ------------------------------------------ |
| `--bd-color-primary`       | Couleur de marque.                         |
| `--bd-color-primary-hover` | Survol du bouton principal.                |
| `--bd-color-primary-edge`  | Arête basse du bouton principal.           |
| `--bd-color-on-primary`    | Texte posé sur la couleur de marque.       |
| `--bd-color-primary-dark`  | Encre : textes et contours forts.          |
| `--bd-color-primary-light` | Fonds légers, survols.                     |
| `--bd-color-accent`        | Couleur d'accent.                          |
| `--bd-color-on-accent`     | Texte posé sur l'accent.                   |
| `--bd-color-bg`            | Fond de page.                              |
| `--bd-color-surface`       | Cartes et panneaux.                        |
| `--bd-color-text`          | Texte courant.                             |
| `--bd-color-text-muted`    | Texte secondaire.                          |
| `--bd-color-border`        | Bordures discrètes.                        |
| `--bd-color-border-strong` | Bordures de champs et séparateurs marqués. |
| `--bd-color-focus`         | Anneau de focus.                           |

## Tailles, bordures et focus

Ces variables sont en pixels. Seules les tailles de police sont en `rem`, pour suivre le réglage de taille de texte du navigateur.

| Token                      | Par défaut      | Rôle                                                   |
| -------------------------- | --------------- | ------------------------------------------------------ |
| `--bd-space-sm`            | 8 px            | Petit espacement.                                      |
| `--bd-space-md`            | 16 px           | Espacement moyen.                                      |
| `--bd-space-lg`            | 32 px           | Grand espacement.                                      |
| `--bd-control-height`      | 44 px           | Hauteur minimale d'un contrôle (le bouton).            |
| `--bd-close-size`          | 36 px           | Taille des boutons de fermeture (modale, drawer).      |
| `--bd-overlay-width`       | 448 px          | Largeur par défaut de la modale et du drawer.          |
| `--bd-border-width`        | 1 px            | Bordure des cartes, tags, alertes, modale et drawer.   |
| `--bd-border-width-strong` | 2 px            | Bordure des boutons.                                   |
| `--bd-alert-stripe-width`  | 4 px            | Bande colorée à gauche d'une alerte.                   |
| `--bd-focus-ring-width`    | 3 px            | Épaisseur de l'anneau de focus.                        |
| `--bd-focus-ring-offset`   | 2 px            | Écart entre l'élément et son anneau de focus.          |
| `--bd-button-edge`         | 3 px            | Hauteur de l'arête sous le bouton principal.           |

```css
:root {
  --bd-control-height: 48px;
  --bd-focus-ring-width: 4px;
}
```

::: warning Accessibilité
Réduire ces valeurs peut rendre l'interface moins utilisable. WCAG 2.2 demande des cibles d'au moins 24 px (critère 2.5.8) et un indicateur de focus visible (2.4.7). Beedesign vise 44 px pour les boutons. En dessous de 44 px pour `--bd-control-height`, ou de 2 px pour `--bd-focus-ring-width`, testez l'interface au clavier et sur un écran tactile.
:::

La liste complète est dans `src/styles/tokens.css`.