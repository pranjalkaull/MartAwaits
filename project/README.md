# E-commerce Project

A modern e-commerce platform with React frontend and Python backend.

## Features

### Frontend (React + TypeScript)
- **Home Page**: Welcome page with how it works section and CTA
- **Mart Selection**: Browse nearby marts with filtering and sorting
- **Product Browsing**: View products by mart with search and categories
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout**: Multiple payment methods (UPI, Card, NetBanking, COD)
- **E-Receipt**: Digital receipt with payment status
- **Order Status**: Real-time order tracking with pickup instructions

### Backend (Python + FastAPI + MongoDB)
- **REST API**: Complete API for all operations
- **Authentication**: JWT-based user authentication
- **Database**: MongoDB with proper schemas
- **Payment Processing**: Mock payment integration
- **Order Management**: Complete order lifecycle

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Lucide React for icons

### Backend
- FastAPI (Python)
- MongoDB with Motor (async driver)
- JWT authentication
- CORS support

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload
```

## Project Structure

```
├── src/
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── data/              # Mock data
│   └── types/             # TypeScript types
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI application
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── requirements.txt
└── README.md
```

## Key Features

### 🛒 Shopping Experience
- Intuitive mart selection with distance and ratings
- Product browsing with search and filters
- Smart cart management with quantity controls
- Secure checkout with multiple payment options

### 📱 Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Clean, professional interface
- Accessibility-focused components

### 🔒 Security & Payments
- Secure payment processing
- JWT-based authentication
- Input validation and sanitization
- HTTPS support ready

### 📊 Order Management
- Real-time order tracking
- Digital receipts
- Pickup instructions
- Order history

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## API Endpoints

- `GET /api/marts` - Get all marts
- `GET /api/products/{mart_id}` - Get products for a mart
- `POST /api/orders` - Create new order
- `GET /api/orders/{order_id}` - Get order details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.