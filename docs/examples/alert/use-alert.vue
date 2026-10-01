<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { BeeAlertList, BeeButton, BeeFlex, useAlert } from "beedesign";
import type { AlertPosition } from "beedesign";

const { success, error, info, warning, clear } = useAlert();

const position = ref<AlertPosition>("bottom-center");

const positions: { value: AlertPosition; label: string }[] = [
  { value: "top-left", label: "Haut gauche" },
  { value: "top-center", label: "Haut centre" },
  { value: "top-right", label: "Haut droite" },
  { value: "bottom-left", label: "Bas gauche" },
  { value: "bottom-center", label: "Bas centre" },
  { value: "bottom-right", label: "Bas droite" },
];

onBeforeUnmount(clear);
</script>

<template>
  <div class="stack">
    <BeeFlex justify="flex-start" :gap="8" :responsive="false">
      <BeeButton @click="success('Brouillon enregistré')">Succès</BeeButton>
      <BeeButton @click="error('L\'envoi a échoué. Réessayez dans un instant.')">Erreur</BeeButton>
      <BeeButton @click="warning('Votre session expire dans 5 minutes.')">Avertissement</BeeButton>
      <BeeButton @click="info('Une nouvelle version est disponible.')">Info</BeeButton>
      <BeeButton variant="ghost" @click="clear()">Tout fermer</BeeButton>
    </BeeFlex>

    <BeeFlex justify="flex-start" :gap="8" :responsive="false">
      <BeeButton
          v-for="item in positions"
          :key="item.value"
          :variant="position === item.value ? 'primary' : 'secondary'"
          @click="position = item.value"
      >
        {{ item.label }}
      </BeeButton>
    </BeeFlex>
  </div>

  <BeeAlertList :position="position" />
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>