<script setup lang="ts">
import { BeeButton } from "beedesign";
</script>

<template>
  <div class="row">
    <BeeButton variant="primary">Enregistrer</BeeButton>
    <BeeButton variant="secondary">Annuler</BeeButton>
    <BeeButton variant="ghost">En savoir plus</BeeButton>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
</style>