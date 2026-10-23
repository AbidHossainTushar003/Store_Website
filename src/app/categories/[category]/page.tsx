import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogPage } from '@/features/catalog/catalog-page';
import { getCategoryBySlug, getCatalogProducts } from '@/features/catalog/catalog-data';
import { CatalogRetryButton } from '@/features/catalog/catalog-retry-button';
import { homeCategories } from '@/features/home/home-page.mock';

type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

function validSort(value: string): 'title-asc' | 'title-desc' {
  return value === 'title-desc' ? 'title-desc' : 'title-asc';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  return category
    ? {
        title: `${category.name} products`,
        description: `Browse ${category.name} listings approved for public display.`,
      }
    : { title: 'Category not found' };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ category: categorySlug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const result = await getCatalogProducts();
  if (!result.ok) {
    return (
      <section className="catalog-page" aria-labelledby="catalog-heading">
        <p className="eyebrow">Shopademia marketplace</p>
        <h1 id="catalog-heading">{category.name}</h1>
        <div className="catalog-unavailable" role="alert">
          <p>
            The product catalog could not be loaded. Products for this category are unavailable
            right now.
          </p>
          <CatalogRetryButton />
        </div>
      </section>
    );
  }

  return (
    <CatalogPage
      products={result.products}
      categories={homeCategories}
      title={category.name}
      description={`${category.description}. Category filters currently use illustrative storefront categories.`}
      action="/search"
      initialQuery={firstValue(resolvedSearchParams.q).slice(0, 120)}
      categorySlug={category.slug}
      initialSort={validSort(firstValue(resolvedSearchParams.sort))}
    />
  );
}
