import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-heading">
      <p className="eyebrow">Page not found</p>
      <h1 id="not-found-heading">We couldn’t find that demo page.</h1>
      <p>The page may have moved, or the example product or category may no longer be available.</p>
      <Link className="catalog-submit" href="/search">Browse demo products</Link>
    </section>
  );
}
