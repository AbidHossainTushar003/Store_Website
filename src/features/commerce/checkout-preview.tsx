'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { parseCollectionProduct, type StorefrontProduct } from '@/features/catalog/catalog-data';
import { getApiBaseUrl } from '@/lib/api-base';

type CartItem = StorefrontProduct & { quantity: number };
type CartState =
  | { status: 'loading' }
  | { status: 'unavailable' }
  | { status: 'loaded'; items: CartItem[]; totalQuantity: number };

type PlacedOrder = {
  reference: string;
  totalBdt: number;
  status: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseCartItem(value: unknown): CartItem | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const product = parseCollectionProduct(value);
  const quantity = value.quantity;
  if (!product || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return undefined;
  }
  return { ...product, quantity };
}

function parseCart(value: unknown): { items: CartItem[]; totalQuantity: number } | undefined {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return undefined;
  }
  const items = value.items.map(parseCartItem);
  const totalQuantity = value.totalQuantity;
  if (
    items.some((item) => item === undefined) ||
    typeof totalQuantity !== 'number' ||
    !Number.isInteger(totalQuantity) ||
    totalQuantity < 0
  ) {
    return undefined;
  }
  return {
    items: items.filter((item): item is CartItem => item !== undefined),
    totalQuantity,
  };
}

function parsePlacedOrder(value: unknown): PlacedOrder | undefined {
  if (!isRecord(value) || !isRecord(value.order)) {
    return undefined;
  }
  const { reference, totalBdt, status } = value.order;
  if (
    typeof reference !== 'string' ||
    typeof totalBdt !== 'number' ||
    !Number.isInteger(totalBdt) ||
    typeof status !== 'string'
  ) {
    return undefined;
  }
  return { reference, totalBdt, status };
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json();
    if (isRecord(payload) && typeof payload.message === 'string') {
      return payload.message;
    }
  } catch {
    return `Order request failed with HTTP ${response.status}.`;
  }
  return `Order request failed with HTTP ${response.status}.`;
}

export function CheckoutPreview() {
  const [cart, setCart] = useState<CartState>({ status: 'loading' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [cartRetryKey, setCartRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadCart() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/cart`, {
          credentials: 'include',
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`API returned HTTP ${response.status}`);
        }
        const parsedCart = parseCart(await response.json());
        if (!parsedCart) {
          throw new Error('Shopademia API returned an invalid cart response.');
        }
        if (active) {
          setCart({ status: 'loaded', ...parsedCart });
        }
      } catch (loadError) {
        console.error('Unable to load the cart for checkout.', loadError);
        if (active) {
          setCart({ status: 'unavailable' });
        }
      }
    }

    void loadCart();
    return () => {
      active = false;
    };
  }, [cartRetryKey]);

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }
    const formData = new FormData(form);
    setPending(true);
    setError('');

    try {
      const response = await fetch(`${getApiBaseUrl()}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          address: formData.get('address'),
        }),
      });
      if (!response.ok) {
        setError(await getErrorMessage(response));
        return;
      }
      const order = parsePlacedOrder(await response.json());
      if (!order) {
        throw new Error('Shopademia API returned an invalid order confirmation.');
      }
      setPlacedOrder(order);
    } catch (submitError) {
      console.error('Unable to place the local cash-on-delivery order.', submitError);
      setError('The order could not be confirmed. Check your order history before retrying.');
    } finally {
      setPending(false);
    }
  }

  const orderableItems =
    cart.status === 'loaded' &&
    cart.items.length > 0 &&
    cart.items.every((item) => !item.isDemo && item.priceBdt !== null);
  const totalBdt = cart.status === 'loaded'
    ? cart.items.reduce((total, item) => total + (item.priceBdt ?? 0) * item.quantity, 0)
    : 0;

  if (placedOrder) {
    return (
      <section className="preview-page checkout-preview" aria-labelledby="checkout-heading">
        <p className="eyebrow">Cash on delivery</p>
        <h1 id="checkout-heading">Order placed</h1>
        <div className="preview-notice" role="status">
          <h2>Order {placedOrder.reference}</h2>
          <p>
            Your local test order is saved with status “{placedOrder.status.replaceAll('_', ' ')}”.
            Pay ৳{placedOrder.totalBdt.toLocaleString()} in cash on delivery. No online payment was taken.
          </p>
        </div>
        <div className="preview-actions">
          <Link className="catalog-submit" href="/orders">View order status</Link>
          <Link className="preview-secondary-link" href="/search">Continue browsing</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="preview-page checkout-preview" aria-labelledby="checkout-heading">
      <p className="eyebrow">Local test checkout · cash on delivery</p>
      <h1 id="checkout-heading">Place your order</h1>
      <p className="preview-intro">
        This local development flow records an order in the disposable test database. It does not take payment.
      </p>

      <div className="preview-notice" role="note">
        <h2>Local COD test only</h2>
        <p>Use fictional contact details. No online payment or shipping provider is connected.</p>
      </div>

      <section className="checkout-summary" aria-labelledby="checkout-summary-heading">
        <div className="checkout-summary-heading">
          <h2 id="checkout-summary-heading">Order summary</h2>
          <Link className="preview-secondary-link" href="/cart">Return to cart</Link>
        </div>

        {cart.status === 'loading' ? (
          <p className="preview-state" role="status">Loading your cart…</p>
        ) : cart.status === 'unavailable' ? (
          <div className="preview-state preview-state-error" role="alert">
            The cart is unavailable. Return to the cart page and try again.
            <button className="catalog-submit" onClick={() => {
              setCart({ status: 'loading' });
              setCartRetryKey((key) => key + 1);
            }} type="button">Try again</button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="preview-state">
            <h3>Your cart is empty</h3>
            <p>Add a seller-listed product to place a local COD test order.</p>
            <Link className="catalog-submit" href="/search">Browse products</Link>
          </div>
        ) : (
          <>
            <ul className="checkout-item-list">
              {cart.items.map((item) => (
                <li className="checkout-item" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                    <p>{item.isDemo ? 'Fictional demo product · cannot be ordered' : 'Seller listing'}</p>
                  </div>
                  <p className="checkout-item-quantity">
                    {item.quantity} × {item.priceBdt === null ? 'No price' : `৳${item.priceBdt.toLocaleString()}`}
                  </p>
                </li>
              ))}
            </ul>
            {orderableItems ? (
              <p className="checkout-no-total">Total: ৳{totalBdt.toLocaleString()} · cash on delivery</p>
            ) : (
              <p className="checkout-no-total">
                Remove demo products and keep one shop’s priced products in the cart before ordering.
              </p>
            )}
          </>
        )}
      </section>

      <form className="checkout-delivery-note" onSubmit={(event) => void placeOrder(event)}>
        <h2>Delivery details</h2>
        <label htmlFor="checkout-name">Name</label>
        <input id="checkout-name" autoComplete="name" maxLength={160} name="name" required />
        <label htmlFor="checkout-email">Email</label>
        <input id="checkout-email" autoComplete="email" maxLength={320} name="email" required type="email" />
        <label htmlFor="checkout-phone">Phone</label>
        <input id="checkout-phone" autoComplete="tel" maxLength={32} name="phone" required type="tel" />
        <label htmlFor="checkout-address">Delivery address</label>
        <textarea id="checkout-address" autoComplete="street-address" maxLength={1000} minLength={10} name="address" required />
        {error ? <p className="preview-state-error" role="alert">{error}</p> : null}
        <div className="preview-actions">
          <button className="catalog-submit" disabled={!orderableItems || pending} type="submit">
            {pending ? 'Placing order…' : 'Place COD test order'}
          </button>
          <Link className="preview-secondary-link" href="/search">Continue browsing</Link>
        </div>
      </form>
    </section>
  );
}
