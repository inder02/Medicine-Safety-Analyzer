import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Video, Star, Award, Globe, Users, CreditCard, CheckCircle } from 'lucide-react';
import { Doctor, Consultation } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ConsultationBookingProps {
  doctor: Doctor;
  onBack: () => void;
  onBookingComplete: (consultation: Consultation) => void;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
];

const availableDates = [
  { date: '2024-01-15', day: 'Today', available: 8 },
  { date: '2024-01-16', day: 'Tomorrow', available: 12 },
  { date: '2024-01-17', day: 'Wed', available: 15 },
  { date: '2024-01-18', day: 'Thu', available: 10 },
  { date: '2024-01-19', day: 'Fri', available: 6 },
  { date: '2024-01-20', day: 'Sat', available: 4 },
  { date: '2024-01-21', day: 'Sun', available: 8 }
];

function ConsultationBooking({ doctor, onBack, onBookingComplete }: ConsultationBookingProps) {
  const [selectedDate, setSelectedDate] = useState(availableDates[1].date);
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'audio'>('video');
  const [symptoms, setSymptoms] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuth();

  const handleBookConsultation = async () => {
    if (!selectedTime || !symptoms.trim()) return;

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const consultation: Consultation = {
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      doctorId: doctor.id,
      scheduledAt: `${selectedDate}T${selectedTime}:00`,
      duration: 30,
      status: 'scheduled',
      meetingLink: 'https://meet.medisafe.com/room/' + Date.now(),
      notes: symptoms,
      createdAt: new Date().toISOString()
    };

    onBookingComplete(consultation);
    setIsBooking(false);
  };

  const proceedToPayment = () => {
    if (!selectedTime || !symptoms.trim()) return;
    setShowPayment(true);
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Payment</h1>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h2>
              <p className="text-gray-600">Review your consultation details</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="font-medium">{new Date(selectedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Time:</span>
                  <p className="font-medium">{selectedTime}</p>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <p className="font-medium capitalize">{consultationType} Call</p>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <p className="font-medium">30 minutes</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-semibold">₹{doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-semibold">₹50</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-4">
                <span>Total Amount</span>
                <span>₹{doctor.consultationFee + 50}</span>
              </div>
            </div>

            <button
              onClick={handleBookConsultation}
              disabled={isBooking}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBooking ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Pay ₹{doctor.consultationFee + 50}</span>
                </div>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment powered by Stripe. Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Book Consultation</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Doctor Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {doctor.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
              <p className="text-gray-600 mb-3">{doctor.qualification}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{doctor.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{doctor.experience} years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{doctor.totalConsultations}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{doctor.languages.length} languages</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {doctor.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
              <div className="text-sm text-gray-600">per consultation</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Select Date
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {availableDates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  onClick={() => setSelectedDate(dateOption.date)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedDate === dateOption.date
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{dateOption.day}</div>
                  <div className="text-sm text-gray-600">{dateOption.available} slots</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Select Time
            </h3>
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg border text-sm transition-all ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Consultation Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setConsultationType('video')}
              className={`p-4 rounded-lg border-2 transition-all ${
                consultationType === 'video'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Video className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-medium">Video Call</div>
              <div className="text-sm text-gray-600">Face-to-face consultation</div>
            </button>
            <button
              onClick={() => setConsultationType('audio')}
              className={`p-4 rounded-lg border-2 transition-all ${
                consultationType === 'audio'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-medium">Audio Call</div>
              <div className="text-sm text-gray-600">Voice-only consultation</div>
            </button>
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Describe Your Symptoms</h3>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Please describe your symptoms, concerns, or questions for the doctor..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Book Button */}
        <div className="mt-6">
          <button
            onClick={proceedToPayment}
            disabled={!selectedTime || !symptoms.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment - ₹{doctor.consultationFee + 50}
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">
            Includes ₹50 platform fee • 30-minute consultation
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConsultationBooking;