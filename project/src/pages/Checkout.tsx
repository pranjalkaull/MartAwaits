import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, Banknote } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { createOrder } = useOrder();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = state.total + 2.99 + state.total * 0.08;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay with UPI apps' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, MasterCard, etc.' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'Pay via your bank' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' }
  ];

  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = createOrder({
      items: state.items,
      total,
      paymentMethod: selectedPayment,
      isPaid: selectedPayment !== 'cod',
      pickupInstructions: 'Please bring your order confirmation and ID for pickup.'
    });
    
    dispatch({ type: 'CLEAR_CART' });
    navigate(`/receipt/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Checkout" showBack={true} showCart={false} />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${(state.total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedPayment === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="sr-only"
                />
                
                <div className="flex items-center w-full">
                  <div className={`p-2 rounded-full mr-3 ${
                    selectedPayment === method.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <method.icon className={`h-5 w-5 ${
                      selectedPayment === method.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                  
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPayment === method.id
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedPayment === method.id && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedPayment || isProcessing}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            !selectedPayment || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;