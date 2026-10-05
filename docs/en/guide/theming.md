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

## Sizes, borders and focus

These variables are in pixels. Only font sizes use `rem`, so that they follow the browser's text size setting.

| Token                      | Default | Role                                               |
| -------------------------- | ------- | -------------------------------------------------- |
| `--bd-space-sm`            | 8 px    | Small spacing.                                     |
| `--bd-space-md`            | 16 px   | Medium spacing.                                    |
| `--bd-space-lg`            | 32 px   | Large spacing.                                     |
| `--bd-control-height`      | 44 px   | Minimum height of a control (the button).          |
| `--bd-close-size`          | 36 px   | Size of the close buttons (modal, drawer).         |
| `--bd-overlay-width`       | 448 px  | Default width of the modal and the drawer.         |
| `--bd-border-width`        | 1 px    | Border of cards, tags, alerts, modal and drawer.   |
| `--bd-border-width-strong` | 2 px    | Border of buttons.                                 |
| `--bd-alert-stripe-width`  | 4 px    | Colored stripe on the left of an alert.            |
| `--bd-focus-ring-width`    | 3 px    | Thickness of the focus ring.                       |
| `--bd-focus-ring-offset`   | 2 px    | Gap between the element and its focus ring.        |
| `--bd-button-edge`         | 3 px    | Height of the edge under the primary button.       |

```css
:root {
  --bd-control-height: 48px;
  --bd-focus-ring-width: 4px;
}
```

::: warning Accessibility
Reducing these values can make the interface harder to use. WCAG 2.2 asks for targets of at least 24 px (criterion 2.5.8) and a visible focus indicator (2.4.7). Beedesign aims for 44 px on buttons. Below 44 px for `--bd-control-height`, or below 2 px for `--bd-focus-ring-width`, test the interface with a keyboard and on a touch screen.
:::

The full list is in `src/styles/tokens.css`.