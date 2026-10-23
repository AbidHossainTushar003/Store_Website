# Shopademia Storefront

Customer-facing storefront for the Shopademia local development marketplace.

## Current capabilities
- Browse and search API listings approved for public display.
- Explore illustrative category destinations and product details.
- Add demo or seller-listed products to a guest cart or wishlist through the development API.
- Review and remove guest cart or wishlist items.
- Place a persisted, local-only cash-on-delivery test order for priced seller listings.
- View order status in the browser session's local order history.

## Important limitations
Fictional demo products are excluded from public catalogue results and cannot be ordered.
Seller listings and orders are test data stored in the isolated local development database. The COD workflow is not a real sale:
it does not take online payment, arrange delivery, provide customer accounts, or authorize
production identities. Use fictional contact and delivery data only.

Category names and artwork are illustrative UI content and are not asserted to be API-backed
categories or product imagery. Search and sorting operate on the loaded catalog in the
storefront; they do not call a server-side search service.

## Development
Set `NEXT_PUBLIC_API_BASE_URL` to the local Shopademia development API base URL when one is available.
The storefront otherwise uses `http://localhost:3001/api/v1`. Guest cart and order requests
require the API's configured development origin and cookie policy.
Outside development, API-backed storefront flows require `NEXT_PUBLIC_API_BASE_URL` to be set
to the public HTTPS API base URL when building. The production client does not fall back to
localhost; missing, invalid, or non-HTTPS values make those flows unavailable.

The local order workflow requires the API `LOCAL_DEMO_MODE=true` setting in development mode,
with the API bound to a loopback host. See the API README for setup and local test identities.
This frontend does not provide production authentication, authorization, payment, or shipping.

Run `npm run dev` for local development, `npm run lint` for linting, and `npm run build` for a
production build. The build writes to `.next`.

## Marketplace information pages

The footer and `/information` index use one shared route manifest for all 13 public information
links. Canonical pages include marketplace information, how it works, help, contact, order
information/history, shipping, returns, shopping policies, FAQ, seller information, seller
registration, privacy, and terms. Legacy information routes remain available and identify their
canonical paths. `/orders` preserves the browser guest-session order history alongside the
public explanation.

The help topic search and FAQ disclosures are keyboard-accessible. The contact form submits to
the API and reports confirmed ticket persistence separately from SMTP acceptance; SMTP acceptance
does not prove delivery to the recipient. Support intake is disabled by default and requires the
API's explicit enablement and policy-attestation flags, an approved retention/privacy policy,
the `006-support-tickets.sql` migration, and complete server-side SMTP settings. These settings do
not themselves establish policy approval. See the API README and `.env.example`; the migration is
not applied automatically. If the browser cannot confirm the result of a submission, it advises
against resubmitting and locks the form until an authorized operator checks for a stored ticket.
A per-tab session marker keeps the form locked after a reload in the same tab; it stores no form
content. This remains a client-side safeguard, not server-side idempotency, and another tab or
browser can still submit a duplicate. Set
`NEXT_PUBLIC_SELLER_PORTAL_URL` to show the actual Seller Portal application link, and set
`NEXT_PUBLIC_SITE_URL` to a verified absolute site origin before canonical metadata is emitted.
Neither setting has a guessed production default.

Privacy, returns, shipping, seller, and terms content describes known local demo behavior and
calls out unresolved production decisions. It does not establish final legal or operational
policies.
