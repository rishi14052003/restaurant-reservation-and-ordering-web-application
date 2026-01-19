# 🍽️ Restaurant Reservation & Ordering Web Application

A modern, full-stack restaurant management system that allows customers to reserve tables and order food online. Built with React and Node.js, featuring a beautiful UI and seamless user experience.

## ✨ Features

### 🪑 Table Reservation System
- **Smart Table Selection**: Visual table grid with capacity-based highlighting
- **Real-time Availability**: See which tables are available, reserved, or match your party size
- **Flexible Time Slots**: Book tables for specific date and time ranges
- **Conflict Prevention**: Automatic detection of double bookings
- **Reservation History**: View all your past and upcoming reservations

### 🍕 Food Ordering System
- **Interactive Menu**: Browse through categorized menu items (Starters, Main Course, Desserts, Beverages, Specials)
- **Smart Quantity Controls**: Add/remove items with intuitive +/- controls
- **Real-time Order Summary**: Live updates of your order total
- **Secure Payment**: Multiple payment options (Credit Card, Cash, UPI)

### 👤 User Management
- **Secure Authentication**: JWT-based login system
- **Data Persistence**: Your reservations and preferences are saved
- **Profile Management**: View and manage your account details
- **Seamless Experience**: Stay logged in across sessions

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glass Morphism**: Modern, elegant visual design
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Color-Coded Tables**: Visual feedback for table availability
- **Professional Layout**: Clean, intuitive interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishi14052003/restaurant-reservation-and-ordering-web-application.git
   cd restaurant-reservation-and-ordering-web-application
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the Application**
   
   **Terminal 1 - Start Server:**
   ```bash
   cd server
   npm start
   ```
   
   **Terminal 2 - Start Client:**
   ```bash
   cd client
   npm start
   ```

5. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 🏗️ Architecture

### Frontend (React)
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API calls
- **CSS3**: Custom styling with animations

### Backend (Node.js)
- **Express.js**: RESTful API server
- **JWT**: Secure authentication
- **bcryptjs**: Password hashing
- **File-based Storage**: Persistent data storage
- **CORS**: Cross-origin resource sharing

### Data Storage
- **JSON Files**: User and reservation data stored locally
- **Automatic Backups**: Data persists across server restarts
- **Scalable Design**: Easy migration to database later

## 📱 User Journey

1. **Sign Up/Login**: Create an account or sign in to your existing one
2. **Reserve a Table**: 
   - Select your party size
   - Choose preferred date and time
   - Pick from available tables (color-coded for convenience)
3. **Order Food** (after table reservation):
   - Browse the interactive menu
   - Add items with quantity controls
   - Review your order in real-time
4. **Make Payment**: Choose your preferred payment method
5. **View History**: Access all your reservations anytime

## 🎯 Key Features Explained

### Smart Table Selection
- 🟢 **Green**: Exact match for your party size
- 🟡 **Yellow**: Tables with sufficient capacity
- 🔴 **Red**: Already reserved
- 🔵 **Blue**: Currently selected
- 🟠 **Coral**: Hover effect

### Reservation Management
- **Conflict Detection**: Prevents double bookings automatically
- **Time Validation**: Ensures end time is after start time
- **Date Validation**: Prevents booking in the past
- **User-specific**: Each user sees only their reservations

### Order System
- **Quantity Controls**: Intuitive +/- buttons for each item
- **Live Updates**: Order total updates in real-time
- **Item Management**: Smart handling of duplicate items
- **Clear Pricing**: Transparent cost breakdown

## 🔧 Development

### Project Structure
```
restaurant-reservation-and-ordering-web-application/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   └── public/           # Static files
├── server/               # Node.js backend
│   ├── controllers/     # Route controllers
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── data/            # Data storage (JSON files)
└── README.md
```

### Available Scripts

#### Client Side
```bash
npm start          # Start development server
npm test           # Run tests
```

#### Server Side
```bash
npm start          # Start server
npm test           # Run tests
```

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern React framework
- **React Router DOM**: Navigation
- **Lucide React**: Icon library
- **Axios**: HTTP client

### Backend
- **Express.js**: Web framework
- **JWT**: Authentication tokens
- **bcryptjs**: Password security
- **CORS**: Cross-origin requests

### Styling
- **CSS3**: Modern CSS with animations
- **Flexbox/Grid**: Responsive layouts
- **Glass Morphism**: Modern UI design

## 🌟 Highlights

- **Zero Configuration**: Works out of the box
- **Data Persistence**: User data survives server restarts
- **Mobile Responsive**: Perfect on all devices
- **Beautiful UI**: Modern, professional design
- **Secure**: JWT authentication and password hashing
- **Fast**: Optimized performance
- **Scalable**: Clean architecture for future enhancements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishi Sharma**  
[GitHub](https://github.com/rishi14052003) | [Portfolio](your-portfolio-link)

## 🙏 Acknowledgments

- React team for the amazing framework
- Lucide React for beautiful icons
- The open-source community for inspiration

---

⭐ **Star this repository if it helped you!**  

📧 For any queries, feel free to reach out or open an issue.
