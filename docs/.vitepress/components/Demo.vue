<script setup lang="ts">
import { ref } from "vue";

const tab = ref<"preview" | "code">("preview");
const uid = Math.random().toString(36).slice(2, 8);
</script>

<template>
  <div class="demo">
    <div class="demo__tabs" role="tablist">
      <button
          :id="`${uid}-tab-preview`"
          role="tab"
          type="button"
          :aria-selected="tab === 'preview'"
          :aria-controls="`${uid}-panel-preview`"
          :class="{ 'is-active': tab === 'preview' }"
          @click="tab = 'preview'"
      >
        Aperçu
      </button>
      <button
          :id="`${uid}-tab-code`"
          role="tab"
          type="button"
          :aria-selected="tab === 'code'"
          :aria-controls="`${uid}-panel-code`"
          :class="{ 'is-active': tab === 'code' }"
          @click="tab = 'code'"
      >
        Code
      </button>
    </div>

    <div
        v-show="tab === 'preview'"
        :id="`${uid}-panel-preview`"
        role="tabpanel"
        :aria-labelledby="`${uid}-tab-preview`"
        class="demo__preview"
    >
      <slot />
    </div>

    <div
        v-show="tab === 'code'"
        :id="`${uid}-panel-code`"
        role="tabpanel"
        :aria-labelledby="`${uid}-tab-code`"
        class="demo__code"
    >
      <slot name="code" />
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin: 1.25rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--bd-radius-md);
  overflow: hidden;
}

.demo__tabs {
  display: flex;
  gap: 0.25rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.demo__tabs button {
  padding: 0.6rem 0.75rem;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.demo__tabs button:hover {
  color: var(--vp-c-text-1);
}

.demo__tabs button.is-active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.demo__tabs button:focus-visible {
  outline: 2px solid var(--bd-color-focus);
  outline-offset: -2px;
}

.demo__preview {
  padding: 2rem 1.5rem;
  background: var(--vp-c-bg);
}

/* Le bloc de code de VitePress apporte déjà le bouton "copier". */
.demo__code :deep(div[class*="language-"]) {
  margin: 0;
  border-radius: 0;
}
</style>