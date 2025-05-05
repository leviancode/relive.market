# 📦 Relive.Market — Telegram Mini App & Landing

Marketplace for travelers to buy/sell second-hand goods, powered by Telegram Web Apps, Firebase, and Next.js.

---

## 🌍 Tech Stack

* **Frontend**: Next.js 15, TypeScript, Tailwind CSS, TelegramUI, Lucide Icons
* **Localization**: next-intl with `public/locales`
* **State management**: React hooks + Firebase
* **Hosting**: Firebase Hosting + Cloudflare DNS
* **Deployment**: Static export (`next export`)
* **Environments**: `dev` and `prod`, fully isolated

---

## 🔧 Project Structure

```
├── public/                 # Contains landing (index.html) and prod app in /app
│   └── app/                # Prod Telegram Mini App build output
├── apps/dev/              # Dev build of the Telegram Mini App
├── src/
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-based modules (listings, profiles, etc.)
│   ├── lib/               # Firebase, helpers, localization, etc.
│   ├── app/               # Next.js app directory
│   ├── i18n/              # next-intl configuration
│   └── types/             # Global TypeScript types
├── public/locales/        # en, uk, ru translations
├── .env.*.local           # Environment-specific variables
└── firebase.json          # Hosting rewrites
```

---

## 🚀 Scripts

```bash
pnpm run dev              # Start local dev server
pnpm run build:prod       # Build static export for production
pnpm run build:dev        # Build static export for development
pnpm run deploy:prod      # Deploy to https://relive.market/app
pnpm run deploy:dev       # Deploy to https://dev.relive.market/app
```

---

## 🌐 Hosting & Routing

| URL                                                            | Target                  | Purpose                     |
| -------------------------------------------------------------- | ----------------------- | --------------------------- |
| [https://relive.market](https://relive.market)                 | `relivemarket`          | Landing page                |
| [https://relive.market/app](https://relive.market/app)         | `relivemarket`          | Prod Telegram Mini App      |
| [https://dev.relive.market/app](https://dev.relive.market/app) | `relivemarket-dev`      | Dev Telegram Mini App       |
| [https://www.relive.market](https://www.relive.market)         | `relivemarket-redirect` | Redirect to `relive.market` |

---

## 🔐 Environment Variables

`.env.development.local` and `.env.production.local` contain:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

NEXT_PUBLIC_WEB_APP_URL=https://relive.market/app
NEXT_PUBLIC_ENABLE_TELEGRAM_DEV_EMULATOR=true
```

---

## 🧪 Dev Features

* `DevSeedPage`: seeds Firestore dev database with mock listings
* `initDevEnvironment()`: emulates Telegram WebApp environment for local testing

---

## 📱 Telegram Mini App

To test:

1. Register Telegram Bot via [@BotFather](https://t.me/BotFather)
2. Add Web App to the bot:

```bash
/setdomain → https://relive.market/app
```

3. Open your bot → Web App button should appear

To test **dev** version:

* Add another Web App URL to the same bot (or use a separate dev bot):

```
/setdomain → https://dev.relive.market/app
```

---

## 📝 Localization

All texts are managed in `public/locales/{lang}/translation.json`. Loaded automatically by `next-intl`.

Use:

```ts
import { useTranslations } from 'next-intl';
const t = useTranslations('listings');
t('noListings')
```

---

## 📤 Deployment Checklist

*

---

## 🧠 TODOs

* ✅ Listings list, details, create
* ⏳ Messaging
* ⏳ Promoting (by Stars)
* ⏳ Admin panel
* ⏳ User verification & safety
* ⏳ App Store + PWA build

---

Happy shipping!


## Scripts

This project contains the following scripts:

- `dev`. Runs the application in development mode.
- `dev:https`. Runs the application in development mode using self-signed SSL
  certificate.
- `build`. Builds the application for production.
- `start`. Starts the Next.js server in production mode.
- `lint`. Runs [eslint](https://eslint.org/) to ensure the code quality meets
  the required
  standards.

To run a script, use the `pnpm run` command:

```Bash
pnpm run {script}
# Example: pnpm run build
```

## Create Bot and Mini App

Before you start, make sure you have already created a Telegram Bot. Here is
a [comprehensive guide](https://docs.telegram-mini-apps.com/platform/creating-new-app)
on how to do it.

## Run

Although Mini Apps are designed to be opened
within [Telegram applications](https://docs.telegram-mini-apps.com/platform/about#supported-applications),
you can still develop and test them outside of Telegram during the development
process.

To run the application in the development mode, use the `dev` script:

```bash
pnpm run dev
```

After this, you will see a similar message in your terminal:

```bash
▲ Next.js 14.2.3
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 2.9s
```

To view the application, you need to open the `Local`
link (`http://localhost:3000` in this example) in your browser.

It is important to note that some libraries in this template, such as
`@telegram-apps/sdk`, are not intended for use outside of Telegram.

Nevertheless, they appear to function properly. This is because the
`src/hooks/useTelegramMock.ts` file, which is imported in the application's
`Root` component, employs the `mockTelegramEnv` function to simulate the
Telegram environment. This trick convinces the application that it is
running in a Telegram-based environment. Therefore, be cautious not to use this
function in production mode unless you fully understand its implications.

### Run Inside Telegram

Although it is possible to run the application outside of Telegram, it is
recommended to develop it within Telegram for the most accurate representation
of its real-world functionality.

To run the application inside Telegram, [@BotFather](https://t.me/botfather)
requires an HTTPS link.

This template already provides a solution.

To retrieve a link with the HTTPS protocol, consider using the `dev:https`
script:

```bash
$ pnpm run dev:https

▲ Next.js 14.2.3
- Local:        https://localhost:3000

✓ Starting...
✓ Ready in 2.4s
```

Visiting the `Local` link (`https://localhost:3000` in this example) in your
browser, you will see the following warning:

![SSL Warning](assets/ssl-warning.png)

This browser warning is normal and can be safely ignored as long as the site is
secure. Click the `Proceed to localhost (unsafe)` button to continue and view
the application.

Once the application is displayed correctly, submit the
link `https://127.0.0.1:3000` (`https://localhost:3000` is considered as invalid
by BotFather) as the Mini App link to [@BotFather](https://t.me/botfather).
Then, navigate to [https://web.telegram.org/k/](https://web.telegram.org/k/),
find your bot, and launch the Telegram Mini App. This approach provides the full
development experience.

## Deploy

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out
the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for
more details.

## Useful Links

- [Platform documentation](https://docs.telegram-mini-apps.com/)
- [@telegram-apps/sdk-react documentation](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react)
- [Telegram developers community chat](https://t.me/devs)