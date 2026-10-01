import { onBeforeUnmount, toValue, watch, type MaybeRefOrGetter } from "vue";

// Compteur partagé : si une modale et un drawer sont ouverts en même temps,
// le scroll de la page ne se débloque que quand le dernier se ferme.
let lockCount = 0;
let saved: { html: string; body: string } | null = null;

function lock() {
    if (lockCount === 0) {
        saved = {
            html: document.documentElement.style.overflow,
            body: document.body.style.overflow,
        };
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    }
    lockCount++;
}

function unlock() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0 && saved) {
        document.documentElement.style.overflow = saved.html;
        document.body.style.overflow = saved.body;
        saved = null;
    }
}

/**
 * Bloque le scroll de la page tant que `locked` est vrai.
 * Restaure les valeurs d'origine à la fermeture et au démontage du composant.
 */
export function useScrollLock(locked: MaybeRefOrGetter<boolean>) {
    // Rendu serveur : rien à faire.
    if (typeof document === "undefined") return;

    let held = false;

    const release = () => {
        if (!held) return;
        held = false;
        unlock();
    };

    watch(
        () => toValue(locked),
        (value) => {
            if (value && !held) {
                held = true;
                lock();
            } else if (!value) {
                release();
            }
        },
        { immediate: true },
    );

    onBeforeUnmount(release);
}