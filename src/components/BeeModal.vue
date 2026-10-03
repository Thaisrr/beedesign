<script setup lang="ts">
import { computed, ref, toRef, useId } from "vue";
import { useFocusTrap } from "../composables/useFocusTrap";
import { useScrollLock } from "../composables/useScrollLock";

interface Props {
  /** Titre affiché dans l'en-tête et utilisé comme nom accessible de la boîte de dialogue. */
  title: string;
  /** Contrôle l'ouverture, à utiliser avec v-model:open. */
  open: boolean;
  /** Largeur CSS de la modale. */
  width?: string;
  /** Élément à refocaliser à la fermeture. Par défaut, celui qui avait le focus à l'ouverture. */
  returnFocusEl?: HTMLElement | null;
  /** Texte accessible du bouton de fermeture. */
  closeLabel?: string;
  /** Id du panneau, utile si un élément externe doit le référencer via aria-controls. */
  panelId?: string;
  /** Cache visuellement le titre, tout en le gardant comme nom accessible. */
  hideTitle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "min(90vw, 28rem)",
  returnFocusEl: null,
  closeLabel: "Close",
  panelId: undefined,
  hideTitle: false,
});

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const autoId = useId();
const resolvedPanelId = computed(() => props.panelId ?? `bd-modal-${autoId}`);
const titleId = computed(() => `${resolvedPanelId.value}-title`);

const panelEl = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLButtonElement | null>(null);

function close() {
  emit("update:open", false);
}

const open = toRef(props, "open");

useScrollLock(open);
useFocusTrap({
  container: panelEl,
  active: open,
  initialFocus: closeBtn,
  returnFocus: () => props.returnFocusEl,
  onEscape: close,
});
</script>

<template>
  <Teleport to="body">
    <Transition name="bd-modal-backdrop">
      <div v-if="open" class="bd-modal__backdrop" aria-hidden="true" @click="close"></div>
    </Transition>

    <Transition name="bd-modal">
      <section
          v-if="open"
          :id="resolvedPanelId"
          ref="panelEl"
          class="bd-modal"
          :style="{ width }"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
      >
        <div class="bd-modal__head" :class="{ 'bd-modal__head--title-hidden': hideTitle }">
          <h2 :id="titleId" class="bd-modal__title" :class="{ 'bd-modal__sr-only': hideTitle }">
            {{ title }}
          </h2>
          <button ref="closeBtn" type="button" class="bd-modal__close" @click="close">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
              <path
                  d="M3 3l10 10M13 3L3 13"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
              />
            </svg>
            <span class="bd-modal__sr-only">{{ closeLabel }}</span>
          </button>
        </div>

        <div class="bd-modal__body">
          <slot />
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<style scoped>
.bd-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--bd-z-modal);
  background: var(--bd-color-overlay);
}

.bd-modal {
  position: fixed;
  inset: 0;
  z-index: calc(var(--bd-z-modal) + 1);
  /* Centrage sans transform : la transition peut donc animer transform librement. */
  margin: auto;
  height: fit-content;
  max-width: 100vw;
  max-height: min(80vh, 40rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  box-sizing: border-box;
  padding: calc(var(--bd-space-md) * 1.5);
  border: 1px solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-surface);
  color: var(--bd-color-text);
  font-family: var(--bd-font-main);
  box-shadow: var(--bd-shadow-3);
}

.bd-modal:focus {
  outline: none;
}

.bd-modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bd-space-md);
  margin-bottom: var(--bd-space-md);
}

.bd-modal__head--title-hidden {
  justify-content: flex-end;
}

.bd-modal__title {
  margin: 0;
  font-family: var(--bd-font-title);
  font-size: var(--bd-font-size-lg);
  font-weight: 600;
  line-height: 1.3;
}

.bd-modal__close {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 0;
  border-radius: var(--bd-radius-full);
  background: var(--bd-color-primary-light);
  color: var(--bd-color-primary-dark);
  cursor: pointer;
  transition: background-color var(--bd-transition-fast);
}

.bd-modal__close:hover {
  background: var(--bd-color-primary-medium);
}

.bd-modal__close:focus-visible {
  outline: 3px solid var(--bd-color-focus);
  outline-offset: 2px;
}

.bd-modal__sr-only {
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

/* Transitions : les durées passent à 0 si prefers-reduced-motion est actif (voir tokens.css). */
.bd-modal-backdrop-enter-active,
.bd-modal-backdrop-leave-active {
  transition: opacity var(--bd-transition-base);
}

.bd-modal-backdrop-enter-from,
.bd-modal-backdrop-leave-to {
  opacity: 0;
}

.bd-modal-enter-active,
.bd-modal-leave-active {
  transition:
      opacity var(--bd-transition-base),
      transform var(--bd-transition-base);
}

.bd-modal-enter-from,
.bd-modal-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>