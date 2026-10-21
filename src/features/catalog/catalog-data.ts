import { homeCategories, type HomeCategory } from '@/features/home/home-page.mock';

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

export type DemoProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string | null;
  isDemo: true;
};

export type DemoProductResult =
  | { ok: true; products: DemoProduct[] }
  | { ok: false };

export type CatalogSort = 'title-asc' | 'title-desc';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isProductFields(value: unknown): value is Omit<DemoProduct, 'isDemo'> {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    (value.brand === null || typeof value.brand === 'string')
  );
}

export function parseDemoProduct(value: unknown): DemoProduct | undefined {
  if (!isRecord(value) || value.isDemo !== true || !isProductFields(value)) {
    return undefined;
  }
  return { ...value, isDemo: true };
}

export function parseCollectionProduct(value: unknown): DemoProduct | undefined {
  if (
    !isProductFields(value) ||
    (isRecord(value) && 'isDemo' in value && value.isDemo !== true)
  ) {
    return undefined;
  }
  return { ...value, isDemo: true };
}

function isProductResponse(value: unknown): value is { products: unknown[] } {
  return isRecord(value) && Array.isArray(value.products);
}

export async function getDemoProducts(): Promise<DemoProductResult> {
  try {
    const response = await fetch(`${apiBaseUrl}/products`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Shopademia API returned HTTP ${response.status}`);
    }

    const payload: unknown = await response.json();
    if (!isProductResponse(payload)) {
      throw new Error('Shopademia API returned an unexpected demo catalogue response');
    }

    const parsedProducts = payload.products.map(parseDemoProduct);
    if (parsedProducts.some((product) => product === undefined)) {
      throw new Error('Shopademia API returned an unexpected demo catalogue response');
    }

    return {
      ok: true,
      products: parsedProducts.filter((product): product is DemoProduct => product !== undefined),
    };
  } catch (error) {
    console.error('Unable to load the Shopademia demo catalogue.', error);
    return { ok: false };
  }
}

export function getCategoryBySlug(slug: string): HomeCategory | undefined {
  return homeCategories.find((category) => category.slug === slug);
}

export function filterDemoProducts(
  products: DemoProduct[],
  query: string,
  categorySlug: string | undefined,
  sort: CatalogSort,
): DemoProduct[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const filtered = products.filter((product) => {
    const matchesCategory = !category ||
      product.category.toLocaleLowerCase() === category.name.toLocaleLowerCase();
    const searchableText = [
      product.title,
      product.description,
      product.category,
      product.brand ?? '',
    ].join(' ').toLocaleLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  return filtered.sort((left, right) => {
    const comparison = left.title.localeCompare(right.title);
    return sort === 'title-desc' ? -comparison : comparison;
  });
}
