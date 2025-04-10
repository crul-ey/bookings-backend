/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `hostId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `propertyId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amenityId` on table `PropertyAmenity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyId` on table `PropertyAmenity` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `hostId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT,
    "pictureURL" TEXT,
    "aboutMe" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "hostId" TEXT NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "id", "propertyId", "userId") SELECT "date", "id", "propertyId", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "bedroomCount" INTEGER NOT NULL,
    "bathRoomCount" INTEGER NOT NULL,
    "maxGuestCount" INTEGER NOT NULL,
    "hostId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "Property_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("bathRoomCount", "bedroomCount", "description", "hostId", "id", "location", "maxGuestCount", "price", "rating", "title") SELECT "bathRoomCount", "bedroomCount", "description", "hostId", "id", "location", "maxGuestCount", "price", "rating", "title" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE TABLE "new_PropertyAmenity" (
    "propertyId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    PRIMARY KEY ("propertyId", "amenityId"),
    CONSTRAINT "PropertyAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PropertyAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PropertyAmenity" ("amenityId", "propertyId") SELECT "amenityId", "propertyId" FROM "PropertyAmenity";
DROP TABLE "PropertyAmenity";
ALTER TABLE "new_PropertyAmenity" RENAME TO "PropertyAmenity";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("comment", "id", "propertyId", "rating", "userId") SELECT "comment", "id", "propertyId", "rating", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT,
    "pictureURL" TEXT,
    "hostId" TEXT,
    CONSTRAINT "User_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "name", "password", "phonenumber", "pictureURL", "username") SELECT "email", "id", "name", "password", "phonenumber", "pictureURL", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");
