<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { useFocusTrap } from "../composables/useFocusTrap";
import { useScrollLock } from "../composables/useScrollLock";

interface Props {
  /** Titre affiché dans l'en-tête et utilisé comme nom accessible du panneau. */
  title: string;
  /** Bord depuis lequel le panneau apparaît. */
  side?: "left" | "right" | "top" | "bottom";
  /** Largeur (left/right) ou hauteur maximale (top/bottom) du panneau. */
  size?: string;
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
  side: "right",
  size: undefined,
  returnFocusEl: null,
  closeLabel: "Close",
  panelId: undefined,
  hideTitle: false,
});

const open = defineModel<boolean>("open", { required: true });

const autoId = useId();
const resolvedPanelId = computed(() => props.panelId ?? `bd-drawer-${autoId}`);
const titleId = computed(() => `${resolvedPanelId.value}-title`);

const panelEl = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLButtonElement | null>(null);

const isHorizontal = computed(() => props.side === "left" || props.side === "right");

// Sans `size`, c'est le CSS qui fournit la valeur par défaut de chaque côté.
const panelStyle = computed(() => {
  if (!props.size) return undefined;
  return isHorizontal.value ? { width: props.size } : { maxHeight: props.size };
});

function close() {
  open.value = false;
}

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
    <Transition name="bd-drawer-backdrop">
      <div v-if="open" class="bd-drawer__backdrop" aria-hidden="true" @click="close"></div>
    </Transition>

    <Transition :name="`bd-drawer-${side}`">
      <section
          v-if="open"
          :id="resolvedPanelId"
          ref="panelEl"
          class="bd-drawer"
          :class="`bd-drawer--${side}`"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
      >
        <div class="bd-drawer__head" :class="{ 'bd-drawer__head--title-hidden': hideTitle }">
          <h2 :id="titleId" class="bd-drawer__title" :class="{ 'bd-drawer__sr-only': hideTitle }">
            {{ title }}
          </h2>
          <button ref="closeBtn" type="button" class="bd-drawer__close" @click="close">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
              <path
                  d="M3 3l10 10M13 3L3 13"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
              />
            </svg>
            <span class="bd-drawer__sr-only">{{ closeLabel }}</span>
          </button>
        </div>

        <div class="bd-drawer__body">
          <slot />
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<style scoped>
.bd-drawer__backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--bd-z-modal);
  background: var(--bd-color-overlay);
}

.bd-drawer {
  position: fixed;
  z-index: calc(var(--bd-z-modal) + 1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: calc(var(--bd-space-md) * 1.5);
  border: 0 solid var(--bd-color-border);
  background: var(--bd-color-surface);
  color: var(--bd-color-text);
  font-family: var(--bd-font-main);
  box-shadow: var(--bd-shadow-3);
}

.bd-drawer:focus {
  outline: none;
}

/* Gauche et droite : pleine hauteur, largeur réglable. */
.bd-drawer--right,
.bd-drawer--left {
  top: 0;
  bottom: 0;
  width: min(90vw, var(--bd-overlay-width));
}

.bd-drawer--right {
  right: 0;
  border-left-width:  var(--bd-border-width);
}

.bd-drawer--left {
  left: 0;
  border-right-width: var(--bd-border-width);
}

/* Haut et bas : pleine largeur, hauteur limitée. */
.bd-drawer--top,
.bd-drawer--bottom {
  left: 0;
  right: 0;
  max-height: 60vh;
}

.bd-drawer--top {
  top: 0;
  border-bottom-width:  var(--bd-border-width);
}

.bd-drawer--bottom {
  bottom: 0;
  border-top-width:  var(--bd-border-width);
}

.bd-drawer__head {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bd-space-md);
  margin-bottom: var(--bd-space-md);
}

.bd-drawer__head--title-hidden {
  justify-content: flex-end;
}

.bd-drawer__title {
  margin: 0;
  font-family: var(--bd-font-title);
  font-size: var(--bd-font-size-lg);
  font-weight: 600;
  line-height: 1.3;
}

/* L'en-tête reste visible, seul le contenu défile. */
.bd-drawer__body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.bd-drawer__close {
  flex: none;
  display: grid;
  place-items: center;
  width: var(--bd-close-size);
  height: var(--bd-close-size);
  padding: 0;
  border: 0;
  border-radius: var(--bd-radius-full);
  background: var(--bd-color-primary-light);
  color: var(--bd-color-primary-dark);
  cursor: pointer;
  transition: background-color var(--bd-transition-fast);
}

.bd-drawer__close:hover {
  background: var(--bd-color-primary-medium);
}

.bd-drawer__close:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}

.bd-drawer__sr-only {
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
.bd-drawer-backdrop-enter-active,
.bd-drawer-backdrop-leave-active {
  transition: opacity var(--bd-transition-base);
}

.bd-drawer-backdrop-enter-from,
.bd-drawer-backdrop-leave-to {
  opacity: 0;
}

.bd-drawer-right-enter-active,
.bd-drawer-right-leave-active,
.bd-drawer-left-enter-active,
.bd-drawer-left-leave-active,
.bd-drawer-top-enter-active,
.bd-drawer-top-leave-active,
.bd-drawer-bottom-enter-active,
.bd-drawer-bottom-leave-active {
  transition:
      transform var(--bd-transition-base),
      opacity var(--bd-transition-base);
}

.bd-drawer-right-enter-from,
.bd-drawer-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.bd-drawer-left-enter-from,
.bd-drawer-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.bd-drawer-top-enter-from,
.bd-drawer-top-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.bd-drawer-bottom-enter-from,
.bd-drawer-bottom-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>