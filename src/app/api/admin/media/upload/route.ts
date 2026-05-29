import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v2 as cloudinary } from 'cloudinary';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/session';

export const runtime = 'nodejs';

const allowedFolders = new Set(['products', 'pages', 'artist', 'brand-video']);

function assertCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary is not configured. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
}

function sanitizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/-+/g, '-').slice(0, 80);
}

export async function POST(request: Request) {
  const session = await verifyAdminSessionToken(cookies().get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    assertCloudinaryConfig();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = String(formData.get('folder') || 'products');

    if (!file || !file.name) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    if (!allowedFolders.has(folder)) return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type || 'application/octet-stream'};base64,${bytes.toString('base64')}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `azali/${folder}`,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      filename_override: sanitizeFileName(file.name)
    });

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
