<script lang="ts" setup>
const user = useUser();
async function logout(e: Event) {
  e.preventDefault();
  await useFetch("/api/logout", {
    method: "POST",
  });
  user.value = null;
  navigateTo("/login");
}
</script>

<template>
  <div class="max-w-256px mx-auto mt-10">
    <form @submit="logout">
      <button class="btn bg-dark text-light">Sign out</button>
    </form>
  </div>
</template>
