import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "../../../src/styles/tokens.css";
import "./custom.css";
import Demo from "../components/Demo.vue";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
    app.component("Demo", Demo);
},
} satisfies Theme;