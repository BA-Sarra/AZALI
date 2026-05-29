# AZALI E-commerce, free-stack version

Premium bilingual e-commerce storefront for handmade leather goods in Tunisia.

Built for AZALI, a handmade leather brand whose meaning is “something that has no beginning and no end”. The site uses a warm artisan identity, bilingual French/English public routes, Cash on Delivery checkout, an admin dashboard, Neon PostgreSQL through Prisma, Cloudinary media uploads, Resend emails, and CSV/XLSX order exports.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- Neon PostgreSQL, or any standard hosted PostgreSQL database
- Custom admin password session, no paid auth provider required
- Cloudinary for product/page/video media
- Resend + React Email
- Vercel deployment
- Optional Google Sheets sync utility

## Public routes

French default:

- `/fr`
- `/fr/produits`
- `/fr/categorie/[slug]`
- `/fr/produit/[slug]`
- `/fr/rencontrer-l-artiste`
- `/fr/contact`
- `/fr/panier`
- `/fr/commande`
- `/fr/commande-recue/[orderNumber]`
- `/fr/faq`
- `/fr/livraison-et-paiement`
- `/fr/entretien-du-cuir`
- `/fr/retours-et-echanges`
- `/fr/confidentialite`
- `/fr/conditions`

English:

- `/en`
- `/en/products`
- `/en/category/[slug]`
- `/en/product/[slug]`
- `/en/meet-the-artist`
- `/en/contact`
- `/en/cart`
- `/en/checkout`
- `/en/order-success/[orderNumber]`
- `/en/faq`
- `/en/delivery-and-payment`
- `/en/leather-care`
- `/en/returns-and-exchanges`
- `/en/privacy`
- `/en/terms`

Admin:

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`
- `/admin/categories`
- `/admin/customizations`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/pages`
- `/admin/faq`
- `/admin/policies`
- `/admin/settings`
- `/admin/media`

## Features included

- Bilingual public website, French and English
- Category-first storefront
- Product detail pages
- Product colors
- Database-driven customization system
- LocalStorage cart
- Cash on Delivery checkout
- Tunisia-only delivery
- Fixed shipping fee, default 8 TND, editable in settings
- Order status flow:
  - `PENDING_CONFIRMATION`
  - `CONFIRMED`
  - `IN_PRODUCTION`
  - `READY_TO_SHIP`
  - `SHIPPED`
  - `DELIVERED`
  - `CANCELLED`
- Customer and owner confirmation emails are sent only when admin changes an order to `CONFIRMED`
- Admin dashboard
- Product CRUD basic flow
- Category creation
- Customization group/option creation
- Order detail + status update
- CSV export
- XLSX export with Orders, Order Items, and Customizations sheets
- FAQ editor
- Policy page editor
- Settings editor
- Cloudinary media uploader
- Seed data for categories, products, policies, FAQ, settings, and customization groups

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a free Neon PostgreSQL database

Create a Neon project and database. Copy:

- pooled connection string for `DATABASE_URL`
- direct/non-pooled connection string for `DIRECT_URL`

If Neon gives you one URL first, you can temporarily use the same URL for both local setup, but for production and migrations it is cleaner to use the pooled URL for the app and the direct URL for Prisma migrations.

### 3. Create a free Cloudinary account

From your Cloudinary dashboard, copy:

- Cloud name
- API key
- API secret

The admin media page uploads files to folders under `azali/products`, `azali/pages`, `azali/artist`, and `azali/brand-video`.

### 4. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Fill:

```env
DATABASE_URL="your-neon-pooled-url"
DIRECT_URL="your-neon-direct-url"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD_HASH="paste-generated-hash-here"
JWT_SECRET="a-long-random-secret-at-least-32-characters"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

RESEND_API_KEY="re_xxxxx"
RESEND_FROM_EMAIL="AZALI <orders@yourdomain.com>"
OWNER_NOTIFICATION_EMAIL="your-email@example.com"
```

### 5. Generate the admin password hash

Run this and replace `yourStrongPassword` with the password you want to use for `/admin/login`:

```bash
npm run auth:hash -- yourStrongPassword
```

Copy the output into `.env`:

```env
ADMIN_PASSWORD_HASH="scrypt$16384$8$1$..."
```

Do not put the raw password in `.env`.

Generate a long secret for sessions. Example:

```bash
node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"
```

Copy the output into:

```env
JWT_SECRET="paste-output-here"
```

### 6. Run Prisma migration

Generate Prisma Client and create the first real migration:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Windows PowerShell:

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

For production/Vercel after the migration files exist:

```bash
npx prisma migrate deploy
```

### 7. Seed demo content

```bash
npm run db:seed
```

This creates:

- 6 categories
- sample products
- sample customization groups
- color options
- FAQ entries
- policy pages
- default shipping fee
- contact info
- Meet the Artist placeholder content

### 8. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000/fr
```

Admin:

```text
http://localhost:3000/admin/login
```

Log in with:

- `ADMIN_EMAIL`
- the raw password you used to generate `ADMIN_PASSWORD_HASH`

## Resend setup

1. Create a Resend account.
2. Verify your sending domain.
3. Create an API key.
4. Set:

```env
RESEND_API_KEY="re_xxxxx"
RESEND_FROM_EMAIL="AZALI <orders@yourdomain.com>"
OWNER_NOTIFICATION_EMAIL="your-email@example.com"
```

Emails are not sent at checkout. They are sent when admin confirms an order.

## Order flow

1. Customer adds products/customizations to cart.
2. Customer submits checkout.
3. Order is saved as `PENDING_CONFIRMATION`.
4. Customer sees order request received page.
5. Admin opens order in `/admin/orders/[id]`.
6. Admin changes status to `CONFIRMED`.
7. Customer confirmation email and owner notification email are sent.
8. Admin can update status through production/shipping/delivery.

## Customization sheet

The user mentioned a customization sheet but it was not present in the generated project package. Place it here:

```text
docs/azali-customization-options.xlsx
```

The app already supports flexible customization groups and options in the database. Seed data includes leather color, thread color, paper type, and initials.

## Replacing placeholders

Logo files:

```text
public/brand/logo.svg
public/brand/logo-dark.svg
public/brand/logo-light.svg
public/brand/logo-mark.svg
```

Replace these with your real AZALI logo files.

Product and hero placeholders are in:

```text
public/placeholders
```

Upload real media in `/admin/media`, then copy the Cloudinary URL into products, pages, or settings.

## Vercel deployment

1. Push this project to GitHub.
2. Import into Vercel.
3. Add all environment variables from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Run migration from your machine or CI:

```bash
npx prisma migrate deploy
```

6. Seed production only if you want the demo starter data:

```bash
npm run db:seed
```

7. Deploy.

## Optional Google Sheets sync

The utility is in:

```text
src/lib/googleSheets.ts
```

Configure:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
GOOGLE_SHEETS_SPREADSHEET_ID=""
```

The current MVP prioritizes admin dashboard + XLSX export. You can call `appendOrderToGoogleSheets(order)` from the order confirmation action if you want live mirroring.

## Deployment checklist

- [ ] Real logo files added
- [ ] Neon database created
- [ ] Cloudinary credentials configured
- [ ] Admin password hash generated
- [ ] `JWT_SECRET` generated
- [ ] Database migrated
- [ ] Seed run or real content entered
- [ ] Resend domain verified
- [ ] `OWNER_NOTIFICATION_EMAIL` set
- [ ] Real product photos uploaded
- [ ] Contact info updated
- [ ] Policies reviewed legally before public launch
- [ ] Test order created
- [ ] Admin confirms test order and emails are received

## Notes

This is a strong MVP codebase, not a Shopify clone. It is designed around AZALI's actual needs: handmade products, customization, manual confirmation, Tunisia-only delivery, and Cash on Delivery, while keeping the hosting stack free-friendly for launch.

## Latest AZALI brand update

This package includes the revised AZALI direction:

- Palette changed to parchment `#F2EBD6`, sand `#C4A06E`, leather `#896038`, garnet `#871A3B`, indigo `#2C1268`, and umber `#271509`.
- Garnet is the main desire/accent color. Indigo is used sparingly for origin/category/identity moments.
- Fonts changed to the Legacy & Luxury set: Playfair Display for headings, Montserrat for body text, and Amiri for Arabic fallback.
- Corners were reduced across the UI for a more premium, less bubbly interface.
- Added bilingual Leather Ethics policy pages:
  - `/fr/ethique-du-cuir`
  - `/en/leather-ethics`
- Meet the Artist sections now render as image, italic quote, then normal paragraph. In the admin/page section body, separate the quote and paragraph with one blank line.
- Notebook products now follow the AZALI pricing sheet logic:
  - Assassi starts at 75 TND and holds up to 4 notebooks.
  - Fannen starts at 80 TND and holds up to 6 notebooks.
  - Charm count changes price from 0 to 5 charms.
  - Product pages display the notebook combinations and charm pricing table.

After pulling this update into an existing database, run:

```bash
npm run db:seed
```

Only do this before real orders, because the seed script resets sample data. If you already have real orders, add the new policies and customization groups manually from admin/database instead of reseeding.
