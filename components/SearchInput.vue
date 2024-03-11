<script setup>
import { OnClickOutside } from "@vueuse/components";
const props = defineProps({
  items: { type: Array, default: () => [] },
  search: { type: String, default: "" },
});
const open = ref();
const emit = defineEmits(["update:search"]);
function setSearch(value) {
  emit("update:search", value);
  open.value = false;
}
</script>

<template>
  <OnClickOutside class="w-full flex flex-wrap" @trigger="open = false">
    <div class="border-2 w-full flex rounded">
      <label
        for="search"
        class="flex p-2 bg-transparent mb-0 text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >
        <Icon
          name="carbon:search"
          class="my-auto"
          style="width: 32px; height: 32px"
        />
      </label>
      <input
        id="search"
        :value="props.search"
        type="text"
        name="search"
        class="peer block min-h-[auto] flex-grow-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        @click="open = true"
        @input="emit('update:search', $event.target?.value)"
      />
      <div class="btn p-2" @click="setSearch('')">
        <Icon
          name="carbon:close"
          class="my-auto"
          style="width: 32px; height: 32px"
        ></Icon>
      </div>
    </div>
    <div class="relative w-full">
      <div
        :class="{
          'opacity-0': !open,
          'opacity-100': open,
          'pointer-events-none': !open,
        }"
        class="absolute left-0 transition-all duration-500 shadow-lg bg-white dark:bg-slate-800 right-0 z-1000 rounded-2"
      >
        <div class="flex flex-col px-4 py-2">
          <div
            v-for="item of items"
            :key="item.attributes.title"
            click="emit('update:search', item.attributes.title)"
            @click="setSearch(item.attributes.title)"
          >
            <span class="btn">{{ item.attributes.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>
