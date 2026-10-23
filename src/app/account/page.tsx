import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Account preview',
  description: 'Account information for the Shopademia demo storefront.',
};

export default function AccountPage() {
  return (
    <section className="preview-page" aria-labelledby="account-heading">
      <p className="eyebrow">Account · preview</p>
      <h1 id="account-heading">Your Shopademia account</h1>
      <p className="preview-intro">
        Customer accounts and sign-in are not available in this storefront demo.
      </p>

      <div className="preview-notice" role="status">
        <h2>Sign-in is not configured</h2>
        <p>
          This preview does not request or store your email address or password, create an
          account, or establish an authenticated session.
        </p>
      </div>

      <div className="preview-actions">
        <Link className="catalog-submit" href="/search">Browse product listings</Link>
        <Link className="preview-secondary-link" href="/cart">View demo cart</Link>
        <Link className="preview-secondary-link" href="/orders">Order history preview</Link>
      </div>
    </section>
  );
}
