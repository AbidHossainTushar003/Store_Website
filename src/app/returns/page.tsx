import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.returns, '/returns');

export default function ReturnsInformationPage() {
  return <InformationPage page={informationPages.returns} />;
}
