<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer, BeeFlex } from "beedesign";

const open = ref(false);
const filters = ["Débutants", "Gratuit", "En ligne", "Le week-end"];
</script>

<template>
  <BeeButton @click="open = true">Filtrer les ateliers</BeeButton>

  <BeeDrawer v-model:open="open" title="Filtres">
    <ul class="filters">
      <li v-for="filter in filters" :key="filter">
        <label><input type="checkbox" /> {{ filter }}</label>
      </li>
    </ul>

    <BeeFlex justify="flex-end" :gap="8" :responsive="false">
      <BeeButton variant="ghost" @click="open = false">Annuler</BeeButton>
      <BeeButton @click="open = false">Appliquer</BeeButton>
    </BeeFlex>
  </BeeDrawer>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

input {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--bd-color-primary);
}
</style>