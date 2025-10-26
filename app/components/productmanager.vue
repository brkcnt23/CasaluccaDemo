<template>
  <div class="container mx-auto py-6">
    <h1 class="text-2xl font-bold mb-4 text-center">Product Manager</h1>

    <!-- Landing Card for Adding New Products -->
    <div class="landing-card shadow-lg rounded-lg overflow-hidden mx-auto max-w-md">
      <div class="landing-card-content flex flex-col p-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Add a New Product</h2>

        <!-- Add New Product Form -->
        <form @submit.prevent="addProduct" enctype="multipart/form-data">
          <div class="mb-4">
            <input
              v-model="newProduct.name"
              id="name"
              type="text"
              placeholder="Enter product name"
              class="input-field"
              required
            />
          </div>

          <div class="mb-4">
            <textarea
              v-model="newProduct.description"
              id="description"
              placeholder="Enter product description"
              class="input-field"
              required
            ></textarea>
          </div>

          <!-- File Input for Image Upload -->
          <div class="mb-4">
            <input
              type="file"
              @change="handleFileUpload"
              accept="image/*"
              class="input-field"
              required
            />
          </div>

          <div class="mb-4">
            <input
              v-model="newProduct.videoUrl"
              id="videoUrl"
              type="text"
              placeholder="Enter video URL"
              class="input-field"
              required
            />
          </div>

          <!-- Add Product Button Inside the Card -->
          <button type="submit" class="btn-primary w-full">Add Product</button>
        </form>
      </div>
    </div>

    <!-- Product List -->
    <div v-if="products.length" class="mt-8">
      <h2 class="text-xl font-bold mb-4 text-center">Existing Products</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="product in products"
          :key="product.id"
          class="border p-4 rounded shadow-sm"
        >
          <img :src="product.image" alt="product.name" class="w-full h-64 object-cover mb-2 rounded" />
          <h3 class="text-lg font-bold text-center">{{ product.name }}</h3>
          <p class="text-center">{{ product.description }}</p>

          <div class="flex justify-between mt-4">
            <button @click="editProduct(product)" class="btn-secondary">Edit</button>
            <button @click="deleteProduct(product.id)" class="btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Ref for products
const products = ref([])

const newProduct = ref({
  name: '',
  description: '',
  image: '', // Image will be uploaded, and this field will be populated with the file path or URL.
  videoUrl: ''
})

// File data holder
let selectedImageFile = null

// Handle file upload event
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  selectedImageFile = file
}

// Function to add a new product (with image upload)
const addProduct = async () => {
  if (newProduct.value.name && newProduct.value.description && selectedImageFile && newProduct.value.videoUrl) {
    const formData = new FormData()

    // Append product details
    formData.append('name', newProduct.value.name)
    formData.append('description', newProduct.value.description)
    formData.append('videoUrl', newProduct.value.videoUrl)

    // Append the file
    formData.append('image', selectedImageFile)

    try {
      // Replace this with your actual API endpoint to handle the file upload and product addition
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (response.ok) {
        // Assume the result contains the file URL after successful upload
        newProduct.value.image = result.imageUrl // Set the uploaded image URL

        // Add the product to the list
        const newId = products.value.length ? products.value[products.value.length - 1].id + 1 : 1
        products.value.push({ id: newId, ...newProduct.value })

        // Reset form
        newProduct.value = { name: '', description: '', image: '', videoUrl: '' }
        selectedImageFile = null
      } else {
        console.error('Failed to add product:', result.error)
      }
    } catch (error) {
      console.error('Error uploading product:', error)
    }
  }
}

// Edit a product
const editProduct = (product) => {
  const index = products.value.findIndex(p => p.id === product.id)
  const updatedProduct = prompt('Edit product details', JSON.stringify(product))
  if (updatedProduct) {
    products.value[index] = JSON.parse(updatedProduct)
  }
}

// Delete a product
const deleteProduct = (id) => {
  products.value = products.value.filter(p => p.id !== id)
}
</script>

<style scoped>
/* Landing Card Styles */
.landing-card {
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.landing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Input Field Styling */
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 0.5rem;
}

/* Button Styling */
.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.text-center {
  text-align: center;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: bold;
}

/* Responsive Layout */
@media (max-width: 640px) {
  .landing-card-content h2 {
    font-size: 1.75rem;
  }

  .landing-card-content p {
    font-size: 1rem;
  }
}
</style>
