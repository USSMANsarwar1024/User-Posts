# Simple Social Media Backend

This is a backend application built with **Node.js** and **Express.js** that provides basic social media functionality, including user registration, login, post creation, and liking posts. It uses **MongoDB** for data storage.

## Features

* **User Authentication**: Secure registration and login using **bcrypt** for password hashing and **JWT (JSON Web Tokens)** for session management.
* **Post Management**: Users can create, view, and update their posts.
* **Liking System**: Users can like and unlike posts.
* **Secure Routes**: Middleware is used to protect routes that require a logged-in user.

## Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB** (via Mongoose for data modeling)
* **EJS** (for templating/view engine)
* **bcrypt** (for password hashing)
* **jsonwebtoken** (for authentication)
* **cookie-parser** (for managing session cookies)
* **dotenv** (for environment variables)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

You will need the following software installed:

* **Node.js** (LTS version recommended)
* **MongoDB** (running locally or a cloud instance like MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/USSMANsarwar1024/User-Posts.git
cd User-Posts
````

### 2. Install dependencies

```bash
npm install
```

### 3\. Run the application

Start the server using the following command:

```bash
node app.js
# Or using nodemon (if installed globally):
# nodemon app.js
```

The application will now be running at `http://localhost:3000`.

## Endpoints Overview

| Route | Method | Description | Requires Auth |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | Home page | No |
| `/register` | `POST` | Register a new user | No |
| `/login` | `GET` | Login page | No |
| `/login` | `POST` | Log in a user and set a cookie | No |
| `/profile` | `GET` | View the user's profile and posts | Yes |
| `/post` | `POST` | Create a new post | Yes |
| `/like/:id` | `GET` | Toggle a like on a specific post | Yes |
| `/update/:id` | `GET` | View the page to update a post | Yes |
| `/update/:id` | `POST` | Submit the updated post content | Yes |
| `/logout` | `GET` | Log out the user and clear the cookie | No |
| `/forget` | `GET` | Contact/support information | No |

## Application Structure

The core logic is contained in `app.js`.

| File/Folder | Description |
| :--- | :--- |
| `app.js` | The main Express application file, handling all routes and middleware. |
| `models/user.js` | Mongoose schema and model definition for User data. |
| `models/post.js` | Mongoose schema and model definition for Post data. |
| `public/` | Static assets (CSS, images, client-side JS, etc.). |
| `views/` | EJS templates for rendering HTML pages. |
| `.env` | Configuration file for environment variables. |

```
```
