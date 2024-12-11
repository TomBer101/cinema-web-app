# 🎥 **Cinema Web App**

## 🌟 **Short Description**  
A full-featured web application to manage a movie rental store, inspired by the golden era of Blockbuster! The app allows store users to register new members, manage movie records, and track which members have rented which movies.  

---

## 🎯 **Purpose**  
This project serves as a showcase of my technical skills and learning journey. It was built to expand my knowledge and demonstrate expertise in modern web development practices.  

---

## 🖥️ **Frontend**  
The frontend is developed using cutting-edge technologies to ensure a seamless and intuitive user experience:  

### ⚛️ **React**  
React was chosen for its declarative nature, reusable components, and efficient state management. It allows the creation of dynamic and interactive user interfaces with ease.  

### 🎨 **Material-UI (MUI)**  
I utilized Material-UI for its pre-designed, accessible, and customizable components. It offers a consistent and professional look while accelerating development. I also leveraged MUI's theming capabilities to ensure a unified design system.  

### 📡 **Axios**  
Axios is used to manage HTTP requests, simplifying data fetching with utility methods.  

### 🔁 **React Query**  
For data management and caching, I incorporated React Query, which enhances performance with features like:

* Efficient caching and synchronization of server state.
* Infinite scrolling for optimized data display.
* Debouncing search input to improve user experience and reduce server load.

---

## 🔗 **Server A - Cinema Web Service**
The **Cinema Web Service** handles store user management and acts as a mediator, supplying data fetched from Server B.

### ⚙️ **Key Features**
* **Layered Architecture:** Built with controllers, repositories, and services for maintainable and scalable code organization.
* **Data Source:** Utilizes JSON files for storing user and session data.
* **Authentication & Authorization:**
    * Implements `express-session` for session management.
    * Uses `bcrypt` for secure password hashing.
    * Middleware for role-based access control.
* **Local Caching:** Stores frequently accessed data fetched from Server B.
* **Pagination:** Efficiently retrieves paginated data from Server B to enhance performance.

---

## 📦 **Server B - Subscriptions Web Service**
The **Subscriptions Web Service** provides the main data of the store, including members, movies, and their subscriptions.
## ⚙️ **Key Features**
* **Layered Architecture:** Maintains a clean separation of concerns with controllers, repositories, and services.
* **Data Source:** Powered by **MongoDB**, ensuring reliability and scalability for the store’s data.
* **Aggregation Framework:**
    * Uses MongoDB's aggregation pipeline for efficient data retrieval and transformation.
    * Eliminates redundant computations by performing data "joins" directly within the database.
* Local Pagination: Implements paginated queries for smoother data loading and reduced client-side overhead.

---

## 🚀 **Why This Project Matters**
This project demonstrates expertise in:
* **Full-stack development:** From building RESTful APIs to designing interactive UIs.
* **Scalable architecture:** Layered architecture ensures the project is easy to maintain and extend.
* **Modern tools and libraries:** Leveraging tools like React Query, Material-UI, and MongoDB ensures the app is performant and user-friendly.