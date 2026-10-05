<script setup lang="ts">
import { alertState, useAlert } from "../composables/useAlert";
import type { AlertPosition } from "../types";
import BeeAlert from "./BeeAlert.vue";

withDefaults(
    defineProps<{
      /** Coin ou bord de l'écran où s'empilent les alertes. */
      position?: AlertPosition;
    }>(),
    { position: "bottom-center" },
);

const { dismiss } = useAlert();
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
        tag="div"
        name="bd-alert-list"
        class="bd-alert-list"
        :class="`bd-alert-list--${position}`"
    >
      <BeeAlert
          v-for="item in alertState"
          :key="item.id"
          :type="item.type"
          :duration="item.duration"
          closable
          @close="dismiss(item.id)"
      >
        {{ item.message }}
      </BeeAlert>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.bd-alert-list {
  --bd-alert-from: translateY(var(--bd-space-md));

  position: fixed;
  z-index: var(--bd-z-alert);
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-sm);
  box-sizing: border-box;
  width: min(100vw, 416px);
  padding: var(--bd-space-md);
  /* La zone ne bloque pas les clics sur la page, seules les alertes les reçoivent. */
  pointer-events: none;
}

.bd-alert-list > :deep(.bd-alert) {
  box-shadow: var(--bd-shadow-2);
}

.bd-alert-list--top-left,
.bd-alert-list--top-center,
.bd-alert-list--top-right {
  top: 0;
  --bd-alert-from: translateY(calc(var(--bd-space-md) * -1));;
}

.bd-alert-list--bottom-left,
.bd-alert-list--bottom-center,
.bd-alert-list--bottom-right {
  bottom: 0;
}

.bd-alert-list--top-left,
.bd-alert-list--bottom-left {
  left: 0;
  --bd-alert-from: translateX(calc(var(--bd-space-md) * -1));
}

.bd-alert-list--top-right,
.bd-alert-list--bottom-right {
  right: 0;
  --bd-alert-from: translateX(var(--bd-space-md));
}

.bd-alert-list--top-center,
.bd-alert-list--bottom-center {
  left: 50%;
  transform: translateX(-50%);
}

/* Transitions : les durées passent à 0 si prefers-reduced-motion est actif (voir tokens.css). */
.bd-alert-list-enter-active,
.bd-alert-list-leave-active {
  transition:
      opacity var(--bd-transition-base),
      transform var(--bd-transition-base);
}

.bd-alert-list-move {
  transition: transform var(--bd-transition-base);
}

.bd-alert-list-enter-from,
.bd-alert-list-leave-to {
  opacity: 0;
  transform: var(--bd-alert-from);
}

/* Une alerte qui part sort du flux, les autres glissent pour combler sa place. */
.bd-alert-list-leave-active {
  position: absolute;
  width: calc(100% - var(--bd-space-md) * 2);
}
</style>