<script setup lang="ts">
import { useData } from "vitepress";
import { useSidebar } from "vitepress/theme";
import { computed } from "vue";

// Une page peut masquer le footer avec « footer: false » dans son frontmatter.
const { lang, frontmatter } = useData();
const { hasSidebar } = useSidebar();

const portfolio = "https://www.thaislaboure.dev";
const github = "https://github.com/Thaisrr";
const npm = "https://www.npmjs.com/package/@thaisrr/beedesign";
const license = "https://github.com/Thaisrr/beedesign/blob/main/LICENSE";

const text = computed(() =>
    lang.value.startsWith("fr")
        ? { by: "Créé par Thaïs", license: "Publié sous licence MIT" }
        : { by: "Created by Thaïs", license: "Released under the MIT license" },
);
</script>

<template>
  <footer v-if="frontmatter.footer !== false" class="SiteFooter" :class="{ 'has-sidebar': hasSidebar }">
    <p class="links">
      <span>{{ text.by }}</span>
      <span aria-hidden="true">·</span>
      <a :href="portfolio">Portfolio</a>
      <span aria-hidden="true">·</span>
      <a :href="github">GitHub</a>
      <span aria-hidden="true">·</span>
      <a :href="npm">npm</a>
    </p>
    <p>
      <a :href="license">{{ text.license }}</a>
    </p>
  </footer>
</template>

<style scoped>
.SiteFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  padding: 32px 24px;
  border-top: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);
  text-align: center;
}

.SiteFooter p {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-2);
}

.SiteFooter .links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.6em;
}

.SiteFooter a {
  color: var(--vp-c-text-1);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.SiteFooter a:hover {
  color: var(--vp-c-brand-1);
}

@media (min-width: 768px) {
  .SiteFooter {
    padding: 32px;
  }
}

@media (min-width: 960px) {
  .SiteFooter.has-sidebar {
    padding-left: calc(var(--vp-sidebar-width) + 32px);
  }
}

@media (min-width: 1440px) {
  .SiteFooter.has-sidebar {
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width) + 32px);
  }
}
</style>