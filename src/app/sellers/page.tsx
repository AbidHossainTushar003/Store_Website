import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.sellers, '/seller-information');

export default function SellerInformationPage() {
  return <InformationPage page={informationPages.sellers} />;
}
