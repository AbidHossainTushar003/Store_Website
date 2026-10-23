import Link from 'next/link';
import type { StorefrontProduct, CatalogSort } from './catalog-data';
import { filterCatalogProducts } from './catalog-data';
import type { HomeCategory } from '@/features/home/home-page.mock';
import { ProductCard } from './product-card';

type CatalogPageProps = {
  products: StorefrontProduct[];
  categories: HomeCategory[];
  title: string;
  description: string;
  action: string;
  initialQuery: string;
  categorySlug?: string;
  initialSort: CatalogSort;
};

export function CatalogPage({
  products,
  categories,
  title,
  description,
  action,
  initialQuery,
  categorySlug,
  initialSort,
}: CatalogPageProps) {
  const filteredProducts = filterCatalogProducts(products, initialQuery, categorySlug, initialSort);
  const activeCategory = categories.find((category) => category.slug === categorySlug);

  return (
    <section className="catalog-page" aria-labelledby="catalog-heading">
      <p className="eyebrow">Shopademia marketplace</p>
      <h1 id="catalog-heading">{title}</h1>
      <p className="catalog-intro">{description}</p>
      <p className="mock-disclaimer">
        Demo examples are not for sale. Seller listings show a price and available stock and can be
        ordered locally with cash on delivery.
      </p>

      <form className="catalog-controls" action={action} method="get">
        <div className="catalog-search-field">
          <label htmlFor="catalog-query">Search products</label>
          <input
            id="catalog-query"
            type="search"
            name="q"
            defaultValue={initialQuery}
            autoComplete="off"
          />
        </div>
        <div className="catalog-select-field">
          <label htmlFor="catalog-category">Category</label>
          <select id="catalog-category" name="category" defaultValue={categorySlug ?? ''}>
            <option value="">All example categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="catalog-select-field">
          <label htmlFor="catalog-sort">Sort</label>
          <select id="catalog-sort" name="sort" defaultValue={initialSort}>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>
        <div className="catalog-control-actions">
          <button className="catalog-submit" type="submit">Apply filters</button>
          <Link className="catalog-reset" href="/search">Reset</Link>
        </div>
      </form>

      <p className="catalog-results-count" role="status" aria-live="polite">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        {initialQuery ? ` matching “${initialQuery}”` : ''}
        {activeCategory ? ` in ${activeCategory.name}` : ''}
      </p>

      {filteredProducts.length ? (
        <ul className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              returnTo={categorySlug ?? 'search'}
            />
          ))}
        </ul>
      ) : (
        <div className="catalog-empty" role="status">
          <h2>No products found</h2>
          <p>Try a different search or category, or reset the filters.</p>
          <Link className="catalog-reset" href="/search">Clear filters</Link>
        </div>
      )}
    </section>
  );
}
