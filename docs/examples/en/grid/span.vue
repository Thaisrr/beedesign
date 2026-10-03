<script setup lang="ts">
import { BeeCard, BeeGrid } from "@thaisrr/beedesign";
</script>

<template>
  <BeeGrid :columns="3">
    <BeeCard class="wide">Spans two columns</BeeCard>
    <BeeCard>One column</BeeCard>
    <BeeCard>One column</BeeCard>
    <BeeCard class="wide">Spans two columns</BeeCard>
  </BeeGrid>
</template>

<style scoped>
.wide {
  grid-column: span 2;
}
</style>