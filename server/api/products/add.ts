import { Product } from '~~/server/models/Product'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, category } = body

  const newProduct = new Product({ name, category })
  await newProduct.save()

  return { message: 'Product added successfully' }
})