import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { HelpCenter } from '@/features/information/help-center';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.help, '/help');

export default function HelpPage() {
  return (
    <>
      <InformationPage page={informationPages.help} />
      <section className="information-page information-help-section">
        <HelpCenter />
      </section>
    </>
  );
}
