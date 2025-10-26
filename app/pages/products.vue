<template>
    <UContainer class="py-8 flex space-x-8">
      <!-- Sol Taraf: Kategoriler -->
      <aside class="w-1/5 text-white space-y-4">
        <h2 class="text-lg font-bold mb-4">Kategoriler</h2>
        
        <!-- Ana Kategoriler -->
        <ul class="space-y-2">
          <li
            v-for="mCat in mainCategories"
            :key="mCat"
            class="cursor-pointer hover:text-blue-500"
            :class="{ 'font-semibold': selectedMainCategory === mCat }"
            @click="selectMainCategory(mCat)"
          >
            {{ mCat }}
          </li>
        </ul>
        
        <!-- Alt Kategoriler -->
        <div v-if="selectedMainCategory && filteredSubCategories.length" class="mt-4">
          <h3 class="text-sm font-bold mb-2">{{ selectedMainCategory }} Alt Kategoriler</h3>
          <ul class="space-y-2">
            <li
              v-for="sCat in filteredSubCategories"
              :key="sCat"
              class="cursor-pointer hover:text-blue-500"
              :class="{ 'font-semibold': selectedSubCategory === sCat }"
              @click="selectSubCategory(sCat)"
            >
              {{ sCat }}
            </li>
          </ul>
        </div>
  
        <!-- Sınıflar -->
        <div v-if="selectedSubCategory && filteredClassCategories.length" class="mt-4">
          <h3 class="text-sm font-bold mb-2">{{ selectedSubCategory }} Sınıflar</h3>
          <ul class="space-y-2">
            <li
              v-for="cCat in filteredClassCategories"
              :key="cCat"
              class="cursor-pointer hover:text-blue-500"
              :class="{ 'font-semibold': selectedClassCategory === cCat }"
              @click="selectClassCategory(cCat)"
            >
              {{ cCat }}
            </li>
          </ul>
        </div>
      </aside>
  
      <!-- Sağ Taraf: Blog Listesi -->
      <main class="flex-grow">
        <h1 class="text-2xl font-bold mb-6 text-center text-white">Blog Listesi</h1>
        <div v-if="filteredBlogs.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div
            v-for="(blog, index) in filteredBlogs"
            :key="blog._id"
            class="relative rounded-lg shadow-md overflow-hidden flex flex-col group bg-white text-black"
          >
            <NuxtLink :to="`/blogs/${blog._id}`" class="flex flex-col flex-grow">
              <!-- Blog Görseli -->
              <div class="overflow-hidden w-full h-48">
                <img
                  :src="blog.imageUrl || '/images/blogs/default-product.webp'"
                  :alt="(blog.title || blog.name) || 'Ürün'"
                  class="w-full h-full object-cover group-hover:scale-110 duration-500"
                />
              </div>
              <!-- Blog Bilgileri -->
              <div class="p-4 flex flex-col flex-grow">
                <h2 class="text-lg font-black mb-2">
                  {{ blog.title || blog.name }}
                </h2>
                <p class="text-sm text-gray-700">
                  Açıklama: {{ truncateText(blog.description || blog.category, 130) }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <p v-else class="text-center text-gray-200">Henüz bu kategoriye ait blog eklenmemiş.</p>
      </main>
    </UContainer>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  
  const mainCategories = ['Deney Atölyesi', 'STEM']
  
  const subCategoryOptions = {
    'Deney Atölyesi': ['Anaokulu', 'İlkokul', 'Ortaokul', 'Lise'],
    'STEM': ['Anaokulu', 'İlkokul', 'Ortaokul', 'Lise']
  }
  
  const classCategoryOptions = {
    'Anaokulu': ['3+ yaş', '4+ yaş', '5+ yaş'],
    'İlkokul': ['1. sınıf', '2. sınıf', '3. sınıf', '4. sınıf'],
    'Ortaokul': ['5. sınıf', '6. sınıf', '7. sınıf', '8. sınıf'],
    'Lise': ['9. sınıf', '10. sınıf', '11. sınıf']
  }
  
  const selectedMainCategory = ref('')
  const selectedSubCategory = ref('')
  const selectedClassCategory = ref('')
  
  const blogs = ref([])
  const loading = ref(true)
  
  onMounted(async () => {
    try {
      blogs.value = await $fetch('/api/blogs')
    } catch (error) {
      console.error('Bloglar alınırken hata oluştu:', error)
    } finally {
      loading.value = false
    }
  })
  
  const filteredSubCategories = computed(() => {
    return subCategoryOptions[selectedMainCategory.value] || []
  })
  
  const filteredClassCategories = computed(() => {
    return classCategoryOptions[selectedSubCategory.value] || []
  })
  
  const filteredBlogs = computed(() => {
    if (!selectedMainCategory.value && !selectedSubCategory.value && !selectedClassCategory.value) {
      return blogs.value
    }
  
    return blogs.value.filter(blog => {
      const categories = blog.category?.split(',').map(c => c.trim()) || []
      if (selectedMainCategory.value && !categories.includes(selectedMainCategory.value)) return false
      if (selectedSubCategory.value && !categories.includes(selectedSubCategory.value)) return false
      if (selectedClassCategory.value && !categories.includes(selectedClassCategory.value)) return false
  
      return true
    })
  })
  
  function selectMainCategory(mCat: string) {
    selectedMainCategory.value = mCat
    selectedSubCategory.value = ''
    selectedClassCategory.value = ''
  }
  
  function selectSubCategory(sCat: string) {
    selectedSubCategory.value = sCat
    selectedClassCategory.value = ''
  }
  
  function selectClassCategory(cCat: string) {
    selectedClassCategory.value = cCat
  }
  
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }
  </script>
  
  <style scoped>
  h2 {
    color: #1e3a8a;
  }
  </style>
  