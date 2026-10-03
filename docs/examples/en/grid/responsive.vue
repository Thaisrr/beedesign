<script setup lang="ts">
import { BeeCard, BeeGrid } from "@thaisrr/beedesign";
</script>

<template>
  <BeeGrid :columns="3">
    <BeeCard>One column below 1000px</BeeCard>
    <BeeCard>Resize the window</BeeCard>
    <BeeCard>to see the difference</BeeCard>
  </BeeGrid>
</template>