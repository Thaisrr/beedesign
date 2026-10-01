import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

export default defineConfig({
    lang: "fr-FR",
    title: "Beedesign",
    description: "Composants Vue 3 accessibles et thémables par variables CSS.",

    themeConfig: {
        nav: [
            { text: "Guide", link: "/guide/theming" },
            { text: "Composants", link: "/components/button" },
        ],

        sidebar: [
            {
                text: "Guide",
                items: [
                    { text: "Thème et tokens", link: "/guide/theming" },
                    { text: "Composables", link: "/guide/composables"},
                ],
            },
            {
                text: "Composants",
                items: [
                    { text: "Button", link: "/components/button" },
                    { text: "Card", link: "/components/card"},
                    {text: "Tag", link: "/components/tag"},
                ],
            },
            {
                text: "Overlay",
                items: [
                    { text: "Alert", link: "/components/alert" },
                    { text: "AlertList", link: "/components/alert-list" },
                    { text: "Drawer", link: "/components/drawer" },
                    { text: "Modal", link: "/components/modal"},

                ]
            },
            {
                text: "Mise en page",
                items: [
                    { text: "Flex", link: "/components/flex"},
                    { text: "Grid", link: "/components/grid"},
                ]
            }
        ],

        search: { provider: "local" },
        outline: { label: "Sur cette page", level: [2, 3] },
        docFooter: { prev: "Précédent", next: "Suivant" },
        darkModeSwitchLabel: "Thème",
        sidebarMenuLabel: "Menu",
        returnToTopLabel: "Haut de page",
    },

    vite: {
        resolve: {
            alias: {
                beedesign: fileURLToPath(new URL("../../src/index.ts", import.meta.url)),
            },
        },
    },
});