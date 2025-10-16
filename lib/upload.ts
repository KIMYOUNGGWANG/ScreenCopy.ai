import { supaBrowser } from '@/lib/supa-browser'

export async function uploadScreenshot(file: File, userId: string) {
  const supabase = supaBrowser()
  
  // 파일 크기 제한 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB')
  }
  
  // 파일 형식 체크
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }
  
  // Stricter sanitization: Generate a random name to guarantee safety.
  const fileExt = file.name.split('.').pop() || 'png';
  const randomName = Math.random().toString(36).substring(2, 12);
  const fileName = `${userId}/${Date.now()}-${randomName}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('screenshots')
    .upload(fileName, file)
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('screenshots')
    .getPublicUrl(fileName)
  
  return publicUrl
}
