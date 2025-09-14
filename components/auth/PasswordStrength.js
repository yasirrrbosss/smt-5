import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState({
    score: 0,
    requirements: {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false
    }
  });

  useEffect(() => {
    const requirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    const score = Object.values(requirements).filter(Boolean).length;

    setStrength({ score, requirements });
  }, [password]);

  const getStrengthColor = () => {
    if (strength.score <= 2) return 'bg-red-500';
    if (strength.score <= 3) return 'bg-yellow-500';
    if (strength.score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength.score <= 2) return 'Weak';
    if (strength.score <= 3) return 'Fair';
    if (strength.score <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      {/* Strength Bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Password Strength</span>
          <span className={`text-xs font-medium ${
            strength.score <= 2 ? 'text-red-600' :
            strength.score <= 3 ? 'text-yellow-600' :
            strength.score <= 4 ? 'text-blue-600' : 'text-green-600'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        <div className="flex items-center text-xs">
          {strength.requirements.length ? (
            <Check className="h-3 w-3 text-green-500 mr-2" />
          ) : (
            <X className="h-3 w-3 text-red-500 mr-2" />
          )}
          <span className={strength.requirements.length ? 'text-green-600' : 'text-red-600'}>
            At least 8 characters
          </span>
        </div>
        
        <div className="flex items-center text-xs">
          {strength.requirements.lowercase ? (
            <Check className="h-3 w-3 text-green-500 mr-2" />
          ) : (
            <X className="h-3 w-3 text-red-500 mr-2" />
          )}
          <span className={strength.requirements.lowercase ? 'text-green-600' : 'text-red-600'}>
            One lowercase letter
          </span>
        </div>
        
        <div className="flex items-center text-xs">
          {strength.requirements.uppercase ? (
            <Check className="h-3 w-3 text-green-500 mr-2" />
          ) : (
            <X className="h-3 w-3 text-red-500 mr-2" />
          )}
          <span className={strength.requirements.uppercase ? 'text-green-600' : 'text-red-600'}>
            One uppercase letter
          </span>
        </div>
        
        <div className="flex items-center text-xs">
          {strength.requirements.number ? (
            <Check className="h-3 w-3 text-green-500 mr-2" />
          ) : (
            <X className="h-3 w-3 text-red-500 mr-2" />
          )}
          <span className={strength.requirements.number ? 'text-green-600' : 'text-red-600'}>
            One number
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;