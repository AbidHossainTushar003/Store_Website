import Link from 'next/link';
import type { DemoProduct } from './catalog-data';
import { ProductActions } from '@/features/home/product-actions';

export function ProductArtwork() {
  return (
    <div className="product-art" aria-hidden="true">
      <span className="product-art-shape" />
      <span className="product-art-caption">Illustrative placeholder</span>
    </div>
  );
}

export function ProductCard({ product }: { product: DemoProduct }) {
  return (
    <li className="product-card">
      <Link
        className="product-card-link"
        href={`/products/${encodeURIComponent(product.id)}`}
        aria-label={`View demo details for ${product.title}`}
      >
        <ProductArtwork />
        <div className="product-card-copy">
          <p className="product-category">{product.category}</p>
          {product.brand ? <p className="product-brand">Example brand: {product.brand}</p> : null}
          <h3>{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-status">Fictional demo item · not for sale</p>
        </div>
      </Link>
      <div className="product-card-actions">
        <ProductActions productId={product.id} />
      </div>
    </li>
  );
}
