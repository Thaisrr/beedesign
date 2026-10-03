import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "../../../src/styles/tokens.css";
import "./custom.css";
import Demo from "../components/Demo.vue";
import SiteFooter from "../components/SiteFooter.vue";

export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, { "layout-bottom": () => h(SiteFooter) }),
    enhanceApp({ app }) {
        app.component("Demo", Demo);
    },
} satisfies Theme;