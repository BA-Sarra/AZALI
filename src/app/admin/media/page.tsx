import { AdminFrame } from '@/components/admin/AdminFrame';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function MediaPage() {
  return (
    <AdminFrame>
      <h1 className="font-display text-5xl">Media</h1>
      <p className="mt-4 text-bark/70">Upload files to Cloudinary, then copy the generated public URL into products, pages, or settings.</p>
      <div className="mt-8"><MediaUploader /></div>
    </AdminFrame>
  );
}
