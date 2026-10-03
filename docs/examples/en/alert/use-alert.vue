<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { BeeAlertList, BeeButton, BeeFlex, useAlert } from "@thaisrr/beedesign";
import type { AlertPosition } from "@thaisrr/beedesign";

const { success, error, info, warning, clear } = useAlert();

const position = ref<AlertPosition>("bottom-center");

const positions: { value: AlertPosition; label: string }[] = [
  { value: "top-left", label: "Top left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
];

onBeforeUnmount(clear);
</script>

<template>
  <div class="stack">
    <BeeFlex justify="flex-start" :gap="8" :responsive="false">
      <BeeButton @click="success('Draft saved')">Success</BeeButton>
      <BeeButton @click="error('Sending failed. Please try again in a moment.')">Error</BeeButton>
      <BeeButton @click="warning('Your session expires in 5 minutes.')">Warning</BeeButton>
      <BeeButton @click="info('A new version is available.')">Info</BeeButton>
      <BeeButton variant="ghost" @click="clear()">Close all</BeeButton>
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