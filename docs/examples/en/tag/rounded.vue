<script setup lang="ts">
import { BeeTag } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeTag rounded>Vue 3</BeeTag>
    <BeeTag rounded>TypeScript</BeeTag>
    <BeeTag rounded>Accessibility</BeeTag>
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