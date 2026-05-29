import { CheckoutPage } from '@/features/public/CheckoutPage';
import { getShippingFee } from '@/lib/settings';
export default async function Page() { return <CheckoutPage locale="fr" shippingFee={await getShippingFee()} />; }
