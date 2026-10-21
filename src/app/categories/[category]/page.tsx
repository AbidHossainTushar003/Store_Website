import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogPage } from '@/features/catalog/catalog-page';
import { getCategoryBySlug, getDemoProducts } from '@/features/catalog/catalog-data';
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
  params: { category: string };
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  return category
    ? {
        title: `${category.name} examples`,
        description: `Browse illustrative ${category.name} examples in the fictional Shopademia catalogue.`,
      }
    : { title: 'Category not found' };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: SearchParams;
}) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const result = await getDemoProducts();
  if (!result.ok) {
    return (
      <section className="catalog-page" aria-labelledby="catalog-heading">
        <p className="eyebrow">Illustrative category · demo only</p>
        <h1 id="catalog-heading">{category.name}</h1>
        <p className="catalog-unavailable" role="alert">
          The demo catalogue could not be loaded. Products for this example category are unavailable
          right now.
        </p>
      </section>
    );
  }

  return (
    <CatalogPage
      products={result.products}
      categories={homeCategories}
      title={category.name}
      description={`${category.description}. This is an illustrative category, not an API-backed marketplace taxonomy.`}
      action="/search"
      initialQuery={firstValue(searchParams.q).slice(0, 120)}
      categorySlug={category.slug}
      initialSort={validSort(firstValue(searchParams.sort))}
    />
  );
}
