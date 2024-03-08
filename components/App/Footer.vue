<template>
  <footer class="container">
    <div class="row">
      <div class="col flex flex-1">
        <span class="px-2"
          >Site by
          <a href="https://daim.dev" class="underline" target="_blank"
            >Daim Digital</a
          >
        </span>
      </div>
      <div class="col ml-auto">
        <div class="w-full flex justify-end">
          <span v-if="version" class="text-slate-500 px-2">{{ version }}</span>
          <span v-if="commit" class="text-slate-500 px-2">{{
            shortHash(commit)
          }}</span>
        </div>
        <span class="text-slate-500 px-2">
          {{ lastModified }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- <AppRefresh></AppRefresh> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import { format } from "@formkit/tempo"
const config = useRuntimeConfig();
const version = config.public.VERSION;
const commit = config.public.COMMIT;
const lastModified = format(config.public.DATE_GENERATED, "ddd, DD MMM YYYY HH:mm:ss Z");
function shortHash(value) {
  return value ? value.substring(0, 7) : null;
}
</script>
