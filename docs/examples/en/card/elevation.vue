<script setup lang="ts">
import { BeeCard } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeCard :elevation="0">Elevation 0</BeeCard>
    <BeeCard :elevation="1">Elevation 1</BeeCard>
    <BeeCard :elevation="2">Elevation 2</BeeCard>
    <BeeCard :elevation="3">Elevation 3</BeeCard>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>