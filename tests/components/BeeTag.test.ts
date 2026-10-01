import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { BeeTag } from "beedesign";

describe("BeeTag", () => {
    it("affiche son libellé", () => {
        const wrapper = mount(BeeTag, { slots: { default: "Vue 3" } });

        expect(wrapper.text()).toBe("Vue 3");
    });

    it("n'est pas interactif : c'est un simple span", () => {
        const wrapper = mount(BeeTag);

        expect(wrapper.element.tagName).toBe("SPAN");
    });

    it("devient une pilule avec rounded", () => {
        expect(mount(BeeTag).classes()).not.toContain("bd-tag--rounded");
        expect(mount(BeeTag, { props: { rounded: true } }).classes()).toContain("bd-tag--rounded");
    });
});