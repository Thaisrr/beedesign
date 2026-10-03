<script setup lang="ts">
import { BeeCard, BeeTag } from "@thaisrr/beedesign";
</script>

<template>
  <BeeCard :elevation="1" class="card">
    <h3 class="title">Writing workshop</h3>
    <p class="text">Every other Thursday, 6 to 8 pm, at the library.</p>
    <div class="tags">
      <BeeTag rounded>Fiction</BeeTag>
      <BeeTag rounded>Beginners</BeeTag>
      <BeeTag rounded>Free</BeeTag>
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
  margin: 0.5rem 0 1rem;
  color: var(--bd-color-text-muted);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>