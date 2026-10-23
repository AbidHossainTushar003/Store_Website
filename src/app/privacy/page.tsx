import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.privacy, '/privacy');

export default function PrivacyInformationPage() {
  return <InformationPage page={informationPages.privacy} />;
}
