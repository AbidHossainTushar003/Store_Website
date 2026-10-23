import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.howItWorks, '/how-it-works');

export default function HowItWorksPage() {
  return <InformationPage page={informationPages.howItWorks} />;
}
