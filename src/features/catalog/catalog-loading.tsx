type CatalogLoadingProps = {
  heading: string;
};

export function CatalogLoading({ heading }: CatalogLoadingProps) {
  return (
    <section className="catalog-loading" aria-busy="true" aria-live="polite">
      <p className="eyebrow">Shopademia preview</p>
      <h1>{heading}</h1>
      <p>Loading listings approved for public display.</p>
    </section>
  );
}
