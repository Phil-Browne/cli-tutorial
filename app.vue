<template>
  <NuxtLoadingIndicator color="repeating-linear-gradient(90deg, #6b2d8b 0%, #00bcd4 50%, #e40046 100%)" :height="3" :duration="2000" />
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
  </NuxtLayout>
  <ToastContainer />
</template>
