<script setup lang="ts">
import { BeeButton } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <div class="row">
      <BeeButton variant="primary">Enregistrer</BeeButton>
      <BeeButton variant="secondary">Annuler</BeeButton>
      <BeeButton variant="ghost">En savoir plus</BeeButton>
    </div>

    <div class="row">
      <BeeButton variant="primary" rounded>Enregistrer</BeeButton>
      <BeeButton variant="secondary" rounded>Annuler</BeeButton>
      <BeeButton variant="ghost" rounded>En savoir plus</BeeButton>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
</style>