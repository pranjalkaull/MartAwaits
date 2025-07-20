import React from 'react';
import { MapPin, X, AlertCircle } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  onDeny: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  onClose,
  onAllow,
  onDeny
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Location Access</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start space-x-3 mb-4">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-gray-700 mb-2">
                We'd like to access your location to show you the nearest marts and provide accurate delivery estimates.
              </p>
              <p className="text-sm text-gray-500">
                Your location data is only used to calculate distances and is not stored or shared.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">Benefits of location access:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Find the closest marts to you</li>
              <li>• Get accurate delivery time estimates</li>
              <li>• Sort results by distance</li>
              <li>• Better shopping experience</li>
            </ul>
          </div>
        </div>
        
        <div className="flex space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onDeny}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Not Now
          </button>
          <button
            onClick={onAllow}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Allow Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;