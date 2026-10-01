import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeDrawer } from "@thaisrr/beedesign";

const dialog = () => document.body.querySelector<HTMLElement>('[role="dialog"]');

function mountDrawer(props: Record<string, unknown> = {}) {
    return mount(BeeDrawer, {
        props: { title: "Filtres", open: true, ...props },
        slots: { default: "<p>Contenu</p>" },
        attachTo: document.body,
    });
}

describe("BeeDrawer", () => {
    it("n'ajoute rien à la page tant qu'il est fermé", () => {
        mountDrawer({ open: false });

        expect(dialog()).toBeNull();
    });

    it("affiche son contenu dans une boîte de dialogue modale nommée par son titre", () => {
        mountDrawer();

        const el = dialog()!;
        const title = document.getElementById(el.getAttribute("aria-labelledby")!);

        expect(el.textContent).toContain("Contenu");
        expect(el.getAttribute("aria-modal")).toBe("true");
        expect(title?.textContent?.trim()).toBe("Filtres");
    });

    it("apparaît à droite par défaut", () => {
        mountDrawer();

        expect(dialog()?.classList.contains("bd-drawer--right")).toBe(true);
    });

    it.each(["left", "right", "top", "bottom"] as const)("accepte side=%s", (side) => {
        mountDrawer({ side });

        expect(dialog()?.classList.contains(`bd-drawer--${side}`)).toBe(true);
    });

    describe("size", () => {
        it("n'impose rien par défaut : le CSS fournit la taille", () => {
            mountDrawer();

            expect(dialog()?.getAttribute("style")).toBeNull();
        });

        it.each(["left", "right"] as const)("règle la largeur pour side=%s", (side) => {
            mountDrawer({ side, size: "30rem" });

            expect(dialog()?.style.width).toBe("30rem");
            expect(dialog()?.style.maxHeight).toBe("");
        });

        it.each(["top", "bottom"] as const)("règle la hauteur maximale pour side=%s", (side) => {
            mountDrawer({ side, size: "10rem" });

            expect(dialog()?.style.maxHeight).toBe("10rem");
            expect(dialog()?.style.width).toBe("");
        });
    });

    it("garde un titre lisible par les lecteurs d'écran avec hideTitle", () => {
        mountDrawer({ hideTitle: true });

        const title = document.getElementById(dialog()!.getAttribute("aria-labelledby")!)!;

        expect(title.classList.contains("bd-drawer__sr-only")).toBe(true);
        expect(title.textContent?.trim()).toBe("Filtres");
    });

    describe("fermeture", () => {
        it("émet update:open=false au clic sur le bouton de fermeture", () => {
            const wrapper = mountDrawer();

            document.body.querySelector<HTMLButtonElement>(".bd-drawer__close")!.click();

            expect(wrapper.emitted("update:open")).toEqual([[false]]);
        });

        it("émet update:open=false au clic sur le fond", () => {
            const wrapper = mountDrawer();

            document.body.querySelector<HTMLElement>(".bd-drawer__backdrop")!.click();

            expect(wrapper.emitted("update:open")).toEqual([[false]]);
        });

        it("émet update:open=false avec Échap", () => {
            const wrapper = mountDrawer();

            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

            expect(wrapper.emitted("update:open")).toEqual([[false]]);
        });
    });

    it("bloque le scroll de la page tant qu'il est ouvert", async () => {
        const wrapper = mountDrawer();
        expect(document.body.style.overflow).toBe("hidden");

        await wrapper.setProps({ open: false });

        expect(document.body.style.overflow).toBe("");
    });

    it("place le focus sur le bouton de fermeture à l'ouverture", async () => {
        mountDrawer();
        await flushPromises();

        expect(document.activeElement).toBe(
            document.body.querySelector(".bd-drawer__close"),
        );
    });
});