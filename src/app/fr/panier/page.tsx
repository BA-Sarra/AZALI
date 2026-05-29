import { CartPage } from '@/features/public/CartPage';
import { getShippingFee } from '@/lib/settings';
export default async function Page() { return <CartPage locale="fr" shippingFee={await getShippingFee()} />; }
