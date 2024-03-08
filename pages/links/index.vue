<template>
  <div>
    <section class="container">
      <h1 class="text-4xl font-extrabold dark:text-white">Links</h1>
    </section>
    <section v-if="pending" class="container">
      <AppSpinner class="mx-auto h-64px w-64px"></AppSpinner>
    </section>
    <section v-else-if="Array.isArray(data)" class="container">
      <div class="row">
        <div class="col w-full flex">
          <label
            for="search"
            class="flex p-2 border-r-none rounded-r-none rounded border-2 bg-transparent mb-0 text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            <Icon
              name="carbon:search"
              class="my-auto"
              style="width: 32px; height: 32px"
            />
          </label>
          <input
            id="search"
            v-model="search"
            type="text"
            name="search"
            class="peer block min-h-[auto] flex-grow-1 rounded-l-none rounded border-l-none border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
        </div>
      </div>
      <div class="row">
        <div
          v-for="item of data.filter(searchFilter)"
          :key="item.attributes.title"
          class="flex col col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3"
        >
          <NuxtLink
            :to="`/links/${encodeURIComponent(item.attributes.title)}`"
            class="max-w-full flex flex-col justify-between flex-grow-1 bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-md overflow-hidden"
          >
            <NuxtPicture
              v-if="item.attributes.image"
              :src="item.attributes.image"
              class="flex-grow-0 max-w-full h-auto bg-slate-200"
              crossorigin="anonymous"
              itemprop="image"
              fit="inside"
              loading="lazy"
              format="avif,webp,png"
              sizes="xs:100vw sm:50vw md:50vw lg:33vw xl:25vw"
              background="#FFFFFFFF"
              :img-attrs="{
                width: 640,
                height: 360,
                style: {
                  'object-fit': 'contain',
                  'aspect-ratio': 640 / 360,
                  'max-width': '100%',
                  height: 'auto',
                },
              }"
            ></NuxtPicture>
            <div
              class="d-block font-500 flex-none text-[1.25rem] px-4 p-y[0.5rem] leading-8"
            >
              <span>{{ item.attributes.title }}</span>
            </div>
            <div class="flex-1 flex-grow-1 p-4">
              {{ item.attributes.description }}
            </div>
            <div class="flex p-2 text-gray">
              <div class="flex-grow-1"></div>
              <Icon
                name="mdi-light:arrow-right"
                class="text-gray my-auto"
                style="width: 32px; height: 32px"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <section v-else-if="error">Unable to fetch data</section>
    <section v-else>No data</section>
  </div>
</template>

<script setup>
import { useRouteQuery } from "@vueuse/router";
const { clear } = useLoadingIndicator({
  throttle: 2000,
});
const search = useRouteQuery("search", "", {
  mode: "push",
  transform: (value) => {
    clear();
    if (value) {
      return value;
    }
    return "";
  },
});
const { data, pending, error } = await useFetch("/api/scrape", {
  lazy: true,
  server: false,
  transform({ data }) {
    if (data.data) {
      return data.data;
    }
    return data;
  },
});
function searchFilter(item) {
  if (search.value && typeof search.value === "string") {
    if (
      item.attributes.title.toLowerCase().includes(search.value.toLowerCase())
    ) {
      return true;
    }
    return false;
  }
  return true;
}
</script>
