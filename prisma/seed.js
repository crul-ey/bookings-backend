import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(fileName) {
  const filePath = path.join(__dirname, '../src/data', fileName);
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

// Leeg de tabellen in juiste volgorde
await prisma.review.deleteMany();
await prisma.booking.deleteMany();
await prisma.property.deleteMany();
await prisma.amenity.deleteMany();
await prisma.host.deleteMany();
await prisma.user.deleteMany();

async function main() {
  console.log("🔁 Start met inladen van JSON-bestanden...");

  // Laad data uit JSON-bestanden
  const usersRaw = loadJSON('users.json').users || [];
  const hostsRaw = loadJSON('hosts.json').hosts || [];
  const propertiesRaw = loadJSON('properties.json').properties || [];
  const bookings = loadJSON('bookings.json').bookings || [];
  const reviews = loadJSON('reviews.json').reviews || [];
  const amenities = loadJSON('amenities.json').amenities || [];

  console.log("📥 Data ingelezen:");
  console.log(`  👤 Users: ${usersRaw.length}`);
  console.log(`  🏠 Hosts: ${hostsRaw.length}`);
  console.log(`  🏡 Properties: ${propertiesRaw.length}`);
  console.log(`  📅 Bookings: ${bookings.length}`);
  console.log(`  📝 Reviews: ${reviews.length}`);
  console.log(`  🧂 Amenities: ${amenities.length}`);

  // 🔐 Users en hosts voorbereiden
  const users = usersRaw.map(({ id, username, password, name, email, phoneNumber, profilePicture }) => ({
    id,
    username,
    password: bcrypt.hashSync(password, 10),
    name,
    email,
    phoneNumber,
    profilePicture,
    role: "user"
  }));

  const hosts = hostsRaw.map(({ id, username, password, name, email, phoneNumber, profilePicture, aboutMe }) => ({
    id,
    username,
    password: bcrypt.hashSync(password, 10),
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
    role: "host"
  }));

  console.log("📦 Data voorbereiden en toevoegen aan database...");

  await prisma.user.createMany({ data: users });
  console.log("✅ Users toegevoegd");

  await prisma.host.createMany({ data: hosts });
  console.log("✅ Hosts toegevoegd");

  // 🔄 Haal hosts opnieuw op (om zeker te zijn van geldige IDs)
  const createdHosts = await prisma.host.findMany();

  // Koppel elk property-item aan een geldige hostId (round robin)
  const properties = propertiesRaw.map((p, i) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    location: p.location,
    pricePerNight: p.pricePerNight,
    bedroomCount: p.bedroomCount,
    bathRoomCount: p.bathRoomCount,
    maxGuestCount: p.maxGuestCount,
    rating: p.rating,
    hostId: createdHosts[i % createdHosts.length].id // ✅ gegarandeerd geldig
  }));

  await prisma.amenity.createMany({ data: amenities });
  console.log("✅ Amenities toegevoegd");

  await prisma.property.createMany({ data: properties });
  console.log("✅ Properties toegevoegd");

  await prisma.booking.createMany({ data: bookings });
  console.log("✅ Bookings toegevoegd");

  await prisma.review.createMany({ data: reviews });
  console.log("✅ Reviews toegevoegd");

  console.log("🌱 Seeding voltooid.");
}

main()
  .catch((e) => {
    console.error("❌ Fout tijdens seeden:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
