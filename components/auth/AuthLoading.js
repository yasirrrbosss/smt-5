import { Package, Loader2 } from 'lucide-react';

const AuthLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <Package className="h-16 w-16 text-blue-600 animate-bounce" />
          <div className="absolute -top-2 -right-2">
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ItemManager</h2>
        <p className="text-gray-600 mb-4">Preparing your inventory...</p>
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;