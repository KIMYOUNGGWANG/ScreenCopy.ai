import { NextResponse } from "next/server";
import { supaServer } from "@/lib/supa";

export async function POST(req: Request) {
  const supa = await supaServer();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { fileKey, contentType, size } = await req.json();
  await supa.from("screenshot_uploads").insert({
    user_id: user.id, 
    file_key: fileKey, 
    content_type: contentType, 
    size
  });

  return NextResponse.json({ ok: true });
}
