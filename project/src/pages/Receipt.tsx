import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Calendar, MapPin, Clock } from 'lucide-react';
import Header from '../components/Header';
import { useOrder } from '../context/OrderContext';

const Receipt: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrder();
  
  const order = getOrder(orderId!);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Receipt" showBack={true} showCart={false} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-red-600 mb-4">
            <XCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const paymentMethodNames = {
    upi: 'UPI',
    card: 'Credit/Debit Card',
    netbanking: 'Net Banking',
    cod: 'Cash on Delivery'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="E-Receipt" showBack={true} showCart={false} />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Header */}
        <div className={`rounded-lg p-6 mb-6 text-center ${
          order.isPaid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            order.isPaid ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {order.isPaid ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
          </div>
          
          <h2 className={`text-2xl font-semibold mb-2 ${
            order.isPaid ? 'text-green-800' : 'text-red-800'
          }`}>
            {order.isPaid ? 'Payment Successful!' : 'Payment Pending'}
          </h2>
          
          <p className={`text-sm ${
            order.isPaid ? 'text-green-700' : 'text-red-700'
          }`}>
            {order.isPaid 
              ? 'Your order has been confirmed and is being prepared.'
              : 'Payment will be collected upon delivery/pickup.'
            }
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">#{order.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">
                {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">
                {paymentMethodNames[order.paymentMethod as keyof typeof paymentMethodNames]}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className={`font-medium ${
                order.isPaid ? 'text-green-600' : 'text-red-600'
              }`}>
                {order.isPaid ? 'Paid' : 'Payment Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
          
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
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Preparation Time</h4>
                <p className="text-sm text-gray-600">15-30 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Pickup Location</h4>
                <p className="text-sm text-gray-600">Visit the mart counter with this receipt</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Track Order</h4>
                <p className="text-sm text-gray-600">Get real-time updates on your order status</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <Link
              to={`/order-status/${order.id}`}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block"
            >
              Track Order
            </Link>
            
            <Link
              to="/"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;