import { ref } from "vue";
import type { AlertType } from "../types";

export interface AlertOptions {
    /** Durée d'affichage en millisecondes. 0 pour une alerte qui reste jusqu'à sa fermeture. */
    duration?: number;
}

export interface AlertItem {
    id: number;
    type: AlertType;
    message: string;
    duration: number;
}

const DEFAULT_DURATION = 5000;

// Liste partagée par toute l'application : useAlert() écrit dedans,
// BeeAlertList la lit. Aucun provide/inject n'est nécessaire.
// Usage interne, non exporté par la librairie.
export const alertState = ref<AlertItem[]>([]);

let nextId = 0;

function push(type: AlertType, message: string, options?: AlertOptions): number {
    const id = ++nextId;
    alertState.value.push({
        id,
        type,
        message,
        duration: options?.duration ?? DEFAULT_DURATION,
    });
    return id;
}

function dismiss(id: number) {
    alertState.value = alertState.value.filter((alert) => alert.id !== id);
}

function clear() {
    alertState.value = [];
}

/**
 * Affiche des alertes dans le BeeAlertList monté dans l'application.
 * Chaque méthode retourne l'id de l'alerte, utilisable avec dismiss().
 */
export function useAlert() {
    return {
        success: (message: string, options?: AlertOptions) => push("success", message, options),
        error: (message: string, options?: AlertOptions) => push("error", message, options),
        info: (message: string, options?: AlertOptions) => push("info", message, options),
        warning: (message: string, options?: AlertOptions) => push("warning", message, options),
        dismiss,
        clear,
    };
}