'use client';

import { useRouter } from 'next/navigation';

export function CatalogRetryButton() {
  const router = useRouter();

  return (
    <button className="catalog-submit" type="button" onClick={() => router.refresh()}>
      Try again
    </button>
  );
}
