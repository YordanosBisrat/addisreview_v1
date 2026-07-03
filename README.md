# አዲስReview

**Discover businesses. Share your experience.**

አዲስReview is a modern Ethiopian Business Review & Rating platform. Users can browse
businesses in Addis Ababa by category, search by name, read customer reviews,
and submit their own ratings — all through a clean, responsive interface
inspired by product design at Airbnb, Stripe, and Notion.

---


## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Future Improvements](#future-improvements)

---

## Overview

This is a full-stack MVP built with a **React (Vite) frontend** and a
**Node.js/Express REST API backend**, backed by a normalized **SQLite**
database. It was built as a 24-hour internship assignment to demonstrate:

- Modern React development (hooks, routing, component composition)
- REST API design and implementation
- Relational database design
- Clean, modular, maintainable code across two separate projects
- A polished, production-feeling UI/UX

---

## Features

- ✔ Browse all businesses
- ✔ Live search by business name or category
- ✔ Browse businesses filtered by category (Restaurants, Cafés, Hotels,
  Shopping, Healthcare, Beauty, and More)
- ✔ Business details page with full description, address, and images
- ✔ Read customer reviews
- ✔ Submit a review (name, 1–5 star rating, comment)
- ✔ Average rating and star-by-star rating distribution, computed live from reviews
- ✔ "Get Directions" button linking out to Google Maps
- ✔ Toast notifications, loading states, empty states, and a custom 404 page
- ✔ Fully responsive, mobile-friendly layout

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Axios
- React Icons

**Backend**
- Node.js + Express
- SQLite via [`sql.js`](https://github.com/sql-js/sql.js) (see note below)

**Tooling**
- Git for version control
- Plain JavaScript throughout (no TypeScript, per project requirements)

---

## Future Improvements

- User authentication (so reviews are tied to real accounts, not free-text names)
- Ability to edit/delete your own review
- Business owner dashboard to respond to reviews
- Image uploads for reviews and businesses (instead of stock photo URLs)
- Pagination/infinite scroll for businesses and reviews
- Map view (Google Maps / Leaflet) showing all businesses at once

---