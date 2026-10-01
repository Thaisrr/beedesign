<script setup lang="ts">
import { BeeCard } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeCard padding="none">none</BeeCard>
    <BeeCard padding="sm">sm</BeeCard>
    <BeeCard padding="md">md (défaut)</BeeCard>
    <BeeCard padding="lg">lg</BeeCard>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.5rem;
}
</style>