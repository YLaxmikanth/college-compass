# 🎓 College Compass

A full-stack college discovery and comparison platform that helps students explore, evaluate, and compare colleges through a single unified interface.

🌐 Live Demo: https://college-compass-hazel.vercel.app

📂 GitHub Repository: https://github.com/YLaxmikanth/college-compass

---

## 🚀 Overview

Students often visit multiple websites to compare colleges, fees, ratings, courses, and other information before making academic decisions.

College Compass centralizes this information into one platform, allowing users to:

- Browse colleges
- Search and filter institutions
- View detailed college information
- Compare colleges side-by-side
- Create accounts and authenticate securely

---

## ✨ Features

### 🔍 College Listing & Search

- Search colleges by name
- Paginated results
- College cards displaying:
  - Name
  - Location
  - Rating
  - Tuition Fees
  - Institution Type

### 🏫 College Detail Page

Detailed information for every college including:

- Overview
- Courses Offered
- Acceptance Rate
- Reviews
- Tuition Fees

### ⚖️ College Comparison

Compare up to 3 colleges side-by-side based on:

- Rating
- Tuition Fees
- Acceptance Rate
- Location
- Institution Type

### 🔐 Authentication

- User Registration
- User Login
- Session-based Authentication using NextAuth

---

## 🏗️ Architecture

### Frontend

- Next.js 16
- React 19
- TypeScript
- TailwindCSS

### Backend

- Next.js API Routes
- TypeScript
- Prisma ORM

### Database

- PostgreSQL
- Neon Database

### Authentication

- NextAuth

### State Management

- Zustand

### Deployment

- Vercel

---

## 📁 Project Structure

```text
college-compass/
│
├── app/
│   ├── api/
│   ├── colleges/
│   ├── compare/
│   ├── login/
│   └── register/
│
├── components/
│
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── validators.ts
│   └── password.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.mjs
│
├── store/
│   └── compare-store.ts
│
└── types/
```

---

## 🗄️ Database Schema

### User

Stores user account information.

### College

Stores college details such as:

- Name
- Location
- Rating
- Fees
- Overview
- Acceptance Rate

### Course

Stores courses offered by colleges.

### Review

Stores user reviews and ratings.

### SavedCollege

Stores user-college saved relationships.

---

## 🧠 Key Engineering Decisions

### Direct Prisma Queries

Instead of performing internal API fetches from Server Components, direct Prisma queries are used where appropriate to improve:

- Performance
- Reliability
- Production deployment stability

### Zustand for Compare State

Zustand provides lightweight global state management for college comparison functionality.

### Server Components

Next.js Server Components are used wherever possible to improve:

- Performance
- SEO
- Data fetching efficiency

---

## ⚠️ Edge Cases Handled

- Empty search results
- Invalid college IDs
- Duplicate user registration
- Comparison limited to 3 colleges
- Production-safe server rendering
- Database validation errors
- Authentication failures

---

## 🛠️ Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/YLaxmikanth/college-compass.git

cd college-compass
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url

NEXTAUTH_SECRET=your_secret

NEXTAUTH_URL=http://localhost:3000
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Migrations

```bash
npx prisma migrate dev
```

### 6. Seed Database

```bash
node prisma/seed.mjs
```

### 7. Start Development Server

```bash
npm run dev
```

---

## 🚀 Deployment

The application is deployed on:

- Vercel
- Neon PostgreSQL

Every push to the `main` branch automatically triggers a new production deployment.

---

## 📸 Screenshots

Add screenshots of:

- Homepage
- Colleges Page
- College Details Page
- Compare Page
- Login/Register Page

---

## 🔮 Future Improvements

- AI-powered college recommendations
- Predictor Tool (Exam Rank → College Matching)
- Saved Colleges
- Saved Comparisons
- Discussion & Q&A System
- Advanced Filtering
- Personalized Student Dashboard

---

## 👨‍💻 Author

**Yaga Laxmikanth**

- GitHub: https://github.com/YLaxmikanth
- LinkedIn: https://www.linkedin.com/in/laxmikanth-yaga/

---

## 📄 License

This project was developed as part of an AI Software Engineer Internship assessment submission.

Feel free to explore, learn, and provide feedback.
