# 🚀 BLOGVERSE

![MERN Stack](https://img.shields.io/badge/MERN-Fullstack-blue) 
![License](https://img.shields.io/badge/License-MIT-green) 
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen)

A full-stack open-source blogging application built with MongoDB, Express, React & Node.js (MERN Stack)

## 🌟 Features

- User registration and login
- JWT Token authentication
- Story searching functionality
- CRUD operations (Create, Read, Update, Delete stories)
- Cloudinary image uploads (user avatars & story images)
- Like stories and add to Reading List
- Commenting system
- Skeleton loading effects
- Fully responsive design

## 🛠 Technologies Used

### Frontend
- ⚛️ React.js - JavaScript library for building user interfaces
- 🔄 React Hooks - State management
- 🛣 react-router-dom - Routing
- 📡 Axios - API calls
- 🎨 CSS - Styling
- ✍️ CKEditor - Rich Text Editor
- 🆔 UUID - Random ID generation
- 🖼 React Icons - Icon library

### Backend
- 🟢 Node.js - JavaScript runtime
- 🚂 Express.js - Server framework
- 🍃 Mongoose - MongoDB object modeling
- 🎣 express-async-handler - Async error handling
- 🔐 jsonwebtoken - Authentication
- 🔒 Bcryptjs - Data encryption
- 🔑 Dotenv - Environment variables
- 📤 Multer - File uploads
- ☁️ Cloudinary - Image and file cloud storage
- 🔗 Slugify - URL-friendly titles
- ↔️ CORS - Cross-origin resource sharing

### Database
- 🍃 MongoDB - NoSQL database

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB account (for database)
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mern-blog.git
   cd mern-blog
2. **Set Up Backend**
   ```bash
   cd backend
   npm install
3. **Configure Environment Variables**
   Create a config.env file in backend/config with:
   ```bash
    FRONTEND_URL=http://localhost:5173
    PORT=3000
    MONGODB_CONN="your-mongodb-uri"
    JWT_SECRET="your-secret-key"
    NODE_ENV=development

    CLOUDINARY_APP_NAME="your-cloudinary-name"
    CLOUDINARY_API_KEY="your-api-key"
    CLOUDINARY_API_SECRET="your-api-secret"
4. **Start your Server**
   ```bash
   npm start
5. **Set up Frontend**
   ```bash
   cd client
   npm install
   npm run dev
6. **Access the Application**
   ```bash
   //Open your browser and visit:
      Frontend: http://localhost:5173
      Backend: http://localhost:3000
7. **👨‍💻 Author**
    Ankit Bhagata

    🌐 Portfolio: https://ankit-3d-portfolio.vercel.app/

    💻 GitHub: https://github.com/Whiteak007

    🔗 LinkedIn: https://www.linkedin.com/in/ankit-bhagata/
   
    🔗 Sponsor: Pratham Sarankar
   
   
9. **📜 License**
      This project is licensed under the MIT License - see the LICENSE file for details.
   
   
11. **Copyright (c) 2025 Coderak_**
    
       Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    

    ✉️ Email: ankitbhagata@gmail.com

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
