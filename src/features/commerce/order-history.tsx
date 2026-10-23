'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getApiBaseUrl } from '@/lib/api-base';

type Order = {
  id: string;
  reference: string;
  totalBdt: number;
  status: string;
  createdAt: string;
  items: Array<{ title: string; quantity: number; lineTotalBdt: number }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isOrderItem(value: unknown): value is Order['items'][number] {
  return isRecord(value) &&
    typeof value.title === 'string' &&
    typeof value.quantity === 'number' &&
    typeof value.lineTotalBdt === 'number';
}

function isOrder(value: unknown): value is Order {
  return isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.reference === 'string' &&
    typeof value.totalBdt === 'number' &&
    typeof value.status === 'string' &&
    typeof value.createdAt === 'string' &&
    Array.isArray(value.items) &&
    value.items.every(isOrderItem);
}

function parseOrders(value: unknown): Order[] | undefined {
  if (typeof value !== 'object' || value === null || !('orders' in value) || !Array.isArray(value.orders)) {
    return undefined;
  }
  if (value.orders.some((order) => !isOrder(order))) {
    return undefined;
  }
  return value.orders.filter(isOrder);
}

export function OrderHistory({ headingLevel = 1 }: { headingLevel?: 1 | 2 }) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/orders`, {
          credentials: 'include',
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`API returned HTTP ${response.status}`);
        }
        const parsedOrders = parseOrders(await response.json());
        if (!parsedOrders) {
          throw new Error('Shopademia API returned an invalid order history response.');
        }
        if (active) {
          setOrders(parsedOrders);
        }
      } catch (cause: unknown) {
        console.error('Unable to load local order history.', cause);
        if (active) {
          setError(true);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  return (
    <section className="preview-page" aria-labelledby="orders-heading">
      <p className="eyebrow">Local COD orders</p>
      <Heading id="orders-heading">Order history</Heading>
      {error ? (
        <div className="preview-notice" role="alert">
          <h2>Order history is unavailable</h2>
          <p>Check that the local API is running, then reload this page.</p>
          <button className="catalog-submit" onClick={() => {
            setError(false);
            setOrders(null);
            setReloadKey((key) => key + 1);
          }} type="button">Try again</button>
        </div>
      ) : orders === null ? (
        <p className="preview-state" role="status">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="preview-notice" role="status">
          <h2>No orders for this browser yet</h2>
          <p>Local COD orders are tied to this browser’s guest session.</p>
        </div>
      ) : (
        <ul className="collection-list">
          {orders.map((order) => (
            <li className="collection-item" key={order.id}>
              <div className="collection-item-copy">
                <h2>{order.reference}</h2>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
                <p>Status: {order.status.replaceAll('_', ' ')}</p>
                {order.items.map((item) => (
                  <p key={`${order.id}-${item.title}`}>
                    {item.quantity} × {item.title} · ৳{item.lineTotalBdt.toLocaleString()}
                  </p>
                ))}
                <strong>Total: ৳{order.totalBdt.toLocaleString()} · cash on delivery</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="preview-actions">
        <Link className="catalog-submit" href="/search">Browse products</Link>
        <Link className="preview-secondary-link" href="/account">Account information</Link>
      </div>
    </section>
  );
}
