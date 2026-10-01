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

La liste complète est dans `src/styles/tokens.css`.