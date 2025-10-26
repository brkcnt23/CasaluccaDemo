import mongoose from 'mongoose'

interface IBlog extends mongoose.Document {
  title: string
  description: string
  category?: string
  imageUrl?: string
  videoUrl?: string
  createdAt: Date
}

const BlogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: String,
  imageUrl: String,
  videoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema)
