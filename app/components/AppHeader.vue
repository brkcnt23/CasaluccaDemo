<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const links = computed(() => [{
  label: 'Özellikler', // Features yerine Özellikler
  to: '#features',
  icon: 'i-heroicons-cube-transparent',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('products')
}, {
  label: 'Ürünler ve Videolar', // Pricing yerine Fiyatlandırma
  to: '#products',
  icon: 'i-heroicons-credit-card',
  active: activeHeadings.value.includes('products') && !activeHeadings.value.includes('testimonials')
}, {
  label: 'Müşteri Yorumları', // Testimonials yerine Müşteri Yorumları
  to: '#testimonials',
  icon: 'i-heroicons-academic-cap',
  active: activeHeadings.value.includes('testimonials')
}, {
  label: 'SSS', // FAQ yerine SSS (Sıkça Sorulan Sorular)
  to: '#faq',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('faq')
}])


nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#products'),
    document.querySelector('#testimonials'),
    document.querySelector('#faq')
  ])
})
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <Logo />
    </template>
    
    <template #right>
      <UButton label="Mağaza" color="white" variant="ghost" trailing-icon="i-heroicons-arrow-right-20-solid"
        class="hidden lg:flex" />
      <UColorModeButton />

    </template>
    
    <template #panel>
      <UAsideLinks :links="links" />
      <ULink to="/products">Products</ULink>
    </template>
  </UHeader>
</template>