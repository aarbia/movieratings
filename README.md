# Movie Ratings Website and Database Project

**A dynamic movie rating web app built with Node.js, SQL, and frontend tools.**
Aggregates top-rated movies from multiple sources into a sleek, sortable interface with rich details per title.

## 🌟 Project Overview
Movie Ratings Hub is a full-stack web application that showcases top-rated movies from various platforms. It’s designed to demonstrate my ability to build responsive, interactive websites from scratch using a Node.js backend, an SQL database, and modern frontend tools. The goal was to create a clean and engaging user experience while emphasizing modular code and scalable architecture.

## 🚀 Features
- 🔎 Homepage with sortable movie cards
Cleanly styled with Bootstrap, dynamically generated using JavaScript.

- 🖼️ Individual movie detail pages
Clicking on a movie card routes users to a /movie page populated with:
    - Poster image
    - Synopsis
    - Ratings from multiple sources
    - Cast & crew info (if available)
    - Production info (if available)

- 🗃️ SQL-powered movie database. Compiled a list of top-rated films from multiple sites (e.g., IMDb, Rotten Tomatoes, and MetaCritic) into a excel file, which MovieDatabase2.0 uses to build our database.

- ⚙️ Custom sorting & filtering
Users can sort by rating, release year, or alphabetically using simple frontend controls.

## 🛠️ Tech Stack
| Layer  | Tech Used |
| ------------- | ------------- |
| Backend  | Node.js, Express  |
| Database  | MySQL  |
| Frontend  | HTML5, CSS, Javascript, Bootstrap  |
| Tools  | Git, VS Code  |

## ⚙️ System Requirements
Java Development Kit (JDK) Version 20 (or higher)
Apache Maven 3.6 (or higher)
MySQL (5.x or higher)
XAMPP installed in root directory (C:\\xampp) and an instance of Xampp MySQL active

For Website:
Node.js (10.x or higher)

## 🏁 How to Run Locally

```bash
git clone https://github.com/aarbia/movieratings.git
cd movieratings
npm install
# Set up your SQL database, visit MovieDatabase2.0 README for instructions
npt start
```
Open your browser at http://localhost:3000

## 🎯 Future Plans
- ✅ Admin panel to add/update movies via a web UI
- 🔍 Full-text search bar
- 🎭 Actor/Director profile pages
- 🌐 API integration to fetch live data
- 🔒 User login for ratings & favorites

## Authors
Alexandra Arbia ([aarbia](https://github.com/aarbia))

Andrew Janedy ([AJanedy](https://github.com/AJanedy))
