<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeModal } from "@thaisrr/beedesign";

const open = ref(false);
</script>

<template>
  <BeeButton variant="secondary" @click="open = true">Open the menu</BeeButton>

  <BeeModal v-model:open="open" title="Menu" hide-title>
    <nav aria-label="Main menu">
      <ul class="links">
        <li><a href="#" @click.prevent="open = false">Home</a></li>
        <li><a href="#" @click.prevent="open = false">Projects</a></li>
        <li><a href="#" @click.prevent="open = false">Contact</a></li>
      </ul>
    </nav>
  </BeeModal>
</template>

<style scoped>
.links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.links a {
  color: var(--bd-color-primary-dark);
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
}

.links a:hover {
  color: var(--bd-color-primary);
}
</style>