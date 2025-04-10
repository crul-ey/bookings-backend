# BED Final Project – Bookings API

This project is a full-featured backend for managing property bookings, reviews, and amenities using Prisma, Express.js, and SQLite.

## 🚀 How to Get Started

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

## ⚙️ Environment Setup

Create a `.env` file in the root of the project:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_secret_key
```

---

## 📦 Seeding the Database

We use custom seed data based on real UUID-based data. To run the seed script:

```bash
npx prisma db seed
```

This will populate the database with:

- Users & Hosts
- Properties
- Amenities
- Reviews
- Bookings

---

## 📮 API Testing via Postman

Use the included Postman collection to test the entire flow.

### ✅ Steps

1. Open Postman
2. Click `Import` > Upload `final-project-postman-collection.json`
3. Log in with `/users/login` and copy the JWT token
4. Paste it into Postman's environment under `{{token}}`
5. Also set `{{userId}}` and `{{propertyId}}` manually for POSTs

---

## 🧪 Running Tests via Newman (optional)

You can run the Postman tests in the terminal with:

```bash
npm test
```

Make sure:
- The server is running on the expected port (`http://localhost:3000`)
- You restart your server before running tests that delete data

---

## 📁 Tech Stack

- Node.js / Express
- Prisma ORM + SQLite
- JWT Authentication
- Postman & Newman for API testing

---

## 🧠 Notes

- All models use `UUID` as their primary key
- Middleware `validateUUID` checks `:id` parameters
- All protected routes require `Authorization: Bearer <token>`

---

## ✅ Done

- ✅ All models & schema with relations
- ✅ Seeding with real UUIDs
- ✅ Controllers & routes tested via Postman
- ✅ Project ready for submission