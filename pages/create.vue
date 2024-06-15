<script lang="ts" setup>
const errors = ref([]);
const url = ref("");
const name = ref("");
const description = ref("");
const loading = ref(false);
async function submit(e: Event) {
  e.preventDefault();
  const body = new FormData(e.target as HTMLFormElement);
  const result = await useFetch("/api/contents", {
    method: "POST",
    body,
  });
  if (!result.error.value) {
    await navigateTo("/");
  } else {
    errors.value = [result.error.value.statusMessage];
  }
}
async function scrape() {
  if (!url && loading.value) return;
  loading.value = true;
  const { data, pending } = await useFetch("/api/scrape", {
    method: "GET",
    query: { url },
    transform({ data }) {
      if (data.data) {
        return data.data;
      }
      return data;
    },
  });
  loading.value = pending.value;
  name.value = data.value[0].attributes.title;
  description.value = data.value[0].attributes.description;
}
</script>

<template>
  <div class="max-w-256px mx-auto mt-10">
    <h1>Create new Content item</h1>

    <form method="POST" action="/api/contents" @submit="submit">
      <div class="relative mb-3">
        <label
          for="url"
          class="pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >URL
        </label>
        <div class="border-2 w-full flex rounded items-center justify-center">
          <input
            id="url"
            v-model="url"
            type="url"
            name="url"
            class="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
          <button
            type="button"
            class="btn p-2 transition-all duration-500 ml-auto my-auto"
            :class="{
              'opacity-0': !url,
              'opacity-100': url,
              'pointer-events-none': !url,
            }"
            @click="scrape"
          >
            <AppSpinner v-if="loading"></AppSpinner>
            <Icon
              v-else
              name="carbon:fetch-upload"
              class="my-auto"
              style="width: 32px; height: 32px"
            ></Icon>
          </button>
        </div>
      </div>

      <div class="relative mb-3">
        <label
          for="name"
          class="pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >Name
        </label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
      </div>
      <div class="relative mb-3">
        <label
          for="description"
          class="pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >Description
        </label>
        <input
          id="description"
          v-model="description"
          type="text"
          name="description"
          class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
      </div>

      <button type="submit" class="bg-dark text-light btn">Submit</button>

      <div class="text-red">{{ errors[0] }}</div>
    </form>
  </div>
</template>
