<script setup lang="ts">
import { BeeCard } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeCard :elevation="0">Élévation 0</BeeCard>
    <BeeCard :elevation="1">Élévation 1</BeeCard>
    <BeeCard :elevation="2">Élévation 2</BeeCard>
    <BeeCard :elevation="3">Élévation 3</BeeCard>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>