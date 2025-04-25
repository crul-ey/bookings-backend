# 📦 Bookings Backend API

Een krachtige backend API gebouwd met **Node.js**, **Express**, **Prisma** en **SQLite**. Deze app beheert **gebruikers**, **hosts**, **properties**, **boekingen**, **reviews** en **voorzieningen (amenities)**. JWT-authenticatie, filtering en error-monitoring via Sentry zijn inbegrepen.

---

## ✅ Wat is nieuw?
- 🔄 **Volledig getest**: alle endpoints 100% getest met Postman (inclusief setup van automatische tokens)
- 🧪 **Test Runner** geconfigureerd in Postman (positieve + negatieve flows)
- 🧠 **Scripted Property ID's**: dynamische chaining van ID's in je Postman tests
- 🔐 **Login + token-gebruik automatisch** via Pre-request script

---

## 🔐 Authenticatie
Gebruik `POST /auth/login` om een token op te halen. Deze token wordt automatisch gebruikt in Postman-requests via een **Bearer Token header** (zie environment setup).

---

## 🔁 API Functionaliteiten

- ✅ JWT-authenticatie voor protected routes
- ✅ Volledige CRUD voor alle resources
- ✅ Filtering mogelijk op bijna elke GET-route
- ✅ Prisma ORM + SQLite
- ✅ Error-monitoring met Sentry
- ✅ Postman-tests met environment chaining

---

## 📁 Belangrijke Endpoints

Zie volledige tabel in je oude README hierboven — alle endpoints zijn identiek gebleven maar volledig getest.

---

## 🧪 Testen met Postman

1. Open de `/postman/Bookings API.postman_collection.json`
2. Selecteer environment `Local`
3. Klik op **Run Collection** met de **Runner**
4. ✅ Zie alle testresultaten — inclusief automatisch gegenereerde tokens en ID's

### 📌 Opmerking
- `POST /properties` slaat het ID van de aangemaakte property op in `{{propertyId}}`
- Deze ID wordt daarna automatisch gebruikt in `GET`, `PUT`, `DELETE` requests

---

## 🛠️ Installatie

```bash
git clone https://github.com/jouwgebruikersnaam/bookings-backend.git
cd bookings-backend
npm install
npx prisma migrate dev --name init
npm run dev
```

#### 🔐 .env voorbeeld
```env
PORT=3000
DATABASE_URL="file:./dev.db"
AUTH_SECRET_KEY=een_geheim_woord
SENTRY_DSN=https://example@sentry.io/123456
```

---

## 🚀 Mogelijke uitbreidingen

- Verbinden met een frontend in React of Next.js
- Deployen naar Vercel, Railway of Render
- Overschakelen naar PostgreSQL voor productie
- Extra beveiliging zoals rate limiting, input validation

---

## 👨‍💻 Gemaakt door
Deze app is gebouwd als onderdeel van de **Winc Academy backend module**.
Door **E. Yalcin**  
🔗 GitHub: [crul-ey](https://github.com/crul-ey)

---

