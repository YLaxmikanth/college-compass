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

const collegesData = [
  {
    name: "IIT Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 310000,
    acceptanceRate: 1.8,
    rating: 4.9,
    averagePackage: 45.0,
    highestPackage: 124.0,
    placementRate: 98.0,
    overview:
      "IIT Bombay is one of India’s top engineering institutes with a globally recognized research and placement ecosystem.",
  },
  {
    name: "IIT Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 285000,
    acceptanceRate: 1.7,
    rating: 4.9,
    averagePackage: 42.5,
    highestPackage: 121.0,
    placementRate: 97.0,
    overview:
      "IIT Delhi combines rigorous academics, strong industry engagement, and a high placement record for engineering students.",
  },
  {
    name: "IIT Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 290000,
    acceptanceRate: 1.9,
    rating: 4.8,
    averagePackage: 38.0,
    highestPackage: 115.0,
    placementRate: 96.0,
    overview:
      "IIT Madras is renowned for its research output and strong placement partnerships with top technology firms.",
  },
  {
    name: "IIT Hyderabad",
    city: "Sangareddy",
    state: "Telangana",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 255000,
    acceptanceRate: 2.3,
    rating: 4.7,
    averagePackage: 36.5,
    highestPackage: 105.0,
    placementRate: 95.0,
    overview:
      "IIT Hyderabad is an innovation-focused campus with strong placements in technology and research roles.",
  },
  {
    name: "NIT Warangal",
    city: "Warangal",
    state: "Telangana",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 90000,
    acceptanceRate: 8.0,
    rating: 4.3,
    averagePackage: 16.5,
    highestPackage: 85.0,
    placementRate: 88.0,
    overview:
      "NIT Warangal is a leading technology university with strong campus placements and research programs.",
  },
  {
    name: "IIIT Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 220000,
    acceptanceRate: 3.6,
    rating: 4.6,
    averagePackage: 40.0,
    highestPackage: 110.0,
    placementRate: 97.0,
    overview:
      "IIIT Hyderabad is a premier research institute with outstanding placements in AI, data science, and software.",
  },
  {
    name: "BITS Pilani",
    city: "Pilani",
    state: "Rajasthan",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 455000,
    acceptanceRate: 5.2,
    rating: 4.6,
    averagePackage: 34.0,
    highestPackage: 105.0,
    placementRate: 95.5,
    overview:
      "BITS Pilani is one of India’s best private engineering colleges with a strong placement culture.",
  },
  {
    name: "VIT Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 360000,
    acceptanceRate: 7.5,
    rating: 4.2,
    averagePackage: 12.8,
    highestPackage: 70.0,
    placementRate: 86.0,
    overview:
      "VIT Vellore is a large private university with a strong emphasis on technology placements and industry connections.",
  },
  {
    name: "SRM Institute of Science and Technology",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 380000,
    acceptanceRate: 9.5,
    rating: 4.0,
    averagePackage: 11.5,
    highestPackage: 60.0,
    placementRate: 84.0,
    overview:
      "SRM Institute of Science and Technology offers wide program choices and campus placement support across engineering disciplines.",
  },
  {
    name: "Manipal Institute of Technology",
    city: "Manipal",
    state: "Karnataka",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 410000,
    acceptanceRate: 8.8,
    rating: 4.1,
    averagePackage: 13.7,
    highestPackage: 72.0,
    placementRate: 85.5,
    overview:
      "MIT Manipal is a respected private university known for its strong campus placements and industry-driven programs.",
  },
  {
    name: "Vasavi College of Engineering",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 135000,
    acceptanceRate: 14.5,
    rating: 4.0,
    averagePackage: 7.8,
    highestPackage: 48.0,
    placementRate: 76.0,
    overview:
      "Vasavi College of Engineering is a well-regarded Hyderabad institute with campus placements focused on software and core engineering.",
  },
  {
    name: "CBIT Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 140000,
    acceptanceRate: 15.0,
    rating: 4.0,
    averagePackage: 8.2,
    highestPackage: 52.0,
    placementRate: 78.0,
    overview:
      "CBIT Hyderabad offers value-driven engineering education with steadily improving placement outcomes.",
  },
  {
    name: "VNR VJIET",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 150000,
    acceptanceRate: 16.0,
    rating: 4.0,
    averagePackage: 8.8,
    highestPackage: 55.0,
    placementRate: 79.0,
    overview:
      "VNR VJIET is a popular engineering college in Hyderabad with solid industry placement support.",
  },
  {
    name: "Mahatma Gandhi Institute of Technology",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 145000,
    acceptanceRate: 17.0,
    rating: 3.9,
    averagePackage: 7.5,
    highestPackage: 50.0,
    placementRate: 75.0,
    overview:
      "MGIT is a well-established Hyderabad engineering college with growing placement ties in the region.",
  },
  {
    name: "Gokaraju Rangaraju Institute of Engineering and Technology",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 150000,
    acceptanceRate: 16.5,
    rating: 4.0,
    averagePackage: 8.6,
    highestPackage: 54.0,
    placementRate: 77.0,
    overview:
      "GRIET is a respected Hyderabad institute with strong industry links and growing placement outcomes.",
  },
  {
    name: "Institute of Aeronautical Engineering",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 155000,
    acceptanceRate: 16.8,
    rating: 3.9,
    averagePackage: 7.3,
    highestPackage: 48.0,
    placementRate: 74.0,
    overview:
      "IARE Hyderabad offers specialized aeronautical and engineering programs with targeted placement support.",
  },
  {
    name: "Anurag University",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 160000,
    acceptanceRate: 17.5,
    rating: 3.9,
    averagePackage: 7.0,
    highestPackage: 46.0,
    placementRate: 72.0,
    overview:
      "Anurag University is a private Hyderabad university offering engineering and technology programs with improving placements.",
  },
  {
    name: "JNTUH",
    city: "Hyderabad",
    state: "Telangana",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 85000,
    acceptanceRate: 12.5,
    rating: 3.9,
    averagePackage: 7.1,
    highestPackage: 46.0,
    placementRate: 74.0,
    overview:
      "JNTUH is a major public university offering affordable engineering degrees and consistent placement activity.",
  },
  {
    name: "Osmania University",
    city: "Hyderabad",
    state: "Telangana",
    type: "PUBLIC",
    category: "Science",
    tuition: 45000,
    acceptanceRate: 20.0,
    rating: 3.8,
    averagePackage: 5.8,
    highestPackage: 40.0,
    placementRate: 68.0,
    overview:
      "Osmania University is one of India’s oldest universities, offering diverse programs across science, arts, and commerce.",
  },
  {
    name: "Mahatma Jyothiba Phule University of Technology",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 130000,
    acceptanceRate: 16.8,
    rating: 3.9,
    averagePackage: 7.2,
    highestPackage: 46.0,
    placementRate: 73.0,
    overview:
      "MJCET is a popular Hyderabad college with strong industry connections in electronics and computer science.",
  },
  {
    name: "Malla Reddy Vocation and Science Research (MVSR)",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 148000,
    acceptanceRate: 17.2,
    rating: 3.9,
    averagePackage: 7.4,
    highestPackage: 47.0,
    placementRate: 74.0,
    overview:
      "MVSR is a Hyderabad engineering college with a growing placement record and strong software hiring pipelines.",
  },
  {
    name: "CMR Technical Campus",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 150000,
    acceptanceRate: 16.0,
    rating: 3.9,
    averagePackage: 7.7,
    highestPackage: 50.0,
    placementRate: 75.0,
    overview:
      "CMR Technical Campus offers engineering programs with a focus on practical training and campus placements.",
  },
  {
    name: "CMR College of Engineering",
    city: "Hyderabad",
    state: "Telangana",
    type: "PRIVATE",
    category: "Engineering",
    tuition: 145000,
    acceptanceRate: 16.5,
    rating: 3.9,
    averagePackage: 7.6,
    highestPackage: 49.0,
    placementRate: 74.5,
    overview:
      "CMR College of Engineering is a well-known Hyderabad institution with steady campus recruitment across IT and core engineering.",
  },
  {
    name: "Amrita Vishwa Vidyapeetham",
    city: "Coimbatore",
    state: "Tamil Nadu",
    type: "DEEMED",
    category: "Engineering",
    tuition: 320000,
    acceptanceRate: 12.0,
    rating: 4.3,
    averagePackage: 17.0,
    highestPackage: 82.0,
    placementRate: 90.0,
    overview:
      "Amrita Vishwa Vidyapeetham offers a strong mix of technology and humanities programs with solid placements.",
  },
  {
    name: "NIT Calicut",
    city: "Kozhikode",
    state: "Kerala",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 92000,
    acceptanceRate: 8.5,
    rating: 4.2,
    averagePackage: 15.8,
    highestPackage: 82.0,
    placementRate: 87.0,
    overview:
      "NIT Calicut is known for reliable campus placements in core and software roles across southern India.",
  },
  {
    name: "NIT Rourkela",
    city: "Rourkela",
    state: "Odisha",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 91000,
    acceptanceRate: 8.9,
    rating: 4.2,
    averagePackage: 15.0,
    highestPackage: 78.0,
    placementRate: 86.0,
    overview:
      "NIT Rourkela balances strong academics with good placement outcomes in engineering and technology streams.",
  },
  {
    name: "MNIT Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    type: "PUBLIC",
    category: "Engineering",
    tuition: 92000,
    acceptanceRate: 8.7,
    rating: 4.2,
    averagePackage: 15.2,
    highestPackage: 79.0,
    placementRate: 86.5,
    overview:
      "MNIT Jaipur is one of India’s leading NITs with strong engineering programs and campus placements.",
  },
];

function pickCourses() {
  const pool = [
    ["Computer Science and Engineering", "4 years", "B.Tech"],
    ["Data Science", "4 years", "B.Tech"],
    ["Artificial Intelligence and Machine Learning", "4 years", "B.Tech"],
    ["Information Technology", "4 years", "B.Tech"],
    ["Electronics and Communication Engineering", "4 years", "B.Tech"],
    ["Mechanical Engineering", "4 years", "B.Tech"],
    ["Civil Engineering", "4 years", "B.Tech"],
    ["Business Administration", "3 years", "BBA"],
    ["Computer Applications", "3 years", "BCA"],
    ["Biotechnology", "4 years", "B.Sc"],
    ["Finance", "2 years", "MBA"],
    ["Cyber Security", "4 years", "B.Tech"],
  ];
  return faker.helpers
    .arrayElements(pool, faker.number.int({ min: 5, max: 8 }))
    .map(([name, duration, degree]) => ({
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
    const {
      name,
      city,
      state,
      type,
      category,
      tuition,
      acceptanceRate,
      rating,
      averagePackage,
      highestPackage,
      placementRate,
      overview,
    } = collegesData[i];

    const college = await prisma.college.create({
      data: {
        slug: faker.helpers.slugify(`${name}-${i}`).toLowerCase(),
        name,
        city,
        state,
        type,
        category,
        tuition,
        acceptanceRate,
        rating,
        ranking: i + 1,
        overview,
        website: faker.internet.url(),
        featuredImage: faker.image.urlLoremFlickr({ category: "college" }),
        establishedYear: faker.number.int({ min: 1950, max: 2021 }),
        placements: `Average package ₹${averagePackage.toFixed(1)} LPA, highest package ₹${highestPackage.toFixed(1)} LPA, placement rate ${placementRate}%`,
        averagePackage,
        highestPackage,
        placementRate,
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
