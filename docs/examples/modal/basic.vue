<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeFlex, BeeModal } from "@thaisrr/beedesign";

const open = ref(false);
</script>

<template>
  <BeeButton @click="open = true">Supprimer le brouillon</BeeButton>

  <BeeModal v-model:open="open" title="Supprimer ce brouillon ?">
    <p class="text">Le texte sera définitivement perdu. Cette action est irréversible.</p>
    <BeeFlex justify="flex-end" :gap="8" :responsive="false">
      <BeeButton variant="ghost" @click="open = false">Annuler</BeeButton>
      <BeeButton @click="open = false">Supprimer</BeeButton>
    </BeeFlex>
  </BeeModal>
</template>

<style scoped>
.text {
  margin: 0 0 1.25rem;
  color: var(--bd-color-text-muted);
}
</style>