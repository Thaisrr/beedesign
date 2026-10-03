<script setup lang="ts">
import { BeeButton } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeButton loading>Sending…</BeeButton>
    <BeeButton disabled>Unavailable</BeeButton>
    <BeeButton variant="secondary" disabled>Unavailable</BeeButton>
    <BeeButton variant="ghost" disabled>Unavailable</BeeButton>
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