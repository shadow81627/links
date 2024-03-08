<template>
  <div :title="email">
    {{ truncate(email.split("@")[0]) }}<span class="break-all">@</span
    >{{ truncate(email.split("@")[1]) }}
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    email: { type: String, required: true },
  },
  methods: {
    truncate(text: string) {
      if (text.length > 24) {
        const midPoint = Math.ceil(text.length / 2);
        const extra = Math.ceil((text.length - 24) / 2);
        return `${text.slice(0, midPoint - extra)}...${text.slice(midPoint + extra)}`;
      }
      return text;
    },
  },
});
</script>
