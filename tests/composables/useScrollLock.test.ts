import { mount } from "@vue/test-utils";
import { defineComponent, h, ref, type Ref } from "vue";
import { describe, expect, it } from "vitest";
import { useScrollLock } from "beedesign";

const Harness = defineComponent({
    props: { locked: { type: Boolean, default: false } },
    setup(props) {
        useScrollLock(() => props.locked);
        return () => h("div");
    },
});

const overflow = () => [document.documentElement.style.overflow, document.body.style.overflow];

describe("useScrollLock", () => {
    it("ne change rien tant que ce n'est pas verrouillé", () => {
        mount(Harness);

        expect(overflow()).toEqual(["", ""]);
    });

    it("bloque html et body quand locked passe à true, et les libère à false", async () => {
        const wrapper = mount(Harness);

        await wrapper.setProps({ locked: true });
        expect(overflow()).toEqual(["hidden", "hidden"]);

        await wrapper.setProps({ locked: false });
        expect(overflow()).toEqual(["", ""]);
    });

    it("bloque tout de suite si locked vaut déjà true au montage", () => {
        mount(Harness, { props: { locked: true } });

        expect(overflow()).toEqual(["hidden", "hidden"]);
    });

    it("restaure les valeurs d'origine, pas une chaîne vide", async () => {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "scroll";
        const wrapper = mount(Harness);

        await wrapper.setProps({ locked: true });
        await wrapper.setProps({ locked: false });

        expect(overflow()).toEqual(["auto", "scroll"]);
    });

    it("libère au démontage si le composant était verrouillé", () => {
        const wrapper = mount(Harness, { props: { locked: true } });

        wrapper.unmount();

        expect(overflow()).toEqual(["", ""]);
    });

    describe("avec plusieurs verrous (modale + drawer)", () => {
        it("reste bloqué tant qu'un verrou est actif", async () => {
            const a = mount(Harness, { props: { locked: true } });
            const b = mount(Harness, { props: { locked: true } });

            await a.setProps({ locked: false });
            expect(overflow()).toEqual(["hidden", "hidden"]);

            await b.setProps({ locked: false });
            expect(overflow()).toEqual(["", ""]);
        });

        it("restaure la valeur d'origine du premier verrou, pas 'hidden'", async () => {
            document.body.style.overflow = "scroll";
            const a = mount(Harness, { props: { locked: true } });
            const b = mount(Harness, { props: { locked: true } });

            a.unmount();
            b.unmount();

            expect(document.body.style.overflow).toBe("scroll");
        });

        it("ne compte pas deux fois un même verrou", async () => {
            const a = mount(Harness, { props: { locked: true } });
            const b = mount(Harness, { props: { locked: true } });
            await a.setProps({ locked: true });

            a.unmount();
            b.unmount();

            expect(overflow()).toEqual(["", ""]);
        });
    });

    it("accepte une ref", async () => {
        const locked: Ref<boolean> = ref(false);
        mount(
            defineComponent({
                setup() {
                    useScrollLock(locked);
                    return () => h("div");
                },
            }),
        );

        locked.value = true;
        await Promise.resolve();

        expect(overflow()).toEqual(["hidden", "hidden"]);
    });
});