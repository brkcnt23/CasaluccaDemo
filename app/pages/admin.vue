<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4 text-center">Product Manager</h1>

        <!-- Landing Card for Adding New Products -->
        <div class="landing-card shadow-lg rounded-lg overflow-hidden mx-auto max-w-md">
            <div class="landing-card-content flex flex-col p-6">
                <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Add a New Product</h2>

                <!-- Add New Product Form -->
                <form @submit.prevent="addProduct">
                    <div class="mb-4">
                        <input v-model="newProduct.name" id="name" type="text" placeholder="Enter product name"
                            class="input-field" required />
                    </div>

                    <div class="mb-4">
                        <textarea v-model="newProduct.description" id="description"
                            placeholder="Enter product description" class="input-field" required></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 mb-1">Upload Image</label>
                        <input type="file" @change="handleFileUpload" class="input-field-file" required />
                    </div>

                    <div class="mb-4">
                        <input v-model="newProduct.videoUrl" id="videoUrl" type="text" placeholder="Enter video URL"
                            class="input-field" required />
                    </div>

                    <!-- Add Product Button Inside the Card -->
                    <button type="submit" class="btn-primary w-full">Add Product</button>
                </form>
            </div>
        </div>

        <!-- Product List -->
        <div v-if="products.length">
            <h2 class="text-xl font-bold mb-4">Existing Products</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="product in products" :key="product.id" class="border p-4 rounded">
                    <img :src="product.image" alt="product.name" class="w-full object-cover mb-2"
                        style="width: 200px; height: 300px;" />
                    <h3 class="text-lg font-bold">{{ product.name }}</h3>
                    <p>{{ product.description }}</p>

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
import axios from 'axios'

const products = ref([
    { id: 1, name: 'Bilim Seti 1', description: 'Bilim seti açıklaması', image: '/cat.jpg', videoUrl: 'https://youtube.com/example1' },
    { id: 2, name: 'Teknoloji Seti 2', description: 'Teknoloji seti açıklaması', image: '/cat.jpg', videoUrl: 'https://youtube.com/example2' },
])

const newProduct = ref({
    name: '',
    description: '',
    image: '',
    videoUrl: ''
})

const selectedFile = ref(null)

// Handle File Upload
const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0]
}

// Add a new product
const addProduct = async () => {
    if (selectedFile.value) {
        const formData = new FormData()
        formData.append('image', selectedFile.value)

        try {
            // Upload image to server
            const response = await axios.post('/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // Get the image URL from the server response
            newProduct.value.image = response.data.path

            // Now push the new product to the list
            const newId = products.value.length ? products.value[products.value.length - 1].id + 1 : 1
            products.value.push({ id: newId, ...newProduct.value })
            newProduct.value = { name: '', description: '', image: '', videoUrl: '' } // Reset the form
            selectedFile.value = null
        } catch (error) {
            console.error('Failed to upload image:', error)
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

.input-field-file {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
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