'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const helpTopics = [
  {
    title: 'Catalogue or product information does not load',
    category: 'Products and search',
    body: 'Check that the local Shopademia API is running and that the storefront uses the correct API base URL. Product examples may be illustrative.',
    href: '/faq',
    label: 'Read the FAQ',
  },
  {
    title: 'Search is not finding a product',
    category: 'Products and search',
    body: 'Search filters the catalogue currently loaded in the storefront; it is not a server-side product search service.',
    href: '/how-it-works',
    label: 'How browsing works',
  },
  {
    title: 'Cart contents or guest session seems different',
    category: 'Cart and checkout',
    body: 'Guest cart data is associated with the browser session and local API cookie. Another browser profile can have separate data.',
    href: '/shopping-policies',
    label: 'Shopping policies',
  },
  {
    title: 'Checkout or payment question',
    category: 'Cart and checkout',
    body: 'Only eligible seller listings can be used in the local test flow. No online payment is processed, and fictional products cannot be ordered.',
    href: '/orders',
    label: 'Order information',
  },
  {
    title: 'I cannot find my local test order',
    category: 'Orders',
    body: 'Use the same browser profile and guest session that placed the test order. Check order history before retrying an uncertain checkout.',
    href: '/orders',
    label: 'View order history',
  },
  {
    title: 'Shipment tracking or delivery delay',
    category: 'Shipping and returns',
    body: 'No courier, dispatch, delivery tracking, or real delivery service is connected to the local demonstration.',
    href: '/shipping',
    label: 'Shipping information',
  },
  {
    title: 'Cancellation, return, or refund request',
    category: 'Shipping and returns',
    body: 'The demo has no real cancellation, returns, or refund workflow. Production policy decisions remain pending.',
    href: '/returns',
    label: 'Returns information',
  },
  {
    title: 'Apply to sell or check application status',
    category: 'Seller portal',
    body: 'Seller applications use the separate Seller Portal and require its configured identity, API, Redis, and database services.',
    href: '/seller-registration',
    label: 'Seller registration details',
  },
  {
    title: 'Seller listing or inventory issue',
    category: 'Seller portal',
    body: 'Authorized Seller Portal users can submit draft listings. Only an Admin can activate or reactivate a listing.',
    href: '/seller-information',
    label: 'Seller information',
  },
  {
    title: 'Report a suspicious or security issue',
    category: 'Safety',
    body: 'Do not share passwords, one-time codes, or payment information. Use the contact form only when its API and support delivery settings are enabled.',
    href: '/contact',
    label: 'Contact Shopademia',
  },
  {
    title: 'Account access or password recovery',
    category: 'Accounts',
    body: 'Production buyer accounts and buyer password recovery are not connected. Seller Portal sign-in is handled separately by its configured identity provider.',
    href: '/faq',
    label: 'Account questions in the FAQ',
  },
];

export function HelpCenter() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const results = useMemo(
    () => helpTopics.filter((topic) =>
      `${topic.title} ${topic.category} ${topic.body}`.toLocaleLowerCase().includes(normalizedQuery),
    ),
    [normalizedQuery],
  );

  return (
    <section className="information-help" aria-label="Search help topics">
      <label htmlFor="help-search">Search help topics</label>
      <input
        autoComplete="off"
        id="help-search"
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Try “order status” or “seller application”"
        type="search"
        value={query}
      />
      <p className="visually-hidden" aria-live="polite">
        {results.length} help {results.length === 1 ? 'topic' : 'topics'} found.
      </p>
      {results.length === 0 ? (
        <p className="information-help-empty" role="status">No topics match that search. Try another phrase or contact support.</p>
      ) : (
        <ul className="information-help-results">
          {results.map((topic) => (
            <li key={topic.title}>
              <article>
                <p className="eyebrow">{topic.category}</p>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
                <Link href={topic.href}>{topic.label}</Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
