<template>
  <div>
    <div id="home" class="absolute top-0" />
    <UContainer class="py-8">
      <div class="flex justify-center items-center mb-8">
        <h1 class="text-2xl font-bold text-center">
          Admin Blog Yönetimi
        </h1>
      </div>

      <UCard class="backdrop-blur-xl !bg-opacity-0 overflow-hidden relative pt-6">
        <UButton class="absolute top-0 left-0 text-center" block size="xs" variant="soft" label="Çıkış Yap" color="red"
          @click="handleLogout" />

        <div class="relative overflow-hidden h-96 mb-4 flex items-center justify-center">
          <img :src="photoPreview || '/images/blogs/default-product.webp'"
            class="absolute w-full h-full object-cover opacity-50" />
          <UFormGroup label="Fotoğraf" class="p-20 z-10">
            <UInput type="file" @input="handleFileInput" />
          </UFormGroup>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <UFormGroup label="Başlık">
            <UInput v-model="state.title" placeholder="Blog başlığını giriniz..." />
          </UFormGroup>

          <UFormGroup label="Açıklama">
            <UTextarea v-model="state.description" placeholder="Blog içeriğini giriniz..." />
          </UFormGroup>

          <UFormGroup label="Video URL">
            <UInput v-model="state.videoUrl" placeholder="Video URL'sini giriniz..." />
          </UFormGroup>

          <!-- Category Selection -->
          <UFormGroup label="Ana Kategori">
            <USelect v-model="state.mainCategory" :options="mainCategories" @change="handleMainCategoryChange" />
          </UFormGroup>

          <UFormGroup label="Alt Kategori">
            <USelect v-model="state.subCategory" :options="subCategories" @change="handleSubCategoryChange" />
          </UFormGroup>

          <UFormGroup v-if="classCategories.length" label="Sınıf">
            <USelect v-model="state.classCategory" :options="classCategories" />
          </UFormGroup>

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm">Blog başarıyla oluşturuldu!</p>

          <div class="space-y-4">
            <UButton type="submit" block color="primary">Oluştur</UButton>
            <UButton type="reset" block color="red" variant="outline" @click="resetForm">
              Formu Temizle
            </UButton>
          </div>
        </form>
      </UCard>
      <MMBlogListAdmin />
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Panel',
  ogTitle: 'Panel',
  description: 'Panel',
  ogDescription: 'Panel'
})

const state = ref({
  title: '',
  description: '',
  videoUrl: '',
  photo: null,
  mainCategory: '',
  subCategory: '',
  classCategory: ''
})

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

const subCategories = ref([])
const classCategories = ref([])

const handleMainCategoryChange = () => {
  state.value.subCategory = ''
  state.value.classCategory = ''
  subCategories.value = subCategoryOptions[state.value.mainCategory] || []
  classCategories.value = []
}

const handleSubCategoryChange = () => {
  state.value.classCategory = ''
  classCategories.value = classCategoryOptions[state.value.subCategory] || []
}

const photoPreview = ref(null)
const error = ref('')
const success = ref(false)

const handleFileInput = (event) => {
  state.value.photo = event.target.files[0]
  if (state.value.photo) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(state.value.photo)
  } else {
    photoPreview.value = null
  }
}

const handleSubmit = async () => {
  const toast = useToast()
  try {
    const formData = new FormData()
    formData.append('title', state.value.title)
    formData.append('description', state.value.description)
    formData.append('videoUrl', state.value.videoUrl)
    formData.append('category', `${state.value.mainCategory}, ${state.value.subCategory}, ${state.value.classCategory}`)
    if (state.value.photo) {
      formData.append('photo', state.value.photo)
    }

    await $fetch('/api/blogs/add', {
      method: 'POST',
      body: formData
    })

    resetForm()
    success.value = true
    toast.add({ title: 'Blog başarıyla eklendi!', icon: 'i-heroicons-check-circle', color: 'green' })
  } catch (err) {
    console.error('Blog ekleme hatası:', err)
    error.value = 'Blog eklenirken bir hata oluştu.'
    toast.add({ title: 'Hata!', icon: 'i-heroicons-x-circle', color: 'red' })
  }
}

const resetForm = () => {
  state.value = {
    title: '',
    description: '',
    videoUrl: '',
    photo: null,
    mainCategory: '',
    subCategory: '',
    classCategory: ''
  }
  photoPreview.value = null
  subCategories.value = []
  classCategories.value = []
  error.value = ''
  success.value = false
}

const handleLogout = () => {
  const authCookie = useCookie('auth_token')
  authCookie.value = null
  navigateTo('/')
}
</script>
