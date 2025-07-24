export const mockMarts = [
  {
    id: '1',
    name: 'Kalesh FreshMart Kolar',
    address: '123 Main BeemaKunj, Om Complex, Kolar Road Bhopal',
    distance: '0.5 km',
    rating: 4.5,
    latitude: 40.7128,
    longitude: -74.0060,
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500',
    deliveryTime: '15-30 min',
    categories: ['Groceries', 'Fresh Produce', 'Dairy', 'Electronics', 'More']
  },
  {
    id: '2',
    name: 'QuickStop Mp Nagar ',
    address: '456 Near Danik Bhaskar, Mp Nagar Bhopal ',
    distance: '1.2 km',
    rating: 4.2,
    latitude: 40.7589,
    longitude: -73.9851,
    image: 'https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg?auto=compress&cs=tinysrgb&w=500',
    deliveryTime: '10-25 min',
    categories: ['Snacks', 'Beverages', 'Essentials']
  },
  {
    id: '3',
    name: 'Organic Valley Misrod ',
    address: '789 Street Front of Coral Woods, Misrod Bhopal',
    distance: '2.1 km',
    rating: 4.8,
    latitude: 40.7831,
    longitude: -73.9712,
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=500',
    deliveryTime: '20-35 min',
    categories: ['Organic', 'Health Food', 'Supplements']
  },
  {
    id: '4',
    name: 'Corner Grocery Katar Hills',
    address: 'Barai Road, Katara Hills, Bhopal',
    distance: '0.8 km',
    rating: 4.3,
    latitude: 40.7282,
    longitude: -73.9942,
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=500',
    deliveryTime: '12-25 min',
    categories: ['Groceries', 'Snacks', 'Beverages']
  },
  {
    id: '5',
    name: 'Metro Market DB Mall ',
    address: '567SP DB Mall, Bhopal',
    distance: '1.5 km',
    rating: 4.6,
    latitude: 40.7505,
    longitude: -73.9934,
    image: 'https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=500',
    deliveryTime: '18-30 min',
    categories: ['Groceries', 'Fresh Produce', 'Organic']
  }
];

export const mockProducts = {
  '1': [
    {
      id: 'p1',
      price:  60 ,
      name: 'Fresh Bananas 12 PCS',
      image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Fresh Produce',
      description: 'Organic bananas, perfectly ripe'
    },
    {
      id: 'p2',
      name: 'Whole Wheat Bread',
      price:  45,
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Bakery',
      description: 'Fresh baked whole wheat bread'
    },
    {
      id: 'p3',
      name: 'Organic Milk 1 LTR',
      price:  75,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Dairy',
      description: 'Fresh organic milk, 1 liter'
    },
    {
      id: 'p4',
      name: 'Free Range Eggs 12 Pcs',
      price:  90,
      image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Dairy',
      description: 'Farm fresh free range eggs, dozen'
    }
  ],
  '2': [
    {
      id: 'p5',
      name: 'Potato Chips',
      price:  45,
      image: 'https://images.pexels.com/photos/568373/pexels-photo-568373.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Snacks',
      description: 'Crispy salted potato chips'
    },
    {
      id: 'p6',
      name: 'Energy Drink',
      price: 180,
      image: 'https://images.pexels.com/photos/4198102/pexels-photo-4198102.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Beverages',
      description: 'Refreshing energy drink'
    },
    {
      id: 'p7',
      name: 'Chocolate Bar',
      price:  60,
      image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Snacks',
      description: 'Rich dark chocolate bar'
    }
  ],
  '3': [
    {
      id: 'p8',
      name: 'Organic Quinoa',
      price: 75,
      image: 'https://images.pexels.com/photos/1321942/pexels-photo-1321942.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Organic',
      description: 'Premium organic quinoa, 500g'
    },
    {
      id: 'p9',
      name: 'Almond Butter 250gm',
      price:  85,
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Health Food',
      description: 'Natural almond butter, no added sugar'
    },
    {
      id: 'p10',
      name: 'Vitamin D Supplement',
      price:  1200,
      image: 'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Supplements',
      description: 'High-quality vitamin D3 supplement'
    }
  ]
};

export const mockMartUsers = [
  {
    id: '1',
    email: 'KaleshMart@gmail.com',
    password: 'password123',
    martName: 'Kalesh FreshMart',
    ownerName: 'Mishra Ji',
    phone: '+91 626241****',
    address: '123 Main St, Downtow123 Main BeemaKunj, Om Complex, Kolar Road Bhopal',
    isVerified: true,
    createdAt: new Date('2025-07-24')
  },
  {
    id: '2',
    email: 'QuickStop@gmail.com',
    password: 'password123',
    martName: 'QuickStop Mp Nagar ',
    ownerName: 'Kartik Verma ',
    phone: '+91 626691****',
    address: '456 Near Danik Bhaskar, Mp Nagar Bhopal ',
    isVerified: true,
    createdAt: new Date('2025-07-24')
  },
  {
    id: '3',
    email: 'organic@example.com',
    password: 'password123',
    martName: 'Organic Valley Misrod',
    ownerName: 'Rajesh Kumar',
    phone: '+91 626691****',
    address: '789 Street Front of Coral Woods, Misrod Bhopal',
    isVerified: true,
    createdAt: new Date('2024-02-01')
  }
];

export const mockMartOrders = {
  '1': [
    {
      id: '1001',
      customerId: 'c1',
      customerName: 'John Doe',
      customerPhone: '+1-555-1001',
      customerAddress: '123 Customer St, City',
      items: [
        { id: 'p1', name: 'Fresh Bananas', price: 60, quantity: 2 },
        { id: 'p2', name: 'Whole Wheat Bread', price: 45, quantity: 1 }
      ],
      total: 165,
      status: 'pending',
      paymentMethod: 'upi',
      isPaid: true,
      createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      notes: 'Please pack carefully'
    },
    {
      id: '1002',
      customerId: 'c2',
      customerName: 'Jane Smith',
      customerPhone: '+1-555-1002',
      customerAddress: '456 Customer Ave, City',
      items: [
        { id: 'p3', name: 'Organic Milk', price: 75, quantity: 1 },
        { id: 'p4', name: 'Free Range Eggs', price: 90, quantity: 1 }
      ],
      total: 165,
      status: 'packed',
      paymentMethod: 'card',
      isPaid: true,
      createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      notes: ''
    }
  ],
  '2': [
    {
      id: '2001',
      customerId: 'c3',
      customerName: 'Mike Johnson',
      customerPhone: '+1-555-2001',
      customerAddress: '789 Customer Blvd, City',
      items: [
        { id: 'p5', name: 'Potato Chips', price: 45, quantity: 3 },
        { id: 'p6', name: 'Energy Drink', price: 180, quantity: 2 }
      ],
      total: 405,
      status: 'delivered',
      paymentMethod: 'cod',
      isPaid: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      notes: 'Call before delivery'
    }
  ]
};
