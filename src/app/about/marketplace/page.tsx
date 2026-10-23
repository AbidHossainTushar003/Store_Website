import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.marketplace, '/about');

export default function MarketplaceInformationPage() {
  return <InformationPage page={informationPages.marketplace} />;
}
