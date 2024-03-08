<template>
  <div v-if="data?.data">
    <section class="container">
      <h1 class="text-4xl font-extrabold dark:text-white">
        {{ data.data.attributes.firstName }} {{ data.data.attributes.lastName }}
      </h1>
    </section>
    <section class="container">
      <div class="row">
        <div
          v-for="[key, value] of Object.entries(data.data.attributes)"
          :key="key"
          class="col w-full"
        >
          <strong>{{ useStartCase(key) }}</strong>
          <div v-if="['createdAt', 'lastLoginAt'].includes(key)">
            {{ format(value, "ddd, DD MMM YYYY hh:mm A") }}
          </div>
          <div v-else-if="key === 'email'">
            <DisplayEmailAddress :email="value"></DisplayEmailAddress>
          </div>
          <div v-else>{{ value }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { format } from "@formkit/tempo";
const route = useRoute();
const { data } = await useFetch(`/api/users/${route.params.user}`);
</script>
