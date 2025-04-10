import { PrismaClient } from "@prisma/client";
import fs from "fs";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const loadData = (filename) => {
  const raw = fs.readFileSync(`./src/data/${filename}`, "utf-8");
  return JSON.parse(raw);
};

const seed = async () => {
  try {
    await prisma.propertyAmenity.deleteMany();
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.amenity.deleteMany();
    await prisma.property.deleteMany();
    await prisma.host.deleteMany();
    await prisma.user.deleteMany();

    // ✅ Extra vaste user voor testen
    await prisma.user.create({
      data: {
        id: "11111111-1111-1111-1111-111111111111",
        username: "jdoe",
        password: await bcrypt.hash("password123", SALT_ROUNDS),
        name: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "0612345678",
        profilePicture: "https://via.placeholder.com/150",
      },
    });

    // Users
    const usersData = loadData("users.json").users;
    for (const user of usersData) {
      await prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          password: await bcrypt.hash(user.password, SALT_ROUNDS),
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePicture: user.profilePicture,
        },
      });
    }
    console.log("✅ Users seeded");

    // Hosts
    const hostsData = loadData("hosts.json").hosts;
    for (const host of hostsData) {
      await prisma.host.create({
        data: {
          id: host.id,
          username: host.username,
          password: await bcrypt.hash(host.password, SALT_ROUNDS),
          name: host.name,
          email: host.email,
          phoneNumber: host.phoneNumber,
          profilePicture: host.profilePicture,
          aboutMe: host.aboutMe,
        },
      });
    }
    console.log("✅ Hosts seeded");

    // Properties
    const propertiesData = loadData("properties.json").properties;
    for (const prop of propertiesData) {
      await prisma.property.create({
        data: {
          id: prop.id,
          title: prop.title,
          description: prop.description,
          location: prop.location,
          pricePerNight: prop.pricePerNight,
          bedroomCount: prop.bedroomCount,
          bathRoomCount: prop.bathRoomCount,
          maxGuestCount: prop.maxGuestCount,
          hostId: prop.hostId,
          rating: prop.rating,
        },
      });
    }
    console.log("✅ Properties seeded");

    // Amenities
    const amenitiesData = loadData("amenities.json").amenities;
    for (const amenity of amenitiesData) {
      await prisma.amenity.create({
        data: {
          id: amenity.id,
          name: amenity.name,
        },
      });
    }
    console.log("✅ Amenities seeded");

    // Bookings
    const bookingsData = loadData("bookings.json").bookings;
    for (const booking of bookingsData) {
      await prisma.booking.create({
        data: {
          id: booking.id,
          userId: booking.userId,
          propertyId: booking.propertyId,
          checkinDate: new Date(booking.checkinDate),
          checkoutDate: new Date(booking.checkoutDate),
          numberOfGuests: booking.numberOfGuests,
          totalPrice: booking.totalPrice,
          bookingStatus: booking.bookingStatus,
        },
      });
    }
    console.log("✅ Bookings seeded");

    // Reviews
    const reviewsData = loadData("reviews.json").reviews;
    for (const review of reviewsData) {
      await prisma.review.create({
        data: {
          id: review.id,
          userId: review.userId,
          propertyId: review.propertyId,
          rating: review.rating,
          comment: review.comment,
        },
      });
    }
    console.log("✅ Reviews seeded");

  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
