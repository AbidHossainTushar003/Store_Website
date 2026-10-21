import Link from 'next/link';
import { homeCategories } from '@/features/home/home-page.mock';

const unavailableLabel = 'Coming soon';

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Shopademia home">
      <span className="brand-mark" aria-hidden="true">
        S
      </span>
      <span className="brand-name">Shopademia</span>
    </Link>
  );
}

function HeaderActions() {
  return (
    <div className="header-actions" role="group" aria-label="Shopping shortcuts">
      <Link className="header-action" href="/wishlist" aria-label="Wishlist">
        <span className="action-icon" aria-hidden="true">
          ♡
        </span>
        <span className="action-label">Wishlist</span>
      </Link>
      <button className="header-action" type="button" disabled aria-label={`Account, ${unavailableLabel}`}>
        <span className="action-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5.5 20c.5-3.5 2.7-5.3 6.5-5.3s6 1.8 6.5 5.3" />
          </svg>
        </span>
        <span className="action-label">Account</span>
        <span className="action-status">{unavailableLabel}</span>
      </button>
      <Link className="header-action" href="/cart" aria-label="Cart">
        <span className="action-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3.5 4h2l2.1 11.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6.2" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
        </span>
        <span className="action-label">Cart</span>
      </Link>
    </div>
  );
}

function SearchBox({ variant }: { variant: 'desktop' | 'mobile' }) {
  const inputId = `${variant}-site-search`;
  const statusId = `${variant}-search-status`;

  return (
    <form className="search-box" action="/search" method="get" role="search">
      <label className="visually-hidden" htmlFor={inputId}>
        Search products
      </label>
      <input
        id={inputId}
        type="search"
        name="q"
        placeholder="Search demo products"
        autoComplete="off"
        aria-describedby={statusId}
      />
      <button type="submit" aria-label="Search demo products">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m15.5 15.5 4.2 4.2" />
        </svg>
        <span>Search</span>
      </button>
      <span id={statusId} className="visually-hidden">
        Searches the fictional Shopademia demo catalogue.
      </span>
    </form>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-top">
          <Brand />
          <div className="desktop-search">
            <SearchBox variant="desktop" />
          </div>
          <div className="desktop-actions">
            <HeaderActions />
          </div>
          <details className="mobile-menu">
            <summary aria-label="Navigation menu">
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="visually-hidden">Menu</span>
            </summary>
            <nav className="mobile-menu-panel" aria-label="Mobile navigation">
              <Link href="/">Home</Link>
              <Link href="/search">Browse demo products</Link>
              {homeCategories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                  {category.name} <span className="nav-demo-label">Example category</span>
                </Link>
              ))}
              <span aria-disabled="true">Deals — {unavailableLabel}</span>
              <HeaderActions />
            </nav>
          </details>
        </div>
        <div className="mobile-search">
          <SearchBox variant="mobile" />
        </div>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/">
            Home
          </Link>
          <Link href="/search">Browse products <small>Demo catalogue</small></Link>
          <Link href={`/categories/${homeCategories[0].slug}`}>
            Categories <small>Example destinations</small>
          </Link>
          <span aria-disabled="true">Deals <small>{unavailableLabel}</small></span>
        </nav>
      </div>
    </header>
  );
}
