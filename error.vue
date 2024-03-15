<template>
  <Body class="dark:bg-dark dark:text-light !print:bg-light !print:text-dark">
    <div class="h-screen flex items-center justify-center">
      <NuxtLoadingIndicator />
      <div
        id="message"
        class="max-w-[360px] flex flex-grow-1 flex-col justify-between rounded-lg bg-white text-left shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
      >
        <h2
          class="d-block flex-none p-y[0.5rem] px-4 text-[1.25rem] font-500 leading-8"
        >
          {{ error.statusCode }}
        </h2>
        <h1
          class="d-block flex-none p-y[0.5rem] px-4 text-[1.25rem] font-500 leading-8"
        >
          {{ title }}
        </h1>

        <div
          v-if="
            error.statusMessage !== error.message || error.statusCode === 404
          "
          class="flex-1 flex-grow-1 p-4"
        >
          {{ description }}
        </div>
        <div class="flex flex-col gap-2 p-2">
          <span
            v-if="error.statusCode !== 404"
            class="block w-full bg-dark text-center text-xl text-light btn"
            @click="clearError()"
            >Try again</span
          >
          <span
            class="block w-full bg-dark text-center text-xl text-light btn"
            @click="clearError({ redirect: '/' })"
          >
            Home
          </span>
        </div>
      </div>
    </div>
  </Body>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const title =
  props.error.statusCode === 404 &&
  props.error.statusMessage.includes("Page not found")
    ? "Page Not Found"
    : props.error.statusMessage;
const description =
  props.error.statusCode === 404
    ? "The specified file was not found on this website. Please check the URL for mistakes and try again."
    : props.error.statusMessage !== props.error.message
      ? props.error.message
      : undefined;
useHead({
  title,
  meta: [
    {
      hid: "description",
      name: "description",
      content: description,
    },
  ],
});
</script>
