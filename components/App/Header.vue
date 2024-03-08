<template>
  <header
    class="dark:bg-dark dark:text-light bg-light text-dark relative w-full flex flex-wrap items-center justify-between text-lg shadow-md print:hidden"
    style="
      left: 0;
      top: 0;
      width: 256px;
      height: 64px;
      width: 100%;
      position: fixed;
      z-index: 1006;
      transform: translateY(0%);
    "
  >
    <div
      class="w-full flex items-center justify-between px-2 h-64px w-full"
    >
      <div class="flex items-center">
        <button
          class="navbar-toggler flex border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline hover:bg-gray-500/10 rounded-full"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          :class="{
            'pointer-events-none': draw,
            'sm:pointer-events-unset': draw,
          }"
          @click="$emit('update:draw', !draw)"
        >
          <span class="h-24px w-24px my-auto">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path>
            </svg>
          </span>
        </button>
        <NuxtLink
          class="flex items-center text-black-900 hover:text-black-900 focus:text-black-900 mr-1 py-2 px-2.5"
          to="/"
        >
          <div class="ml-1">Link</div>
        </NuxtLink>
      </div>
      <div class="flex justify-between">
        <UserMenu></UserMenu>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    draw: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
  },
  emits: ["update:draw"],
};
</script>
