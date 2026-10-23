import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export type InformationSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  steps?: string[];
};

export type InformationPageContent = {
  title: string;
  description: string;
  intro: string;
  sections: InformationSection[];
  questions?: Array<{ category: string; question: string; answer: string }>;
  actions?: Array<{ label: string; href: string }>;
};

export function createInformationMetadata(
  page: InformationPageContent,
  canonicalPath: string,
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let metadataBase: URL | undefined;
  if (siteUrl) {
    let parsedSiteUrl: URL;
    try {
      parsedSiteUrl = new URL(siteUrl);
    } catch {
      throw new Error('NEXT_PUBLIC_SITE_URL must be a valid absolute origin.');
    }
    const isSecureOrigin = parsedSiteUrl.protocol === 'https:';
    const isLocalHttpOrigin = parsedSiteUrl.protocol === 'http:' &&
      ['localhost', '127.0.0.1', '::1'].includes(parsedSiteUrl.hostname);
    if (!(isSecureOrigin || isLocalHttpOrigin) ||
      parsedSiteUrl.username ||
      parsedSiteUrl.password ||
      parsedSiteUrl.pathname !== '/' ||
      parsedSiteUrl.search ||
      parsedSiteUrl.hash) {
      throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin, or a loopback HTTP origin for local development.');
    }
    metadataBase = parsedSiteUrl;
  }

  return {
    title: page.title,
    description: page.description,
    ...(metadataBase
      ? {
          metadataBase,
          alternates: { canonical: canonicalPath },
        }
      : {}),
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
    },
  };
}

export function InformationPage({ page }: { page: InformationPageContent }) {
  const groupedQuestions = page.questions?.reduce<
    Record<string, NonNullable<InformationPageContent['questions']>>
  >(
    (groups, question) => {
      (groups[question.category] ??= []).push(question);
      return groups;
    },
    {},
  );

  return (
    <article className="information-page" aria-labelledby="information-heading">
      <nav className="information-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/information">Marketplace information</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{page.title}</span>
      </nav>
      <p className="eyebrow">Shopademia local demonstration</p>
      <h1 id="information-heading">{page.title}</h1>
      <p className="information-intro">{page.intro}</p>
      <aside className="information-notice" role="note">
        Shopademia is currently a local development demonstration, not a production marketplace.
        Use fictional contact and delivery details only.
      </aside>
      <div className="information-sections">
        {page.sections.map((section) => (
          <section className="information-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items ? (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {section.steps ? (
              <ol className="information-steps">
                {section.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            ) : null}
          </section>
        ))}
        {groupedQuestions ? (
          <section className="information-section" aria-labelledby="information-faq-heading">
            <h2 id="information-faq-heading">Questions and answers</h2>
            {Object.entries(groupedQuestions).map(([category, questions]) => (
              <div className="information-faq-category" key={category}>
                <h3>{category}</h3>
                <div className="information-faq">
                  {questions?.map(({ question, answer }) => (
                    <details key={question}>
                      <summary>{question}</summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}
      </div>
      {page.actions?.length ? (
        <nav className="information-actions" aria-label="Related Shopademia pages">
          {page.actions.map((action) => (
            <Link className="catalog-submit" href={action.href} key={action.href}>
              {action.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </article>
  );
}

export function InformationNotice({ children }: { children: ReactNode }) {
  return <aside className="information-notice" role="note">{children}</aside>;
}
