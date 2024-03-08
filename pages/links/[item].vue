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
              {{ data.attributes.title }}
            </h1>
          </div>
          <div
            v-for="[key, value] of Object.entries(data.attributes)"
            :key="key"
            class="col w-full"
          >
            <strong>{{ key }}</strong>
            <div>{{ value }}</div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
const route = useRoute();
const { data, pending } = await useFetch("/api/scrape", {
  lazy: true,
  server: false,
  transform({ data }) {
    const _data = data.data ?? data;
    if (Array.isArray(_data)) {
      const found = _data.find(
        (item) => item.attributes.title === route.params.item,
      );
      return found;
    }
    return _data;
  },
});
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Link Not Found",
    fatal: true,
  });
}
</script>
