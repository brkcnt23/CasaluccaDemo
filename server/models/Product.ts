import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true } // e.g., "Deney Atölyesi, Anaokulu, 3+ yaş"
})

export const Product = mongoose.model('Product', ProductSchema)