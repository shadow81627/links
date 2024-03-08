<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-4xl font-bold">Users</h1>
        </div>
        <div class="col">
          <NuxtLink to="/signup" class="btn text-light bg-dark"
            >Add new user</NuxtLink
          >
        </div>
      </div>
    </div>
    <div v-if="Array.isArray(data?.data)" class="container">
      <div class="row">
        <div
          v-for="user of data.data"
          :key="user.id"
          class="flex col col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3"
        >
          <NuxtLink
            :to="`/users/${user.id}`"
            class="flex flex-col justify-between flex-grow-1 bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl"
          >
            <div class="flex px-4 flex-grow-1 py-2">
              <div class="pr-8px">
                <img
                  :src="`/api/users/${user?.id}/image`"
                  class="rounded-full w-32px h-32px"
                  width="32"
                  height="32"
                  alt="Avatar"
                />
              </div>

              <div>
                <span
                  >{{ user.attributes.firstName }}
                  {{ user.attributes.lastName }}</span
                >
                <DisplayEmailAddress
                  v-if="user.attributes.email"
                  :email="user.attributes.email"
                ></DisplayEmailAddress>
              </div>
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
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/users");
</script>
