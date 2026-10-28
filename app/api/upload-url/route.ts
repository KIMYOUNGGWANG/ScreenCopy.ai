import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { filename, contentType } = await request.json()

  if (!filename || !contentType) {
    return new NextResponse('Missing filename or contentType', { status: 400 })
  }

  const fileExtension = filename.split('.').pop()
  const fileKey = `${user.id}/${uuidv4()}.${fileExtension}` // Store under user's ID

  try {
    const { data, error } = await supabase.storage
      .from('screenshots')
      .createSignedUploadUrl(fileKey, {
        upsert: false, // Do not overwrite existing files
        contentType: contentType,
      })

    if (error) {
      console.error('Error creating signed upload URL:', error)
      return new NextResponse(`Failed to create signed URL: ${error.message}`, {
        status: 500,
      })
    }

    // Save upload metadata to database
    const { error: dbError } = await supabase.from('screenshot_uploads').insert({
      user_id: user.id,
      file_key: fileKey,
      content_type: contentType,
      size: 0, // Size will be updated after actual upload
    })

    if (dbError) {
      console.error('Error saving upload metadata:', dbError)
      return new NextResponse(`Failed to save upload metadata: ${dbError.message}`, {
        status: 500,
      })
    }

    return NextResponse.json({ signedUrl: data.signedId, fileKey })
  } catch (error: any) {
    console.error('Unexpected error in upload-url:', error)
    return new NextResponse(`Internal Server Error: ${error.message}`, {
      status: 500,
    })
  }
}