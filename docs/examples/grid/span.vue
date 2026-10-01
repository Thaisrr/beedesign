<script setup lang="ts">
import { BeeCard, BeeGrid } from "@thaisrr/beedesign";
</script>

<template>
  <BeeGrid :columns="3">
    <BeeCard class="wide">Sur deux colonnes</BeeCard>
    <BeeCard>Une colonne</BeeCard>
    <BeeCard>Une colonne</BeeCard>
    <BeeCard class="wide">Sur deux colonnes</BeeCard>
  </BeeGrid>
</template>

<style scoped>
.wide {
  grid-column: span 2;
}
</style>