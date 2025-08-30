# Multi-Tenant Architecture Project: A Small Project from My Backend Development Journey

 **Project Overview**  
This project demonstrates a **Multi-tenant Architecture** for a web application, allowing multiple organizations (tenants) to use the same application while keeping their data isolated.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Key Concepts Learned](#key-concepts-learned)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)

---

## Features
- User registration and login functionality
- Creation and management of multiple organizations
- Tracking which user created which organization
- User history table to store organizations created by each user
- Delete functionality for users, organizations, and user history
- Tracking current organization for each user
- Blog API to add blogs specific to the current organization
- API testing

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MySQL (Sequelize ORM and Raw Queries) via XAMPP
- **Server:** Apache (via XAMPP)
- **API Testing:** Postman
- **Authentication:** JWT
- **Languages:** JavaScript

---

## Key Concepts Learned
- Multi-tenant data isolation strategies
- User-organization relationships
- API design
- Tracking user activity

---

## Installation & Setup

### 1. Install XAMPP
- Download and install XAMPP
- Start **Apache** and **MySQL** from the XAMPP control panel

### 2. Clone the Repository
```bash
git clone https://github.com/Bhairab-Nath/Multi-tenant-Project1.git
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Configure Environment
-Create a .env file in the project root
-Add the following variables:
-secretKey ( for JWT )

### 5. Test APIs
-Use Postman (or any API client) to test:

## API Endpoints

### Users
- `POST /register` - Register a new user
- `POST /login` - Login user
- `DELETE /deleteuser` - Delete user, user history, and related organization

### Organizations
- `POST /organization` - Create organization

### Blogs
- `POST /createblog` - Add blog for current organization
