const footerGroups = [
  {
    id: 'about-shopademia',
    title: 'About Shopademia',
    items: ['Marketplace information — coming soon', 'How it works — coming soon'],
  },
  {
    id: 'customer-support',
    title: 'Customer support',
    items: ['Help information — coming soon', 'Contact details — coming soon'],
  },
  {
    id: 'orders-shipping',
    title: 'Orders & shipping',
    items: ['Order information — coming soon', 'Shipping details — coming soon', 'Returns & refunds — coming soon'],
  },
  {
    id: 'buyer-information',
    title: 'Buyer information',
    items: ['Shopping policies — coming soon', 'Frequently asked questions — coming soon'],
  },
  {
    id: 'seller-resources',
    title: 'Seller resources',
    items: ['Seller information — coming soon', 'Registration details — coming soon'],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-groups">
          {footerGroups.map((group) => (
            <section className="footer-group" key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2 id={`footer-${group.id}`}>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="footer-bottom">
          <a className="footer-brand" href="/">
            Shopademia
          </a>
          <nav aria-label="Legal information">
            <span>Privacy — coming soon</span>
            <span>Terms — coming soon</span>
          </nav>
          <p>© {new Date().getFullYear()} Shopademia</p>
        </div>
      </div>
    </footer>
  );
}
