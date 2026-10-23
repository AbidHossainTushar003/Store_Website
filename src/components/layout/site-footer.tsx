import Link from 'next/link';
import { informationRouteGroups, legalInformationRoutes } from '@/features/information/information-routes';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-groups">
          {informationRouteGroups.map((group) => (
            <section className="footer-group" key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2 id={`footer-${group.id}`}>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="footer-bottom">
          <Link className="footer-brand" href="/">
            Shopademia
          </Link>
          <nav aria-label="Legal information">
            {legalInformationRoutes.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} Shopademia</p>
        </div>
      </div>
    </footer>
  );
}
