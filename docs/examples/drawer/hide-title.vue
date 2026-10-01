<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer } from "beedesign";

const open = ref(false);
</script>

<template>
  <BeeButton variant="secondary" @click="open = true">Ouvrir le menu</BeeButton>

  <BeeDrawer v-model:open="open" side="left" title="Menu" hide-title>
    <nav aria-label="Menu principal">
      <ul class="links">
        <li><a href="#" @click.prevent="open = false">Accueil</a></li>
        <li><a href="#" @click.prevent="open = false">Projets</a></li>
        <li><a href="#" @click.prevent="open = false">Contact</a></li>
      </ul>
    </nav>
  </BeeDrawer>
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