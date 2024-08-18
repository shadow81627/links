<template>
  <div class="max-w-640px mx-auto">
    <section v-if="pending" class="container">
      <AppSpinner class="mx-auto h-64px w-64px"></AppSpinner>
    </section>
    <template v-else-if="data?.attributes">
      <section class="bg-slate-200"></section>
      <section class="container">
        <div class="row">
          <div class="col w-full">
            <h1 class="text-4xl font-extrabold dark:text-white italic">
              {{ data.attributes.name }}
            </h1>
          </div>
          <div
            v-for="[key, value] of Object.entries(data.attributes)"
            :key="key"
            class="col w-full"
          >
            <strong class="capitalize">{{ key }}</strong>
            <div>
              {{ value }}
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
const route = useRoute();
const { data, pending } = await useFetch(
  `/api/contents/${encodeURIComponent(route.params.item)}`,
  {
    lazy: true,
    // server: false,
    transform({ data }) {
      const _data = data.data ?? data;
      return _data;
    },
  },
);
if (!pending.value && !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not Found",
    fatal: true,
  });
}
</script>
