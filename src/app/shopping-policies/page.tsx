import { InformationPage, createInformationMetadata } from '@/features/information/information-content';
import { informationPages } from '@/features/information/information-pages';

export const metadata = createInformationMetadata(informationPages.shoppingPolicies, '/shopping-policies');

export default function ShoppingPoliciesPage() {
  return <InformationPage page={informationPages.shoppingPolicies} />;
}
