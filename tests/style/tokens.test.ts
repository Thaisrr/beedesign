import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Lecture directe des fichiers : l'import « ?raw » d'un fichier CSS ne renvoie pas
// son contenu dans l'environnement de test.
const src = resolve(__dirname, "../../src");
const tokensCss = readFileSync(resolve(src, "styles/tokens.css"), "utf8");
const components: Record<string, string> = Object.fromEntries(
    readdirSync(resolve(src, "components"))
        .filter((file) => file.endsWith(".vue"))
        .map((file) => [file, readFileSync(resolve(src, "components", file), "utf8")]),
);

const withoutComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const styleOf = (source: string) => withoutComments(source.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? "");
const names = (css: string) => new Set([...css.matchAll(/(--bd-[\w-]+)\s*:/g)].map((m) => m[1]));

// Le premier bloc de tokens.css : le thème clair, qui définit tous les tokens.
const rootBlock = tokensCss.match(/:root\s*\{([\s\S]*?)\n\}/)![1];
const darkBlock = tokensCss.match(/\.dark[^{]*\{([\s\S]*?)\n\}/)![1];
const tokens = names(rootBlock);

function valueOf(token: string): string {
    const match = rootBlock.match(new RegExp(`${token}\\s*:\\s*([^;]+);`));
    if (!match) throw new Error(`Token absent : ${token}`);
    return match[1].trim();
}
const pixels = (token: string) => Number.parseFloat(valueOf(token));

describe("tokens CSS", () => {
    it("définit les tokens de taille, de bordure et de focus", () => {
        for (const token of [
            "--bd-control-height",
            "--bd-close-size",
            "--bd-overlay-width",
            "--bd-border-width",
            "--bd-border-width-strong",
            "--bd-alert-stripe-width",
            "--bd-focus-ring-width",
            "--bd-focus-ring-offset",
            "--bd-button-edge",
        ]) {
            expect(tokens.has(token), token).toBe(true);
        }
    });

    it("exprime les espacements, arrondis et tailles en pixels", () => {
        for (const token of [
            "--bd-space-sm",
            "--bd-space-md",
            "--bd-space-lg",
            "--bd-radius-sm",
            "--bd-radius-md",
            "--bd-control-height",
            "--bd-close-size",
            "--bd-overlay-width",
            "--bd-border-width",
            "--bd-border-width-strong",
            "--bd-alert-stripe-width",
            "--bd-focus-ring-width",
            "--bd-focus-ring-offset",
            "--bd-button-edge",
        ]) {
            expect(valueOf(token), token).toMatch(/^\d+(\.\d+)?px$/);
        }
    });

    it("garde les tailles de police en rem, pour suivre le réglage du navigateur", () => {
        for (const token of ["--bd-font-size-sm", "--bd-font-size-md", "--bd-font-size-lg"]) {
            expect(valueOf(token), token).toMatch(/rem$/);
        }
    });

    it("n'a que des valeurs par défaut accessibles (WCAG 2.2)", () => {
        expect(pixels("--bd-control-height")).toBeGreaterThanOrEqual(44);
        expect(pixels("--bd-close-size")).toBeGreaterThanOrEqual(24); // 2.5.8 : cible minimale
        expect(pixels("--bd-focus-ring-width")).toBeGreaterThanOrEqual(2); // 2.4.13 : indicateur de focus
    });

    it("ne redéfinit en mode sombre que des tokens qui existent", () => {
        const unknown = [...names(darkBlock)].filter((token) => !tokens.has(token));
        expect(unknown).toEqual([]);
    });
});

describe("styles des composants", () => {
    const entries = Object.entries(components).map(([path, source]) => ({
        name: path.replace(".vue", ""),
        source,
        style: styleOf(source),
    }));

    it("trouve les composants", () => {
        expect(entries.length).toBeGreaterThanOrEqual(9);
    });

    it.each(entries.map((e) => [e.name, e] as const))(
        "%s n'utilise que des tokens définis ou ses propres variables",
        (_name, { source, style }) => {
            // Les variables propres à un composant (--bd-alert-color, --bd-grid-columns...) sont
            // déclarées dans son CSS ou posées en style en ligne par son script.
            const own = new Set([
                ...names(style),
                ...[...source.matchAll(/["'](--bd-[\w-]+)["']\s*:/g)].map((m) => m[1]),
            ]);
            const used = [...style.matchAll(/var\((--bd-[\w-]+)/g)].map((m) => m[1]);
            const missing = [...new Set(used)].filter((token) => !tokens.has(token) && !own.has(token));
            expect(missing).toEqual([]);
        },
    );

    it.each(entries.map((e) => [e.name, e] as const))(
        "%s n'écrit aucune dimension en rem",
        (_name, { style }) => {
            expect(style.match(/(?<![\w-])\d*\.?\d+rem\b/g) ?? []).toEqual([]);
        },
    );
});