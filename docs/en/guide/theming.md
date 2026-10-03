# Theme and tokens

All of Beedesign's styling goes through CSS variables prefixed with `--bd-`. Redefine them in your project's global CSS, after importing `@thaisrr/beedesign/style.css`:

```css
:root {
  --bd-color-primary: #0f766e;
  --bd-color-primary-hover: #0d645d;
  --bd-color-primary-edge: #094a45;
  --bd-color-on-primary: #ffffff;
  --bd-font-title: "Libre Bodoni", serif;
}
```

## Dark mode

Add the `dark` class or the `data-theme="dark"` attribute on `<html>` (or on any parent). The color tokens flip, and the violet and amber are lightened to stay readable.

If you change `--bd-color-primary`, also redefine its dark version:

```css
.dark,
[data-theme="dark"] {
  --bd-color-primary: #5eead4;
  --bd-color-on-primary: #042f2e;
}
```

## Colors

| Token                      | Role                                 |
| -------------------------- | ------------------------------------ |
| `--bd-color-primary`       | Brand color.                         |
| `--bd-color-primary-hover` | Hover state of the primary button.   |
| `--bd-color-primary-edge`  | Bottom edge of the primary button.   |
| `--bd-color-on-primary`    | Text placed on the brand color.      |
| `--bd-color-primary-dark`  | Ink: strong text and outlines.       |
| `--bd-color-primary-light` | Light backgrounds, hover states.     |
| `--bd-color-accent`        | Accent color.                        |
| `--bd-color-on-accent`     | Text placed on the accent.           |
| `--bd-color-bg`            | Page background.                     |
| `--bd-color-surface`       | Cards and panels.                    |
| `--bd-color-text`          | Body text.                           |
| `--bd-color-text-muted`    | Secondary text.                      |
| `--bd-color-border`        | Subtle borders.                      |
| `--bd-color-border-strong` | Field borders and strong separators. |
| `--bd-color-focus`         | Focus ring.                          |

The full list is in `src/styles/tokens.css`.