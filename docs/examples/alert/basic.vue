<script setup lang="ts">
import { BeeAlert } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <BeeAlert type="success">Votre brouillon a été enregistré.</BeeAlert>
    <BeeAlert type="error">L'envoi a échoué. Réessayez dans un instant.</BeeAlert>
    <BeeAlert type="warning">Votre session expire dans 5 minutes.</BeeAlert>
    <BeeAlert type="info">Une nouvelle version est disponible.</BeeAlert>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>