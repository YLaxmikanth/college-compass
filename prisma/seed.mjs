import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { faker } from "@faker-js/faker";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const collegeTypes = ["PUBLIC", "PRIVATE", "DEEMED"];
const categories = ["Engineering", "Management", "Science", "Arts", "Medicine", "Commerce"];

const collegesData = [
  { name: "IIT Hyderabad", city: "Sangareddy", state: "Telangana" },
  { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra" },
  { name: "IIT Delhi", city: "New Delhi", state: "Delhi" },
  { name: "NIT Warangal", city: "Warangal", state: "Telangana" },
  { name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana" },
  { name: "BITS Pilani", city: "Pilani", state: "Rajasthan" },
  { name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu" },
  { name: "CBIT", city: "Hyderabad", state: "Telangana" },
  { name: "VNR VJIET", city: "Hyderabad", state: "Telangana" },
  { name: "Vasavi College of Engineering", city: "Hyderabad", state: "Telangana" },
  { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu" },
  { name: "NIT Surathkal", city: "Mangalore", state: "Karnataka" },
  { name: "IIIT Bangalore", city: "Bengaluru", state: "Karnataka" },
  { name: "SRM Institute of Science and Technology", city: "Chennai", state: "Tamil Nadu" },
  { name: "Amrita Vishwa Vidyapeetham", city: "Coimbatore", state: "Tamil Nadu" },
  { name: "PSG College of Technology", city: "Coimbatore", state: "Tamil Nadu" },
  { name: "Manipal Institute of Technology", city: "Manipal", state: "Karnataka" },
  { name: "NIT Calicut", city: "Kozhikode", state: "Kerala" },
  { name: "NIT Rourkela", city: "Rourkela", state: "Odisha" },
  { name: "MNIT Jaipur", city: "Jaipur", state: "Rajasthan" },
  { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal" },
  { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu" },
  { name: "College of Engineering Pune", city: "Pune", state: "Maharashtra" },
  { name: "BMS College of Engineering", city: "Bengaluru", state: "Karnataka" },
];

function pickCourses() {
  const pool = [
    ["Computer Science and Engineering", "4 years", "B.Tech"],
    ["Data Science", "4 years", "B.Tech"],
    ["Business Administration", "3 years", "BBA"],
    ["Psychology", "3 years", "BA"],
    ["Biotechnology", "4 years", "B.Sc"],
    ["Finance", "2 years", "MBA"],
  ];
  return faker.helpers.arrayElements(pool, faker.number.int({ min: 3, max: 5 })).map(([name, duration, degree]) => ({
    name,
    duration,
    degree,
    seatCount: faker.number.int({ min: 30, max: 240 }),
  }));
}

async function main() {
  await prisma.review.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Demo Student",
      email: "demo@collegecompass.dev",
      passwordHash: "demo:demo",
      bio: "A sample account for development.",
    },
  });

  const colleges = [];
  for (let i = 0; i < collegesData.length; i += 1) {
    const { name, city, state } = collegesData[i];
    const college = await prisma.college.create({
      data: {
        slug: faker.helpers.slugify(`${name}-${i}`).toLowerCase(),
        name,
        city,
        state,
        type: faker.helpers.arrayElement(collegeTypes),
        category: faker.helpers.arrayElement(categories),
        tuition: faker.number.int({ min: 45000, max: 450000 }),
        acceptanceRate: Number(faker.number.float({ min: 12, max: 85, fractionDigits: 1 })),
        rating: Number(faker.number.float({ min: 3.4, max: 5, fractionDigits: 1 })),
        ranking: i + 1,
        overview: faker.lorem.paragraph(),
        website: faker.internet.url(),
        featuredImage: faker.image.urlLoremFlickr({ category: "college" }),
        establishedYear: faker.number.int({ min: 1950, max: 2021 }),
        placements: faker.lorem.sentences(2),
        hostels: faker.datatype.boolean(),
        scholarships: faker.datatype.boolean(),
        aiEnabled: faker.datatype.boolean(),
      },
    });
    colleges.push(college);

    await prisma.course.createMany({
      data: pickCourses().map((course) => ({ ...course, collegeId: college.id })),
    });

    await prisma.review.createMany({
      data: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => ({
        title: faker.lorem.sentence(4),
        content: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 3, max: 5 }),
        status: "PUBLISHED",
        collegeId: college.id,
        userId: user.id,
      })),
    });
  }

  await prisma.savedCollege.createMany({
    data: colleges.slice(0, 10).map((college) => ({
      userId: user.id,
      collegeId: college.id,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
