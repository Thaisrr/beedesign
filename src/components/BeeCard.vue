<script setup lang="ts">
interface Props {
  elevation?: 0 | 1 | 2 | 3;
  padding?: "none" | "sm" | "md" | "lg";
}

withDefaults(defineProps<Props>(), {
  elevation: 0,
  padding: "md",
});
</script>

<template>
  <div
      class="bd-card"
      :class="[`bd-card--elevation-${elevation}`, `bd-card--padding-${padding}`]"
  >
    <slot />
  </div>
</template>

<style scoped>
.bd-card {
  box-sizing: border-box;
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-surface);
  color: var(--bd-color-text);
  font-family: var(--bd-font-main);
}

.bd-card--elevation-1 {
  box-shadow: var(--bd-shadow-1);
}

.bd-card--elevation-2 {
  box-shadow: var(--bd-shadow-2);
}

.bd-card--elevation-3 {
  box-shadow: var(--bd-shadow-3);
}

.bd-card--padding-sm {
  padding: var(--bd-space-md);
}

.bd-card--padding-md {
  padding: calc(var(--bd-space-md) * 1.5);
}

.bd-card--padding-lg {
  padding: var(--bd-space-lg);
}
</style>