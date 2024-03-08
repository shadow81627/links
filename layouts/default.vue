<template>
  <div>
    <AppHeader v-model:draw="draw"></AppHeader>
    <div
      class="pt-64px"
      style="
        max-width: 100%;
        padding-top: 64px;
        transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      "
      :class="{ 'md:pl-[256px]': draw }"
    >
      <main class="min-h-[calc(100vh-64px)]">
        <NuxtPage></NuxtPage>
      </main>
      <!-- <AppFooter></AppFooter> -->
      <NavigationDraw v-model:draw="draw" :items="items"></NavigationDraw>
    </div>
  </div>
</template>

<script setup>
const draw = ref(false);
const items = [
{
  "name": "Home",
  "icon": "carbon:home",
  "url": "/",
  "pos": "1/1"
}

];
</script>
