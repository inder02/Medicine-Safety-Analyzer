import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Globe, Video, Calendar, Filter, Search, MapPin, Award, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Doctor } from '../types';

interface DoctorsListProps {
  onBack: () => void;
  onDoctorSelected: (doctor: Doctor) => void;
}

// Sample doctor data
const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    qualification: 'MBBS, MD (Internal Medicine)',
    specialization: ['Internal Medicine', 'Diabetes', 'Hypertension'],
    experience: 12,
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.9,
    totalConsultations: 2847,
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Priya Sharma is a highly experienced internal medicine specialist with over 12 years of practice. She specializes in diabetes management, hypertension, and preventive healthcare.',
    availability: [
      {
        day: 'Monday',
        slots: [
          { start: '09:00', end: '09:30', isBooked: false },
          { start: '09:30', end: '10:00', isBooked: true },
          { start: '10:00', end: '10:30', isBooked: false }
        ]
      }
    ],
    consultationFee: 500,
    isVerified: true
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    qualification: 'MBBS, MS (General Surgery)',
    specialization: ['General Surgery', 'Laparoscopic Surgery', 'Emergency Medicine'],
    experience: 15,
    languages: ['English', 'Hindi', 'Bengali'],
    rating: 4.8,
    totalConsultations: 3256,
    avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Rajesh Kumar is a renowned general surgeon with expertise in minimally invasive laparoscopic procedures. He has been practicing for over 15 years.',
    availability: [],
    consultationFee: 600,
    isVerified: true
  },
  {
    id: '3',
    name: 'Dr. Anita Patel',
    qualification: 'MBBS, MD (Pediatrics)',
    specialization: ['Pediatrics', 'Child Development', 'Vaccination'],
    experience: 10,
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.9,
    totalConsultations: 1892,
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Anita Patel is a dedicated pediatrician who focuses on comprehensive child healthcare, development monitoring, and immunization programs.',
    availability: [],
    consultationFee: 450,
    isVerified: true
  },
  {
    id: '4',
    name: 'Dr. Mohammed Ali',
    qualification: 'MBBS, MD (Cardiology)',
    specialization: ['Cardiology', 'Heart Disease', 'Interventional Cardiology'],
    experience: 18,
    languages: ['English', 'Hindi', 'Urdu'],
    rating: 4.9,
    totalConsultations: 4123,
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Mohammed Ali is a leading cardiologist with extensive experience in interventional cardiology and heart disease management.',
    availability: [],
    consultationFee: 800,
    isVerified: true
  },
  {
    id: '5',
    name: 'Dr. Sunita Reddy',
    qualification: 'MBBS, MD (Dermatology)',
    specialization: ['Dermatology', 'Skin Care', 'Cosmetic Dermatology'],
    experience: 8,
    languages: ['English', 'Hindi', 'Telugu'],
    rating: 4.7,
    totalConsultations: 1567,
    avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Sunita Reddy specializes in medical and cosmetic dermatology, helping patients achieve healthy skin through evidence-based treatments.',
    availability: [],
    consultationFee: 550,
    isVerified: true
  },
  {
    id: '6',
    name: 'Dr. Vikram Singh',
    qualification: 'MBBS, MD (Psychiatry)',
    specialization: ['Psychiatry', 'Mental Health', 'Anxiety & Depression'],
    experience: 14,
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.8,
    totalConsultations: 2234,
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    about: 'Dr. Vikram Singh is a compassionate psychiatrist specializing in anxiety, depression, and stress-related disorders with a holistic approach.',
    availability: [],
    consultationFee: 700,
    isVerified: true
  }
];

function DoctorsList({ onBack, onDoctorSelected }: DoctorsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const { user } = useAuth();
  const { t } = useLanguage();

  const specializations = [
    'all',
    'Internal Medicine',
    'General Surgery',
    'Pediatrics',
    'Cardiology',
    'Dermatology',
    'Psychiatry'
  ];

  const filteredDoctors = sampleDoctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialization = selectedSpecialization === 'all' ||
                                   doctor.specialization.includes(selectedSpecialization);
      return matchesSearch && matchesSpecialization;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'consultations':
          return b.totalConsultations - a.totalConsultations;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="px-4 py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Consult Doctors</h1>
              <p className="text-sm text-gray-600">Choose from verified MBBS doctors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* Specialization Filter */}
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>
                  {spec === 'all' ? 'All Specializations' : spec}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="consultations">Sort by Consultations</option>
              <option value="fee">Sort by Fee (Low to High)</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredDoctors.length} doctors found
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => onDoctorSelected(doctor)}
            >
              {/* Doctor Header */}
              <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover"
                  />
                  {doctor.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{doctor.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{doctor.qualification}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{doctor.totalConsultations}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {doctor.specialization.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {doctor.specialization.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{doctor.specialization.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Experience and Languages */}
              <div className="mb-3 sm:mb-4 space-y-1 sm:space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span className="truncate">{doctor.languages.join(', ')}</span>
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="text-base sm:text-lg font-semibold text-gray-900">
                  ₹{doctor.consultationFee}
                  <span className="text-xs sm:text-sm font-normal text-gray-600">/consultation</span>
                </div>
                <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto">
                  <Video className="w-4 h-4" />
                  <span>Consult</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 px-4">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsList;