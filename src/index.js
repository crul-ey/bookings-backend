import express from "express";
import usersRouter from "./routes/users.js"; // 👈 importeer je users route
import propertiesRouter from "./routes/properties.js"; // 👈 importeer je properties route
import bookingsRouter from "./routes/bookings.js"; // 👈 importeer je bookings route
import amenitiesRouter from "./routes/amenities.js"; // 👈 importeer je amenities route
import hostsRouter from "./routes/hosts.js"; // 👈 importeer je hosts route
import reviewsRouter from "./routes/reviews.js"; // 👈 importeer je reviews route

const app = express();

app.use(express.json()); // 👈 zodat je JSON-body’s kunt lezen

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Voeg routes toe voor alle entiteiten
app.use("/users", usersRouter); // 👈 alle /users endpoints gaan via deze router
app.use("/properties", propertiesRouter); // 👈 alle /properties endpoints gaan via deze routers
app.use("/bookings", bookingsRouter); // 👈 alle /bookings endpoints gaan via deze router
app.use("/amenities", amenitiesRouter); // 👈 alle /amenities endpoints gaan via deze router
app.use("/hosts", hostsRouter); // 👈 alle /hosts endpoints gaan via deze router
app.use("/reviews", reviewsRouter); // 👈 alle /reviews endpoints gaan via deze router

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
