import type { Metadata } from 'next';
import Link from 'next/link';
import { informationPages } from '@/features/information/information-pages';
import { allInformationRoutes } from '@/features/information/information-routes';

export const metadata: Metadata = {
  title: 'Marketplace information',
  description: 'Browse information about the Shopademia local marketplace demo, orders, seller tools, support, and policies.',
  openGraph: {
    title: 'Marketplace information',
    description: 'Browse information about the Shopademia local marketplace demo, orders, seller tools, support, and policies.',
    type: 'website',
  },
};

export default function InformationIndexPage() {
  return (
    <section className="information-page" aria-labelledby="information-heading">
      <nav className="information-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Marketplace information</span>
      </nav>
      <p className="eyebrow">Shopademia local demonstration</p>
      <h1 id="information-heading">Marketplace information</h1>
      <p className="information-intro">
        Find details about browsing, local test orders, seller tools, and the services that are
        not connected in this development demonstration.
      </p>
      <div className="information-index-grid">
        {allInformationRoutes.map(({ key, href }) => {
          const page = informationPages[key];
          return (
            <article className="information-index-card" key={key}>
              <h2><Link href={href}>{page.title}</Link></h2>
              <p>{page.description}</p>
              <Link className="information-card-link" href={href}>Read information</Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
