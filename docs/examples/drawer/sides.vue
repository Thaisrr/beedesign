<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer, BeeFlex } from "beedesign";

type Side = "left" | "right" | "top" | "bottom";

const open = ref(false);
const side = ref<Side>("right");

function show(value: Side) {
  side.value = value;
  open.value = true;
}
</script>

<template>
  <BeeFlex justify="flex-start" :gap="12" :responsive="false">
    <BeeButton variant="secondary" @click="show('left')">Gauche</BeeButton>
    <BeeButton variant="secondary" @click="show('right')">Droite</BeeButton>
    <BeeButton variant="secondary" @click="show('top')">Haut</BeeButton>
    <BeeButton variant="secondary" @click="show('bottom')">Bas</BeeButton>
  </BeeFlex>

  <BeeDrawer v-model:open="open" :side="side" :title="`Depuis ${side}`">
    <p class="text">Ce panneau apparaît depuis le bord « {{ side }} ».</p>
  </BeeDrawer>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--bd-color-text-muted);
}
</style>