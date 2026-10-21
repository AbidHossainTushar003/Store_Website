# Shopademia Storefront

Customer-facing demo storefront for the Shopademia platform.

## Current demo capabilities
- Browse and search the API-provided fictional demo catalogue.
- Explore illustrative category destinations and demo product details.
- Add fictional demo items to a guest cart or wishlist through the development API.
- Review and remove guest cart or wishlist items.

## Important limitations
The catalogue is for interface testing only. Products are not for sale. There are no real prices,
stock levels, orders, checkout, payments, delivery, customer accounts, or authenticated sessions.
Cart and wishlist contents are demo state, not purchases.

Category names and artwork are illustrative UI content and are not asserted to be API-backed
categories or product imagery. Search and sorting operate on the loaded demo catalogue in the
storefront; they do not call a server-side search service.

## Development
Set `NEXT_PUBLIC_API_BASE_URL` to the Shopademia development API base URL when one is available.
The storefront otherwise uses `http://localhost:3001/api/v1`. Guest cart and wishlist requests
require the API's configured development origin and cookie policy; this frontend does not establish
production authentication or authorization.

Run `npm run dev` for local development, `npm run lint` for linting, and `npm run build` for a
production build. The build writes to `.next`.
