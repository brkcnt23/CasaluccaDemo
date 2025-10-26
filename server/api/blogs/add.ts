import fs from 'fs/promises'
import path from 'path'
import formidable from 'formidable'
import sharp from 'sharp'
import { Blog } from '~~/server/models/Blog'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig() // Runtime config'i al
  const uploadDir = runtimeConfig.public.FILE_STORAGE_PATH // Dosyaların kaydedileceği dizin
  const publicUrlBase = 'https://depo.metamente.net/public/images/' // Görselin URL temeli

  await fs.mkdir(uploadDir, { recursive: true }) // Eğer klasör yoksa oluştur

  const form = formidable({
    multiples: false,
    keepExtensions: true
  })

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    console.log('Gelen Alanlar:', fields)
    console.log('Gelen Dosyalar:', files)

    const title = fields.title?.toString() || ''
    const description = fields.description?.toString() || ''
    const videoUrl = fields.videoUrl?.toString() || ''
    const category = fields.category?.toString() || ''

    let imageUrl = `${publicUrlBase}default-product.webp`

    if (files.photo) {
      const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo // Tek bir dosya varsa doğrudan al

      if (photo.filepath) {
        try {
          const buffer = await fs.readFile(photo.filepath)

          const processedImage = await sharp(buffer)
            .resize({ width: 1500, height: 1500, fit: 'inside' })
            .webp({ quality: 50 })
            .toBuffer()

          const filename = `blog-${Date.now()}.webp`
          const filePath = path.join(uploadDir, filename)
          await fs.writeFile(filePath, processedImage)

          imageUrl = `${publicUrlBase}${filename}`
          await fs.unlink(photo.filepath) // Geçici dosyayı sil
        } catch (error) {
          console.error('Fotoğraf işleme hatası:', error)
          throw createError({
            statusCode: 500,
            message: 'Fotoğraf işlenemedi'
          })
        }
      } else {
        console.error('Fotoğraf dosyasının yolu bulunamadı:', photo)
        throw createError({
          statusCode: 400,
          message: 'Fotoğraf dosyası eksik'
        })
      }
    }

    // Blog kaydet
    const blog = new Blog({
      title,
      description,
      videoUrl,
      imageUrl // Görsel URL'sini doğru alana kaydet
    })

    console.log('Kaydedilen Blog:', blog)

    await blog.save()
    return { message: 'Blog başarıyla eklendi', blog }
  } catch (error) {
    console.error('Blog ekleme sırasında bir hata oluştu:', error)
    throw createError({
      statusCode: 500,
      message: 'Blog eklenirken bir hata oluştu'
    })
  }
})
