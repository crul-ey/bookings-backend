import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import users from '../src/data/users.json' assert { type: 'json' };
import hosts from '../src/data/hosts.json' assert { type: 'json' };
import properties from '../src/data/properties.json' assert { type: 'json' };
import amenities from '../src/data/amenities.json' assert { type: 'json' };
import bookings from '../src/data/bookings.json' assert { type: 'json' };
import reviews from '../src/data/reviews.json' assert { type: 'json' };

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  // ✅ USERS
  const hashedUsers = await Promise.all(
    users.users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, SALT_ROUNDS),
    }))
  );
  await prisma.user.createMany({ data: hashedUsers });

  // ✅ HOSTS
  const hashedHosts = await Promise.all(
    hosts.hosts.map(async (host) => ({
      ...host,
      password: await bcrypt.hash(host.password, SALT_ROUNDS),
    }))
  );
  await prisma.host.createMany({ data: hashedHosts });

  // ✅ REST
  await prisma.property.createMany({ data: properties.properties });
  await prisma.amenity.createMany({ data: amenities.amenities });
  await prisma.booking.createMany({ data: bookings.bookings });
  await prisma.review.createMany({ data: reviews.reviews });
}

main()
  .then(() => {
    console.log('✅ Database seeded successfully with hashed passwords!');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    prisma.$disconnect();
    process.exit(1);
  });
