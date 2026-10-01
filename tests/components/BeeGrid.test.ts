import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeGrid } from "beedesign";

const gapClasses = (classes: string[]) => classes.filter((c) => c.startsWith("bd-grid--gap-"));

describe("BeeGrid", () => {
    it("affiche son contenu", () => {
        const wrapper = mount(BeeGrid, {
            props: { columns: 2 },
            slots: { default: "<div>Un</div><div>Deux</div>" },
        });

        expect(wrapper.element.children).toHaveLength(2);
    });

    it.each([1, 3, 12])("transmet %i colonnes au CSS", (columns) => {
        const wrapper = mount(BeeGrid, { props: { columns } });

        expect(wrapper.element.style.getPropertyValue("--bd-grid-columns")).toBe(String(columns));
    });

    it("utilise un gap lg et le mode responsive par défaut", () => {
        const wrapper = mount(BeeGrid, { props: { columns: 3 } });

        expect(wrapper.classes()).toContain("bd-grid--gap-lg");
        expect(wrapper.classes()).toContain("bd-grid--responsive");
    });

    it.each(["none", "sm", "md", "lg"] as const)("accepte le gap %s", (gap) => {
        const wrapper = mount(BeeGrid, { props: { columns: 3, gap } });

        expect(gapClasses(wrapper.classes())).toEqual([`bd-grid--gap-${gap}`]);
    });

    it("lit un gap numérique en pixels, sans classe de gap", () => {
        const wrapper = mount(BeeGrid, { props: { columns: 3, gap: 48 } });

        expect(wrapper.element.style.gap).toBe("48px");
        expect(gapClasses(wrapper.classes())).toEqual([]);
    });

    it("peut désactiver le passage sur une colonne", () => {
        const wrapper = mount(BeeGrid, { props: { columns: 3, responsive: false } });

        expect(wrapper.classes()).not.toContain("bd-grid--responsive");
    });

    it("met à jour les colonnes quand la prop change", async () => {
        const wrapper = mount(BeeGrid, { props: { columns: 2 } });

        await wrapper.setProps({ columns: 4 });

        expect(wrapper.element.style.getPropertyValue("--bd-grid-columns")).toBe("4");
    });
});