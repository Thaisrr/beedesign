<script setup lang="ts">
import { BeeButton } from "@thaisrr/beedesign";
</script>

<template>
  <div class="stack">
    <div class="row">
      <BeeButton variant="primary">Save</BeeButton>
      <BeeButton variant="secondary">Cancel</BeeButton>
      <BeeButton variant="ghost">Learn more</BeeButton>
    </div>

    <div class="row">
      <BeeButton variant="primary" rounded>Save</BeeButton>
      <BeeButton variant="secondary" rounded>Cancel</BeeButton>
      <BeeButton variant="ghost" rounded>Learn more</BeeButton>
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