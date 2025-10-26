// server/plugins/db.ts
import mongoose from 'mongoose'

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  mongoose.set('strictQuery', true)
  mongoose.connect(config.mongodbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))
})
