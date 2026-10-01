<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer, BeeFlex } from "@thaisrr/beedesign";

const wide = ref(false);
const short = ref(false);
</script>

<template>
  <BeeFlex justify="flex-start" :gap="12" :responsive="false">
    <BeeButton variant="secondary" @click="wide = true">Panneau large</BeeButton>
    <BeeButton variant="secondary" @click="short = true">Panneau bas, court</BeeButton>
  </BeeFlex>

  <BeeDrawer v-model:open="wide" title="Large" size="min(90vw, 40rem)">
    <p class="text">Largeur de 40rem au maximum.</p>
  </BeeDrawer>

  <BeeDrawer v-model:open="short" title="Court" side="bottom" size="12rem">
    <p class="text">Hauteur de 12rem au maximum, le contenu défile au-delà.</p>
  </BeeDrawer>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--bd-color-text-muted);
}
</style>