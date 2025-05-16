MERN BLOG
Fullstack open source blogging application made with MongoDB, Express, React & Nodejs (MERN)

Configuration and Setup
Key Features
Technologies used
  Frontend
  Backend
  Database
  📸 Screenshots
  Author
  License
  
Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

Open the project in your prefered code editor.
Go to terminal -> New terminal (If you are using VS code)
Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)
In the first terminal

$ cd client
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
In the second terminal

cd backend and Set environment variables in config.env under ./config
Create your mongoDB connection url, which you'll use as your MONGO_URI
Supply the following credentials
#  ---  Config.env  ---

FRONTEND_URL=http://localhost:5173
PORT=3000
MONGODB_CONN="paste your url"
JWT_SECRET=kdfjief546f54sdjfkasd546sad44f62
NODE_ENV=development

CLOUDINARY_APP_NAME="your cloudnary name"
CLOUDINARY_API_KEY="your cloudnary API_KEY"
CLOUDINARY_API_SECRET="your cloudnary API_SECRET"

# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)

Key Features
User registration and login
Authentication using JWT Tokens
Story searching
CRUD operations (Story create, read, update and delete)
Upload user ımages and story ımages to the cloudnary server
Liking stories and adding stories to the Reading list
Commenting on the story
Skeleton loading effect
Responsive Design

Technologies used
This project was created using the following technologies.

Frontend
React js - JavaScript library that is used for building user interfaces specifically for single-page applications
React Hooks - For managing and centralizing application state
react-router-dom - To handle routing
axios - For making Api calls
Css - For User Interface
CK-Editor - Rich Text Editor
uuid - For random id generator
React icons - Small library that helps you add icons to your react apps.

Backend
Node js -A runtime environment to help build fast server applications using JS
Express js -The server for handling and routing HTTP requests
Mongoose - For modeling and mapping MongoDB data to JavaScript
express-async-handler - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
jsonwebtoken - For authentication
Bcryptjs - For data encryption
Dotenv - Zero Dependency module that loads environment variables
multer - Node.js middleware for uploading files
slugify - For encoding titles into a URL-friendly format
cors - Provides a Connect/Express middleware
Database
MongoDB - It provides a free cloud service to store MongoDB collections.

Author
Portfolio: https://ankit-3d-portfolio.vercel.app/
Github: https://github.com/Whiteak007
Sponsor: Pratham Sarankar
Linkedin: https://www.linkedin.com/in/ankit-bhagata/
Email: ankitbhagata@gmail.com

License
MIT License

Copyright (c) 2025 Coderak_

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
