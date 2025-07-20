import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Filter, Navigation, AlertCircle, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import LocationPermissionModal from '../components/LocationPermissionModal';
import { mockMarts } from '../data/mockData';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance, formatDistance } from '../utils/locationUtils';

const MartSelection: React.FC = () => {
  const [sortBy, setSortBy] = useState('distance');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const { latitude, longitude, error, loading } = useGeolocation();

  // Calculate distances and update mart data
  const martsWithCalculatedDistance = mockMarts.map(mart => {
    if (latitude && longitude) {
      const distance = calculateDistance(latitude, longitude, mart.latitude, mart.longitude);
      return {
        ...mart,
        calculatedDistance: distance,
        distance: formatDistance(distance)
      };
    }
    return mart;
  });

  const sortedMarts = [...martsWithCalculatedDistance].sort((a, b) => {
    if (sortBy === 'distance') {
      if (a.calculatedDistance && b.calculatedDistance) {
        return a.calculatedDistance - b.calculatedDistance;
      }
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredMarts = sortedMarts.filter(mart => {
    if (filterCategory === 'all') return true;
    return mart.categories.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase()));
  });

  const handleLocationRequest = () => {
    setShowLocationModal(true);
  };

  const handleLocationAllow = () => {
    setShowLocationModal(false);
    // The useGeolocation hook will automatically request permission
  };

  const handleLocationDeny = () => {
    setShowLocationModal(false);
    setLocationDenied(true);
  };

  const handleRetryLocation = () => {
    setLocationDenied(false);
    window.location.reload(); // Simple way to retry geolocation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Select Mart" showBack={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Location Status */}
        <div className="mb-6">
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                <div>
                  <p className="text-blue-800 font-medium">Detecting your location...</p>
                  <p className="text-blue-600 text-sm">This helps us show the nearest marts</p>
                </div>
              </div>
            </div>
          )}
          
          {error && !locationDenied && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-amber-800 font-medium">Location access needed</p>
                    <p className="text-amber-600 text-sm">Enable location to find nearest marts</p>
                  </div>
                </div>
                <button
                  onClick={handleLocationRequest}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                >
                  Enable Location
                </button>
              </div>
            </div>
          )}
          
          {locationDenied && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-gray-700 font-medium">Location access disabled</p>
                    <p className="text-gray-500 text-sm">Showing all marts with default distances</p>
                  </div>
                </div>
                <button
                  onClick={handleRetryLocation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
          
          {latitude && longitude && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Navigation className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-medium">Location detected</p>
                  <p className="text-green-600 text-sm">Showing marts sorted by distance from your location</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="groceries">Groceries</option>
                <option value="organic">Organic</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Marts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarts.map((mart) => (
            <Link
              key={mart.id}
              to={`/products/${mart.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                <img
                  src={mart.image}
                  alt={mart.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{mart.name}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{mart.address}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{mart.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    <span>{mart.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {latitude && longitude && mart.calculatedDistance && (
                      <Navigation className="h-3 w-3 text-blue-600" />
                    )}
                    <span className="text-sm font-medium text-blue-600">{mart.distance}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mart.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onAllow={handleLocationAllow}
        onDeny={handleLocationDeny}
      />
    </div>
  );
};

export default MartSelection;