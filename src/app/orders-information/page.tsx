import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.orders, '/orders');

export default function OrderInformationPage() {
  return <InformationPage page={informationPages.orders} />;
}
