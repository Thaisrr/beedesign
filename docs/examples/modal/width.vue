<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeFlex, BeeModal } from "beedesign";

const narrow = ref(false);
const wide = ref(false);
</script>

<template>
  <BeeFlex justify="flex-start" :gap="12" :responsive="false">
    <BeeButton variant="secondary" @click="narrow = true">Modale étroite</BeeButton>
    <BeeButton variant="secondary" @click="wide = true">Modale large</BeeButton>
  </BeeFlex>

  <BeeModal v-model:open="narrow" title="Étroite" width="min(90vw, 18rem)">
    <p class="text">Largeur de 18rem au maximum.</p>
  </BeeModal>

  <BeeModal v-model:open="wide" title="Large" width="min(90vw, 40rem)">
    <p class="text">Largeur de 40rem au maximum, et 90% de l'écran sur mobile.</p>
  </BeeModal>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--bd-color-text-muted);
}
</style>