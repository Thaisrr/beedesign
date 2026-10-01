import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BeeAlert } from "beedesign";

describe("BeeAlert", () => {
    it("affiche son contenu", () => {
        const wrapper = mount(BeeAlert, { slots: { default: "Enregistré" } });

        expect(wrapper.text()).toBe("Enregistré");
    });

    it("est de type info par défaut", () => {
        expect(mount(BeeAlert).classes()).toContain("bd-alert--info");
    });

    it.each(["success", "error", "warning", "info"] as const)(
        "applique la classe du type %s",
        (type) => {
            expect(mount(BeeAlert, { props: { type } }).classes()).toContain(`bd-alert--${type}`);
        },
    );

    describe("rôle ARIA", () => {
        it.each(["error", "warning"] as const)("%s est annoncé tout de suite (alert)", (type) => {
            expect(mount(BeeAlert, { props: { type } }).attributes("role")).toBe("alert");
        });

        it.each(["success", "info"] as const)("%s est annoncé poliment (status)", (type) => {
            expect(mount(BeeAlert, { props: { type } }).attributes("role")).toBe("status");
        });
    });

    it("n'utilise pas la couleur seule : chaque type a une icône masquée aux lecteurs d'écran", () => {
        for (const type of ["success", "error", "warning", "info"] as const) {
            const icon = mount(BeeAlert, { props: { type } }).find(".bd-alert__icon");

            expect(icon.exists()).toBe(true);
            expect(icon.attributes("aria-hidden")).toBe("true");
        }
    });

    describe("bouton de fermeture", () => {
        it("est absent par défaut", () => {
            expect(mount(BeeAlert).find("button").exists()).toBe(false);
        });

        it("apparaît avec closable et émet close", async () => {
            const wrapper = mount(BeeAlert, { props: { closable: true } });

            await wrapper.find("button").trigger("click");

            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        it("a un nom accessible personnalisable", () => {
            const wrapper = mount(BeeAlert, { props: { closable: true, closeLabel: "Dismiss" } });

            expect(wrapper.find("button").text()).toContain("Dismiss");
        });
    });

    describe("fermeture automatique", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("ne se ferme jamais sans duration", () => {
            const wrapper = mount(BeeAlert);

            vi.advanceTimersByTime(60_000);

            expect(wrapper.emitted("close")).toBeUndefined();
        });

        it("émet close une fois la durée écoulée, pas avant", () => {
            const wrapper = mount(BeeAlert, { props: { duration: 3000 } });

            vi.advanceTimersByTime(2999);
            expect(wrapper.emitted("close")).toBeUndefined();

            vi.advanceTimersByTime(1);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        it("est suspendue tant que l'alerte est survolée", async () => {
            const wrapper = mount(BeeAlert, { props: { duration: 3000 } });

            vi.advanceTimersByTime(1000);
            await wrapper.trigger("mouseenter");
            vi.advanceTimersByTime(60_000);

            expect(wrapper.emitted("close")).toBeUndefined();
        });

        it("reprend avec le temps restant quand le survol s'arrête", async () => {
            const wrapper = mount(BeeAlert, { props: { duration: 3000 } });

            vi.advanceTimersByTime(1000);
            await wrapper.trigger("mouseenter");
            vi.advanceTimersByTime(10_000);
            await wrapper.trigger("mouseleave");

            vi.advanceTimersByTime(1999);
            expect(wrapper.emitted("close")).toBeUndefined();

            vi.advanceTimersByTime(1);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        it("est suspendue tant que l'alerte a le focus", async () => {
            const wrapper = mount(BeeAlert, { props: { duration: 3000, closable: true } });

            await wrapper.trigger("focusin");
            vi.advanceTimersByTime(60_000);
            expect(wrapper.emitted("close")).toBeUndefined();

            await wrapper.trigger("focusout");
            vi.advanceTimersByTime(3000);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        it("reste suspendue si le survol s'arrête alors que le focus est encore dedans", async () => {
            const wrapper = mount(BeeAlert, { props: { duration: 3000, closable: true } });

            await wrapper.trigger("mouseenter");
            await wrapper.trigger("focusin");
            await wrapper.trigger("mouseleave");
            vi.advanceTimersByTime(60_000);

            expect(wrapper.emitted("close")).toBeUndefined();
        });

        it("n'émet plus rien une fois démontée", () => {
            const wrapper = mount(BeeAlert, { props: { duration: 3000 } });

            wrapper.unmount();
            vi.advanceTimersByTime(10_000);

            expect(wrapper.emitted("close")).toBeUndefined();
        });
    });
});