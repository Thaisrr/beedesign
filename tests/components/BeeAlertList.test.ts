import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { BeeAlertList, useAlert } from "@thaisrr/beedesign";

const alerts = () => [...document.body.querySelectorAll<HTMLElement>(".bd-alert")];
const messages = () =>
    alerts().map((el) => el.querySelector(".bd-alert__content")?.textContent?.trim());
const list = () => document.body.querySelector<HTMLElement>(".bd-alert-list");

function mountList(props: Record<string, unknown> = {}) {
    return mount(BeeAlertList, { props, attachTo: document.body });
}

describe("BeeAlertList", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        useAlert().clear();
        vi.useRealTimers();
    });

    it("n'affiche rien tant qu'aucune alerte n'est déclenchée", () => {
        mountList();

        expect(alerts()).toHaveLength(0);
    });

    it("se téléporte dans body", async () => {
        const wrapper = mountList();
        useAlert().success("Enregistré");
        await nextTick();

        expect(list()).not.toBeNull();
        expect(wrapper.element.contains(list())).toBe(false);
    });

    describe("avec useAlert", () => {
        it.each([
            ["success", "status"],
            ["error", "alert"],
            ["warning", "alert"],
            ["info", "status"],
        ] as const)("affiche une alerte %s avec le rôle %s", async (type, role) => {
            mountList();

            useAlert()[type]("Message");
            await nextTick();

            expect(alerts()).toHaveLength(1);
            expect(messages()[0]).toBe("Message");
            expect(alerts()[0].classList.contains(`bd-alert--${type}`)).toBe(true);
            expect(alerts()[0].getAttribute("role")).toBe(role);
        });

        it("empile les alertes dans l'ordre d'arrivée", async () => {
            mountList();
            const { success, error, info } = useAlert();

            success("Première");
            error("Deuxième");
            info("Troisième");
            await nextTick();

            expect(messages()).toEqual(["Première", "Deuxième", "Troisième"]);
        });

        it("permet de fermer une alerte avec sa croix", async () => {
            mountList();
            const { success } = useAlert();
            success("A");
            success("B");
            await nextTick();

            alerts()[0].querySelector<HTMLButtonElement>(".bd-alert__close")!.click();
            await nextTick();

            expect(messages()).toEqual(["B"]);
        });

        it("dismiss ferme seulement l'alerte dont on donne l'id", async () => {
            mountList();
            const { success, dismiss } = useAlert();
            const first = success("A");
            success("B");
            await nextTick();

            dismiss(first);
            await nextTick();

            expect(messages()).toEqual(["B"]);
        });

        it("clear ferme toutes les alertes", async () => {
            mountList();
            const { success, error, clear } = useAlert();
            success("A");
            error("B");
            await nextTick();

            clear();
            await nextTick();

            expect(alerts()).toHaveLength(0);
        });
    });

    describe("durée", () => {
        it("se ferme seule au bout de 5 secondes par défaut", async () => {
            mountList();
            useAlert().success("Enregistré");
            await nextTick();

            vi.advanceTimersByTime(4999);
            await nextTick();
            expect(alerts()).toHaveLength(1);

            vi.advanceTimersByTime(1);
            await nextTick();
            expect(alerts()).toHaveLength(0);
        });

        it("respecte une durée personnalisée", async () => {
            mountList();
            useAlert().success("Rapide", { duration: 1000 });
            await nextTick();

            vi.advanceTimersByTime(1000);
            await nextTick();

            expect(alerts()).toHaveLength(0);
        });

        it("garde l'alerte avec duration: 0", async () => {
            mountList();
            useAlert().error("Persistante", { duration: 0 });
            await nextTick();

            vi.advanceTimersByTime(10 * 60_000);
            await nextTick();

            expect(alerts()).toHaveLength(1);
        });
    });

    describe("position", () => {
        it("est en bas au centre par défaut", async () => {
            mountList();
            useAlert().info("Info");
            await nextTick();

            expect(list()?.classList.contains("bd-alert-list--bottom-center")).toBe(true);
        });

        it.each([
            "top-left",
            "top-center",
            "top-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
        ] as const)("accepte position=%s", (position) => {
            mountList({ position });

            expect(list()?.classList.contains(`bd-alert-list--${position}`)).toBe(true);
        });
    });
});