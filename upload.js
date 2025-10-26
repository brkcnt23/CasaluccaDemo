const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../public/images/products')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

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
  
        // Send the new product data to backend to save in products.json
        await axios.post('/api/add-product', newProduct.value)
  
        // Now push the new product to the list locally
        const newId = products.value.length ? products.value[products.value.length - 1].id + 1 : 1
        products.value.push({ id: newId, ...newProduct.value })
        newProduct.value = { name: '', description: '', image: '', videoUrl: '' } // Reset the form
        selectedFile.value = null
      } catch (error) {
        console.error('Failed to upload image or add product:', error)
      }
    }
  }

  
// Upload endpoint
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const imagePath = `/images/products/${req.file.filename}`
  res.status(200).json({ path: imagePath })
})

module.exports = router
