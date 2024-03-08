<template>
  <OnClickOutside @trigger="close">
    <div class="position-relative">
      <button
        v-if="user"
        v-bind="$attrs"
        class="hover:bg-gray-500/10 py-2 px-4 px-6 py-2.5 rounded inline-block cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
        @click="toggle"
      >
        <img
          :src="`/api/users/${user?.id}/image`"
          class="rounded-full w-32px h-32px m-auto"
          width="32"
          height="32"
          alt="Avatar"
        />
      </button>

      <template v-else>
        <NuxtLink
          v-for="item of items"
          :key="`nav-bar-${item.name}`"
          :to="item.url"
          class="btn hover:bg-gray-500/10"
          :class="{
            'bg-gray-500/10': $route.path === item.url,
            'text-gray-500': $route.path === item.url,
          }"
          >{{ item.name }}</NuxtLink
        >
      </template>

      <div
        :class="dropdownClasses"
        class="absolute transition-all duration-500 w-300px shadow-lg bg-white dark:bg-slate-800 right-0 z-1000 rounded-2"
      >
        <div v-if="user" class="flex px-4 py-2">
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
            <span>{{ user.firstName }} {{ user.lastName }}</span>
            <LazyDisplayEmailAddress
              v-if="user.email"
              :email="user.email"
            ></LazyDisplayEmailAddress>
          </div>
        </div>

        <NuxtLink
          v-for="item of items"
          :key="`user-menu-${item.name}`"
          :to="item.url"
          class="flex px-4 rounded-0"
          :class="{
            'bg-gray-200': $route.path === item.url,
            'dark:bg-gray-600': $route.path === item.url,
            'hover:bg-gray-500/10': $route.path !== item.url,
          }"
          @click="close"
        >
          <Icon
            :name="item.icon"
            class="text-gray w-32px h-32px my-auto mr-3"
            style="width: 32px; height: 32px"
          />
          <span class="text-black-500 hover:text-grey-500 btn">{{
            item.name
          }}</span>
        </NuxtLink>
      </div>
    </div>
  </OnClickOutside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OnClickOutside } from "@vueuse/components";
export default defineComponent({
  components: {
    OnClickOutside,
  },
  setup() {
    const user = useUser();
    return { user };
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    dropdownClasses() {
      return {
        "opacity-0": !this.open,
        "opacity-100": this.open,
        "pointer-events-none": !this.open,
      };
    },
    items() {
      const items = [];
      if (this.user?.id) {
        items.push(
          {
            icon: "i-carbon-user",
            name: "Profile",
            url: `/users/${this.user.id}`,
            pos: "3/1",
          },
          {
            icon: "i-carbon-logout",
            name: "Logout",
            url: "/logout",
            pos: "3/1",
          },
        );
      } else {
        items.push({
          icon: "i-carbon-login",
          name: "Login",
          url: "/login",
          pos: "3/1",
        });
      }
      return items;
    },
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
  },
});
</script>
