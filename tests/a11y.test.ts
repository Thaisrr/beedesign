import { mount } from "@vue/test-utils";
import axe from "axe-core";
import { h } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import {
    BeeAlert,
    BeeAlertList,
    BeeButton,
    BeeCard,
    BeeDrawer,
    BeeFlex,
    BeeGrid,
    BeeModal,
    BeeTag,
    useAlert,
} from "@thaisrr/beedesign";

/**
 * Lance axe-core sur la page de test et retourne les violations WCAG 2.x A et AA,
 * plus les bonnes pratiques d'axe (qui incluent par exemple le nom des boîtes de dialogue).
 *
 * Deux règles sont désactivées parce que jsdom ne peut pas les évaluer :
 * - color-contrast : jsdom ne calcule ni couleurs ni mise en page. Le contraste des
 *   tokens doit se vérifier dans un vrai navigateur ou avec un outil de design.
 * - region : exige que tout le contenu soit dans un repère, ce qui n'a pas de sens
 *   pour un composant isolé.
 */
async function violations() {
    const results = await axe.run(document.body, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
        rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });

    return results.violations.map(
        (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`,
    );
}

const slots = (text: string) => ({ default: () => text });

describe("accessibilité (axe-core)", () => {
    afterEach(() => {
        useAlert().clear();
    });

    it("détecte bien un problème : un bouton sans nom accessible est signalé", async () => {
        // Garde-fou : prouve que ces tests sont capables d'échouer.
        mount({ render: () => h("button") }, { attachTo: document.body });

        expect(await violations()).not.toEqual([]);
    });

    describe("composants simples", () => {
        it.each(["primary", "secondary", "ghost"] as const)("BeeButton %s", async (variant) => {
            mount(BeeButton, { props: { variant }, slots: slots("Enregistrer"), attachTo: document.body });

            expect(await violations()).toEqual([]);
        });

        it("BeeButton désactivé et en chargement", async () => {
            mount(
                {
                    render: () => [
                        h(BeeButton, { disabled: true }, slots("Indisponible")),
                        h(BeeButton, { loading: true }, slots("Envoi")),
                    ],
                },
                { attachTo: document.body },
            );

            expect(await violations()).toEqual([]);
        });

        it("BeeCard, BeeTag, BeeFlex et BeeGrid", async () => {
            mount(
                {
                    render: () =>
                        h(BeeFlex, null, () => [
                            h(BeeCard, { elevation: 2 }, slots("Carte")),
                            h(BeeTag, { rounded: true }, slots("Tag")),
                            h(BeeGrid, { columns: 2 }, () => [h("p", "Un"), h("p", "Deux")]),
                        ]),
                },
                { attachTo: document.body },
            );

            expect(await violations()).toEqual([]);
        });
    });

    describe("alertes", () => {
        it.each(["success", "error", "warning", "info"] as const)("BeeAlert %s", async (type) => {
            mount(BeeAlert, { props: { type, closable: true }, slots: slots("Message"), attachTo: document.body });

            expect(await violations()).toEqual([]);
        });

        it("BeeAlertList avec une alerte de chaque type", async () => {
            mount(BeeAlertList, { attachTo: document.body });
            const { success, error, warning, info } = useAlert();
            success("Enregistré");
            error("Échec");
            warning("Attention");
            info("Information");
            await Promise.resolve();

            expect(await violations()).toEqual([]);
        });
    });

    describe("superpositions", () => {
        it("BeeModal ouverte", async () => {
            mount(BeeModal, {
                props: { title: "Supprimer ?", open: true },
                slots: { default: () => h("p", "Cette action est irréversible.") },
                attachTo: document.body,
            });

            expect(await violations()).toEqual([]);
        });

        it("BeeModal avec titre masqué", async () => {
            mount(BeeModal, {
                props: { title: "Menu", open: true, hideTitle: true },
                slots: { default: () => h("nav", { "aria-label": "Principal" }, [h("a", { href: "/" }, "Accueil")]) },
                attachTo: document.body,
            });

            expect(await violations()).toEqual([]);
        });

        it.each(["left", "right", "top", "bottom"] as const)("BeeDrawer %s ouvert", async (side) => {
            mount(BeeDrawer, {
                props: { title: "Filtres", open: true, side },
                slots: { default: () => h("p", "Contenu") },
                attachTo: document.body,
            });

            expect(await violations()).toEqual([]);
        });
    });
});