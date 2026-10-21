'use client';

import { useState } from 'react';

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

type ProductActionsProps = {
  productId: string;
};

export function ProductActions({ productId }: ProductActionsProps) {
  const [pending, setPending] = useState<'cart' | 'wishlist' | null>(null);
  const [message, setMessage] = useState('');

  async function addToCollection(collection: 'cart' | 'wishlist') {
    setPending(collection);
    setMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/${collection}/items`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      setMessage(
        collection === 'cart'
          ? 'Added to your demo cart. This is not a purchase.'
          : 'Added to your demo wishlist.',
      );
    } catch {
      console.error(`Unable to add demo product to ${collection}.`);
      setMessage(
        collection === 'cart'
          ? 'Could not confirm the demo cart update. Check your cart before trying again.'
          : 'Could not update the demo wishlist. Please try again.',
      );
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="product-actions" aria-busy={pending !== null}>
      <button
        className="product-action product-action-primary"
        type="button"
        disabled={pending !== null}
        onClick={() => addToCollection('cart')}
      >
        {pending === 'cart' ? 'Adding…' : 'Add to cart'}
      </button>
      <button
        className="product-action"
        type="button"
        disabled={pending !== null}
        onClick={() => addToCollection('wishlist')}
      >
        {pending === 'wishlist' ? 'Adding…' : 'Add to wishlist'}
      </button>
      <button
        className="product-action"
        type="button"
        disabled
        aria-describedby={`buy-now-status-${productId}`}
      >
        Buy now (unavailable)
      </button>
      <span className="visually-hidden" id={`buy-now-status-${productId}`}>
        Unavailable until checkout and payment are implemented.
      </span>
      <p className="product-action-status" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
