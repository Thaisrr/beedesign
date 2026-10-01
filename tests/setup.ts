import { enableAutoUnmount } from "@vue/test-utils";
import { afterEach } from "vitest";

// Démonte chaque composant monté après chaque test : les composables
// (pile de focus, compteur de scroll, alertes) gardent un état au niveau du module.
enableAutoUnmount(afterEach);

// jsdom ne calcule aucune mise en page : getClientRects() y est toujours vide.
// useFocusTrap s'en sert pour ignorer les éléments masqués, donc on simule ici
// des éléments visibles, sauf s'ils sont explicitement cachés.
Object.defineProperty(HTMLElement.prototype, "getClientRects", {
    configurable: true,
    value(this: HTMLElement) {
        const hidden = this.hidden || this.style.display === "none";
        return hidden ? [] : [{}];
    },
});

afterEach(() => {
    document.body.innerHTML = "";
    document.body.removeAttribute("style");
    document.documentElement.removeAttribute("style");
});