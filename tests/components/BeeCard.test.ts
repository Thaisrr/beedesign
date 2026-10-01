import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeCard } from "beedesign";

describe("BeeCard", () => {
    it("affiche son contenu", () => {
        const wrapper = mount(BeeCard, { slots: { default: "Contenu" } });

        expect(wrapper.text()).toBe("Contenu");
    });

    it("n'a pas d'élévation et un padding md par défaut", () => {
        const wrapper = mount(BeeCard);

        expect(wrapper.classes()).toContain("bd-card--elevation-0");
        expect(wrapper.classes()).toContain("bd-card--padding-md");
    });

    it.each([0, 1, 2, 3] as const)("applique l'élévation %i", (elevation) => {
        const wrapper = mount(BeeCard, { props: { elevation } });

        expect(wrapper.classes()).toContain(`bd-card--elevation-${elevation}`);
    });

    it.each(["none", "sm", "md", "lg"] as const)("applique le padding %s", (padding) => {
        const wrapper = mount(BeeCard, { props: { padding } });

        expect(wrapper.classes()).toContain(`bd-card--padding-${padding}`);
    });

    it("garde les classes ajoutées par le parent", () => {
        const wrapper = mount(BeeCard, { attrs: { class: "ma-classe" } });

        expect(wrapper.classes()).toEqual(expect.arrayContaining(["bd-card", "ma-classe"]));
    });
});