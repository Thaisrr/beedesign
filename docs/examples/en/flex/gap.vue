<script setup lang="ts">
import { BeeFlex, BeeTag } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <div v-for="value in ['none', 'sm', 'md', 'lg', 48] as const" :key="value">
      <code>{{ typeof value === "number" ? `:gap="${value}"` : `gap="${value}"` }}</code>
      <BeeFlex :gap="value" justify="flex-start" :responsive="false" class="frame">
        <BeeTag>One</BeeTag>
        <BeeTag>Two</BeeTag>
        <BeeTag>Three</BeeTag>
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
}
</style>