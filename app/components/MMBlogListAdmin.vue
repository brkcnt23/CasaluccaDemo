<template>
  <section class="py-8">
    <h1 class="text-3xl font-bold text-center mb-8">
      Ürünlerimiz
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      <div
        v-for="(blog, index) in blogs"
        :key="index"
        class="relative backdrop-blur-md rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <button
          class="absolute duration-500 hover:scale-150 top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
          @click.stop="openDeleteModal(blog._id)"
        >
          <UIcon name="i-heroicons-trash" />
        </button>
        <NuxtLink
          :href="`/blogs/${blog._id}`"
          class="flex flex-col flex-grow"
        >
          <img
            :src="blog.imageUrl || '/images/blogs/default-product.webp'"
            :alt="blog.title"
            class="w-full h-48 object-cover"
          >
          <div class="p-4 flex flex-col flex-grow">
            <h2 class="text-lg font-semibold mb-2">
              {{ blog.title }}
            </h2>
            <p class="text-white text-xs flex-grow">
              {{ truncateText(blog.description, 130) }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
    >
      <div class="backdrop-blur-xl rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-semibold mb-4">
          Silmek istediğinize emin misiniz?
        </h3>
        <div class="flex justify-end space-x-4">
          <button
            class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            @click="closeDeleteModal"
          >
            Hayır
          </button>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            @click="deleteBlog"
          >
            Evet
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const blogs = ref([])
const isModalOpen = ref(false)
const blogToDelete = ref(null)
const toast = useToast()

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

const openDeleteModal = (blogId) => {
  blogToDelete.value = blogId
  isModalOpen.value = true
}

const closeDeleteModal = () => {
  blogToDelete.value = null
  isModalOpen.value = false
}

const deleteBlog = async () => {
  if (!blogToDelete.value) return

  try {
    await $fetch(`/api/blogs/${blogToDelete.value}`, {
      method: 'DELETE'
    })
    blogs.value = blogs.value.filter(blog => blog._id !== blogToDelete.value)
    toast.add({
      title: 'Başarılı!',
      description: 'Blog başarıyla silindi.',
      color: 'green',
      icon: 'i-heroicons-check-circle'
    })
  } catch (error) {
    console.error('Blog silinirken bir hata oluştu:', error)
    toast.add({
      title: 'Hata!',
      description: 'Blog silinemedi.',
      color: 'red',
      icon: 'i-heroicons-x-circle'
    })
  } finally {
    closeDeleteModal()
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>
