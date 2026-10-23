import Link from 'next/link';
import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.sellerRegistration, '/seller-registration');

export default function SellerRegistrationPage() {
  const portalUrl = process.env.NEXT_PUBLIC_SELLER_PORTAL_URL;
  let applicationHref: string | undefined;
  let portalUrlInvalid = false;
  if (portalUrl) {
    let parsedUrl: URL | undefined;
    try {
      parsedUrl = new URL(portalUrl);
    } catch {
      portalUrlInvalid = true;
    }
    if (parsedUrl) {
      const secureOrigin = parsedUrl.protocol === 'https:';
      const localHttpOrigin = parsedUrl.protocol === 'http:' &&
        ['localhost', '127.0.0.1', '::1'].includes(parsedUrl.hostname);
      if ((secureOrigin || localHttpOrigin) &&
        !parsedUrl.username &&
        !parsedUrl.password &&
        parsedUrl.pathname === '/' &&
        !parsedUrl.search &&
        !parsedUrl.hash) {
        applicationHref = new URL('/apply', parsedUrl).toString();
      } else {
        portalUrlInvalid = true;
      }
    }
  }

  return (
    <>
      <InformationPage page={informationPages.sellerRegistration} />
      {applicationHref ? (
        <nav className="information-actions information-page" aria-label="Seller application">
          <Link className="catalog-submit" href={applicationHref}>Open the Seller Portal application</Link>
        </nav>
      ) : (
        <p className="information-notice information-page" role="note">
          {portalUrlInvalid
            ? 'The Seller Portal application link is unavailable because its configured public URL is invalid.'
            : 'The Seller Portal application link is unavailable because its public URL has not been configured.'}
        </p>
      )}
    </>
  );
}
