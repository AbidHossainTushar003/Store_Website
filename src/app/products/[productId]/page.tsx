import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductArtwork } from '@/features/catalog/product-card';
import { getDemoProducts } from '@/features/catalog/catalog-data';
import { ProductActions } from '@/features/home/product-actions';

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const result = await getDemoProducts();
  if (!result.ok) {
    return (
      <section className="product-detail-page" aria-labelledby="product-heading">
        <p className="eyebrow">Fictional Shopademia demo catalogue</p>
        <h1 id="product-heading">Demo product details unavailable</h1>
        <p className="catalog-unavailable" role="alert">
          The demo catalogue could not be loaded, so product details cannot be confirmed right now.
        </p>
        <Link className="catalog-reset" href="/search">Return to demo product search</Link>
      </section>
    );
  }

  const product = result.products.find((item) => item.id === params.productId);
  if (!product) {
    notFound();
  }

  return (
    <article className="product-detail-page" aria-labelledby="product-heading">
      <p className="eyebrow">Fictional demo product · not for sale</p>
      <div className="product-detail-layout">
        <ProductArtwork />
        <div className="product-detail-copy">
          <p className="product-category">{product.category}</p>
          {product.brand ? <p className="product-brand">Example brand: {product.brand}</p> : null}
          <h1 id="product-heading">{product.title}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="mock-disclaimer">
            This fictional item is shown for interface testing only. It is not a real listing and
            cannot be purchased. No price, stock, delivery, checkout, or payment information is
            available.
          </p>
          <ProductActions productId={product.id} />
          <Link className="catalog-reset" href="/search">Back to demo products</Link>
        </div>
      </div>
    </article>
  );
}
