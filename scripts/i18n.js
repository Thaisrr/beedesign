// Script à lancer UNE fois : génère docs/examples/en/ à partir des exemples français.
// Ensuite, les fichiers anglais sont de vrais fichiers que tu peux retoucher à la main.
//
//   node scripts/i18n-examples.mjs
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const SOURCE = "docs/examples";
const TARGET = "docs/examples/en";

// français -> anglais
const DICTIONARY = {
    // Boutons
    "Enregistrer": "Save",
    "Annuler": "Cancel",
    "En savoir plus": "Learn more",
    "Envoi…": "Sending…",
    "Indisponible": "Unavailable",
    "Supprimer ce brouillon ?": "Delete this draft?",
    "Supprimer le brouillon": "Delete the draft",
    "Supprimer": "Delete",
    "Appliquer": "Apply",
    "Tout fermer": "Close all",
    "Succès": "Success",
    "Erreur": "Error",
    "Avertissement": "Warning",
    "Afficher à nouveau": "Show again",

    // Alertes
    "Votre brouillon a été enregistré.": "Your draft has been saved.",
    "L'envoi a échoué. Réessayez dans un instant.": "Sending failed. Please try again in a moment.",
    "L\\'envoi a échoué. Réessayez dans un instant.": "Sending failed. Please try again in a moment.",
    "Votre session expire dans 5 minutes.": "Your session expires in 5 minutes.",
    "Une nouvelle version est disponible.": "A new version is available.",
    "Cette alerte se ferme avec la croix.": "This alert closes with the X button.",
    "Brouillon enregistré": "Draft saved",
    "Haut gauche": "Top left",
    "Haut centre": "Top center",
    "Haut droite": "Top right",
    "Bas gauche": "Bottom left",
    "Bas centre": "Bottom center",
    "Bas droite": "Bottom right",

    // Cartes et tags
    "Atelier d'écriture": "Writing workshop",
    "Un jeudi sur deux, de 18h à 20h, à la médiathèque.": "Every other Thursday, 6 to 8 pm, at the library.",
    "Élévation 0": "Elevation 0",
    "Élévation 1": "Elevation 1",
    "Élévation 2": "Elevation 2",
    "Élévation 3": "Elevation 3",
    "md (défaut)": "md (default)",
    "Le texte sera définitivement perdu. Cette action est irréversible.": "The text will be permanently lost. This action cannot be undone.",
    "Accessibilité": "Accessibility",
    "Débutants": "Beginners",
    "Gratuit": "Free",

    // Drawer et modale
    "Filtrer les ateliers": "Filter workshops",
    "Filtres": "Filters",
    "En ligne": "Online",
    "Le week-end": "Weekends",
    "Ouvrir le menu": "Open the menu",
    "Menu principal": "Main menu",
    "Accueil": "Home",
    "Projets": "Projects",
    "Gauche": "Left",
    "Droite": "Right",
    "Haut": "Top",
    "Bas": "Bottom",
    "Depuis ${side}": "From ${side}",
    "Ce panneau apparaît depuis le bord « {{ side }} ».": "This panel slides in from the {{ side }} edge.",
    "Panneau large": "Wide panel",
    "Panneau bas, court": "Short bottom panel",
    "Large": "Wide",
    "Court": "Short",
    "Étroite": "Narrow",
    "Modale étroite": "Narrow modal",
    "Modale large": "Wide modal",
    "Largeur de 40rem au maximum.": "Up to 40rem wide.",
    "Largeur de 18rem au maximum.": "Up to 18rem wide.",
    "Largeur de 40rem au maximum, et 90% de l'écran sur mobile.": "Up to 40rem wide, and 90% of the screen on mobile.",
    "Hauteur de 12rem au maximum, le contenu défile au-delà.": "Up to 12rem tall, the content scrolls beyond that.",

    // Mise en page
    "Premier": "First",
    "Deuxième": "Second",
    "Troisième": "Third",
    "Un": "One",
    "Deux": "Two",
    "Trois": "Three",
    "Quatre": "Four",
    "Cinq": "Five",
    "Six": "Six",
    "Empilé sous 768px": "Stacked below 768px",
    "Réduisez la fenêtre": "Resize the window",
    "pour voir la différence": "to see the difference",
    "Une colonne sous 1000px": "One column below 1000px",
    "Sur deux colonnes": "Spans two columns",
    "Une colonne": "One column",
};

// Les entrées d'un seul mot ne sont remplacées que si elles forment toute la valeur
// d'un texte ou d'une chaîne (>Un<, "Un"), pour ne pas toucher un mot dans une phrase.
// Les phrases sont remplacées partout, les plus longues d'abord.
const entries = Object.entries(DICTIONARY).sort((a, b) => b[0].length - a[0].length);
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const used = new Set();

function translate(text) {
    let result = text;
    for (const [fr, en] of entries) {
        const pattern = fr.includes(" ")
            ? new RegExp(escape(fr), "g")
            : new RegExp(`(?<=[>"'\`])${escape(fr)}(?=[<"'\`])`, "g");
        result = result.replace(pattern, () => {
            used.add(fr);
            return en;
        });
    }
    return result;
}

function* vueFiles(dir) {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (path === TARGET) continue;
        if (statSync(path).isDirectory()) yield* vueFiles(path);
        else if (entry.endsWith(".vue")) yield path;
    }
}

let count = 0;
for (const file of vueFiles(SOURCE)) {
    const output = join(TARGET, relative(SOURCE, file));
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, translate(readFileSync(file, "utf8")));
    count++;
}
console.log(`${count} fichier(s) généré(s) dans ${TARGET}`);

const unused = Object.keys(DICTIONARY).filter((key) => !used.has(key));
if (unused.length) console.log("\nEntrées du dictionnaire jamais utilisées :", unused);