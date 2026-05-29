import { CategoryPage } from '@/features/public/CategoryPage';
export default function Page({ params }: { params: { slug: string } }) { return <CategoryPage locale="en" slug={params.slug} />; }
