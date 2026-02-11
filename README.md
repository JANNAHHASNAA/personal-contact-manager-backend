# Personal Contact Manager - Backend

## Overview
This is the backend server for the **Student Contact App**. It provides REST API endpoints for user authentication and managing student contacts. Built with **Node.js**, **Express**, and **MySQL**.

The backend is designed to work with the Angular frontend (can be found separately).

---

## Features
- User registration and login
- Add, edit, delete student contacts
- Fetch all contacts
- RESTful API endpoints

---

## Tech Stack
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Environment Variables:** dotenv
- **Version Control:** GitHub

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/JANNAHHASNAA/personal-contact-manager-backend.git
cd personal-contact-manager-backend


2. Install dependencies
npm install

3. Configure environment variables

Copy the example file to .env:

cp .env.example .env


Edit .env and fill in your own MySQL password:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_NAME=student_contacts
JWT_SECRET=mysecret123
PORT=3000

Replace YOUR_PASSWORD_HERE with your MySQL password.

4. Set up MySQL Database

Run these commands in your MySQL server:

CREATE DATABASE student_contacts;
USE student_contacts;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

5. Start the backend server
node server.js
