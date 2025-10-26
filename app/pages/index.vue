<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
const { data: productsData, error } = await useAsyncData('products', () =>
  fetch('/products.json')
    .then(res => res.json())
    .catch(err => console.error('Error fetching products:', err))
)

if (error) {
  console.error('Failed to fetch products:', error)
}
useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div>
    <div class="flex items-center justify-center w-full h-screen top-0 p-0 m-0">
      <NuxtImg placeholder class="drop-shadow-lg h-96" :src="'/logo-kare.svg'" />
    </div>
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">
      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>

      <ImagePlaceholder />

      <ULandingLogos :title="page.logos.title" align="center">
        <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon"
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white" />
      </ULandingLogos>
    </ULandingHero>

    <ULandingSection :title="page.features.title" :description="page.features.description"
      :headline="page.features.headline">
      <UPageGrid id="features" class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>

    <div>
      <ULandingSection v-if="productsData && productsData.products" :title="'Ürünlerimiz'"
        :description="'Bilim ve Teknoloji setlerimiz'">
        <UPageGrid id="products" class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
          <ULandingCard v-for="(product, index) in productsData.products" :key="index" color="primary"
            orientation="vertical" class="flex flex-col items-center justify-center h-full text-center p-6">
            <!-- Product Image -->
            <img :src="product.image" class="w-full h-48 object-cover rounded-md mb-4" />

            <!-- Product Text (Title and Description) -->
            <div>
              <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
              <p class="text-sm text-gray-500">{{ product.description }}</p>
            </div>

            <!-- Button centered at the bottom -->
            <div class="w-full flex justify-center mt-4">
              <UButton :to="'/product?id=' + product.id" target="_blank">
                Ürün Videosu
              </UButton>
            </div>
          </ULandingCard>
        </UPageGrid>
      </ULandingSection>
    </div>


    <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title"
      :description="page.testimonials.description">
      <UPageColumns id="testimonials" class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10">
      <ULandingCTA v-bind="page.cta" :card="false" />
    </ULandingSection>

    <ULandingSection id="faq" :title="page.faq.title" :description="page.faq.description"
      class="scroll-mt-[var(--header-height)]">
      <ULandingFAQ multiple :items="page.faq.items" :ui="{
        button: {
          label: 'font-semibold',
          trailingIcon: {
            base: 'w-6 h-6'
          }
        }
      }" class="max-w-4xl mx-auto" />
    </ULandingSection>
  </div>
</template>
