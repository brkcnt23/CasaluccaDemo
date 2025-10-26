<template>
    <div class="login-container">
      <h1 class="text-2xl font-bold mb-4 text-center">Admin Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input v-model="username" type="text" placeholder="Enter Username" class="input-field" required />
        </div>
        <div class="mb-4">
          <input v-model="password" type="password" placeholder="Enter Password" class="input-field" required />
        </div>
        <button type="submit" class="btn-primary w-full">Login</button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const login = async () => {
    try {
      const response = await axios.post('/api/login', {
        username: username.value,
        password: password.value
      })
  
      // Giriş başarılıysa token'ı kaydet (localStorage ya da Vuex kullanılabilir)
      localStorage.setItem('token', response.data.token)
  
      // Admin paneline yönlendirme
      router.push('/admin')
    } catch (error) {
      errorMessage.value = 'Invalid username or password'
    }
  }
  </script>
  
  <style scoped>
  /* Basit stil */
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 0.5rem;
  }
  
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
  </style>
  