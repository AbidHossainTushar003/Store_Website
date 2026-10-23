import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.faq, '/faq');

export default function FrequentlyAskedQuestionsPage() {
  return <InformationPage page={informationPages.faq} />;
}
