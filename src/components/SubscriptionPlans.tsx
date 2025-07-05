import React, { useState } from 'react';
import { ArrowLeft, Check, Crown, Star, CreditCard, Smartphone, Globe, Shield, Clock, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface SubscriptionPlansProps {
  onBack: () => void;
  onPlanSelected: (plan: 'monthly' | 'yearly') => void;
}

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Pro',
    price: {
      usd: 59,
      inr: 4999
    },
    period: 'month',
    popular: false,
    features: [
      'Unlimited medicine analysis',
      '5 doctor consultations per month',
      'Priority customer support',
      'Advanced AI insights',
      'Medicine interaction checker',
      'Personalized health reports',
      'Mobile app access'
    ],
    consultations: 5
  },
  {
    id: 'yearly',
    name: 'Yearly Pro',
    price: {
      usd: 399,
      inr: 33999
    },
    period: 'year',
    popular: true,
    savings: {
      usd: 309,
      inr: 25989
    },
    features: [
      'Unlimited medicine analysis',
      '60 doctor consultations per year',
      'Priority customer support',
      'Advanced AI insights',
      'Medicine interaction checker',
      'Personalized health reports',
      'Mobile app access',
      'Family account (up to 4 members)',
      'Health tracking dashboard',
      'Prescription management'
    ],
    consultations: 60
  }
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" />, supported: ['US', 'IN', 'Global'] },
  { id: 'upi', name: 'UPI', icon: <Smartphone className="w-5 h-5" />, supported: ['IN'] },
  { id: 'paypal', name: 'PayPal', icon: <Globe className="w-5 h-5" />, supported: ['US', 'Global'] },
  { id: 'netbanking', name: 'Net Banking', icon: <Shield className="w-5 h-5" />, supported: ['IN'] }
];

function SubscriptionPlans({ onBack, onPlanSelected }: SubscriptionPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [currency, setCurrency] = useState<'usd' | 'inr'>('usd');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would integrate with Stripe
    console.log('Processing payment for:', {
      plan: selectedPlan,
      payment: selectedPayment,
      currency,
      user: user?.email
    });
    
    onPlanSelected(selectedPlan);
    setIsProcessing(false);
  };

  const formatPrice = (price: { usd: number; inr: number }) => {
    if (currency === 'inr') {
      return `₹${price.inr.toLocaleString('en-IN')}`;
    }
    return `$${price.usd}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Choose Your Plan</h1>
                <p className="text-sm text-gray-600">Get access to verified MBBS doctors</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrency('usd')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currency === 'usd' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('inr')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currency === 'inr' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                INR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Upgrade to Pro</h2>
          </div>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Get unlimited access to verified MBBS doctors and advanced health insights
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Verified Doctors</h3>
            <p className="text-sm text-gray-600">Consult with licensed MBBS doctors</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">24/7 Availability</h3>
            <p className="text-sm text-gray-600">Book consultations anytime</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Secure & Private</h3>
            <p className="text-sm text-gray-600">HIPAA compliant consultations</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Premium Features</h3>
            <p className="text-sm text-gray-600">Advanced AI health insights</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'border-blue-500 shadow-xl scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      Save {formatPrice(plan.savings)}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <div className="text-center mb-4">
                    <span className="text-base sm:text-lg font-semibold text-blue-600">
                      {plan.consultations} Doctor Consultations
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Payment Methods</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPayment === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {method.icon}
                  <span className="text-xs sm:text-sm font-medium text-gray-900 text-center">{method.name}</span>
                  <div className="flex space-x-1">
                    {method.supported.map((region) => (
                      <span key={region} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Subscribe to ${plans.find(p => p.id === selectedPlan)?.name} - ${formatPrice(plans.find(p => p.id === selectedPlan)?.price!)}`
              )}
            </button>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Global Support</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3 sm:mt-4 px-4">
            Cancel anytime. No hidden fees. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlans;