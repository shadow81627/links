<script lang="ts" setup>
const errors = ref([]);
async function login(e: Event) {
  e.preventDefault();
  const body = new FormData(e.target as HTMLFormElement);
  const result = await useFetch("/api/login", {
    method: "POST",
    body,
  });
  if (!result.error.value) {
    const user = useUser();
    const { data } = await useFetch("/api/user");
    if (data.value) {
      user.value = data.value;
    }
    await navigateTo("/");
  } else {
    errors.value = [result.error.value.statusMessage];
  }
}
</script>

<template>
  <div class="max-w-256px mx-auto mt-10">
    <h1>Sign in</h1>
    <form method="POST" action="/api/login" @submit="login">
      <div class="relative mb-3">
        <label
          for="email"
          class="pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
      </div>
      <div class="relative mb-3">
        <label
          for="password"
          class="pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
      </div>
      <button class="bg-dark text-light btn">Continue</button>

      <div class="text-red">{{ errors[0] }}</div>
    </form>
  </div>
</template>
