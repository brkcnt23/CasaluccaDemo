<template>
  <div>
    <section class="py-8 px-4 max-w-4xl mx-auto space-y-6">
      <UButton
        block
        label="Geri Dön"
        icon="i-heroicons-arrow-left"
        variant="outline"
        size="xs"
        class="rounded-lg"
        @click="goBack"
      />
      <div
        v-if="blog"
        class="space-y-6 bg-black/50 rounded-lg p-10"
      >
        <div>
          <img
            :src="blog.imageUrl || '/images/blogs/default-product.webp'"
            :alt="blog.title"
            class="w-screen h-screen fixed left-0 top-0 -z-10 object-cover blur-md"
          >
          <div class="fixed bg-black/50 -z-[5] w-full h-full left-0 top-0" />
        </div>
        <img
          :src="blog.imageUrl || '/images/blogs/default-product.webp'"
          :alt="blog.title"
          class="w-full h-full object-cover rounded-lg shadow-md"
        >
        <h1 class="text-4xl font-bold text-primary-500">
          {{ blog.title }}
        </h1>
        <p class="text-white leading-relaxed text-md text-center">
          {{ blog.description }}
        </p>
        <div
          v-if="blog.videoUrl"
          class="mt-6"
        >
          <h2 class="text-xl font-semibold text-primary-500 mb-2">
            Video
          </h2>
          <div class="aspect-w-16 aspect-h-9">
            <iframe
              :src="getYoutubeEmbedUrl(blog.videoUrl)"
              class="w-full h-full rounded-lg shadow-md"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
      <p
        v-else
        class="text-center text-gray-500"
      >
        Ürün yükleniyor...
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const blog = ref(null)

const fetchBlog = async () => {
  try {
    blog.value = await $fetch(`/api/blogs/${route.params.id}`)
  } catch (error) {
    console.error('Blog detayları alınırken bir hata oluştu:', error)
  }
}

const getYoutubeEmbedUrl = (url) => {
  try {
    const urlParams = new URL(url).searchParams
    const videoId = urlParams.get('v')
    if (!videoId) {
      throw new Error('Geçersiz YouTube URL')
    }
    return `https://www.youtube.com/embed/${videoId}`
  } catch (error) {
    console.error('YouTube embed URL oluşturulurken bir hata oluştu:', error)
    return null
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchBlog()
})
</script>
