<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>
<style>
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  background: #064236;
}

::-webkit-scrollbar-thumb:hover {
  background: #042821;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}

.bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -10;
  opacity: 0.1;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate(0, 50px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate(0, -50px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(0, 50px);
}
</style>
<template>
    <video autoplay muted loop playsinline class="bg-video">
    <source src="/background.mp4" type="video/mp4">
  </video>
  <AppHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>
