import type { Metadata } from 'next';
import { CatalogPage } from '@/features/catalog/catalog-page';
import { getCatalogProducts } from '@/features/catalog/catalog-data';
import { CatalogRetryButton } from '@/features/catalog/catalog-retry-button';
import { homeCategories } from '@/features/home/home-page.mock';

export const metadata: Metadata = {
  title: 'Search products',
  description: 'Search Shopademia listings approved for public display.',
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
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const result = await getCatalogProducts();
  if (!result.ok) {
    return (
      <section className="catalog-page" aria-labelledby="catalog-heading">
        <p className="eyebrow">Shopademia marketplace</p>
        <h1 id="catalog-heading">Search products</h1>
        <div className="catalog-unavailable" role="alert">
          <p>The product catalog could not be loaded. Search and browsing are unavailable right now.</p>
          <CatalogRetryButton />
        </div>
      </section>
    );
  }

  const query = firstValue(resolvedSearchParams.q).slice(0, 120);
  const category = firstValue(resolvedSearchParams.category);
  const categorySlug = homeCategories.some((item) => item.slug === category) ? category : undefined;

  return (
    <CatalogPage
      products={result.products}
      categories={homeCategories}
      title="Search products"
      description="Search and sort products loaded from the Shopademia development API."
      action="/search"
      initialQuery={query}
      categorySlug={categorySlug}
      initialSort={validSort(firstValue(resolvedSearchParams.sort))}
    />
  );
}
