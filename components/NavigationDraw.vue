<template>
  <OnClickOutside @trigger="close">
    <nav
      style="
        left: 0;
        bottom: 0;
        top: 64px;
        width: 256px;
        height: calc(100% - 64px);
        position: fixed;
        z-index: 1006;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      "
      class="fixed flex grow min-h-full shadow-md bg-white dark:bg-dark flex-col transition-transform duration-200 !print:hidden overflow-hidden"
      :class="{ 'translate-x-0': draw, 'translate-x-[-110%]': !draw }"
    >
      <NuxtLink
        v-for="item of items"
        :key="item.name"
        class="flex px-4"
        :to="item.url"
        itemscope
        itemtype="https://schema.org/SiteNavigationElement"
        :class="{
          'bg-gray-200': $route.path === item.url,
          'dark:bg-gray-600': $route.path === item.url,
          'hover:bg-gray-500/10': $route.path !== item.url,
        }"
        @click="close"
      >
        <Icon
          :name="item.icon"
          class="text-gray my-auto"
          style="width: 32px; height: 32px"
        />
        <span class="relative hover:text-grey-500 btn text-black-500">
          {{ item.name }}
        </span>
      </NuxtLink>
    </nav>
  </OnClickOutside>
  <div
    v-if="draw && isSmallScreen"
    class="opacity-20"
    style="
      background: #000;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      width: 100%;
      z-index: 1005;
    "
    @click="close"
  ></div>
</template>
<script>
import { OnClickOutside } from "@vueuse/components";
import { useMediaQuery } from "@vueuse/core";
export default {
  components: {
    OnClickOutside,
  },
  props: {
    draw: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
  },
  emits: ["update:draw"],
  setup() {
    const isSmallScreen = useMediaQuery("(max-width: 767px)");
    return { isSmallScreen };
  },
  methods: {
    close() {
      if (this.isSmallScreen) {
        this.$emit("update:draw", false);
      }
    },
  },
};
</script>
