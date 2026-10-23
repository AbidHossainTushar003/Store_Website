import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.terms, '/terms');

export default function TermsOfUsePage() {
  return <InformationPage page={informationPages.terms} />;
}
