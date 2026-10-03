<script setup lang="ts">
import { BeeButton, BeeCard } from "@thaisrr/beedesign";
</script>

<template>
  <BeeCard :elevation="2" class="card">
    <h3 class="title">Delete this draft?</h3>
    <p class="text">The text will be permanently lost. This action cannot be undone.</p>
    <div class="actions">
      <BeeButton variant="ghost">Cancel</BeeButton>
      <BeeButton>Delete</BeeButton>
    </div>
  </BeeCard>
</template>

<style scoped>
.card {
  max-width: 24rem;
}

.title {
  margin: 0;
  font-size: 1.125rem;
}

.text {
  margin: 0.5rem 0 1.25rem;
  color: var(--bd-color-text-muted);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>