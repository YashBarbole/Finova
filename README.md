# 💳 PaySmart – Mock Payment Gateway (MERN Stack)

**PaySmart** is a secure mock payment gateway built with the MERN stack (MongoDB, Express, React, Node.js).  
It allows users to manage wallet balances, send money to other users, and view transaction history with security features like PIN verification, balance validation, account lock, and rate limiting.

---

## 🚀 Features (Phase 1)

### 🔐 Security
- ✅ PIN verification for every transaction
- ✅ Balance validation to prevent overdraft
- ✅ Account lock after 3 failed attempts (fraud prevention)
- ✅ Rate limiting to prevent spam (max 5 tx/minute)
- ✅ **PayGroup**: One-click payment to multiple fixed recipients (e.g., mess, rent, friend)
- ✅ Transaction logging and history

---

## 🧠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **State Management**: Context API or Redux (optional)
- **Hosting**: Render (backend), Vercel (frontend)

---

## 📁 Folder Structure

PaySmart/
├── client/          # React Frontend  
│   └── src/  
│       ├── pages/  
│       ├── components/  
│       └── context/  
├── server/          # Node.js Backend  
│   ├── models/  
│   ├── routes/  
│   ├── controllers/  
│   ├── middleware/  
│   └── config/  
└── README.md  

---

## 🧪 Functional Flow

1. User registers & logs in
2. A wallet is created for each user with a default balance
3. User can send money to another user (PIN verified)
4. Security checks:
   - Insufficient balance → rejected
   - 3 failed attempts → account locked temporarily
   - 5+ transactions per minute → temporarily rate limited
5. Users can view all transaction history
6. Users can create and use a "PayGroup" to send fixed payments to multiple people in one click

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/PaySmart.git
cd PaySmart
```

### 2. Backend Setup
```
cd server
npm install
```

Create a `.env` file inside `server/` with the following:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:
```
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm start
```

---

## 📌 Project Status

- [x] User Registration & Login (with JWT)
- [x] Wallet System
- [x] Secure Transactions (PIN verified)
- [x] Transaction Logging
- [x] Rate Limiting
- [x] Account Lock on Fraud
- [x] PayGroup (One-click batch transfer)
- [ ] Scheduled Payments (Coming Soon)
- [ ] Admin Panel (Coming Soon)

---

## 👨‍💻 Author

**Your Name**  
Aspiring Fintech Developer | MERN Stack | Security-Oriented Projects  
Email: your@email.com  
GitHub: [your-username](https://github.com/your-username)

---

## 📢 License

This project is for educational & portfolio use only.
