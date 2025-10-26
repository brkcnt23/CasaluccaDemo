<template>
  <section class="py-8">
    <h1 class="text-3xl font-bold text-center mb-8">
      Ürünlerimiz
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      <div
        v-for="(blog, index) in blogs"
        :key="index"
        class="relative backdrop-blur-md rounded-lg shadow-md overflow-hidden flex flex-col group"
      >
        <NuxtLink
          :href="`/blogs/${blog._id}`"
          class="flex flex-col flex-grow"
        >
          <div class="overflow-hidden w-full h-full">
            <img
              :src="blog.imageUrl || '/images/blogs/default-product.webp'"
              :alt="blog.title"
              class="w-full h-48 object-cover group-hover:scale-110 duration-500"
            >
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h2 class="text-lg font-black mb-2">
              {{ blog.title }}
            </h2>
            <p class="text-black dark:text-white text-sm">
              {{ truncateText(blog.description, 130) }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const blogs = ref([])
const fetchBlogs = async () => {
  try {
    blogs.value = await $fetch('/api/blogs')
  } catch (error) {
    console.error('Bloglar alınırken bir hata oluştu:', error)
  }
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

onMounted(() => {
  fetchBlogs()
})
</script>
