export type HomeCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  mark: string;
};

export const homeCategories: HomeCategory[] = [
  {
    id: 'books-stationery',
    slug: 'books-stationery',
    name: 'Books & stationery',
    description: 'Ideas for learning and creating',
    mark: 'A',
  },
  {
    id: 'home-living',
    slug: 'home-living',
    name: 'Home & living',
    description: 'Thoughtful everyday spaces',
    mark: 'H',
  },
  {
    id: 'tech-accessories',
    slug: 'tech-accessories',
    name: 'Tech accessories',
    description: 'Useful tools for daily life',
    mark: 'T',
  },
  {
    id: 'everyday-style',
    slug: 'everyday-style',
    name: 'Everyday style',
    description: 'Simple personal essentials',
    mark: 'S',
  },
];
