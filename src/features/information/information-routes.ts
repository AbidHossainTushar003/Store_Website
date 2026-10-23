import type { InformationPageKey } from './information-pages';

export type InformationRoute = {
  key: InformationPageKey;
  label: string;
  href: string;
};

export type InformationRouteGroup = {
  id: string;
  title: string;
  items: InformationRoute[];
};

export const informationRouteGroups: InformationRouteGroup[] = [
  {
    id: 'about-shopademia',
    title: 'About Shopademia',
    items: [
      { key: 'marketplace', label: 'Marketplace information', href: '/about' },
      { key: 'howItWorks', label: 'How it works', href: '/how-it-works' },
    ],
  },
  {
    id: 'customer-support',
    title: 'Customer support',
    items: [
      { key: 'help', label: 'Help information', href: '/help' },
      { key: 'contact', label: 'Contact details', href: '/contact' },
    ],
  },
  {
    id: 'orders-shipping',
    title: 'Orders & shipping',
    items: [
      { key: 'orders', label: 'Order information', href: '/orders' },
      { key: 'shipping', label: 'Shipping details', href: '/shipping' },
      { key: 'returns', label: 'Returns & refunds', href: '/returns' },
    ],
  },
  {
    id: 'buyer-information',
    title: 'Buyer information',
    items: [
      { key: 'shoppingPolicies', label: 'Shopping policies', href: '/shopping-policies' },
      { key: 'faq', label: 'Frequently asked questions', href: '/faq' },
    ],
  },
  {
    id: 'seller-resources',
    title: 'Seller resources',
    items: [
      { key: 'sellers', label: 'Seller information', href: '/seller-information' },
      { key: 'sellerRegistration', label: 'Registration details', href: '/seller-registration' },
    ],
  },
];

export const legalInformationRoutes: InformationRoute[] = [
  { key: 'privacy', label: 'Privacy', href: '/privacy' },
  { key: 'terms', label: 'Terms', href: '/terms' },
];

export const allInformationRoutes = [
  ...informationRouteGroups.flatMap((group) => group.items),
  ...legalInformationRoutes,
];

export function informationHref(key: InformationPageKey): string {
  const route = allInformationRoutes.find((item) => item.key === key);
  if (!route) {
    throw new Error(`No canonical information route is configured for "${key}".`);
  }
  return route.href;
}
