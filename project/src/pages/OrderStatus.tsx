import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import { useOrder } from '../context/OrderContext';

const OrderStatus: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrder();
  const [currentStatus, setCurrentStatus] = useState(0);
  
  const order = getOrder(orderId!);

  const statusSteps = [
    { id: 0, title: 'Order Placed', description: 'Your order has been confirmed', icon: Package },
    { id: 1, title: 'Preparing', description: 'Items are being prepared', icon: Clock },
    { id: 2, title: 'Ready for Pickup', description: 'Your order is ready', icon: CheckCircle },
  ];

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStatus(prev => Math.min(prev + 1, statusSteps.length - 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Order Status" showBack={true} showCart={false} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-red-600 mb-4">
            <Package className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Order Status" showBack={true} showCart={false} />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Order #{order.id}</h2>
              <p className="text-gray-600">{order.createdAt.toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-blue-600">${order.total.toFixed(2)}</p>
              <p className={`text-sm ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                {order.isPaid ? 'Paid' : 'Payment Pending'}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Estimated Pickup Time</h3>
                <p className="text-blue-700">15-30 minutes from order time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Progress</h3>
          
          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStatus
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < currentStatus ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    index <= currentStatus ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${
                    index <= currentStatus ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
                
                {index <= currentStatus && (
                  <div className="text-green-600 text-sm font-medium">
                    {index === currentStatus ? 'In Progress' : 'Completed'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pickup Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Instructions</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Location</h4>
                <p className="text-sm text-gray-600">Visit the mart counter and show this order</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What to Bring</h4>
                <p className="text-sm text-gray-600">Order ID, receipt, and valid ID</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Support</h4>
                <p className="text-sm text-gray-600">Call +1-234-567-8900 for assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Items in Order</h3>
          
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;