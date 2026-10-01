<script setup lang="ts">
import { BeeCard, BeeGrid } from "beedesign";
</script>

<template>
  <BeeGrid :columns="3">
    <BeeCard>Une colonne sous 1000px</BeeCard>
    <BeeCard>Réduisez la fenêtre</BeeCard>
    <BeeCard>pour voir la différence</BeeCard>
  </BeeGrid>
</template>