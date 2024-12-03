import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function uploadFile(file: File) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), 'uploads')
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const filePath = path.join(uploadDir, file.name)
  await writeFile(filePath, buffer)
  return `/uploads/${file.name}`
}