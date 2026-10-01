import { afterEach, describe, expect, it } from "vitest";
import { useAlert } from "@thaisrr/beedesign";
import { alertState } from "../../src/composables/useAlert";

describe("useAlert", () => {
    afterEach(() => {
        useAlert().clear();
    });

    it("ajoute une alerte avec son type, son message et une durée de 5 secondes", () => {
        useAlert().success("Enregistré");

        expect(alertState.value).toEqual([
            expect.objectContaining({ type: "success", message: "Enregistré", duration: 5000 }),
        ]);
    });

    it.each(["success", "error", "info", "warning"] as const)("%s crée une alerte du bon type", (type) => {
        useAlert()[type]("Message");

        expect(alertState.value[0].type).toBe(type);
    });

    it("accepte une durée personnalisée, y compris 0", () => {
        const { success, error } = useAlert();

        success("Court", { duration: 1000 });
        error("Persistante", { duration: 0 });

        expect(alertState.value.map((a) => a.duration)).toEqual([1000, 0]);
    });

    it("retourne un id unique pour chaque alerte", () => {
        const { success } = useAlert();

        const ids = [success("A"), success("B"), success("C")];

        expect(new Set(ids).size).toBe(3);
        expect(alertState.value.map((a) => a.id)).toEqual(ids);
    });

    it("dismiss retire seulement l'alerte demandée", () => {
        const { success, dismiss } = useAlert();
        const first = success("A");
        success("B");

        dismiss(first);

        expect(alertState.value.map((a) => a.message)).toEqual(["B"]);
    });

    it("dismiss ne fait rien avec un id inconnu", () => {
        const { success, dismiss } = useAlert();
        success("A");

        dismiss(99999);

        expect(alertState.value).toHaveLength(1);
    });

    it("clear retire tout", () => {
        const { success, error, clear } = useAlert();
        success("A");
        error("B");

        clear();

        expect(alertState.value).toEqual([]);
    });

    it("partage le même état entre tous les appels", () => {
        useAlert().success("Depuis un composant");
        useAlert().error("Depuis un autre");

        expect(alertState.value).toHaveLength(2);
    });
});