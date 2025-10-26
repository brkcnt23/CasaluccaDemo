import { Product } from '~~/server/models/Product'

export default defineEventHandler(async () => {
  return await Product.find()
})