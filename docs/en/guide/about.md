# About

## Where Beedesign comes from

Beedesign started from my own needs: a design system I had built for my portfolio. It had been on my mind for a while. I took it out of my project, documented it, tested it, and published it as open source so that others can use it.

## Principles

**Accessible by default.** Accessibility is not an option to turn on or a layer added at the end. Every component is designed for keyboard and screen reader use from the start:

- focus that is always visible on the keyboard;
- a modal and a drawer that keep focus inside, close with Escape and give focus back on closing;
- errors and warnings announced right away to screen readers, other messages announced politely;
- no information carried by color alone;
- reduced animations when the system asks for them.

**Easy to theme.** Everything goes through CSS variables prefixed with `--bd-`. No configuration file or extra build tool: you change variables, and dark mode follows. See [Theme and tokens](/en/guide/theming).
You can also easily create a custom theme with (BeePalette)[https://thaisrr.github.io/bee-palette/]

**Small and readable.** Nine components and three composables, with no dependency other than Vue. About 5 kB of JavaScript and 3 kB of CSS once compressed. Each component has a short, typed API, so the code stays easy to read, review and fix.

**Tested and documented.** The library has more than 200 tests, including automated accessibility checks with axe. The documentation exists in French and English, with the code of every example ready to copy.

## Where the project stands

This is a 0.x version: it works, but the API may still change. Here is honestly what is not covered yet:

- color contrast is not checked automatically;
- the tests run in a simulated environment, and I have not yet tried the library with real screen readers.

If you notice an accessibility problem, that is the feedback that helps me most.

## What's next

- **More flexible Flex and Grid.** Today, breakpoints are fixed (768 px for `BeeFlex`, 1000 px for `BeeGrid`) and the number of columns does not change with the screen width. I want to make them adjustable, for example with a different number of columns depending on the screen size.
- **New components.** The list will be built with your feedback: tell me what you are missing.
- **Going further on accessibility.** Automated contrast tests, tests in a real browser, and trials with screen readers.

## Who I am

My name is Thaïs. I am a fullstack developer and trainer, based in Calais, France. I came to development around 2018, with a background in literature, through a bootcamp and then degrees. I work with Vue, React, Angular, TypeScript and Node. I also published Abra.js, a small TypeScript wrapper around `fetch`.

You can find me on [GitHub](https://github.com/Thaisrr).

## Contributing

Feedback is welcome in any form:

- a bug or an idea: open an [issue](https://github.com/Thaisrr/beedesign/issues);
- a fix or a new component: send a pull request.

Every change comes with its tests and its documentation, in French and English.

The code is on [GitHub](https://github.com/Thaisrr/beedesign) and the package on [npm](https://www.npmjs.com/package/@thaisrr/beedesign).