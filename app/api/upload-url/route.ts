import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supaServer } from "@/lib/supa";

export async function POST(req: Request) {
  const { filename, contentType, size } = await req.json();
  if (!filename || !contentType) return new NextResponse("Bad Request", { status: 400 });

  const supabase = await supaServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);
  const fileKey = `${user.id}/${Date.now()}-${filename}`;

  const { data, error } = await admin.storage.from("screenshots").createSignedUploadUrl(fileKey);
  if (error) return new NextResponse(error.message, { status: 500 });

  return NextResponse.json({ url: data.signedUrl, fileKey });
}
