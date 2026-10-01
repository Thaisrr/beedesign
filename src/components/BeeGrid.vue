<script setup lang="ts">
import { computed } from "vue";

type Gap = "none" | "sm" | "md" | "lg" | number;

const {
  columns,
  gap = "lg",
  responsive = true,
} = defineProps<{
  columns: number;
  gap?: Gap;
  responsive?: boolean;
}>();

// Le nombre de colonnes est libre, il passe donc par une variable CSS.
// Un gap numérique est lu en pixels, les mots-clés passent par les tokens.
const style = computed(() => ({
  "--bd-grid-columns": columns,
  ...(typeof gap === "number" ? { gap: `${gap}px` } : {}),
}));
</script>

<template>
  <div
      class="bd-grid"
      :class="[
      typeof gap === 'string' && `bd-grid--gap-${gap}`,
      { 'bd-grid--responsive': responsive },
    ]"
      :style="style"
  >
    <slot />
  </div>
</template>

<style scoped>
.bd-grid {
  display: grid;
  /* minmax(0, 1fr) empêche un contenu large de faire déborder sa colonne. */
  grid-template-columns: repeat(var(--bd-grid-columns), minmax(0, 1fr));
}

.bd-grid--gap-none {
  gap: 0;
}

.bd-grid--gap-sm {
  gap: var(--bd-space-sm);
}

.bd-grid--gap-md {
  gap: var(--bd-space-md);
}

.bd-grid--gap-lg {
  gap: var(--bd-space-lg);
}

/* Sous 1000px, une seule colonne. Les éléments qui s'étendaient sur
   plusieurs colonnes (grid-column) reprennent une place normale. */
@media screen and (width < 1000px) {
  .bd-grid.bd-grid--responsive {
    grid-template-columns: minmax(0, 1fr);
  }

  .bd-grid.bd-grid--responsive > :slotted(*) {
    grid-column: auto;
  }
}
</style>