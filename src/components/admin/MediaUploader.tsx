'use client';

import { useState } from 'react';

export function MediaUploader() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  async function upload(formData: FormData) {
    setIsUploading(true);
    setMessage('Uploading to Cloudinary...');
    setUrl('');

    try {
      const response = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      setUrl(data.url);
      setMessage('Uploaded. Copy this URL into products, pages, or settings.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={upload} className="card grid gap-5 p-6">
      <div>
        <label className="label">Media folder</label>
        <select className="input" name="folder">
          <option value="products">Products</option>
          <option value="pages">Pages</option>
          <option value="artist">Artist</option>
          <option value="brand-video">Brand video</option>
        </select>
      </div>
      <div>
        <label className="label">File</label>
        <input className="input" name="file" type="file" accept="image/*,video/*" required />
      </div>
      <button className="btn-primary" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload to Cloudinary'}</button>
      {message && <p className="text-sm text-saddle">{message}</p>}
      {url && <input className="input" readOnly value={url} onFocus={(event) => event.currentTarget.select()} />}
    </form>
  );
}
