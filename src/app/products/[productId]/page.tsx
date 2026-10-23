import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductArtwork } from '@/features/catalog/product-card';
import { getCategoryBySlug, getCatalogProducts } from '@/features/catalog/catalog-data';
import { ProductActions } from '@/features/home/product-actions';

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ returnTo?: string | string[] }>;
}) {
  const [{ productId }, { returnTo: returnToValue }] = await Promise.all([
    params,
    searchParams,
  ]);
  const result = await getCatalogProducts();
  if (!result.ok) {
    return (
      <section className="product-detail-page" aria-labelledby="product-heading">
        <p className="eyebrow">Shopademia marketplace</p>
        <h1 id="product-heading">Product details unavailable</h1>
        <p className="catalog-unavailable" role="alert">
          The catalogue could not be loaded, so product details cannot be confirmed right now.
        </p>
        <Link className="catalog-reset" href="/search">Return to product search</Link>
      </section>
    );
  }

  const product = result.products.find((item) => item.id === productId);
  if (!product) {
    notFound();
  }

  const returnCategory = getCategoryBySlug(
    Array.isArray(returnToValue) ? returnToValue[0] ?? '' : returnToValue ?? '',
  );
  const returnHref = returnCategory ? `/categories/${returnCategory.slug}` : '/search';

  return (
    <article className="product-detail-page" aria-labelledby="product-heading">
      <p className="eyebrow">{product.isDemo ? 'Fictional demo product · not for sale' : 'Seller product listing'}</p>
      <div className="product-detail-layout">
        <ProductArtwork />
        <div className="product-detail-copy">
          <p className="product-category">{product.category}</p>
          {product.brand ? <p className="product-brand">{product.brand}</p> : null}
          <h1 id="product-heading">{product.title}</h1>
          <p className="product-detail-description">{product.description}</p>
          {product.isDemo ? (
            <p className="mock-disclaimer">
              This fictional example cannot be purchased. It has no price, stock, delivery, or order flow.
            </p>
          ) : (
            <p className="mock-disclaimer">
              ৳{product.priceBdt?.toLocaleString()} · {product.stockQuantity} in stock · local cash-on-delivery test
            </p>
          )}
          <ProductActions productId={product.id} isDemo={product.isDemo} />
          <Link className="catalog-reset" href={returnHref}>
            {returnCategory ? `Back to ${returnCategory.name}` : 'Back to product listings'}
          </Link>
        </div>
      </div>
    </article>
  );
}
