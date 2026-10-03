<script setup lang="ts">
import { BeeButton } from "@thaisrr/beedesign";
</script>

<template>
  <div class="row">
    <BeeButton variant="primary">Save</BeeButton>
    <BeeButton variant="secondary">Cancel</BeeButton>
    <BeeButton variant="ghost">Learn more</BeeButton>
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