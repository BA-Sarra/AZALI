import { OrderSuccessPage } from '@/features/public/OrderSuccessPage';
export default function Page({ params }: { params: { orderNumber: string } }) { return <OrderSuccessPage locale="en" orderNumber={params.orderNumber} />; }
