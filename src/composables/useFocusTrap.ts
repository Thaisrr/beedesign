import {
    nextTick,
    onBeforeUnmount,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";

const FOCUSABLE = [
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "summary",
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])',
].join(",");

// Pile des pièges actifs : seul le dernier ouvert réagit au clavier.
const stack: symbol[] = [];

function getFocusable(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
    );
}

export interface FocusTrapOptions {
    /** Élément dans lequel le focus reste enfermé. Il doit avoir tabindex="-1". */
    container: Ref<HTMLElement | null>;
    /** Le piège est actif tant que cette valeur est vraie. */
    active: MaybeRefOrGetter<boolean>;
    /** Élément à focaliser à l'ouverture. Par défaut, le premier élément focusable. */
    initialFocus?: Ref<HTMLElement | null>;
    /** Élément à refocaliser à la fermeture. Par défaut, celui qui avait le focus avant l'ouverture. */
    returnFocus?: MaybeRefOrGetter<HTMLElement | null | undefined>;
    /** Appelé quand l'utilisateur appuie sur Échap. */
    onEscape?: () => void;
}

/**
 * Enferme le focus clavier dans un conteneur (Tab et Shift+Tab bouclent),
 * gère Échap, et rend le focus à la fermeture.
 */
export function useFocusTrap(options: FocusTrapOptions) {
    // Rendu serveur : rien à faire.
    if (typeof document === "undefined") return;

    const id = Symbol("focus-trap");
    let isActive = false;
    let previouslyFocused: HTMLElement | null = null;

    function onKeydown(e: KeyboardEvent) {
        if (stack[stack.length - 1] !== id) return;

        const container = options.container.value;
        if (!container) return;

        if (e.key === "Escape") {
            if (options.onEscape) {
                e.preventDefault();
                options.onEscape();
            }
            return;
        }

        if (e.key !== "Tab") return;

        const items = getFocusable(container);
        if (items.length === 0) {
            e.preventDefault();
            container.focus();
            return;
        }

        const first = items[0];
        const last = items[items.length - 1];
        const current = document.activeElement;

        if (!container.contains(current)) {
            // Le focus s'est échappé (clic sur le fond, par exemple) : on le ramène.
            e.preventDefault();
            (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && current === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && current === last) {
            e.preventDefault();
            first.focus();
        }
    }

    async function activate() {
        if (isActive) return;
        isActive = true;

        previouslyFocused =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        stack.push(id);
        document.addEventListener("keydown", onKeydown);

        await nextTick();

        const container = options.container.value;
        if (!container || !isActive) return;
        const target = options.initialFocus?.value ?? getFocusable(container)[0] ?? container;
        target.focus();
    }

    async function deactivate() {
        if (!isActive) return;
        isActive = false;

        const index = stack.indexOf(id);
        if (index !== -1) stack.splice(index, 1);
        document.removeEventListener("keydown", onKeydown);

        const target = toValue(options.returnFocus) ?? previouslyFocused;
        previouslyFocused = null;

        await nextTick();
        if (target?.isConnected) target.focus();
    }

    watch(
        () => toValue(options.active),
        (value) => (value ? activate() : deactivate()),
        { immediate: true },
    );

    onBeforeUnmount(deactivate);
}