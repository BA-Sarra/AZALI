import { ProductPage } from '@/features/public/ProductPage';
export default function Page({ params }: { params: { slug: string } }) { return <ProductPage locale="fr" slug={params.slug} />; }
