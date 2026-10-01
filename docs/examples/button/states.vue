<script setup lang="ts">
import { BeeButton } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeButton loading>Envoi…</BeeButton>
    <BeeButton disabled>Indisponible</BeeButton>
    <BeeButton variant="secondary" disabled>Indisponible</BeeButton>
    <BeeButton variant="ghost" disabled>Indisponible</BeeButton>
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