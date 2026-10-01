<script setup lang="ts">
interface Props {
  rounded?: boolean;
}

withDefaults(defineProps<Props>(), {
  rounded: false,
});
</script>

<template>
  <span class="bd-tag" :class="{ 'bd-tag--rounded': rounded }">
    <slot />
  </span>
</template>

<style scoped>
.bd-tag {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0.2rem 0.65rem;
  border: 1px solid var(--bd-color-primary-medium);
  border-radius: var(--bd-radius-sm);
  background: var(--bd-color-primary-light);
  color: var(--bd-color-primary-dark);
  font-family: var(--bd-font-main);
  font-size: var(--bd-font-size-sm);
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
}

.bd-tag--rounded {
  border-radius: var(--bd-radius-full);
}
</style>