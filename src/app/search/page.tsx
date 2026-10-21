import type { Metadata } from 'next';
import { CatalogPage } from '@/features/catalog/catalog-page';
import { getDemoProducts } from '@/features/catalog/catalog-data';
import { homeCategories } from '@/features/home/home-page.mock';

export const metadata: Metadata = {
  title: 'Search demo products',
  description: 'Search the fictional Shopademia demo catalogue.',
};

type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

function validSort(value: string): 'title-asc' | 'title-desc' {
  return value === 'title-desc' ? 'title-desc' : 'title-asc';
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = await getDemoProducts();
  if (!result.ok) {
    return (
      <section className="catalog-page" aria-labelledby="catalog-heading">
        <p className="eyebrow">Fictional Shopademia demo catalogue</p>
        <h1 id="catalog-heading">Search demo products</h1>
        <p className="catalog-unavailable" role="alert">
          The demo catalogue could not be loaded. Search and browsing are unavailable right now.
        </p>
      </section>
    );
  }

  const query = firstValue(searchParams.q).slice(0, 120);
  const category = firstValue(searchParams.category);
  const categorySlug = homeCategories.some((item) => item.slug === category) ? category : undefined;

  return (
    <CatalogPage
      products={result.products}
      categories={homeCategories}
      title="Search demo products"
      description="Search and sort the fictional catalogue loaded from the Shopademia development API."
      action="/search"
      initialQuery={query}
      categorySlug={categorySlug}
      initialSort={validSort(firstValue(searchParams.sort))}
    />
  );
}
