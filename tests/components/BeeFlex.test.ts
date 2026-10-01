import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeFlex } from "@thaisrr/beedesign";

const gapClasses = (classes: string[]) => classes.filter((c) => c.startsWith("bd-flex--gap-"));

describe("BeeFlex", () => {
    it("affiche son contenu", () => {
        const wrapper = mount(BeeFlex, { slots: { default: "<span>Un</span><span>Deux</span>" } });

        expect(wrapper.findAll("span")).toHaveLength(2);
    });

    it("applique ses valeurs par défaut", () => {
        const wrapper = mount(BeeFlex);

        expect(wrapper.classes()).toEqual(
            expect.arrayContaining([
                "bd-flex--direction-row",
                "bd-flex--justify-center",
                "bd-flex--align-center",
                "bd-flex--gap-lg",
                "bd-flex--responsive",
            ]),
        );
    });

    it.each(["flex-start", "flex-end", "center", "space-between"] as const)(
        "applique justify=%s",
        (justify) => {
            expect(mount(BeeFlex, { props: { justify } }).classes()).toContain(
                `bd-flex--justify-${justify}`,
            );
        },
    );

    it.each(["flex-start", "flex-end", "center", "stretch"] as const)(
        "applique align=%s",
        (align) => {
            expect(mount(BeeFlex, { props: { align } }).classes()).toContain(`bd-flex--align-${align}`);
        },
    );

    it("applique direction=column", () => {
        const wrapper = mount(BeeFlex, { props: { direction: "column" } });

        expect(wrapper.classes()).toContain("bd-flex--direction-column");
        expect(wrapper.classes()).not.toContain("bd-flex--direction-row");
    });

    describe("gap", () => {
        it.each(["none", "sm", "md", "lg"] as const)("accepte le mot-clé %s", (gap) => {
            const wrapper = mount(BeeFlex, { props: { gap } });

            expect(gapClasses(wrapper.classes())).toEqual([`bd-flex--gap-${gap}`]);
        });

        it("lit un nombre en pixels, sans classe de gap", () => {
            const wrapper = mount(BeeFlex, { props: { gap: 24 } });

            expect(wrapper.element.style.gap).toBe("24px");
            expect(gapClasses(wrapper.classes())).toEqual([]);
        });

        it("accepte 0 comme un nombre, pas comme une valeur absente", () => {
            const wrapper = mount(BeeFlex, { props: { gap: 0 } });

            expect(wrapper.element.style.gap).toBe("0px");
        });
    });

    it("peut désactiver le passage en colonne sur petit écran", () => {
        expect(mount(BeeFlex).classes()).toContain("bd-flex--responsive");
        expect(mount(BeeFlex, { props: { responsive: false } }).classes()).not.toContain(
            "bd-flex--responsive",
        );
    });
});