import { AdminFrame } from '@/components/admin/AdminFrame';
import { getContactInfo, getShippingFee } from '@/lib/settings';
import { saveSettings } from '@/app/admin/actions';

export default async function SettingsPage() {
  const [contact, shippingFee] = await Promise.all([getContactInfo(), getShippingFee()]);
  return <AdminFrame><h1 className="font-display text-5xl">Settings</h1><form action={saveSettings} className="card mt-8 grid gap-5 p-6 md:grid-cols-2"><div><label className="label">Shipping fee</label><input className="input" name="shippingFee" type="number" step="0.001" defaultValue={shippingFee} /></div><div><label className="label">Email</label><input className="input" name="email" defaultValue={contact.email} /></div><div><label className="label">Phone</label><input className="input" name="phone" defaultValue={contact.phone} /></div><div><label className="label">Instagram</label><input className="input" name="instagram" defaultValue={contact.instagram} /></div><div><label className="label">Facebook</label><input className="input" name="facebook" defaultValue={contact.facebook} /></div><div><label className="label">Address FR</label><input className="input" name="addressFr" defaultValue={contact.addressFr} /></div><div><label className="label">Address EN</label><input className="input" name="addressEn" defaultValue={contact.addressEn} /></div><button className="btn-primary md:col-span-2">Save settings</button></form></AdminFrame>;
}
