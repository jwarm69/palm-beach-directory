import { supabase } from './supabase'

export type StorageBucket = 'store-images' | 'offer-images' | 'event-images' | 'area-images'

/**
 * Upload a file to Supabase Storage
 * @param bucket - The storage bucket to upload to
 * @param file - The file to upload
 * @param path - Optional custom path/filename
 * @returns Promise with the public URL or null if failed
 */
export async function uploadFile(
  bucket: StorageBucket,
  file: File,
  path?: string
): Promise<string | null> {
  try {
    // Generate a unique filename if path not provided
    const fileName = path || `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}

/**
 * Delete a file from Supabase Storage
 * @param bucket - The storage bucket
 * @param path - The file path to delete
 * @returns Promise with success boolean
 */
export async function deleteFile(
  bucket: StorageBucket,
  path: string
): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

/**
 * Get the public URL for a stored file
 * @param bucket - The storage bucket
 * @param path - The file path
 * @returns The public URL
 */
export function getFileUrl(bucket: StorageBucket, path: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return publicUrl
}

/**
 * List files in a storage bucket
 * @param bucket - The storage bucket
 * @param folder - Optional folder path
 * @returns Promise with array of file objects
 */
export async function listFiles(
  bucket: StorageBucket,
  folder?: string
): Promise<any[]> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0
      })

    if (error) {
      console.error('List files error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('List files error:', error)
    return []
  }
}

/**
 * Validate file before upload
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @param allowedTypes - Array of allowed MIME types
 * @returns Validation result with error message if invalid
 */
export function validateFile(
  file: File,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
): { valid: boolean; error?: string } {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB`
    }
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`
    }
  }

  return { valid: true }
}

/**
 * Resize image file using Canvas API
 * @param file - The image file to resize
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @param quality - JPEG quality (0-1)
 * @returns Promise with resized file
 */
export function resizeImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      // Set canvas size and draw image
      canvas.width = width
      canvas.height = height
      ctx?.drawImage(img, 0, 0, width, height)

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(resizedFile)
          } else {
            reject(new Error('Failed to resize image'))
          }
        },
        file.type,
        quality
      )
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Upload image with automatic resizing and validation
 * @param bucket - The storage bucket
 * @param file - The image file
 * @param options - Upload options
 * @returns Promise with public URL or null
 */
export async function uploadImage(
  bucket: StorageBucket,
  file: File,
  options: {
    path?: string
    maxSizeMB?: number
    maxWidth?: number
    maxHeight?: number
    quality?: number
  } = {}
): Promise<string | null> {
  const {
    path,
    maxSizeMB = 5,
    maxWidth = 1200,
    maxHeight = 800,
    quality = 0.85
  } = options

  // Validate file
  const validation = validateFile(file, maxSizeMB)
  if (!validation.valid) {
    console.error('File validation failed:', validation.error)
    return null
  }

  try {
    // Resize image if it's too large
    let processedFile = file
    if (file.type.startsWith('image/')) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      
      await new Promise((resolve) => {
        img.onload = resolve
      })

      if (img.width > maxWidth || img.height > maxHeight) {
        processedFile = await resizeImage(file, maxWidth, maxHeight, quality)
      }
    }

    // Upload the processed file
    return await uploadFile(bucket, processedFile, path)
  } catch (error) {
    console.error('Error processing and uploading image:', error)
    return null
  }
}