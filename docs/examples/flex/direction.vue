<script setup lang="ts">
import { BeeButton, BeeFlex } from "@thaisrr/beedesign";
</script>

<template>
  <BeeFlex direction="column" align="flex-start" :gap="12" :responsive="false">
    <BeeButton>Enregistrer</BeeButton>
    <BeeButton variant="secondary">Annuler</BeeButton>
    <BeeButton variant="ghost">En savoir plus</BeeButton>
  </BeeFlex>
</template>