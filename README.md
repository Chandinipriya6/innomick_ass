# 💼 Meeting Cost Intelligence

A full-stack web application that helps users estimate the cost of a meeting before scheduling it. The application calculates meeting expenses based on attendee hourly rates and meeting duration, provides recommendations, and stores meeting history for future reference.

---

## 🚀 Features

- Calculate meeting cost based on attendee hourly rates
- Dynamic attendee management (Add/Remove attendees)
- Meeting recommendation system
- Save meetings to MongoDB Atlas
- View saved meeting history
- Delete meetings from history
- Cost status indicators:
  - 🟢 Cost Effective
  - 🟡 Moderate Cost
  - 🔴 Expensive
- Modern responsive user interface

---

## 🛠️ Technologies Used

### Frontend
- React.js (Vite)
- JavaScript (ES6+)
- CSS3
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Tools
- VS Code
- Thunder Client
- Git & GitHub

---

## 📂 Project Structure

meeting-cost-calculator/
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── App.jsx
│ └── styles.css
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
│
└── README.md

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone <repository-url>
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

### 5. Start Backend

```bash
npm run dev
```

### 6. Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔗 API Endpoints

### Calculate Meeting Cost

```http
POST /api/meetings/calculate
```

### Save Meeting

```http
POST /api/meetings/save
```

### Get Meeting History

```http
GET /api/meetings/history
```

### Delete Meeting

```http
DELETE /api/meetings/:id
```

---

## 📊 Business Logic

Meeting Cost Calculation:

```text
Total Cost =
(Sum of Hourly Rates)
×
(Duration in Minutes / 60)
```

Recommendation Logic:

- Cost < ₹2000 → Cost Effective
- ₹2000 - ₹5000 → Moderate Cost
- Cost > ₹5000 → Expensive

---

## 🎯 Future Improvements

- Meeting cost analytics dashboard
- Charts and visualizations
- PDF report generation
- Search and filter history
- User authentication
- Export meeting reports

---

## 👨‍💻 Author

Chandini Priya Pasagada

Built as part of a Full-Stack Development Assessment.
