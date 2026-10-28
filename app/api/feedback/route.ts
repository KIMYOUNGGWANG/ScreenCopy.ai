import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { generationId, copyIndex, rating } = await request.json()

  if (!generationId || copyIndex === undefined || rating === undefined) {
    return new NextResponse('Missing required fields', { status: 400 })
  }

  try {
    const { error } = await supabase.from('copy_feedback').insert({
      generation_id: generationId,
      user_id: user.id,
      copy_index: copyIndex,
      user_rating: rating,
    })

    if (error) {
      console.error('Error saving feedback:', error)
      return new NextResponse(`Failed to save feedback: ${error.message}`, {
        status: 500,
      })
    }

    return new NextResponse('Feedback saved successfully', { status: 200 })
  } catch (error: any) {
    console.error('Unexpected error saving feedback:', error)
    return new NextResponse(`Internal Server Error: ${error.message}`, {
      status: 500,
    })
  }
}