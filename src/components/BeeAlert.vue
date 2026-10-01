<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import type { AlertType } from "../types";

interface Props {
  /** Nature du message : détermine la couleur et l'icône. */
  type?: AlertType;
  /** Affiche un bouton de fermeture. */
  closable?: boolean;
  /** Durée avant fermeture automatique en millisecondes. 0 pour ne jamais se fermer seule. */
  duration?: number;
  /** Texte accessible du bouton de fermeture. */
  closeLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  closable: false,
  duration: 0,
  closeLabel: "Fermer",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

// Une erreur ou un avertissement interrompt la lecture, le reste est annoncé poliment.
const role = computed(() =>
    props.type === "error" || props.type === "warning" ? "alert" : "status",
);

// Fermeture automatique, suspendue tant que l'alerte est survolée ou qu'elle a le focus,
// pour laisser le temps de la lire.
let timer: ReturnType<typeof setTimeout> | undefined;
let remaining = 0;
let startedAt = 0;
let hovered = false;
let focused = false;

function start() {
  if (remaining <= 0) return;
  startedAt = Date.now();
  timer = setTimeout(() => emit("close"), remaining);
}

function pause() {
  if (timer === undefined) return;
  clearTimeout(timer);
  timer = undefined;
  remaining -= Date.now() - startedAt;
}

function sync() {
  if (hovered || focused) pause();
  else if (timer === undefined) start();
}

function onHover(value: boolean) {
  hovered = value;
  sync();
}

function onFocus(value: boolean) {
  focused = value;
  sync();
}

onMounted(() => {
  remaining = props.duration;
  start();
});

onBeforeUnmount(() => {
  if (timer !== undefined) clearTimeout(timer);
});
</script>

<template>
  <div
      class="bd-alert"
      :class="`bd-alert--${type}`"
      :role="role"
      @mouseenter="onHover(true)"
      @mouseleave="onHover(false)"
      @focusin="onFocus(true)"
      @focusout="onFocus(false)"
  >
    <svg
        class="bd-alert__icon"
        viewBox="0 0 20 20"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
    >
      <template v-if="type === 'success'">
        <circle cx="10" cy="10" r="8" />
        <path d="M6.5 10.5l2.5 2.5 4.5-5" />
      </template>
      <template v-else-if="type === 'error'">
        <circle cx="10" cy="10" r="8" />
        <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" />
      </template>
      <template v-else-if="type === 'warning'">
        <path d="M10 3l8 14H2z" />
        <path d="M10 8.5v3.5M10 14.5v.01" />
      </template>
      <template v-else>
        <circle cx="10" cy="10" r="8" />
        <path d="M10 9v5M10 6v.01" />
      </template>
    </svg>

    <div class="bd-alert__content">
      <slot />
    </div>

    <button v-if="closable" type="button" class="bd-alert__close" @click="emit('close')">
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
        <path
            d="M3 3l10 10M13 3L3 13"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
        />
      </svg>
      <span class="bd-alert__sr-only">{{ closeLabel }}</span>
    </button>
  </div>
</template>

<style scoped>
.bd-alert {
  --bd-alert-color: var(--bd-color-info);

  display: flex;
  align-items: flex-start;
  gap: var(--bd-space-sm);
  box-sizing: border-box;
  /* Reste cliquable quand l'alerte est placée dans un BeeAlertList. */
  pointer-events: auto;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--bd-alert-color) 35%, var(--bd-color-border));
  border-left: 4px solid var(--bd-alert-color);
  border-radius: var(--bd-radius-md);
  background: color-mix(in srgb, var(--bd-alert-color) 10%, var(--bd-color-surface));
  color: var(--bd-color-text);
  font-family: var(--bd-font-main);
  font-size: var(--bd-font-size-md);
  line-height: 1.4;
}

.bd-alert--success {
  --bd-alert-color: var(--bd-color-success);
}

.bd-alert--error {
  --bd-alert-color: var(--bd-color-error);
}

.bd-alert--warning {
  --bd-alert-color: var(--bd-color-warning);
}

.bd-alert--info {
  --bd-alert-color: var(--bd-color-info);
}

.bd-alert__icon {
  flex: none;
  margin-top: 0.1rem;
  color: var(--bd-alert-color);
}

.bd-alert__content {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.bd-alert__close {
  flex: none;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  margin: -0.2rem -0.2rem -0.2rem 0;
  padding: 0;
  border: 0;
  border-radius: var(--bd-radius-full);
  background: transparent;
  color: var(--bd-color-text);
  cursor: pointer;
  transition: background-color var(--bd-transition-fast);
}

.bd-alert__close:hover {
  background: color-mix(in srgb, var(--bd-alert-color) 20%, transparent);
}

.bd-alert__close:focus-visible {
  outline: 3px solid var(--bd-color-focus);
  outline-offset: 2px;
}

.bd-alert__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>