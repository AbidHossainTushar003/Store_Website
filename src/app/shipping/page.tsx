import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.shipping, '/shipping');

export default function ShippingInformationPage() {
  return <InformationPage page={informationPages.shipping} />;
}
