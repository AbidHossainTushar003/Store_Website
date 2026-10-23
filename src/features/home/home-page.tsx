import Link from 'next/link';
import { getCatalogProducts } from './home-page.data';
import { homeCategories } from './home-page.mock';
import { ProductCard } from '@/features/catalog/product-card';
import { CatalogRetryButton } from '@/features/catalog/catalog-retry-button';

function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-heading">
      <div className="home-hero-copy">
        <p className="eyebrow">A marketplace for curious minds</p>
        <h1 id="home-heading">Find a little more of what you love.</h1>
        <p>
          Explore seller listings and test a local cash-on-delivery order through the development marketplace.
        </p>
        <Link className="hero-cta" href="/search">Browse products</Link>
      </div>
      <div className="home-hero-art" aria-hidden="true">
        <span className="hero-orbit hero-orbit-one" />
        <span className="hero-orbit hero-orbit-two" />
        <span className="hero-card hero-card-back" />
        <span className="hero-card hero-card-front">
          <span />
          <span />
          <span />
        </span>
        <span className="hero-spark hero-spark-one">✦</span>
        <span className="hero-spark hero-spark-two">✳</span>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="home-section" aria-labelledby="categories-heading">
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">Explore the marketplace</p>
          <h2 id="categories-heading">Browse categories</h2>
        </div>
        <p className="home-section-note">Browse listings approved for public display</p>
      </div>
      <ul className="category-grid">
        {homeCategories.map((category) => (
          <li className="category-card" key={category.id}>
            <Link
              className="category-card-link"
              href={`/categories/${category.slug}`}
              aria-label={`Browse ${category.name} category`}
            >
              <span className="category-mark" aria-hidden="true">
                {category.mark}
              </span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <span className="category-status">Browse category</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function FeaturedProductsSection() {
  const result = await getCatalogProducts();
  const products = result.ok ? result.products : [];

  return (
    <section className="home-section" aria-labelledby="products-heading">
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">Shopademia catalogue</p>
          <h2 id="products-heading">Marketplace products</h2>
        </div>
        {products.length ? (
          <Link className="catalog-view-all" href="/search">
            Browse all {products.length} products
          </Link>
        ) : null}
      </div>
      <p className="mock-disclaimer">
        Seller listings with prices can be ordered locally with cash on delivery. This is a test workflow, not a real sale.
      </p>
      {!result.ok ? (
        <div className="catalog-unavailable" role="alert">
          <p>The Shopademia catalogue is unavailable right now.</p>
          <CatalogRetryButton />
        </div>
      ) : products.length ? (
        <ul className="product-grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
        </ul>
      ) : (
        <p className="catalog-unavailable">
          The Shopademia catalogue currently has no products to display.
        </p>
      )}
    </section>
  );
}

function DevelopmentSection() {
  return (
    <section className="development-note" aria-labelledby="development-heading">
      <span className="development-mark" aria-hidden="true">
        S
      </span>
      <div>
        <p className="eyebrow">Local test workflow</p>
        <h2 id="development-heading">Place and confirm a local COD test order.</h2>
        <p>
          Seller listings and COD test orders are persisted in an isolated local database. No real payments or fulfillment service is connected.
        </p>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <DevelopmentSection />
    </div>
  );
}
