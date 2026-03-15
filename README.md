# E-Commerce Frontend Capstone Project 🚀

A highly responsive, modern, and aesthetic e-commerce frontend built with React, Vite, and Context API. This project serves as a comprehensive demonstration of advanced frontend development concepts.

## 📋 Project Overview
This application is a fully functional e-commerce storefront. Key objectives achieved include:
- A dynamic product catalog using the FakeStore API.
- Complex state management for the shopping cart and user authentication simulations.
- A seamless checkout experience with form processing and cart clearing.
- Premium web design featuring glassmorphism elements, custom micro-animations, and dynamic rendering.

## 🛠 Setup Instructions
To run this project locally, ensure you have Node.js installed.
1. **Clone the repository** (if applicable) and navigate to the root directory `f:\IN_P3`.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Code Structure
The application employs a deliberate and scalable folder hierarchy:
```
src/
├── components/       # Reusable UI elements (Navbar, ProductCard, ProductList, Cart, Checkout)
├── contexts/         # React Context files for global state (AuthContext, CartContext)
├── hooks/            # Custom reusable hooks (useProducts)
├── pages/            # View components corresponding to specific routes (Home, ProductDetail, CartPage, CheckoutPage)
├── services/         # Utilities (api.js containing fetch functions)
├── styles/           # Global styles containing CSS constants and generic utilities (index.css)
├── App.jsx           # Main routing configuration
└── index.jsx         # React application entry point
```

## 🖼 Visual Documentation
*The application utilizes a dark-mode first design approach with a radial gradient background and glass-paneling effects. Product cards showcase products effectively and support simulated zooming on hover. Due to deployment constraints, screenshots are not included directly here, but UI features vivid colors and deep aesthetics built on `lucide-react` icons and Google Fonts.*

## ⚙️ Technical Details
- **Algorithms & Data fetching**: We leverage `Promise.all` inside the `useProducts` hook to fetch both products and categories concurrently, reducing total fetch time.
- **Sorting & Filtering**: Dynamic local sorting arrays using JS `.sort()` based on dropdown criteria (price, ratings).
- **CSS Architecture**: Extensive use of CSS variables for a uniform design system, implementing `backdrop-filter` for modern blurry (glassmorphic) container aesthetics.

## 🧪 Testing Evidence
The application has been continuously verified via functional UI testing:
- **Authentication**: Clicking "Login" toggles the simulated login slideout. Submitting a user updates the navbar context globally, verifying the `AuthContext`.
- **Cart Context**: Adding products dynamically updates the Cart Context layout array, with real-time UI bubble counter changes indicating functionality.
- **Checkout Validation**: Proceeding to checkout triggers empty cart redirection unless properly populated. Local forms correctly block submission unless all Regex and array length checks pass cleanly.

## 🧩 Component Architecture
**Data Flow Diagram**:
```
App
 ├── AuthProvider (injects user object & login methods)
 └── CartProvider (injects cart array & cart manipulation tools)
      ├── Navbar (consumes Auth & Cart Contexts to render indicators)
      └── Routes
           ├── Home (loads useProducts, renders ProductList -> ProductCards)
           ├── ProductDetail (fetches single item, renders quantity adder mapping to CartContext)
           ├── CartPage (consumes Cart Context to render individual cart items)
           └── CheckoutPage (simulates final purchase API call, clearing global cart state)
```

## 🌐 State Management Approach
We used React Context over Redux for a streamlined approach. 
1. **Cart Context**: Intercepts `addToCart`, filters duplicates by ID in its reducer simulation, and modifies quantity correctly.
2. **Auth Context**: Simulates JWT validation via JS timeout promises and persists user sessions via browser `localStorage`.
3. **Persistence**: The cart also serializes data tightly to local storage, keeping the state intact on browser reloads.

## 📡 API Integration Details
All external interactions happen through the RESTful FakeStore API `https://fakestoreapi.com/`. Endpoints hooked:
- `/products` (Fetches full catalog)
- `/products/categories` (Extracts available filters)
- `/products/[id]` (Grabs precise details for the dynamic detail page via React Router hooks)

## ⚡ Performance Optimizations
- Implemented `loading="lazy"` on product card images to guarantee they don't load outside the viewport.
- State is decoupled via Custom hooks (`useProducts`), preventing complete app re-renders on minor localized UI interactions.
- We utilize comprehensive CSS loading skeletons to reduce Layout Shifts (CLS) while waiting on HTTP responses.

## 🚀 Deployment Steps
1. Push your final code to a Git repository (GitHub/GitLab).
2. Create an account on **Vercel** or **Netlify**.
3. Import the repository. The build settings should automatically target Vite (`npm run build`).
4. Click Deploy. Upon success, check the live preview domain!

## 🚧 Challenges Faced 
A primary challenge involved efficiently coordinating state updates for local cart storage simultaneously alongside local state quantity updates rendering inside the Cart panel. We mitigated desynchronization issues by deriving calculated Cart quantities (`cartCount` and `cartTotal`) directly from the primary immutable `cartItems` state array inside the Cart Provider, establishing a single source of truth. Additionally, migrating Vite setups to ensure consistent `.jsx` execution while staying within rubric expectations required adjusting Vite configurations explicitly.
