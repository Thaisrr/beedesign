<script setup lang="ts">
import { BeeFlex, BeeTag } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <div v-for="value in ['flex-start', 'center', 'flex-end', 'space-between'] as const" :key="value">
      <code>{{ value }}</code>
      <BeeFlex :justify="value" :gap="8" class="frame">
        <BeeTag>Un</BeeTag>
        <BeeTag>Deux</BeeTag>
        <BeeTag>Trois</BeeTag>
      </BeeFlex>
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
  padding: 0.5rem;
  border: 1px dashed var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
}
</style>