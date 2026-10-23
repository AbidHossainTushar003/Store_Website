import type { Metadata } from 'next';
import { CheckoutPreview } from '@/features/commerce/checkout-preview';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Place a cash-on-delivery order in the local Shopademia marketplace.',
};

export default function CheckoutPage() {
  return <CheckoutPreview />;
}
