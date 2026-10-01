<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  rounded?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  type: "button",
  disabled: false,
  loading: false,
  rounded: false,
});

defineEmits<{ (e: "click", event: MouseEvent): void }>();
</script>

<template>
  <button
      :type="type"
      class="bd-button"
      :class="`bd-button--${variant} ${rounded? 'bd-button--rounded' : ''}`"
      :disabled="disabled || loading"
      :aria-busy="loading"
      @click="(e) => !loading && $emit('click', e)"
  >
    <span class="bd-button__spinner" v-if="loading" aria-hidden="true"></span>
    <span :class="{ 'bd-button__label--loading': loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.bd-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bd-space-sm);
  min-height: 2.75rem; /* cible tactile de 44px */
  padding: 0 1.5rem;
  border-radius: var(--bd-radius-sm);
  border: 2px solid transparent;
  font-family: var(--bd-font-main);
  font-size: var(--bd-font-size-md);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  white-space: nowrap;
  cursor: pointer;
  transition: transform var(--bd-transition-fast), box-shadow var(--bd-transition-fast),
    background-color var(--bd-transition-fast), color var(--bd-transition-fast);
}

.bd-button:focus-visible {
  outline: 3px solid var(--bd-color-focus);
  outline-offset: 3px;
}

.bd-button.bd-button--rounded {
  border-radius: var(--bd-radius-full);
}


/* Principal : une arête basse qui s'écrase au clic, comme une touche. */
.bd-button--primary {
  background: var(--bd-color-primary);
  color: var(--bd-color-on-primary);
}

.bd-button--primary:not(:disabled):hover {
  background: var(--bd-color-primary-hover);
  transform: translateY(-1px);
}

.bd-button--primary:not(:disabled):active {
  transform: translateY(3px);
}

.bd-button--secondary {
  background: transparent;
  color: var(--bd-color-primary-dark);
  border-color: var(--bd-color-primary-dark);
}

.bd-button--secondary:not(:disabled):hover {
  background: var(--bd-color-primary-light);
}

.bd-button--secondary:not(:disabled):active {
  transform: scale(0.98);
}

.bd-button--ghost {
  background: transparent;
  color: var(--bd-color-primary-dark);
}

.bd-button--ghost:not(:disabled):hover {
  background: var(--bd-color-primary-light);
}

.bd-button--ghost:not(:disabled):active {
  transform: scale(0.98);
}

/* Désactivé : plus de relief, couleurs neutres. Le chargement garde ses couleurs. */
.bd-button:disabled:not([aria-busy="true"]) {
  cursor: not-allowed;
  background: var(--bd-color-border);
  border-color: transparent;
  color: var(--bd-color-text-muted);
  box-shadow: none;
}

.bd-button--secondary:disabled:not([aria-busy="true"]),
.bd-button--ghost:disabled:not([aria-busy="true"]) {
  background: transparent;
  border-color: var(--bd-color-border);
}

.bd-button--ghost:disabled:not([aria-busy="true"]) {
  border-color: transparent;
}

.bd-button[aria-busy="true"] {
  cursor: progress;
}

.bd-button__label--loading {
  opacity: 0;
}

.bd-button__spinner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: bd-spin 0.6s linear infinite;
}

@keyframes bd-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bd-button {
    transition: none;
  }

  .bd-button--primary:not(:disabled):hover,
  .bd-button--primary:not(:disabled):active {
    transform: none;
  }

  .bd-button__spinner {
    animation-duration: 1.2s;
  }
}
</style>
