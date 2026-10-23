import type { InformationPageContent } from './information-content';

export const informationPages = {
  marketplace: {
    title: 'About Shopademia',
    description: 'Learn about the Shopademia marketplace demonstration and explore its buyer and seller experiences.',
    intro: 'Shopademia is being developed as a marketplace experience that brings product discovery and seller listings together.',
    sections: [
      {
        heading: 'A marketplace for discovery',
        paragraphs: [
          'The project brings catalogue browsing, product details, and seller listings into one storefront so buyers can explore what participating shops offer.',
          'The current website is a local development demonstration. Example catalogue items are illustrative, and seller listings and orders are test data—not an offer to sell.',
        ],
      },
      {
        heading: 'Designed for buyers and sellers',
        items: [
          'Buyers can browse and search the catalogue, review product details, and try the guest cart.',
          'Local seller tools demonstrate draft product listings, inventory management, and order review.',
          'The project aims to make marketplace information and the limits of each workflow clear.',
        ],
      },
      {
        heading: 'Trust through clear information',
        paragraphs: [
          'A production marketplace requires verified sellers, approved buyer and seller policies, configured delivery and payment services, and support operations. Those services are not represented as live here.',
          'We avoid presenting demo records, unverified seller details, or unavailable services as completed real-world transactions.',
        ],
      },
    ],
    actions: [
      { label: 'See how the demo works', href: '/how-it-works' },
      { label: 'Browse products', href: '/search' },
      { label: 'Seller information', href: '/seller-information' },
    ],
  },
  howItWorks: {
    title: 'How Shopademia works',
    description: 'Understand the current Shopademia buyer and seller demonstration workflows and their limitations.',
    intro: 'These steps describe the features currently present in the local project, not a live commerce service.',
    sections: [
      {
        heading: 'Buyer experience',
        steps: [
          'Browse or search the loaded catalogue. Product images, category content, and fictional examples may be illustrative.',
          'Open a product to review its displayed description, price, availability, and seller details where supplied.',
          'Add eligible products to the browser guest cart. Fictional demo products cannot be ordered.',
          'In the local demo only, checkout can create a test cash-on-delivery order for eligible seller listings. No online payment or shipping is arranged.',
          'Review the same browser session’s test order history. Production shipment tracking, return requests, and refunds are not available.',
        ],
      },
      {
        heading: 'Seller experience',
        steps: [
          'Open the separate Seller Portal and sign in through its configured identity provider.',
          'Submit a seller application with the name, shop name, and description requested by the current form.',
          'Wait for an authorized reviewer to record an application decision; approval is not production seller verification or a payout setup.',
          'Create product listings as drafts and manage permitted inventory actions in the Seller Portal.',
          'Review local test orders only when the demo environment and required seller access are configured.',
        ],
      },
      {
        heading: 'Services that are not connected',
        items: [
          'Production customer accounts and customer order history.',
          'Online payment, live delivery fees, courier booking, dispatch, or delivery tracking.',
          'Production returns, refunds, seller payouts, wallet balances, or support service-level commitments.',
        ],
      },
    ],
    actions: [
      { label: 'Browse products', href: '/search' },
      { label: 'Open the cart', href: '/cart' },
      { label: 'Order information', href: '/orders' },
    ],
  },
  help: {
    title: 'Shopademia help',
    description: 'Find guidance for browsing, the guest cart, local test orders, seller applications, and unavailable production support.',
    intro: 'Search these help topics for guidance on the current demonstration. Production account recovery and customer support are not connected.',
    sections: [
      {
        heading: 'Quick guidance',
        paragraphs: [
          'Use the help search below to filter practical topics. For questions about a local test order, open order history in the same browser session used at checkout.',
        ],
      },
    ],
    actions: [
      { label: 'Frequently asked questions', href: '/faq' },
      { label: 'Contact form', href: '/contact' },
      { label: 'Order information', href: '/orders' },
      { label: 'Shipping information', href: '/shipping' },
      { label: 'Returns information', href: '/returns' },
    ],
  },
  contact: {
    title: 'Contact Shopademia',
    description: 'Contact Shopademia through the support form only when its API is enabled after retention and privacy approval.',
    intro: 'Support intake is disabled by default. A request is accepted only after the API confirms it was saved; mail-service acceptance is reported separately and does not confirm recipient delivery.',
    sections: [
      {
        heading: 'Before you send a request',
        items: [
          'Do not include passwords, payment-card details, authentication codes, or other sensitive information.',
          'For a local test order, include its displayed reference only if needed; order history remains tied to your browser session.',
          'The API accepts support tickets only after the support-ticket migration is applied, an applicable retention/privacy policy is approved, the explicit API enablement and policy-approval settings are set, and SMTP is configured.',
        ],
      },
    ],
    actions: [
      { label: 'Search help topics', href: '/help' },
      { label: 'Frequently asked questions', href: '/faq' },
    ],
  },
  orders: {
    title: 'Order information',
    description: 'Learn how Shopademia local test orders are created and view this browser session’s order history.',
    intro: 'The storefront currently supports a local test-order lifecycle for eligible seller listings; it does not process a real purchase.',
    sections: [
      {
        heading: 'How the local order flow works',
        steps: [
          'Add eligible priced seller listings to the guest cart. Fictional catalogue products cannot be ordered.',
          'Submit the local checkout form using fictional contact and delivery information.',
          'The API saves a test order with the initial status “pending seller confirmation”.',
          'An authorized seller can confirm the local order; an authorized local administrator can then finalize it.',
          'Open the order history below in the same browser profile to see test orders associated with its guest session.',
        ],
      },
      {
        heading: 'Status and service limits',
        items: [
          'Pending seller confirmation: the seller has not confirmed the test order.',
          'Pending admin confirmation: the seller confirmed it; an authorized local administrator has not finalized it.',
          'Confirmed: the local administrator finalized the test record. This does not mean an item was dispatched or delivered.',
          'Online payment, shipment preparation, courier tracking, order cancellation, returns, and refunds are not implemented as production services.',
        ],
      },
      {
        heading: 'Private order history',
        paragraphs: [
          'The order-history panel asks the API for orders tied to this browser’s guest-session cookie. It is not an authenticated customer account or a public order lookup. Do not share browser session data.',
        ],
      },
    ],
    actions: [
      { label: 'Browse products', href: '/search' },
      { label: 'Shipping information', href: '/shipping' },
      { label: 'Contact support', href: '/contact' },
    ],
  },
  shipping: {
    title: 'Shipping and delivery',
    description: 'Review what is and is not configured for Shopademia shipping, delivery fees, and tracking.',
    intro: 'No production delivery service is connected to this Shopademia demonstration.',
    sections: [
      {
        heading: 'Coverage, methods, and fees',
        paragraphs: [
          'The project has no configured production service areas, courier partners, shipping methods, delivery-fee calculation, or international coverage.',
          'The local checkout total is not a shipping quote. If a future production checkout displays delivery information, the final confirmed checkout/order details—not this demo page—must be authoritative.',
        ],
      },
      {
        heading: 'Dispatch and tracking',
        paragraphs: [
          'The application does not book dispatch, create tracking numbers, show delivery attempts, or manage multi-parcel shipments. Order confirmation in the local demo is only a test-state change.',
        ],
      },
      {
        heading: 'Address and delivery issues',
        paragraphs: [
          'Use fictional delivery information only in local testing. No operational process exists here for incomplete addresses, delays, lost or damaged parcels, failed delivery, or seller shipping responsibilities.',
        ],
      },
    ],
    actions: [
      { label: 'Order information', href: '/orders' },
      { label: 'Returns information', href: '/returns' },
      { label: 'Contact support', href: '/contact' },
      { label: 'Frequently asked questions', href: '/faq' },
    ],
  },
  returns: {
    title: 'Returns and refunds',
    description: 'Understand the current Shopademia demo limits and the production return and refund decisions still awaiting approval.',
    intro: 'The local demonstration does not make real sales or operate a return, cancellation, or refund service.',
    sections: [
      {
        heading: 'No production return or refund process',
        paragraphs: [
          'There is no return-request workflow, return authorization, refund payment, refund status, partial refund, or dispute escalation feature connected to the storefront.',
          'Local order states do not determine a customer’s legal rights or establish that a refund is due or has been issued.',
        ],
      },
      {
        heading: 'Policy decisions still required',
        items: [
          'Business and legal approval of eligible and ineligible cases, time limits, and product condition requirements.',
          'Responsibility for return shipping, seller duties, and treatment of damaged, defective, incorrect, or missing items.',
          'Who funds and executes refunds for cash-on-delivery orders and how a refund is confirmed to the buyer.',
          'Cancellation cutoff, status evidence, exceptions, and an auditable request and escalation process.',
        ],
      },
      {
        heading: 'For local testing',
        paragraphs: [
          'Do not submit real purchases or use the demo to request a real return or refund. Contact-form submissions are available only when the support service is configured.',
        ],
      },
    ],
    actions: [
      { label: 'Shopping policies', href: '/shopping-policies' },
      { label: 'Order information', href: '/orders' },
      { label: 'Contact support', href: '/contact' },
    ],
  },
  shoppingPolicies: {
    title: 'Shopping policies',
    description: 'Read the current Shopademia demo guidelines and see which marketplace policies require approval before launch.',
    intro: 'This page describes current demo behavior and identifies production policies that have not been approved or implemented.',
    sections: [
      {
        heading: 'Product information and availability',
        paragraphs: [
          'Catalogue examples and imagery may be illustrative. Local seller listings can be drafts or test records; displayed stock and prices are not a production offer.',
          'Cart contents are checked by the API when the local order is submitted, so a listing may no longer be available or have enough stock.',
        ],
      },
      {
        heading: 'Orders and payments',
        paragraphs: [
          'A local test order is created only for eligible seller listings and uses a local cash-on-delivery test flow. No online payment is accepted and no real sale is formed by this demonstration.',
        ],
      },
      {
        heading: 'Delivery, cancellation, and returns',
        paragraphs: [
          'There is no production shipping, cancellation, return, refund, promotion, coupon, or discount service. Final rules, seller responsibilities, complaints, and dispute handling require business and legal approval.',
        ],
      },
      {
        heading: 'Responsible marketplace use',
        items: [
          'Use fictional contact and delivery details when testing.',
          'Do not treat product examples, local order states, or seller application decisions as a real transaction or verification.',
          'Do not submit sensitive information through a demo workflow.',
        ],
      },
    ],
    actions: [
      { label: 'Privacy information', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
      { label: 'Order information', href: '/orders' },
      { label: 'Shipping details', href: '/shipping' },
      { label: 'Returns and refunds', href: '/returns' },
      { label: 'Frequently asked questions', href: '/faq' },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    description: 'Answers about Shopademia browsing, demo checkout, order history, returns, and seller applications.',
    intro: 'These answers reflect the current local project. They do not promise production commerce or support services.',
    sections: [
      {
        heading: 'Need more detail?',
        paragraphs: [
          'Use the related information pages for longer explanations. The expandable answers below work with a keyboard or pointer.',
        ],
      },
    ],
    questions: [
      { category: 'General', question: 'What is Shopademia?', answer: 'Shopademia is being developed as a marketplace experience. This website currently demonstrates local storefront and seller workflows.' },
      { category: 'General', question: 'How does the marketplace work?', answer: 'Buyers can browse a loaded catalogue and try local cart/order flows. Seller tools and orders are development workflows, not live fulfillment.' },
      { category: 'General', question: 'Do I need an account to browse products?', answer: 'No account is required to browse the public storefront.' },
      { category: 'General', question: 'How do I contact support?', answer: 'Use the contact form if the API support-ticket and email settings are configured. The page reports whether the ticket was saved and whether notification was sent.' },
      { category: 'Buyer accounts', question: 'How do I create a buyer account?', answer: 'A production customer-account system is not connected. The local storefront does not create buyer accounts.' },
      { category: 'Buyer accounts', question: 'How can I reset my password?', answer: 'Buyer password recovery is unavailable because production customer accounts are not configured.' },
      { category: 'Buyer accounts', question: 'How can I update my account details?', answer: 'There is no production buyer profile to update. Do not enter real personal details in local tests.' },
      { category: 'Buyer accounts', question: 'How do I protect my account?', answer: 'Do not share passwords, one-time codes, browser session cookies, or other credentials. Production buyer account security is not provided here.' },
      { category: 'Shopping and payments', question: 'How do I find a product?', answer: 'Use the storefront search or browse the loaded categories. Search operates on the currently loaded catalogue.' },
      { category: 'Shopping and payments', question: 'How do I place an order?', answer: 'The local demo accepts eligible priced seller listings through its checkout. Fictional products cannot be ordered, and test orders are not real purchases.' },
      { category: 'Shopping and payments', question: 'Which payment methods are accepted?', answer: 'No online payment is processed. The local test workflow is labeled cash on delivery but does not arrange collection or delivery.' },
      { category: 'Shopping and payments', question: 'What happens if payment fails?', answer: 'There is no online payment integration or payment-failure workflow in this demonstration.' },
      { category: 'Shopping and payments', question: 'Can I cancel an order?', answer: 'No production cancellation-request workflow is available. Local test-order states do not define cancellation rights.' },
      { category: 'Orders and delivery', question: 'Where can I see my orders?', answer: 'Open Order information in the same browser profile used for checkout; the history panel reads orders associated with that browser’s guest session.' },
      { category: 'Orders and delivery', question: 'How do I track a shipment?', answer: 'Shipment tracking is unavailable because no courier or delivery provider is connected.' },
      { category: 'Orders and delivery', question: 'What should I do if an order is delayed?', answer: 'The demo does not dispatch or deliver orders, so it cannot handle real delays. Use fictional data only.' },
      { category: 'Orders and delivery', question: 'What if an item arrives damaged or is missing?', answer: 'No real delivery or damaged-item case workflow exists. A production support and resolution policy must be approved before launch.' },
      { category: 'Returns and refunds', question: 'How do I request a return?', answer: 'There is no production return-request feature. Review the Returns page for unresolved policy and workflow requirements.' },
      { category: 'Returns and refunds', question: 'When is a refund available?', answer: 'No production refund policy or payment reversal process has been established.' },
      { category: 'Returns and refunds', question: 'How can I check refund status?', answer: 'Refund statuses are not implemented because refunds are not processed by the demo.' },
      { category: 'Sellers', question: 'How do I become a seller?', answer: 'The separate Seller Portal has a seller-application flow, but it requires configured identity, API, Redis, and database services. An application is not production seller approval.' },
      { category: 'Sellers', question: 'What information is required for registration?', answer: 'The current application form requests an applicant name, proposed shop name, and description. Production identity documents or eligibility rules have not been approved.' },
      { category: 'Sellers', question: 'How do I add products?', answer: 'Authorized local Seller Portal users can submit draft listings. Listings require Admin activation before becoming active.' },
      { category: 'Sellers', question: 'How do I manage orders?', answer: 'The Seller Portal can review local test COD orders when configured. It does not provide production order fulfillment.' },
      { category: 'Sellers', question: 'What if my seller application requires approval?', answer: 'Applications remain pending until an authorized reviewer records a decision. No review-time promise is configured.' },
    ],
    actions: [
      { label: 'Help center', href: '/help' },
      { label: 'Order information', href: '/orders' },
      { label: 'Seller information', href: '/seller-information' },
    ],
  },
  sellers: {
    title: 'Seller information',
    description: 'Learn about current Shopademia seller application, draft listings, and local order workflows.',
    intro: 'The Seller Portal demonstrates selected seller workflows. Production seller services, identity verification, and payouts are not established.',
    sections: [
      {
        heading: 'What sellers can try',
        items: [
          'Submit a seller application through the separate Seller Portal when its identity and API dependencies are configured.',
          'Create product listing drafts and manage permitted inventory actions after access is approved.',
          'Review local test orders when the corresponding seller and API configuration is available.',
        ],
      },
      {
        heading: 'Application and authorization',
        paragraphs: [
          'The current application requests a name, proposed shop name, and product description. Applications require an authorized review. Approval controls API access; it does not verify legal business status or grant automatic access to a production marketplace.',
          'New product listings are drafts and require Admin activation. Sellers cannot activate or reactivate their own listings.',
        ],
      },
      {
        heading: 'Requirements that are not yet defined',
        items: [
          'Production eligibility, identity/business verification, documents, prohibited products, seller agreement, and appeals.',
          'Commissions, payment settlement, payout schedules, wallet services, shipping responsibilities, and production customer support.',
          'Sales volumes, customer reach, or other commercial benefits are not guaranteed.',
        ],
      },
    ],
    actions: [{ label: 'Seller registration details', href: '/seller-registration' }],
  },
  sellerRegistration: {
    title: 'Seller registration details',
    description: 'Understand the current Shopademia seller application steps and requirements before opening the separate Seller Portal.',
    intro: 'A local application workflow exists in the separate Seller Portal; it is not a production seller registration or verification program.',
    sections: [
      {
        heading: 'Current application steps',
        steps: [
          'Open the Seller Portal and sign in using its configured Auth0 application.',
          'Verify the email address through the identity provider.',
          'Submit the applicant name, proposed shop name, and description requested by the current form.',
          'Check the application status in the Seller Portal. An authorized reviewer records approval or rejection; no review-time commitment is configured.',
        ],
      },
      {
        heading: 'Information and access',
        paragraphs: [
          'The current form does not request identity documents. Do not send identity documents or other sensitive records through an unapproved channel.',
          'An approved application enables seller-owned API access only when the production identity and database configuration are in place. It does not automatically create production shop access, establish verification, or enable fulfillment.',
        ],
      },
      {
        heading: 'Configuration and next steps',
        paragraphs: [
          'The Seller Portal address is supplied through NEXT_PUBLIC_SELLER_PORTAL_URL. If it is not configured, this page will not pretend that the application can be opened.',
          'Production eligibility, document requirements, seller terms, fees, payout rules, and appeal procedures require business and legal approval.',
        ],
      },
    ],
    actions: [{ label: 'Seller information', href: '/seller-information' }],
  },
  privacy: {
    title: 'Privacy information',
    description: 'Review the data handled by Shopademia local development workflows and the privacy decisions required before production.',
    intro: 'This demonstration notice reflects known local behavior and is not a complete or legally reviewed production privacy policy.',
    sections: [
      {
        heading: 'Data used in local workflows',
        items: [
          'A browser guest-session cookie is used to associate local cart and test-order requests with the same browser session.',
          'Local checkout sends test contact and delivery details to the configured development API and database.',
          'If support intake is enabled, contact-form name, email, category, subject, and message are saved as a support ticket and included in an SMTP notification.',
          'Seller applications and identity-provider data are handled by the separate Seller Portal when configured.',
        ],
      },
      {
        heading: 'Service providers and security',
        paragraphs: [
          'The API database and configured SMTP provider process information submitted to those services. Do not submit passwords, payment-card data, one-time codes, or unnecessary sensitive information.',
          'This page does not claim that data is encrypted, never shared, or deleted within a particular period. Those practices must be verified and documented before production use.',
        ],
      },
      {
        heading: 'Retention, rights, and policy review',
        paragraphs: [
          'When support intake is enabled, a periodic API task attempts to remove expired support-ticket database rows according to SUPPORT_TICKET_RETENTION_DAYS. This does not remove email copies, logs, backups, or exports. No support-ticket retention period or complete data lifecycle has been approved. A production retention period, deletion process for other records, privacy contact, applicable legal basis, user-rights process, children’s privacy, marketing consent, and international-transfer details still require approval.',
          'The legal operator and jurisdictions have not been confirmed. A qualified legal review is required before this draft is used as a production notice.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    description: 'Read the current Shopademia local demonstration limitations and the marketplace terms that remain subject to review.',
    intro: 'Production marketplace terms have not been approved. This page describes the limited local testing purpose of the project.',
    sections: [
      {
        heading: 'Local development and testing',
        paragraphs: [
          'The catalogue, seller tools, and checkout are provided for development testing. Fictional examples are not for sale, and local cash-on-delivery records are not real purchases or delivery instructions.',
          'Use fictional contact and delivery information in local test workflows. Do not submit payment-card details or sensitive information.',
        ],
      },
      {
        heading: 'No production marketplace offer',
        paragraphs: [
          'This demonstration does not establish a buyer or seller agreement, online payment service, delivery service, seller payout, return/refund process, customer account, or support response commitment.',
        ],
      },
      {
        heading: 'Terms requiring legal and business decisions',
        items: [
          'Legal operator identity, eligibility, account rules, and marketplace responsibilities.',
          'Order formation, payment, seller fees and payouts, delivery, cancellations, returns, and refunds.',
          'Intellectual-property permissions, prohibited conduct, suspension and appeals, disputes, and lawful liability terms.',
          'Governing law, jurisdiction, legal notice contact, and process for changes to binding terms.',
        ],
      },
    ],
  },
} satisfies Record<string, InformationPageContent>;

export type InformationPageKey = keyof typeof informationPages;
