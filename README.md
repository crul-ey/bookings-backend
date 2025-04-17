Backend API

Een volledige backend API gebouwd met **Node.js**, **Express**, **Prisma** en **SQLite**.  
Deze API beheert **gebruikers**, **hosts**, **properties**, **boekingen**, **reviews** en **voorzieningen (amenities)**. JWT-authenticatie, filtering en error-monitoring via Sentry zijn inbegrepen.

---

## 📦 Functionaliteiten

- 🔐 **Authenticatie** via JWT
- 📄 **CRUD** voor alle resources
- 🧠 **Filtering** op:
  - `/properties?location=Malibu&pricePerNight=310.25&amenities=Wifi`
  - `/bookings?userId=...`
  - `/users?username=...` of `?email=...`
  - `/hosts?name=...`
- 🛠️ **Prisma ORM** voor databasebeheer
- 📊 **Sentry-integratie** voor error monitoring
- ✅ **Volledig getest** met Postman-collecties

---

## 📁 Endpoints

| Method | Endpoint               | Beschrijving                            |
|--------|------------------------|------------------------------------------|
| POST   | `/login`              | Inloggen en JWT ontvangen                |
| GET    | `/users`              | Alle gebruikers ophalen (zonder wachtwoord) |
| POST   | `/users`              | Nieuwe gebruiker aanmaken                |
| GET    | `/users/:id`          | Specifieke gebruiker ophalen             |
| PUT    | `/users/:id`          | Gebruiker bijwerken                      |
| DELETE | `/users/:id`          | Gebruiker verwijderen                    |
| GET    | `/hosts`              | Alle hosts ophalen                       |
| POST   | `/hosts`              | Nieuwe host aanmaken                     |
| GET    | `/hosts/:id`          | Specifieke host ophalen                  |
| PUT    | `/hosts/:id`          | Host bijwerken                           |
| DELETE | `/hosts/:id`          | Host verwijderen                         |
| GET    | `/properties`         | Alle properties ophalen (+ filters)      |
| POST   | `/properties`         | Nieuwe property aanmaken                 |
| GET    | `/properties/:id`     | Specifieke property ophalen              |
| PUT    | `/properties/:id`     | Property bijwerken                       |
| DELETE | `/properties/:id`     | Property verwijderen                     |
| GET    | `/bookings`           | Alle boekingen ophalen (+ filters)       |
| POST   | `/bookings`           | Nieuwe booking aanmaken                  |
| GET    | `/bookings/:id`       | Specifieke booking ophalen               |
| PUT    | `/bookings/:id`       | Booking bijwerken                        |
| DELETE | `/bookings/:id`       | Booking verwijderen                      |
| GET    | `/reviews`            | Alle reviews ophalen                     |
| POST   | `/reviews`            | Nieuwe review aanmaken                   |
| GET    | `/reviews/:id`        | Review ophalen                           |
| PUT    | `/reviews/:id`        | Review bijwerken                         |
| DELETE | `/reviews/:id`        | Review verwijderen                       |
| GET    | `/amenities`          | Alle voorzieningen ophalen               |
| POST   | `/amenities`          | Nieuwe voorziening aanmaken              |
| GET    | `/amenities/:id`      | Voorziening ophalen                      |
| PUT    | `/amenities/:id`      | Voorziening bijwerken                    |
| DELETE | `/amenities/:id`      | Voorziening verwijderen                  |

---

## 🛠️ Installatie

```bash
git clone https://github.com/jouwgebruikersnaam/bookings-backend.git
cd bookings-backend
npm install
npx prisma migrate dev --name init
npm run dev

🔐 .env voorbeeld

PORT=3000
DATABASE_URL="file:./dev.db"
AUTH_SECRET_KEY=een_geheim_woord
SENTRY_DSN=https://example@sentry.io/123456

🧪 Testen met Postman

Postman-collecties zijn inbegrepen in de /postman map.
Open ze met Postman om alle endpoints te testen, inclusief positieve en negatieve gevallen.
📦 Tech Stack

    Node.js

    Express

    Prisma ORM

    SQLite

    JSON Web Token (JWT)

    Sentry

    Postman

🚀 Mogelijke uitbreidingen

    Verbinden met een frontend (React)

    Deployen via Vercel/Render

    Echte PostgreSQL-database

    Frontend login-functionaliteit

👨‍💻 Gemaakt door

    Deze app is gebouwd als onderdeel van de Winc Academy backend module.
    Door E.Yalcin / GITHUB: crul-ey

-
