'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApiBaseUrl } from '@/lib/api-base';

type ProductActionsProps = {
  productId: string;
  isDemo: boolean;
};

export function ProductActions({ productId, isDemo }: ProductActionsProps) {
  const router = useRouter();
  const [pending, setPending] = useState<'cart' | 'wishlist' | null>(null);
  const [message, setMessage] = useState('');

  async function addToCollection(collection: 'cart' | 'wishlist') {
    setPending(collection);
    setMessage('');

    try {
      const response = await fetch(`${getApiBaseUrl()}/${collection}/items`, {
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
          ? isDemo ? 'Added to your demo cart. This is not a purchase.' : 'Added to your cart.'
          : isDemo ? 'Added to your demo wishlist.' : 'Added to your wishlist.',
      );
    } catch (error) {
      console.error(`Unable to add product to ${collection}.`, error);
      setMessage(
        collection === 'cart'
          ? 'Could not confirm the cart update. Check your cart before trying again.'
          : 'Could not update the wishlist. Please try again.',
      );
    } finally {
      setPending(null);
    }
  }

  async function buyNow() {
    setPending('cart');
    setMessage('');
    try {
      const response = await fetch(`${getApiBaseUrl()}/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }
      router.push('/checkout');
    } catch (error) {
      console.error('Unable to start checkout for the seller listing.', error);
      setMessage('Could not start checkout. Please try again.');
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
        disabled={isDemo || pending !== null}
        onClick={() => void buyNow()}
      >
        {pending === 'cart' ? 'Opening checkout…' : isDemo ? 'Demo item · not for sale' : 'Buy now'}
      </button>
      <p className="product-action-status" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
