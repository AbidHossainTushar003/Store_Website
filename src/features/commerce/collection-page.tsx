'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  parseCollectionProduct,
  type StorefrontProduct,
} from '@/features/catalog/catalog-data';
import { getApiBaseUrl } from '@/lib/api-base';

type CollectionKind = 'cart' | 'wishlist';

type CartItem = StorefrontProduct & { quantity: number };
type CollectionItem = StorefrontProduct | CartItem;

type CollectionResponse = { items: CartItem[]; totalQuantity: number } | { items: StorefrontProduct[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseCartItem(value: unknown): CartItem | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  const quantity = value.quantity;
  const product = parseCollectionProduct(value);

  if (!product || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return undefined;
  }
  return { ...product, quantity };
}

function parseCollectionResponse(
  value: unknown,
  collection: CollectionKind,
): CollectionResponse | undefined {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return undefined;
  }

  if (collection === 'cart') {
    const totalQuantity = value.totalQuantity;
    const items = value.items.map(parseCartItem);
    if (
      typeof totalQuantity !== 'number' ||
      !Number.isInteger(totalQuantity) ||
      totalQuantity < 0 ||
      items.some((item) => item === undefined)
    ) {
      return undefined;
    }
    return { items: items.filter((item): item is CartItem => item !== undefined), totalQuantity };
  }
  const items = value.items.map(parseCollectionProduct);
  if (items.some((item) => item === undefined)) {
    return undefined;
  }
  return { items: items.filter((item): item is StorefrontProduct => item !== undefined) };
}

async function fetchCollectionItems(collection: CollectionKind): Promise<CollectionItem[]> {
  const response = await fetch(`${getApiBaseUrl()}/${collection}`, {
    credentials: 'include',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`API returned HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  const parsedResponse = parseCollectionResponse(payload, collection);
  if (!parsedResponse) {
    throw new Error(`Shopademia API returned an invalid ${collection} response`);
  }
  return parsedResponse.items;
}

export function CollectionPage({ collection }: { collection: CollectionKind }) {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(() => new Set());
  const pendingIdsRef = useRef(new Set<string>());
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const isCart = collection === 'cart';
  const title = isCart ? 'Shopping cart' : 'Wishlist';

  const loadItems = useCallback(async () => {
    try {
      setItems(await fetchCollectionItems(collection));
    } catch (error) {
      console.error(`Unable to load the demo ${collection}.`, error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    let active = true;
    void fetchCollectionItems(collection).then(
      (loadedItems) => {
        if (active) {
          setItems(loadedItems);
          setLoading(false);
        }
      },
      (error: unknown) => {
        if (active) {
          console.error(`Unable to load the demo ${collection}.`, error);
          setLoadError(true);
          setLoading(false);
        }
      },
    );
    return () => {
      active = false;
    };
  }, [collection]);

  function retryLoadingItems() {
    setLoading(true);
    setLoadError(false);
    setFeedback(null);
    void loadItems();
  }

  async function removeItem(productId: string) {
    if (pendingIdsRef.current.has(productId)) {
      return;
    }

    pendingIdsRef.current.add(productId);
    setPendingIds(new Set(pendingIdsRef.current));
    setFeedback(null);

    try {
      const response = await fetch(
        `${getApiBaseUrl()}/${collection}/items/${encodeURIComponent(productId)}`,
        { method: 'DELETE', credentials: 'include' },
      );
      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
      setFeedback({
        message: isCart ? 'Removed from your cart.' : 'Removed from your wishlist.',
        isError: false,
      });
    } catch (error) {
      console.error(`Unable to remove demo product from ${collection}.`, error);
      setFeedback({
        message: isCart
          ? 'Could not update the cart. Please try again.'
          : 'Could not update the wishlist. Please try again.',
        isError: true,
      });
    } finally {
      pendingIdsRef.current.delete(productId);
      setPendingIds(new Set(pendingIdsRef.current));
    }
  }

  return (
    <section className="collection-page" aria-labelledby="collection-heading">
      <p className="eyebrow">{isCart ? 'Shopademia marketplace' : 'Saved products'}</p>
      <h1 id="collection-heading">{title}</h1>
      <p className="collection-disclaimer">
        {isCart
          ? 'Seller listings can be ordered locally with cash on delivery. Fictional demo products cannot be purchased.'
          : 'Save products here to revisit them later. Fictional demo products cannot be purchased.'}
      </p>
      {isCart ? (
        <Link className="preview-secondary-link" href="/checkout">
          Continue to checkout
        </Link>
      ) : null}

      {loading ? (
        <p className="collection-feedback" role="status">Loading your {collection}…</p>
      ) : loadError ? (
        <div className="collection-feedback collection-feedback-error" role="alert">
          <p>Could not load your {collection}. Your saved data may be unavailable right now.</p>
          <button className="collection-retry" type="button" onClick={retryLoadingItems}>
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <p className="collection-empty">
          Your {collection} is empty. Fictional demo products are not for sale.
        </p>
      ) : (
        <ul className="collection-list">
          {items.map((item) => (
            <li className="collection-item" key={item.id}>
              <div className="collection-item-copy">
              <span className="collection-item-label">
                {item.isDemo ? 'Fictional demo item · not for sale' : 'Seller listing'}
              </span>
              <h2>{item.title}</h2>
              <p>{item.category}{item.brand ? ` · ${item.brand}` : ''}</p>
              <p>{item.description}</p>
              {isCart && 'quantity' in item ? (
                <p>
                  Quantity: {item.quantity}
                  {item.priceBdt === null ? ' · not purchasable' : ` · ৳${(item.priceBdt * item.quantity).toLocaleString()}`}
                </p>
              ) : null}
              </div>
              <button
                className="collection-remove"
                type="button"
                disabled={pendingIds.has(item.id)}
                onClick={() => void removeItem(item.id)}
              >
                {pendingIds.has(item.id) ? 'Removing…' : 'Remove'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {feedback ? (
        <p
          className={`collection-feedback${feedback.isError ? ' collection-feedback-error' : ''}`}
          role={feedback.isError ? 'alert' : 'status'}
          aria-live="polite"
        >
          {feedback.message}
        </p>
      ) : null}
    </section>
  );
}
