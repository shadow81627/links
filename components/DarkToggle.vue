<script lang="ts">
export default {
  setup() {
    const color = useColorMode();
    const toggle = computed(() => (color.value === "dark" ? "light" : "dark"));
    return {
      toggle,
      color,
    };
  },
  methods: {
    toggleDark() {
      this.color.preference = this.toggle;
    },
  },
};
</script>

<template>
  <ClientOnly>
    <button
      class="!outline-none"
      :aria-label="`Toggle ${toggle} mode`"
      :title="`Toggle ${toggle} mode`"
      @click="toggleDark()"
    >
      <Icon
        :name="`carbon:${toggle === 'dark' ? 'moon' : 'sun'}`"
        class="my-auto"
        style="width: 32px; height: 32px"
      />
    </button>
  </ClientOnly>
</template>
