<script setup lang="ts">
import { computed } from "vue";

type Justify = "flex-start" | "flex-end" | "center" | "space-between";
type Align = "flex-start" | "flex-end" | "center" | "stretch";
type Gap = "none" | "sm" | "md" | "lg" | number;

const {
  justify = "center",
  gap = "lg",
  direction = "row",
  align = "center",
  responsive = true,
} = defineProps<{
  justify?: Justify;
  gap?: Gap;
  direction?: "row" | "column";
  align?: Align;
  responsive?: boolean;
}>();

// Un nombre est lu en pixels, les mots-clés passent par les tokens d'espacement.
const gapStyle = computed(() =>
    typeof gap === "number" ? { gap: `${gap}px` } : undefined,
);
</script>

<template>
  <div
      class="bd-flex"
      :class="[
      `bd-flex--direction-${direction}`,
      `bd-flex--justify-${justify}`,
      `bd-flex--align-${align}`,
      typeof gap === 'string' && `bd-flex--gap-${gap}`,
      { 'bd-flex--responsive': responsive },
    ]"
      :style="gapStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.bd-flex {
  display: flex;
  flex-wrap: wrap;
}

.bd-flex--direction-row {
  flex-direction: row;
}

.bd-flex--direction-column {
  flex-direction: column;
}

.bd-flex--justify-flex-start {
  justify-content: flex-start;
}

.bd-flex--justify-flex-end {
  justify-content: flex-end;
}

.bd-flex--justify-center {
  justify-content: center;
}

.bd-flex--justify-space-between {
  justify-content: space-between;
}

.bd-flex--align-flex-start {
  align-items: flex-start;
}

.bd-flex--align-flex-end {
  align-items: flex-end;
}

.bd-flex--align-center {
  align-items: center;
}

.bd-flex--align-stretch {
  align-items: stretch;
}

.bd-flex--gap-none {
  gap: 0;
}

.bd-flex--gap-sm {
  gap: var(--bd-space-sm);
}

.bd-flex--gap-md {
  gap: var(--bd-space-md);
}

.bd-flex--gap-lg {
  gap: var(--bd-space-lg);
}

/* Sous 768px, les éléments s'empilent et se centrent. */
@media screen and (width < 768px) {
  .bd-flex.bd-flex--responsive {
    flex-direction: column;
    align-items: center;
  }
}
</style>