<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

// Ürün verisi için ref oluştur
const productsData = ref(null)
const pending = ref(true) // Yükleme durumunu takip etmek için

// Route parametresini al
const route = useRoute()
const productId = route.query.id

onMounted(async () => {
    try {
        const response = await fetch('/products.json')
        productsData.value = await response.json()
    } catch (error) {
        console.error('Failed to fetch products:', error)
    } finally {
        pending.value = false // Veriler yüklendiğinde yükleme durumunu kapat
    }
})

// Ürün ID'sine göre ilgili ürünü bul
const product = computed(() => {
    return productsData.value?.products?.find(p => p.id === productId)
})
</script>

<template>
    <div v-if="pending" class="flex items-center justify-center h-screen">
      <p>Yükleniyor...</p>
    </div>
  
    <div v-else-if="product" class="flex flex-col items-center justify-center h-[90vh]"> <!-- Adjusted height to 90vh -->
      <!-- Ürün Başlığı -->
      <h1 class="text-3xl font-bold mb-6 text-center">{{ product.title }}</h1>
      <h3 class="text-3x1 font-bold mb-6 text-center">{{ product.description }}</h3>
      
      <!-- Embed YouTube Video -->
      <iframe
        :src="product.videoUrl"
        class="w-4/5 h-[700px]"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    
    <!-- Ürün bulunamazsa -->
    <div v-else class="flex items-center justify-center h-screen">
      <p>Ürün bulunamadı.</p>
    </div>
  </template>
  
  <style scoped>
/* Burada geçerli bir CSS olmalı */
.landing-card {
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>

