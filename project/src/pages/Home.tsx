import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Shield, Truck, Store, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="pt-16 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Shop from Local
            <span className="text-blue-600"> Marts</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover nearby marts, browse products, and get your essentials delivered or ready for pickup. 
            Fast, convenient, and reliable shopping experience.
          </p>
          <Link 
            to="/marts"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to get your shopping done</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Nearest Marts</h3>
              <p className="text-gray-600">Auto-detect your location to find the closest marts with accurate distances</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <ShoppingBag className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Products</h3>
              <p className="text-gray-600">Add items to your cart from fresh produce to daily essentials</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Clock className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Get accurate delivery estimates based on your exact location</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Shield className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Pay securely with multiple options including UPI, cards, and COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600">Benefits that make shopping easier</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location-Based</h3>
              <p className="text-gray-600">Automatically find the nearest marts with precise distance calculations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-green-600 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick order processing with accurate delivery time estimates</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-purple-600 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Local</h3>
              <p className="text-gray-600">Safe transactions while supporting local businesses in your area</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who shop smart with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/marts"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Marts Now
            </Link>
            <Link 
              to="/mart/login"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Store className="mr-2 h-5 w-5" />
              Mart Official Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;