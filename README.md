#  Tic Tac Toe – Full Stack Multiplayer Game

A modern full-stack Tic Tac Toe application featuring real-time multiplayer, AI gameplay, and persistent user scores.

---

##  Features

* Real-time multiplayer using Socket.IO
* Single-player mode with AI (Easy / Medium / Hard)
* User authentication (Register & Restore)
* Persistent score tracking with MongoDB
* Responsive UI with modern design
* Fully deployed (Frontend + Backend)

---

##  Tech Stack

* **Frontend:** React, Vite
* **Backend:** Node.js, Express
* **Database:** MongoDB Atlas
* **Realtime:** Socket.IO
* **Deployment:** Vercel (Frontend), Render (Backend)

---

##  Project Structure

```
project/
├── frontend/   # React app
├── backend/    # Express server + APIs
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (.env)

```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

---

##  Run Locally

### Backend

```
cd backend
npm install
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

##  Live Demo

* Frontend: https://your-app.vercel.app
* Backend: https://your-backend.onrender.com

