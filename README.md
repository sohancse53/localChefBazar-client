
# LocalChefBazaar - Marketplace for Local Home-Cooked Meals
- Live Preview: [https://localchefbazar50.netlify.app/](https://localchefbazar50.netlify.app/)  

## Overview

LocalChefBazaar is a full-stack MERN (MongoDB, Express.js, React, Node.js) marketplace platform that connects passionate home cooks (chefs) with customers craving fresh, authentic homemade meals. Chefs can easily upload daily menus and earn from their kitchens without a physical restaurant, while customers enjoy healthy, affordable, and diverse local food options with secure ordering, real-time tracking, reviews, and payments.

The platform features role-based access control with three distinct user roles: **Admin**, **Chef**, and **Normal User (Customer)**. It includes robust authentication, dynamic dashboards, order management, favorites, reviews, Stripe payments, and comprehensive admin tools.

**Live Demo**  
- Frontend: [https://localchefbazar50.netlify.app/](https://localchefbazar50.netlify.app/)  
- Backend API: [https://localchefbazar-iota.vercel.app/](https://localchefbazar-iota.vercel.app/)

**GitHub Repositories**  
- Client (Frontend): [https://github.com/sohancse53/localChefBazar-client](https://github.com/sohancse53/localChefBazar-client)  
- Server (Backend): [https://github.com/sohancse53/localChefBazar-server](https://github.com/sohancse53/localChefBazar-server)

## Key Features

### 1. User Roles & Permissions
- **Admin**: Full control — manage users, approve/reject chef/admin requests, mark fraud, view platform statistics.
- **Chef**: Upload meals (with image upload), manage own meals (update/delete), handle order requests (accept/cancel/deliver).
- **Customer**: Browse meals, view details (login required), place orders, add favorites, submit/update/delete reviews.

### 2. Authentication & Security
- Firebase Authentication (email/password registration & login).
- JWT-based secure API protection (httpOnly cookies).


### 3. Public Pages
- **Home**: Animated hero banner (Framer Motion), 6 dynamic daily meals, customer reviews section, extra custom section.
- **Meals**: Card layout with sorting (price asc/desc), pagination (10 per page), "See Details" button (login guard).


### 4. Private Pages & Dashboards
- **Meal Details** (Private): Full info, review display/submission, add to favorites, "Order Now".
- **Order Page**: Auto-filled form, quantity selection, address input, total calculation, SweetAlert confirmation.
- **User Dashboard**: My Profile, My Orders (with Stripe Pay button), My Reviews (update/delete), Favorite Meals (table with delete).
- **Chef Dashboard**: Create Meal (image upload), My Meals (update/delete), Order Requests (Cancel/Accept/Deliver with live status updates).
- **Admin Dashboard**: Manage Users (make fraud), Manage Requests (approve/reject + auto Chef ID generation), Platform Statistics (Recharts).


### 5. Additional Features
- Profile page with "Be a Chef" / "Be an Admin" request buttons.
- Real-time review & favorite updates with toast/SweetAlert notifications.
- Stripe payment integration (pay button appears only when order accepted & payment pending).
- Fraud user restrictions (no ordering or meal creation).
- Loading spinner & custom error page.
- Dynamic page titles on every route.
- Fully mobile-responsive design with pleasing color contrast and clean spacing.

### 6. Challenge I faced
- JWT authentication for all protected routes/APIs.
- react-hook-form used in **every** form.
- Pagination on Meals page.
- Secure deployment.

## Technologies & Packages Used

### Frontend
- React 19, Vite, Tailwind CSS + DaisyUI
- Firebase Authentication
- React Router v7
- React Query (TanStack Query)
- Framer Motion & React Awesome Reveal (animations)
- React Hook Form
- Axios
- SweetAlert2 & React Hot Toast
- Recharts (admin stats)
- Swiper (optional carousels)

### Dependencies

- `@emotion/react`: ^11.14.0 - 
- `@tailwindcss/vite`: ^4.1.17 - 
- `@tanstack/react-query`: ^5.90.12 - 
- `axios`: ^1.13.2 - 
- `firebase`: ^12.6.0 - 
- `motion`: ^12.23.26 - 
- `react`: ^19.2.0 - 
- `react-awesome-reveal`: ^4.3.1 - 
- `react-dom`: ^19.2.0 - 
- `react-hook-form`: ^7.68.0 - 
- `react-hot-toast`: ^2.6.0 - 
- `react-icons`: ^5.5.0 - 
- `react-is`: ^19.2.3 - 
- `react-router`: ^7.10.1 - 
- `recharts`: ^3.6.0 - 
- `sweetalert2`: ^11.26.4 -
- `swiper`: ^12.0.3 - 
- `tailwindcss`: ^4.1.17


### Backend
- Node.js, Express.js
- MongoDB (Mongoose)
- JWT authentication
- Stripe payment integration
- CORS configured properly for production

## Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project
- Stripe account (for payments)

### Steps

1. **Clone both repositories**
   ```bash
   git clone https://github.com/sohancse53/localChefBazar-client.git
   git clone https://github.com/sohancse53/localChefBazar-server.git

# Backend and Frontend Setup Guide

## 2. Backend Setup

```bash
cd localChefBazar-server
npm install
```
Create `.env` file in the server root with the following content:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
Start the server:

```bash
npm start
```
API will run on [http://localhost:5000](http://localhost:5000)

## 3. Frontend Setup

Navigate to the client folder:

```bash
cd localChefBazar-client  # or navigate to the client folder
defaults to your terminal's navigation method if needed.
```
Install dependencies:

```bash
npm install
```
Create `.env` file in the client root with the following content:

```
VITE_FIREBASE_API_KEY=your_key
defaults to your actual Firebase API key.
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
defaults to your Firebase project domain.
VITE_FIREBASE_PROJECT_ID=your_project_id
defaults to your Firebase project ID.
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
defaults to your Firebase storage bucket.
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
defaults to your Firebase messaging sender ID.
VITE_APP_ID=your_app_id
defaults to your Firebase app ID.
VITE_BACKEND_URL=http://localhost:5000  # Your backend URL.
```
Start the development server:

```bash
npm run dev
```
App will run on [http://localhost:5173](http://localhost:5173) (or similar port shown in console).

## 4. Additional Note 
Add localhost (or your local domain) to Firebase Authorized Domains in the Firebase console for authentication to work locally.





