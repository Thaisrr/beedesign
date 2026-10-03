<script setup lang="ts">
import { BeeAlert } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <BeeAlert type="success">Your draft has been saved.</BeeAlert>
    <BeeAlert type="error">Sending failed. Please try again in a moment.</BeeAlert>
    <BeeAlert type="warning">Your session expires in 5 minutes.</BeeAlert>
    <BeeAlert type="info">A new version is available.</BeeAlert>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>