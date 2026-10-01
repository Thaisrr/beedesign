import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useFocusTrap } from "@thaisrr/beedesign";

interface HarnessProps {
    active: boolean;
    onEscape?: () => void;
    focusSecond?: boolean;
    returnFocus?: HTMLElement;
    empty?: boolean;
}

const Harness = defineComponent({
    props: {
        active: { type: Boolean, default: false },
        onEscape: { type: Function, default: undefined },
        focusSecond: { type: Boolean, default: false },
        returnFocus: { type: Object, default: undefined },
        empty: { type: Boolean, default: false },
    },
    setup(props: HarnessProps) {
        const container = ref<HTMLElement | null>(null);
        const second = ref<HTMLElement | null>(null);

        useFocusTrap({
            container,
            active: () => props.active,
            initialFocus: props.focusSecond ? second : undefined,
            returnFocus: () => props.returnFocus,
            onEscape: props.onEscape,
        });

        return () =>
            h(
                "div",
                { ref: container, tabindex: -1, id: "piege" },
                props.empty
                    ? [h("p", "Rien de focusable")]
                    : [
                        h("button", { id: "a" }, "A"),
                        h("button", { id: "b", ref: second }, "B"),
                        h("button", { id: "c" }, "C"),
                        h("button", { id: "invisible", hidden: true }, "Caché"),
                    ],
            );
    },
});

const press = (key: string, options: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...options });
    document.dispatchEvent(event);
    return event;
};

const mountTrap = (props: Partial<HarnessProps> = {}) =>
    mount(Harness, { props: { active: true, ...props }, attachTo: document.body });

describe("useFocusTrap", () => {
    describe("focus initial", () => {
        it("va sur le premier élément focusable", async () => {
            mountTrap();
            await flushPromises();

            expect(document.activeElement?.id).toBe("a");
        });

        it("va sur initialFocus quand il est fourni", async () => {
            mountTrap({ focusSecond: true });
            await flushPromises();

            expect(document.activeElement?.id).toBe("b");
        });

        it("se rabat sur le conteneur s'il n'y a rien de focusable", async () => {
            mountTrap({ empty: true });
            await flushPromises();

            expect(document.activeElement?.id).toBe("piege");
        });

        it("ne touche pas au focus tant qu'il est inactif", async () => {
            const outside = document.createElement("button");
            document.body.append(outside);
            outside.focus();

            mountTrap({ active: false });
            await flushPromises();

            expect(document.activeElement).toBe(outside);
        });
    });

    describe("clavier", () => {
        it("boucle de la fin au début avec Tab", async () => {
            mountTrap();
            await flushPromises();
            document.getElementById("c")!.focus();

            const event = press("Tab");

            expect(event.defaultPrevented).toBe(true);
            expect(document.activeElement?.id).toBe("a");
        });

        it("boucle du début à la fin avec Shift+Tab", async () => {
            mountTrap();
            await flushPromises();

            const event = press("Tab", { shiftKey: true });

            expect(event.defaultPrevented).toBe(true);
            expect(document.activeElement?.id).toBe("c");
        });

        it("ignore les éléments masqués : le dernier élément visible est 'c', pas 'invisible'", async () => {
            mountTrap();
            await flushPromises();
            document.getElementById("c")!.focus();

            press("Tab");

            expect(document.activeElement?.id).toBe("a");
        });

        it("laisse le navigateur gérer Tab quand le focus est au milieu", async () => {
            mountTrap();
            await flushPromises();
            document.getElementById("b")!.focus();

            expect(press("Tab").defaultPrevented).toBe(false);
        });

        it("ramène le focus dedans s'il s'est échappé, au premier élément avec Tab", async () => {
            mountTrap();
            await flushPromises();
            const outside = document.createElement("button");
            document.body.append(outside);
            outside.focus();

            press("Tab");

            expect(document.activeElement?.id).toBe("a");
        });

        it("ramène le focus dedans s'il s'est échappé, au dernier élément avec Shift+Tab", async () => {
            mountTrap();
            await flushPromises();
            const outside = document.createElement("button");
            document.body.append(outside);
            outside.focus();

            press("Tab", { shiftKey: true });

            expect(document.activeElement?.id).toBe("c");
        });

        it("garde le focus sur le conteneur quand il n'y a rien de focusable", async () => {
            mountTrap({ empty: true });
            await flushPromises();

            const event = press("Tab");

            expect(event.defaultPrevented).toBe(true);
            expect(document.activeElement?.id).toBe("piege");
        });

        it("ignore les autres touches", async () => {
            mountTrap();
            await flushPromises();

            expect(press("a").defaultPrevented).toBe(false);
            expect(press("Enter").defaultPrevented).toBe(false);
        });
    });

    describe("Échap", () => {
        it("appelle onEscape et empêche l'action par défaut", async () => {
            const onEscape = vi.fn();
            mountTrap({ onEscape });
            await flushPromises();

            const event = press("Escape");

            expect(onEscape).toHaveBeenCalledTimes(1);
            expect(event.defaultPrevented).toBe(true);
        });

        it("ne fait rien sans onEscape", async () => {
            mountTrap();
            await flushPromises();

            expect(press("Escape").defaultPrevented).toBe(false);
        });

        it("n'écoute plus une fois désactivé", async () => {
            const onEscape = vi.fn();
            const wrapper = mountTrap({ onEscape });
            await flushPromises();

            await wrapper.setProps({ active: false });
            press("Escape");

            expect(onEscape).not.toHaveBeenCalled();
        });

        it("n'écoute plus une fois démonté", async () => {
            const onEscape = vi.fn();
            const wrapper = mountTrap({ onEscape });
            await flushPromises();

            wrapper.unmount();
            press("Escape");

            expect(onEscape).not.toHaveBeenCalled();
        });
    });

    describe("retour du focus", () => {
        it("rend le focus à l'élément qui l'avait avant l'activation", async () => {
            const trigger = document.createElement("button");
            document.body.append(trigger);
            trigger.focus();
            const wrapper = mountTrap({ active: false });

            await wrapper.setProps({ active: true });
            await flushPromises();
            expect(document.activeElement?.id).toBe("a");

            await wrapper.setProps({ active: false });
            await flushPromises();

            expect(document.activeElement).toBe(trigger);
        });

        it("préfère returnFocus quand il est fourni", async () => {
            const other = document.createElement("button");
            document.body.append(other);
            const wrapper = mountTrap({ active: false, returnFocus: other });

            await wrapper.setProps({ active: true });
            await flushPromises();
            await wrapper.setProps({ active: false });
            await flushPromises();

            expect(document.activeElement).toBe(other);
        });

        it("ne plante pas si l'élément à refocaliser a quitté la page", async () => {
            const trigger = document.createElement("button");
            document.body.append(trigger);
            trigger.focus();
            const wrapper = mountTrap({ active: false });

            await wrapper.setProps({ active: true });
            await flushPromises();
            trigger.remove();

            await expect(
                (async () => {
                    await wrapper.setProps({ active: false });
                    await flushPromises();
                })(),
            ).resolves.toBeUndefined();
        });
    });

    describe("pièges empilés", () => {
        it("seul le dernier piège ouvert réagit à Échap", async () => {
            const first = vi.fn();
            const second = vi.fn();
            mountTrap({ onEscape: first });
            mountTrap({ onEscape: second });
            await flushPromises();

            press("Escape");

            expect(second).toHaveBeenCalledTimes(1);
            expect(first).not.toHaveBeenCalled();
        });

        it("le piège du dessous reprend la main quand celui du dessus se ferme", async () => {
            const first = vi.fn();
            const second = vi.fn();
            mountTrap({ onEscape: first });
            const top = mountTrap({ onEscape: second });
            await flushPromises();

            await top.setProps({ active: false });
            press("Escape");

            expect(first).toHaveBeenCalledTimes(1);
            expect(second).not.toHaveBeenCalled();
        });
    });
});