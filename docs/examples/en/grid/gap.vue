<script setup lang="ts">
import { BeeGrid, BeeTag } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <div v-for="value in ['none', 'sm', 'md', 'lg', 48] as const" :key="value">
      <code>{{ typeof value === "number" ? `:gap="${value}"` : `gap="${value}"` }}</code>
      <BeeGrid :columns="4" :gap="value" :responsive="false" class="frame">
        <BeeTag v-for="n in 4" :key="n" class="cell">{{ n }}</BeeTag>
      </BeeGrid>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.frame {
  margin-top: 0.4rem;
}

.cell {
  justify-content: center;
}
</style>