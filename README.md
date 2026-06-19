
# DevMeet

DevMeet is a developer networking platform where developers can connect, match, and collaborate based on their skills, interests, and technology stack.

## 📌 Features

* User Authentication & Authorization
* Secure Login/Signup using JWT
* Developer Profile Creation
* Send & Receive Connection Requests
* Accept/Reject Requests
* Match with Like-Minded Developers
* Browse Developer Profiles
* Skill-Based Networking
* Responsive UI
* Real-Time User Experience
* Protected Routes

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS / CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* Cookies
* bcrypt.js

## 📂 Project Structure

```bash
DevMeet/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── services/
│
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── config/
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/devmeet.git
cd devmeet
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

## 🔑 Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=7777

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000
```

## 🚀 Workflow

1. User registers/login.
2. JWT token is generated.
3. User creates profile.
4. Developers can discover other developers.
5. Connection requests can be sent.
6. Requests can be accepted/rejected.
7. Matched developers can collaborate.

## 🔒 Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Protected APIs
* Cookie-based Session Handling
* Input Validation

## 👩‍💻 Author

**Anshika Pandey**

* GitHub: `anshikapandeyy`
* LinkedIn: `linkedin.com/in/anshika-pandey-970b35296`

## ⭐ Support

If you like this project, give it a ⭐ on GitHub and feel free to contribute.

---
