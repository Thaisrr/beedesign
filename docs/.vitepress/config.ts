import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : "/";

export default defineConfig({
    base,
    title: "Beedesign",
    locales: {
        root: {
            label: "Français",
            lang: "fr-FR",
            description: "Composants Vue 3 accessibles et thémables par variables CSS.",
            themeConfig: {
                nav: [
                    {text: "Getting Started", link: '/guide/getting-started'},
                    { text: "Guide", link: "/guide/theming" },
                    { text: "A propos", link: "/guide/about"},
                    { text: "Composants", link: "/components/button" },
                ],
                sidebar: [
                    {
                        text: "Guide",
                        items: [
                            { text: "Thème et tokens", link: "/guide/theming" },
                            { text: "Composables", link: "/guide/composables" },
                        ],
                    },
                    { text: "A propos", link: "/guide/about"},
                    {
                        text: "Composants",
                        items: [
                            {
                                text: "UI",
                                items: [
                                    { text: "BeeAlert", link: "/components/alert" },
                                    { text: "BeeButton", link: "/components/button" },
                                    { text: "BeeCard", link: "/components/card" },
                                    { text: "BeeTag", link: "/components/tag" },
                                ]
                            },
                            {
                                text: "Overlay",
                                items: [
                                    { text: "BeeAlertList", link: "/components/alert-list" },
                                    { text: "BeeDrawer", link: "/components/drawer" },
                                    { text: "BeeModal", link: "/components/modal" },
                                ]
                            },
                            {
                                text: "Mise en page",
                                items: [
                                    { text: "BeeFlex", link: "/components/flex" },
                                    { text: "BeeGrid", link: "/components/grid" },
                                ]
                            },
                        ],
                    },
                ],
                outline: { label: "Sur cette page", level: [2, 3] },
                docFooter: { prev: "Précédent", next: "Suivant" },
                darkModeSwitchLabel: "Thème",
                sidebarMenuLabel: "Menu",
                returnToTopLabel: "Haut de page",
                langMenuLabel: "Changer de langue",
            },
        },

        en: {
            label: "English",
            lang: "en-US",
            link: "/en/",
            description: "Accessible Vue 3 components, themeable with CSS variables.",
            themeConfig: {
                nav: [
                    { text: "Guide", link: "/en/guide/theming" },
                    { text: "About", link: "/en/guide/about"},
                    { text: "Components", link: "/en/components/button" },
                ],
                sidebar: [
                    {
                        text: "Guide",
                        items: [
                            { text: "Getting Started", link: "/guide/getting-started" },
                            { text: "Theme and tokens", link: "/en/guide/theming" },
                            { text: "Composables", link: "/en/guide/composables" },
                        ],
                    },
                    { text: "About", link: "/en/guide/about"},
                    {
                        text: "Components",
                        items: [
                            {
                                text: "UI",
                                items: [
                                    { text: "BeeAlert", link: "/en/components/alert" },
                                    { text: "BeeButton", link: "/en/components/button" },
                                    { text: "BeeCard", link: "/en/components/card" },
                                    { text: "BeeTag", link: "/en/components/tag" },
                                ]
                            },
                            {
                                text: "Overlay",
                                items: [
                                    { text: "BeeAlertList", link: "/en/components/alert-list" },
                                    { text: "BeeDrawer", link: "/en/components/drawer" },
                                    { text: "BeeModal", link: "/en/components/modal" },
                                ]
                            },
                            {
                                text: "Layout",
                                items: [
                                    { text: "BeeFlex", link: "/en/components/flex" },
                                    { text: "BeeGrid", link: "/en/components/grid" },
                                ]
                            }
                        ],
                    },
                ],
                outline: { label: "On this page", level: [2, 3] },
                docFooter: { prev: "Previous", next: "Next" },
                darkModeSwitchLabel: "Theme",
                sidebarMenuLabel: "Menu",
                returnToTopLabel: "Back to top",
                langMenuLabel: "Change language",
            },
        },
    },

    themeConfig: {
        // Un index de recherche est construit pour chaque langue ; seuls les textes
        // de l'interface de recherche sont à traduire (l'anglais est la valeur par défaut).
        search: {
            provider: "local",
            options: {
                locales: {
                    root: {
                        translations: {
                            button: { buttonText: "Rechercher", buttonAriaLabel: "Rechercher" },
                            modal: {
                                displayDetails: "Afficher le détail",
                                resetButtonTitle: "Effacer la recherche",
                                backButtonTitle: "Fermer la recherche",
                                noResultsText: "Aucun résultat pour",
                                footer: {
                                    selectText: "Sélectionner",
                                    selectKeyAriaLabel: "entrée",
                                    navigateText: "Naviguer",
                                    navigateUpKeyAriaLabel: "flèche du haut",
                                    navigateDownKeyAriaLabel: "flèche du bas",
                                    closeText: "Fermer",
                                    closeKeyAriaLabel: "échap",
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    vite: {
        resolve: {
            alias: {
                "@thaisrr/beedesign": fileURLToPath(new URL("../../src/index.ts", import.meta.url)),
            },
        },
    },
});