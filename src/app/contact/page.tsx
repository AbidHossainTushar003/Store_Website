import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { ContactForm } from '@/features/information/contact-form';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.contact, '/contact');

export default function ContactPage() {
  return (
    <>
      <InformationPage page={informationPages.contact} />
      <section className="information-page information-contact-form" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading">Send a support request</h2>
        <ContactForm />
      </section>
    </>
  );
}
