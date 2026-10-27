# HotelPro – Royal Heritage Hotel Booking and Management System

HotelPro is a full-stack, enterprise-grade royal heritage hotel booking and operations management platform designed for guests and palace administrators. Infused with a **Royal Indian Palace Vibe** ("Live Like a Maharaja", Rajputana/Udaipur palace themes, "अतिथि देवो भव", Haveli suites, ₹ INR tariffs, and RuPay/UPI demo workflows), the project is built on the modern MERN stack (React 18, Node.js, Express, MongoDB/Mongoose) with Bootstrap 5 and Chart.js.

---

## 1. Project Overview

HotelPro provides an end-to-end luxury hospitality experience:
- **For Discerning Guests:** Browse royal palace suites, check real-time guaranteed chamber availability based on algorithmic booking date overlap, review ₹ INR pricing breakdowns, make reservations, simulate payments via a dedicated RuPay/UPI/NetBanking mock gateway, and print official **Shahi Farman** stay vouchers and invoices.
- **For Palace Administrators (Dewan):** Access an executive Darbar command center featuring live KPI stat cards, interactive revenue and occupancy charts, comprehensive palace chamber inventory CRUD, guest status management (Check-in, Check-out, Cancellation), and user account directory controls.

---

## 2. Key Features

### 👑 Royal Guest & Public Features
- **Royal Heritage Landing Page:** High-definition Lake Pichola twilight palace hero, floating royal search widget, "पधारो म्हारे देश" Rajasthani ethos, Shahi Dawat dining, Baoli stepwell pool, Ayurvedic wellness sanctuary, and royal testimonials.
- **Date Overlap Availability Engine:** Real-time query logic preventing double bookings by comparing requested dates against existing active reservations (`checkIn < requestedCheckOut && checkOut > requestedCheckIn`).
- **Palace Suite Directory:** Filter by royal chamber category (`Maharaja Presidential Suite`, `Maharani Royal Suite`, `Yuvraj Heritage Suite`, `Rajputana Deluxe Room`, `Haveli Courtyard Room`), bed configuration, ₹ INR tariff slider (₹5,000 to ₹60,000), guest count, and sorting options.
- **Interactive Chamber Details:** Multi-photo gallery, complete heritage amenities checklist (Jharokha lake views, Khidmatgar butler service, Ayurvedic bath oils), and live tariff calculator with 12% Heritage GST.
- **Royal Mock Payment Gateway:** Fully simulated checkout supporting **RuPay Platinum Card (with live virtual card display)**, **UPI (Google Pay, PhonePe, Paytm)**, and **Shahi NetBanking (SBI, HDFC, ICICI)**.
- **Guest Dashboard & Shahi Farman Voucher:** Real-time countdown to next check-in, historical stay tracking, and printable PDF/paper voucher with QR reference and royal seal.
- **Guest Profile Management:** Update title, contact phone (+91 format), and change passwords with bcrypt security.

### 🛡️ Administrator Features (शाही दीवान / Palace Dewan)
- **Executive Operations Dashboard:**
  - Real-time KPIs: Total Shahi Treasury Revenue (₹ INR), Total Bookings, Total Users, Available Suites, Occupied Chambers, Maintenance Chambers, Confirmed Stays, and Cancelled Stays.
  - Interactive Visual Charts: Monthly revenue & booking volume trends (Bar Chart) and booking status distribution (Doughnut Chart) powered by Chart.js.
  - Recent activity ledger with live status indicators.
- **Palace Suite Management (CRUD):** Add new suites with custom imagery and heritage amenities, modify tariffs in ₹ INR, toggle chamber status (`Available`, `Occupied`, `Maintenance`), and delete inactive chambers.
- **Booking Management:** Search and filter all reservations, update guest statuses (`Confirmed`, `Checked-In`, `Checked-Out`, `Cancelled`), and inspect full billing records.
- **User Governance:** Inspect all registered guest accounts, total stays booked, lifetime spend (₹ INR), and toggle administrative privileges.
- **Dedicated Dewan Portal:** Secure admin login with role-based JWT middleware protection.

---

## 3. Technology Stack

### Frontend (`client/`)
- **React.js 18** (Vite build tooling)
- **Bootstrap 5.3 & Bootstrap Icons**
- **Lucide React** (Modern luxury icons)
- **Google Fonts** (`Cinzel`, `Cormorant Garamond`, `Playfair Display`)
- **React Router DOM v6** (Nested routes & route guards)
- **Axios** (With Bearer token interceptor and global error normalization)
- **Chart.js & React-Chartjs-2** (Dashboard data visualizations)
- **Context API** (`AuthContext` & `BookingContext`)
- **Royal Indian Design System** (Sindoor Maroon `#6e0d25`, Zari Gold `#c99a3e`, Peacock Midnight Navy `#0a1128`, Ivory Marble `#fdfcf9`)

### Backend (`server/`)
- **Node.js** (v18+)
- **Express.js** (REST API architecture)
- **MongoDB & Mongoose ODM**
- **In-Memory MongoDB Support** (`mongodb-memory-server` built-in zero-configuration fallback)
- **JWT (JSON Web Tokens)** for stateless authentication
- **bcryptjs** for 10-round salted password hashing
- **CORS** & **Morgan** HTTP request logging
- **Express Error Middleware** (Normalized CastError, ValidationError, DuplicateKey errors)

---

## 4. System Requirements

- **Operating System:** Windows, macOS, or Linux
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **Browser:** Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari

---

## 5. Installation

Clone or extract the repository:

```bash
cd hotelpro
```

Install backend dependencies:
```bash
cd server
npm install
```

Install frontend dependencies:
```bash
cd ../client
npm install
```

---

## 6. Environment Variables

Create `.env` inside `server/` (or copy from `server/.env.example`):

```bash
cp server/.env.example server/.env
```

### Server Configuration (`server/.env`):
```env
# Server Port
PORT=5000
NODE_ENV=development

# Database Connection:
# Leave empty to automatically use the embedded In-Memory MongoDB (Zero-configuration startup)
# Or specify your local or Atlas MongoDB connection string:
MONGO_URI=

# JWT Secrets
JWT_SECRET=hotelpro_super_secure_jwt_secret_key_2026_production
JWT_EXPIRE=7d
```

> **Note:** If `MONGO_URI` is omitted or left blank, the application automatically boots an embedded in-memory MongoDB instance. No separate MongoDB installation is required to evaluate or run the system!

---

## 7. Database Setup & Seeding

The database includes an automated seeder that populates 1 Administrator (Dewan), 6 Royal Guests, 12 Luxury Suites across 5 heritage categories, 6 realistic Bookings, and verified Payment records in ₹ INR.

To run the seeder manually:
```bash
cd server
npm run seed
```

*(Note: If booting for the first time with an empty database, `server.js` will automatically seed the initial records on startup!)*

---

## 8. Running the Application

### Option A: Running Backend and Frontend Simultaneously
From the root `hotelpro/` directory:
```bash
# Terminal 1: Start Backend Server
cd server
npm start

# Terminal 2: Start Frontend Client
cd client
npm run dev
```

### Option B: Build and Preview Production Frontend
```bash
cd client
npm run build
npm run preview
```

Open your browser at:
- **Frontend Web Application:** [http://localhost:3000](http://localhost:3000)
- **Backend API & Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 9. API Documentation

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Public | System status and timestamp |
| **POST** | `/api/auth/register` | Public | Register new guest account |
| **POST** | `/api/auth/login` | Public | Authenticate user & return JWT |
| **GET** | `/api/auth/profile` | Private | Retrieve current user profile |
| **PUT** | `/api/auth/profile` | Private | Update name, phone, or password |
| **GET** | `/api/rooms` | Public | List rooms with filters & sorting |
| **GET** | `/api/rooms/available` | Public | **Availability engine with date overlap logic** |
| **GET** | `/api/rooms/:id` | Public | Retrieve single room specifications |
| **POST** | `/api/rooms` | Admin | Create a new room suite |
| **PUT** | `/api/rooms/:id` | Admin | Update room specifications |
| **DELETE** | `/api/rooms/:id` | Admin | Delete room (checks active bookings) |
| **PATCH** | `/api/rooms/:id/status`| Admin | Toggle room status |
| **POST** | `/api/bookings` | Private | Create pending reservation |
| **GET** | `/api/bookings/my` | Private | Get authenticated user's stays |
| **GET** | `/api/bookings/:id` | Private | Get booking voucher / invoice (Shahi Farman) |
| **PUT** | `/api/bookings/:id/cancel` | Private | Cancel stay & issue refund record |
| **POST** | `/api/payments` | Private | Process mock RuPay/UPI payment & confirm |
| **GET** | `/api/payments/:bookingId` | Private | Retrieve payment receipt |
| **GET** | `/api/admin/dashboard`| Admin | Dashboard metrics & chart datasets |
| **GET** | `/api/admin/bookings` | Admin | Get all bookings with filtering |
| **PATCH**| `/api/admin/bookings/:id/status` | Admin | Update booking status |
| **GET** | `/api/admin/users` | Admin | List all registered users & stats |
| **PATCH**| `/api/admin/users/:id/role` | Admin | Update user privileges |
| **DELETE**| `/api/admin/users/:id` | Admin | Delete user account |

A ready-to-import Postman collection is included in the root directory: `hotelpro.postman_collection.json`.

---

## 10. User Roles & Permissions

| Role | Permissions & Capabilities |
| :--- | :--- |
| **Guest / Royal Patron** | Browse palace chambers, search availability with date range, view suite details, book suites, pay via mock RuPay/UPI, view Shahi Farman vouchers, cancel bookings, update profile. |
| **Administrator (Dewan)** | Access Admin Dashboard, view charts & KPIs in ₹ INR, manage chamber inventory (CRUD), update room statuses, check-in & check-out guests, manage user accounts. |

---

## 11. Demo Credentials (For Evaluation & Local Development)

Both the Guest and Admin login pages feature **1-Click Auto-Fill Demo Credentials** buttons.

### Palace Administrator (Dewan)
- **Email:** `admin@hotelpro.com`
- **Password:** `AdminPassword@123`
- **Role:** Administrator (Full Permissions)

### Royal Guest Account (Princess Gayatri Devi)
- **Email:** `princess.gayatri@mewarheritage.in`
- **Password:** `GuestPassword@123`
- **Role:** Royal Patron Guest Member

*(Additional guest accounts: `sarah.jenkins@example.com`, `david.miller@example.com`, `emily.clark@example.com`, with password `GuestPassword@123`)*

---

## 12. Complete Page Directory (21 Pages Implemented)

1. **Home (`/`)**: Royal heritage palace landing page, Lake Pichola hero, floating search, Baoli pool, Shahi Dawat dining, testimonials.
2. **Rooms (`/rooms`)**: Live search, date overlap filtering, category/price filters (₹5,000–₹60,000), room cards.
3. **Room Details (`/rooms/:id`)**: Multi-angle gallery, heritage amenity checklist, interactive booking widget, ₹ INR price calculation.
4. **About Us (`/about`)**: 130-year Mewar lineage, royal trustees, brand pillars (अतिथि देवो भव), chronicle timeline.
5. **Contact & Concierge (`/contact`)**: Shahi concierge form, property map preview, hotlines, FAQ accordion.
6. **Guest Login (`/login`)**: Email/password sign-in with 1-click royal guest & admin demo buttons.
7. **Guest Register (`/register`)**: Full validation and instant session initialization.
8. **Guest Dashboard (`/dashboard`)**: Metric cards, next upcoming stay card, recent reservations in ₹ INR.
9. **My Profile (`/profile`)**: Update full title, phone number (+91), and change password.
10. **My Bookings (`/my-bookings`)**: Filter tabs (All, Upcoming, Completed, Cancelled), cancel actions.
11. **Booking Details / Invoice (`/bookings/:id`)**: Printable Shahi Farman stay voucher with invoice table.
12. **Payment Page (`/payment`)**: Demo checkout with live RuPay card preview, UPI VPA simulation, and Indian NetBanking.
13. **Booking Confirmation (`/confirmation`)**: Celebration screen with booking ID reference and royal arrival protocol.
14. **Admin Login (`/admin/login`)**: Dedicated staff portal authentication with Dewan access.
15. **Admin Dashboard (`/admin/dashboard`)**: 8 KPI cards, Bar Chart in ₹ INR, Doughnut Chart, recent ledger.
16. **Manage Rooms (`/admin/rooms`)**: Inventory table with inline status toggles, edit & delete.
17. **Add Room (`/admin/rooms/add`)**: Create suite form with live preview and multi-amenity selectors.
18. **Edit Room (`/admin/rooms/edit/:id`)**: Update chamber specifications and imagery.
19. **Manage Bookings (`/admin/bookings`)**: Check-in, check-out, and cancellation operations.
20. **Manage Users (`/admin/users`)**: User directory, booking counts, lifetime spend (₹ INR), role promotions.
21. **Admin Profile (`/admin/profile`)**: Master password update and runtime environment summary.

---

## 13. Project Structure

```
hotelpro/
├── client/                     # Frontend React Application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx      # Royal Palace Crest & Navigation
│   │   │   ├── Footer.jsx      # Sanskrit Ethos & Heritage Details
│   │   │   ├── RoomCard.jsx    # Tariff in ₹ INR with reserve action
│   │   │   ├── SearchBox.jsx   # Royal date overlap search widget
│   │   │   ├── AdminSidebar.jsx# Dewan navigation sidebar
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── context/            # React Context Providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── BookingContext.jsx
│   │   ├── pages/              # 21 application pages
│   │   ├── services/           # Axios API configuration
│   │   ├── styles/             # Royal Indian Design System
│   │   │   └── custom.css      # Maroon, Gold, Navy palette & Jharokhas
│   │   ├── App.jsx             # Main Router switchboard
│   │   └── main.jsx            # Application entry point
│   ├── index.html              # Cinzel & Cormorant Garamond fonts
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Express REST API
│   ├── config/
│   │   └── db.js               # Mongoose & In-Memory MongoDB connector
│   ├── controllers/            # Auth, Room, Booking, Payment, Admin
│   ├── middleware/             # Auth JWT, AdminOnly, Error handlers
│   ├── models/                 # User, Room (Royal categories), Booking, Payment
│   ├── routes/                 # REST API endpoints
│   ├── seed/                   # Royal Indian seed dataset & runner
│   ├── server.js               # Express application entry point
│   └── test-api.js             # Automated end-to-end API verification
│
├── .gitignore
├── .env.example
├── hotelpro.postman_collection.json
├── package.json
└── README.md
```

---

## 14. License & Evaluation Notice

- Developed as a production-grade full-stack hotel booking and operations management system with a Royal Heritage Indian Palace Theme.
- Suitable for university senior evaluations, portfolio presentations, mentor reviews, and production deployment.
