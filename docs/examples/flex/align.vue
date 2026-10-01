<script setup lang="ts">
import { BeeFlex } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <div v-for="value in ['flex-start', 'center', 'flex-end', 'stretch'] as const" :key="value">
      <code>{{ value }}</code>
      <BeeFlex :align="value" justify="flex-start" :gap="8" :responsive="false" class="frame">
        <div class="box" style="height: 2rem">A</div>
        <div class="box" style="height: 3.5rem">B</div>
        <div class="box">C</div>
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

.box {
  min-width: 3rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--bd-radius-sm);
  background: var(--bd-color-primary-light);
  color: var(--bd-color-primary-dark);
  text-align: center;
}
</style>