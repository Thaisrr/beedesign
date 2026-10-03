<script setup lang="ts">
import { BeeTag } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeTag>Vue 3</BeeTag>
    <BeeTag>TypeScript</BeeTag>
    <BeeTag>Accessibility</BeeTag>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
</style>