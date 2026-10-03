<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer, BeeFlex } from "@thaisrr/beedesign";

const open = ref(false);
const filters = ["Beginners", "Free", "Online", "Weekends"];
</script>

<template>
  <BeeButton @click="open = true">Filter workshops</BeeButton>

  <BeeDrawer v-model:open="open" title="Filters">
    <ul class="filters">
      <li v-for="filter in filters" :key="filter">
        <label><input type="checkbox" /> {{ filter }}</label>
      </li>
    </ul>

    <BeeFlex justify="flex-end" :gap="8" :responsive="false">
      <BeeButton variant="ghost" @click="open = false">Cancel</BeeButton>
      <BeeButton @click="open = false">Apply</BeeButton>
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