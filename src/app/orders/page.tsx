import type { Metadata } from 'next';
import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';
import { OrderHistory } from '@/features/commerce/order-history';

export const metadata: Metadata = createInformationMetadata(informationPages.orders, '/orders');

export default function OrdersPage() {
  return (
    <>
      <InformationPage page={informationPages.orders} />
      <OrderHistory headingLevel={2} />
    </>
  );
}
