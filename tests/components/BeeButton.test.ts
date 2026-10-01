import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeButton } from "@thaisrr/beedesign";

describe("BeeButton", () => {
    it("affiche son contenu avec la variante primary par défaut", () => {
        const wrapper = mount(BeeButton, { slots: { default: "Enregistrer" } });

        expect(wrapper.text()).toBe("Enregistrer");
        expect(wrapper.classes()).toContain("bd-button--primary");
    });

    it("est de type button par défaut, pour ne pas soumettre un formulaire par accident", () => {
        const wrapper = mount(BeeButton);

        expect(wrapper.attributes("type")).toBe("button");
    });

    it("transmet le type demandé", () => {
        const wrapper = mount(BeeButton, { props: { type: "submit" } });

        expect(wrapper.attributes("type")).toBe("submit");
    });

    it.each(["primary", "secondary", "ghost"] as const)(
        "applique la classe de la variante %s",
        (variant) => {
            const wrapper = mount(BeeButton, { props: { variant } });

            expect(wrapper.classes()).toContain(`bd-button--${variant}`);
        },
    );

    it("passe en forme de pilule avec rounded", () => {
        expect(mount(BeeButton).classes()).not.toContain("bd-button--rounded");
        expect(mount(BeeButton, { props: { rounded: true } }).classes()).toContain(
            "bd-button--rounded",
        );
    });

    it("émet click au clic", async () => {
        const wrapper = mount(BeeButton);

        await wrapper.trigger("click");

        expect(wrapper.emitted("click")).toHaveLength(1);
    });

    it("est désactivé et n'émet pas click avec disabled", async () => {
        const wrapper = mount(BeeButton, { props: { disabled: true } });

        await wrapper.trigger("click");

        expect(wrapper.element.disabled).toBe(true);
        expect(wrapper.emitted("click")).toBeUndefined();
    });

    describe("pendant le chargement", () => {
        it("est occupé, désactivé, et affiche un spinner masqué aux lecteurs d'écran", () => {
            const wrapper = mount(BeeButton, { props: { loading: true } });

            expect(wrapper.attributes("aria-busy")).toBe("true");
            expect(wrapper.element.disabled).toBe(true);
            expect(wrapper.find(".bd-button__spinner").attributes("aria-hidden")).toBe("true");
        });

        it("n'émet pas click", async () => {
            const wrapper = mount(BeeButton, { props: { loading: true } });

            await wrapper.trigger("click");

            expect(wrapper.emitted("click")).toBeUndefined();
        });

        it("garde le libellé dans le DOM, pour que le bouton conserve sa largeur", () => {
            const wrapper = mount(BeeButton, {
                props: { loading: true },
                slots: { default: "Envoi" },
            });

            expect(wrapper.text()).toContain("Envoi");
        });
    });

    it("n'a pas de spinner hors chargement", () => {
        const wrapper = mount(BeeButton);

        expect(wrapper.find(".bd-button__spinner").exists()).toBe(false);
        expect(wrapper.attributes("aria-busy")).toBe("false");
    });
});