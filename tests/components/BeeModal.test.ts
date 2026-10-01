import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeModal } from "@thaisrr/beedesign";

const dialog = () => document.body.querySelector<HTMLElement>('[role="dialog"]');
const closeButton = () => document.body.querySelector<HTMLButtonElement>(".bd-modal__close");
const press = (key: string, options: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...options });
    document.dispatchEvent(event);
    return event;
};

function mountModal(props: Record<string, unknown> = {}) {
    return mount(BeeModal, {
        props: { title: "Supprimer ?", open: true, ...props },
        slots: { default: '<button id="un">Un</button><button id="deux">Deux</button>' },
        attachTo: document.body,
    });
}

describe("BeeModal", () => {
    describe("ouverture", () => {
        it("n'ajoute rien à la page tant qu'elle est fermée", () => {
            mountModal({ open: false });

            expect(dialog()).toBeNull();
            expect(document.body.querySelector(".bd-modal__backdrop")).toBeNull();
        });

        it("se téléporte dans body quand elle s'ouvre", async () => {
            const wrapper = mountModal({ open: false });

            await wrapper.setProps({ open: true });

            expect(dialog()).not.toBeNull();
            expect(wrapper.element.contains(dialog())).toBe(false);
        });

        it("affiche son contenu", () => {
            mountModal();

            expect(dialog()?.querySelector("#un")).not.toBeNull();
        });
    });

    describe("accessibilité", () => {
        it("est une boîte de dialogue modale nommée par son titre", () => {
            mountModal();

            const el = dialog()!;
            const title = document.getElementById(el.getAttribute("aria-labelledby")!);

            expect(el.getAttribute("aria-modal")).toBe("true");
            expect(title?.tagName).toBe("H2");
            expect(title?.textContent?.trim()).toBe("Supprimer ?");
        });

        it("garde un titre lisible par les lecteurs d'écran avec hideTitle", () => {
            mountModal({ hideTitle: true });

            const title = document.getElementById(dialog()!.getAttribute("aria-labelledby")!)!;

            expect(title.textContent?.trim()).toBe("Supprimer ?");
            expect(title.classList.contains("bd-modal__sr-only")).toBe(true);
        });

        it("donne un nom accessible au bouton de fermeture, personnalisable", () => {
            mountModal({ closeLabel: "Close" });

            expect(closeButton()?.textContent).toContain("Close");
        });

        it("utilise le panelId fourni", () => {
            mountModal({ panelId: "ma-modale" });

            expect(dialog()?.id).toBe("ma-modale");
        });
    });

    describe("fermeture", () => {
        it("émet update:open=false au clic sur le bouton de fermeture", async () => {
            const wrapper = mountModal();

            closeButton()!.click();

            expect(wrapper.emitted("update:open")).toEqual([[false]]);
        });

        it("émet update:open=false au clic sur le fond", () => {
            const wrapper = mountModal();

            document.body.querySelector<HTMLElement>(".bd-modal__backdrop")!.click();

            expect(wrapper.emitted("update:open")).toEqual([[false]]);
        });

        it("émet update:open=false avec Échap", () => {
            const wrapper = mountModal();

            const event = press("Escape");

            expect(wrapper.emitted("update:open")).toEqual([[false]]);
            expect(event.defaultPrevented).toBe(true);
        });

        it("ne réagit pas à Échap quand elle est fermée", () => {
            const wrapper = mountModal({ open: false });

            press("Escape");

            expect(wrapper.emitted("update:open")).toBeUndefined();
        });

        it("retire la boîte de dialogue quand open repasse à false", async () => {
            const wrapper = mountModal();

            await wrapper.setProps({ open: false });

            expect(dialog()).toBeNull();
        });
    });

    describe("scroll de la page", () => {
        it("est bloqué pendant l'ouverture", () => {
            mountModal();

            expect(document.body.style.overflow).toBe("hidden");
            expect(document.documentElement.style.overflow).toBe("hidden");
        });

        it("est restauré à la fermeture, avec la valeur d'origine", async () => {
            document.body.style.overflow = "scroll";
            const wrapper = mountModal();

            await wrapper.setProps({ open: false });

            expect(document.body.style.overflow).toBe("scroll");
        });

        it("est restauré quand le composant est démonté alors qu'il est ouvert", () => {
            const wrapper = mountModal();

            wrapper.unmount();

            expect(document.body.style.overflow).toBe("");
        });
    });

    describe("focus", () => {
        it("va sur le bouton de fermeture à l'ouverture", async () => {
            mountModal();
            await flushPromises();

            expect(document.activeElement).toBe(closeButton());
        });

        it("revient sur le bouton déclencheur à la fermeture", async () => {
            const trigger = document.createElement("button");
            document.body.append(trigger);
            trigger.focus();

            const wrapper = mountModal({ open: false });
            await wrapper.setProps({ open: true });
            await flushPromises();
            expect(document.activeElement).toBe(closeButton());

            await wrapper.setProps({ open: false });
            await flushPromises();

            expect(document.activeElement).toBe(trigger);
        });

        it("revient sur returnFocusEl quand il est fourni", async () => {
            const other = document.createElement("button");
            document.body.append(other);

            const wrapper = mountModal({ open: false, returnFocusEl: other });
            await wrapper.setProps({ open: true });
            await flushPromises();
            await wrapper.setProps({ open: false });
            await flushPromises();

            expect(document.activeElement).toBe(other);
        });

        it("boucle de la fin au début avec Tab", async () => {
            mountModal();
            await flushPromises();
            document.getElementById("deux")!.focus();

            const event = press("Tab");

            expect(event.defaultPrevented).toBe(true);
            expect(document.activeElement).toBe(closeButton());
        });

        it("boucle du début à la fin avec Shift+Tab", async () => {
            mountModal();
            await flushPromises();
            expect(document.activeElement).toBe(closeButton());

            const event = press("Tab", { shiftKey: true });

            expect(event.defaultPrevented).toBe(true);
            expect(document.activeElement).toBe(document.getElementById("deux"));
        });

        it("laisse Tab avancer normalement au milieu de la boîte", async () => {
            mountModal();
            await flushPromises();

            const event = press("Tab");

            expect(event.defaultPrevented).toBe(false);
        });

        it("ramène le focus dans la boîte s'il en est sorti", async () => {
            mountModal();
            await flushPromises();
            const outside = document.createElement("button");
            document.body.append(outside);
            outside.focus();

            const event = press("Tab");

            expect(event.defaultPrevented).toBe(true);
            expect(document.activeElement).toBe(closeButton());
        });
    });

    it("empile : Échap ne ferme que la dernière boîte ouverte", () => {
        const first = mountModal({ title: "Première" });
        const second = mountModal({ title: "Seconde" });

        press("Escape");

        expect(second.emitted("update:open")).toEqual([[false]]);
        expect(first.emitted("update:open")).toBeUndefined();
    });
});