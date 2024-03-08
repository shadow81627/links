<template>
  <Html lang="en-AU">
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <Body class="dark:bg-dark dark:text-light !print:bg-light !print:text-dark">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
