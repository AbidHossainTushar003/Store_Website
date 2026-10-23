import Link from 'next/link';
import type { StorefrontProduct } from './catalog-data';
import { ProductActions } from '@/features/home/product-actions';

export function ProductArtwork() {
  return (
    <div className="product-art" aria-hidden="true">
      <span className="product-art-shape" />
      <span className="product-art-caption">Illustrative placeholder</span>
    </div>
  );
}

export function ProductCard({
  product,
  returnTo = 'search',
}: {
  product: StorefrontProduct;
  returnTo?: string;
}) {
  const productHref = `/products/${encodeURIComponent(product.id)}?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <li className="product-card">
      <Link
        className="product-card-link"
        href={productHref}
        aria-label={`View details for ${product.title}`}
      >
        <ProductArtwork />
        <div className="product-card-copy">
          <p className="product-category">{product.category}</p>
          {product.brand ? <p className="product-brand">{product.brand}</p> : null}
          <h3>{product.title}</h3>
          <p className="product-description">{product.description}</p>
          {product.isDemo ? (
            <p className="product-status">Fictional demo item · not for sale</p>
          ) : (
            <p className="product-status">৳{product.priceBdt?.toLocaleString()} · {product.stockQuantity} in stock</p>
          )}
        </div>
      </Link>
      <div className="product-card-actions">
        <ProductActions productId={product.id} isDemo={product.isDemo} />
      </div>
    </li>
  );
}
