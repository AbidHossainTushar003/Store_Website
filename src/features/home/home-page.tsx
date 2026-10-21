import Link from 'next/link';
import { getDemoProducts } from './home-page.data';
import { homeCategories } from './home-page.mock';
import { ProductCard } from '@/features/catalog/product-card';

function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-heading">
      <div className="home-hero-copy">
        <p className="eyebrow">A marketplace for curious minds</p>
        <h1 id="home-heading">Find a little more of what you love.</h1>
        <p>
          Shopademia is taking shape. Explore a preview of the marketplace
          experience while we build what comes next.
        </p>
        <Link className="hero-cta" href="/search">Browse demo products</Link>
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
        <p className="home-section-note">Illustrative category filters for the demo catalogue</p>
      </div>
      <ul className="category-grid">
        {homeCategories.map((category) => (
          <li className="category-card" key={category.id}>
            <Link
              className="category-card-link"
              href={`/categories/${category.slug}`}
              aria-label={`Browse example ${category.name} category`}
            >
              <span className="category-mark" aria-hidden="true">
                {category.mark}
              </span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <span className="category-status">Example category · demo only</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function FeaturedProductsSection() {
  const result = await getDemoProducts();
  const products = result.ok ? result.products : [];

  return (
    <section className="home-section" aria-labelledby="products-heading">
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">Shopademia demo catalogue</p>
          <h2 id="products-heading">Product examples</h2>
        </div>
        {products.length ? (
          <Link className="catalog-view-all" href="/search">
            Browse all {products.length} demo products
          </Link>
        ) : null}
      </div>
      <p className="mock-disclaimer">
        <strong>Fictional demo catalogue:</strong> these sample products and any cart or wishlist entries are
        for interface testing only. They are not for sale and are not real Shopademia listings. Buy now is
        unavailable; no checkout, payment, stock, price, availability, or delivery is provided.
      </p>
      {!result.ok ? (
        <p className="catalog-unavailable" role="status">
          The Shopademia demo catalogue is unavailable right now. Please try again later.
        </p>
      ) : products.length ? (
        <ul className="product-grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
        </ul>
      ) : (
        <p className="catalog-unavailable">
          The Shopademia demo catalogue currently has no products to display.
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
        <p className="eyebrow">A work in progress</p>
        <h2 id="development-heading">The Shopademia storefront is under development.</h2>
        <p>
          The catalogue, cart, and wishlist are connected to a development API for demonstration. No real
          orders, checkout, payments, or fulfilment are available.
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
