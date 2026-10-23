import { homeCategories, type HomeCategory } from '@/features/home/home-page.mock';
import { getApiBaseUrl } from '@/lib/api-base';

export type StorefrontProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string | null;
  isDemo: boolean;
  priceBdt: number | null;
  stockQuantity: number | null;
};

export type CatalogProductResult =
  | { ok: true; products: StorefrontProduct[] }
  | { ok: false };

export type CatalogSort = 'title-asc' | 'title-desc';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isProductFields(value: unknown): value is StorefrontProduct {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    (value.brand === null || typeof value.brand === 'string') &&
    typeof value.isDemo === 'boolean' &&
    (value.priceBdt === null || (typeof value.priceBdt === 'number' && Number.isInteger(value.priceBdt))) &&
    (value.stockQuantity === null ||
      (typeof value.stockQuantity === 'number' && Number.isInteger(value.stockQuantity)))
  );
}

export function parseCatalogProduct(value: unknown): StorefrontProduct | undefined {
  if (!isRecord(value) || !isProductFields(value)) {
    return undefined;
  }
  return value;
}

export function parseCollectionProduct(value: unknown): StorefrontProduct | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  const normalized: Record<string, unknown> = {
    ...value,
    isDemo: typeof value.isDemo === 'boolean' ? value.isDemo : true,
    priceBdt: value.priceBdt ?? null,
    stockQuantity: value.stockQuantity ?? null,
  };
  return isProductFields(normalized) ? normalized : undefined;
}

function isProductResponse(value: unknown): value is { products: unknown[] } {
  return isRecord(value) && Array.isArray(value.products);
}

export async function getCatalogProducts(): Promise<CatalogProductResult> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/products`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Shopademia API returned HTTP ${response.status}`);
    }

    const payload: unknown = await response.json();
    if (!isProductResponse(payload)) {
      throw new Error('Shopademia API returned an unexpected catalogue response');
    }

    const parsedProducts = payload.products.map(parseCatalogProduct);
    if (parsedProducts.some((product) => product === undefined)) {
      throw new Error('Shopademia API returned an unexpected catalogue response');
    }

    return {
      ok: true,
      products: parsedProducts.filter((product): product is StorefrontProduct => product !== undefined),
    };
  } catch (error) {
    console.error('Unable to load the Shopademia catalogue.', error);
    return { ok: false };
  }
}

export function getCategoryBySlug(slug: string): HomeCategory | undefined {
  return homeCategories.find((category) => category.slug === slug);
}

export function filterCatalogProducts(
  products: StorefrontProduct[],
  query: string,
  categorySlug: string | undefined,
  sort: CatalogSort,
): StorefrontProduct[] {
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
