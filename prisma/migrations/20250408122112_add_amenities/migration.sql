-- CreateTable for User
CREATE TABLE "User" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT NOT NULL,
  "phonenumber" TEXT,
  "pictureURL" TEXT
);

-- CreateTable for Property
CREATE TABLE "Property" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "price" REAL NOT NULL,
  "description" TEXT,
  "bedroomCount" INTEGER NOT NULL,
  "bathRoomCount" INTEGER NOT NULL,
  "maxGuestCount" INTEGER NOT NULL,
  "hostId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL
);

-- CreateTable for Amenity
CREATE TABLE "Amenity" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL
);

-- CreateTable for PropertyAmenity (join table for Property and Amenity)
CREATE TABLE "PropertyAmenity" (
  "propertyId" INTEGER,
  "amenityId" INTEGER,
  FOREIGN KEY("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE,
  FOREIGN KEY("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE,
  PRIMARY KEY ("propertyId", "amenityId")
);

-- CreateTable for Booking
CREATE TABLE "Booking" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "userId" INTEGER,
  "propertyId" INTEGER,
  "date" DATETIME NOT NULL,
  FOREIGN KEY("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE
);

-- CreateTable for Review
CREATE TABLE "Review" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "userId" INTEGER,
  "propertyId" INTEGER,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  FOREIGN KEY("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE
);
