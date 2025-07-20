# Backend Setup

## Python + MongoDB Backend

Due to WebContainer limitations, this backend structure is provided as a reference. 
For a production setup, you would need:

1. **MongoDB Atlas** or local MongoDB installation
2. **FastAPI** or **Flask** for the API
3. **PyMongo** for MongoDB operations
4. **JWT** for authentication
5. **Stripe/PayPal** for payments

## Recommended Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py          # User model
│   │   ├── mart.py          # Mart model
│   │   ├── product.py       # Product model
│   │   ├── cart.py          # Cart model
│   │   └── order.py         # Order model
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication routes
│   │   ├── marts.py         # Mart routes
│   │   ├── products.py      # Product routes
│   │   ├── cart.py          # Cart routes
│   │   └── orders.py        # Order routes
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth.py          # JWT middleware
│   ├── database/
│   │   ├── __init__.py
│   │   └── connection.py    # MongoDB connection
│   └── utils/
│       ├── __init__.py
│       └── helpers.py       # Utility functions
├── requirements.txt
└── .env                     # Environment variables
```

## Installation Commands

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

## Environment Variables

```env
MONGODB_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## Alternative: Node.js Backend

For WebContainer compatibility, consider using:
- **Express.js** with **MongoDB** (using mongoose)
- **Supabase** for database and authentication
- **Vercel/Netlify** for deployment

This would work better in the current environment and can be easily implemented.