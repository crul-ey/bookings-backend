import express from "express";
import dotenv from "dotenv";

// ✅ Laad .env variabelen
dotenv.config();

// ✅ Routers
import usersRouter from "./routes/users.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import amenitiesRouter from "./routes/amenities.js";
import hostsRouter from "./routes/hosts.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();

// ✅ Middleware: lees JSON body’s
app.use(express.json());

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// ✅ Alias fix voor Postman login test (optioneel)
app.post("/login", (req, res, next) => {
  req.url = "/users/login";
  next();
});

// ✅ API routes
app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/reviews", reviewsRouter);

// ✅ 404 fallback voor niet-bestaande routes
app.use((req, res) => {
  res.status(404).json({ error: "Route niet gevonden" });
});

// ✅ Foutafhandeling middleware
app.use((err, req, res, next) => {
  console.error("❌ Interne fout:", err);
  res.status(500).json({ error: "Er is iets misgegaan op de server." });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
