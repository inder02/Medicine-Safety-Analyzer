import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageContextType } from '../types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary with Indian languages
const translations = {
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.history': 'इतिहास',
    'nav.profile': 'प्रोफाइल',
    'nav.logout': 'लॉग आउट',
    'nav.login': 'लॉग इन',
    
    // Home page
    'home.title': 'अपनी दवा को जानें, अपने स्वास्थ्य की रक्षा करें',
    'home.subtitle': 'AI-संचालित अंतर्दृष्टि के साथ दवा की सुरक्षा का विश्लेषण करें, दुष्प्रभावों को समझें और सुरक्षित विकल्प खोजें',
    'home.scan': 'दवा स्कैन करें',
    'home.scan.desc': 'दवा के रैपर को स्कैन करने और तुरंत विश्लेषण प्राप्त करने के लिए अपने कैमरे का उपयोग करें',
    'home.search': 'नाम से खोजें',
    'home.search.desc': 'दवा के नाम से खोजकर दवा की जानकारी प्राप्त करें',
    'home.upload': 'फोटो अपलोड करें',
    'home.upload.desc': 'विस्तृत सुरक्षा विश्लेषण के लिए अपनी दवा की फोटो अपलोड करें',
    
    // Features
    'features.risk': 'जोखिम मूल्यांकन',
    'features.risk.desc': 'विभिन्न अंग प्रणालियों के लिए विस्तृत जोखिम विश्लेषण प्राप्त करें',
    'features.organ': 'अंग प्रभाव',
    'features.organ.desc': 'हृदय, यकृत, गुर्दे और अन्य पर प्रभावों को समझें',
    'features.ai': 'AI-संचालित',
    'features.ai.desc': 'उन्नत AI दवा डेटा और चिकित्सा अनुसंधान का विश्लेषण करता है',
    'features.easy': 'समझने में आसान',
    'features.easy.desc': 'चिकित्सा जानकारी सरल, स्पष्ट भाषा में समझाई गई',
    
    // Authentication
    'auth.login': 'लॉग इन',
    'auth.register': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'auth.language': 'पसंदीदा भाषा',
    'auth.login.button': 'साइन इन',
    'auth.register.button': 'खाता बनाएं',
    'auth.switch.register': 'खाता नहीं है? साइन अप करें',
    'auth.switch.login': 'पहले से खाता है? साइन इन करें',
    
    // History
    'history.title': 'दवा इतिहास',
    'history.empty': 'अभी तक कोई दवा इतिहास नहीं',
    'history.empty.desc': 'अपना इतिहास बनाने के लिए दवाओं को स्कैन या खोजना शुरू करें',
    'history.searched': 'खोजा गया',
    'history.scanned': 'स्कैन किया गया',
    'history.uploaded': 'अपलोड किया गया',
    
    // Voice
    'voice.listening': 'सुन रहा है...',
    'voice.transcript': 'ट्रांसक्रिप्ट',
    'voice.use': 'उपयोग करें',
    'voice.speak': 'बोलें',
    'voice.speaking': 'बोल रहा है...',
    'voice.search.placeholder': 'दवा का नाम बोलें...',
    
    // Search
    'search.placeholder': 'दवा का नाम खोजें...',
    'search.results': 'खोज परिणाम',
    'search.no.results': 'आपकी खोज से मेल खाने वाली कोई दवा नहीं मिली',
    'search.try.different': 'जेनेरिक नाम या ब्रांड नाम से खोजने का प्रयास करें',
    'search.popular': 'लोकप्रिय खोजें',
    'search.recent': 'हाल की खोजें',
    
    // Analysis
    'analysis.overview': 'अवलोकन',
    'analysis.organs': 'अंग प्रभाव',
    'analysis.alternatives': 'विकल्प',
    'analysis.education': 'और जानें',
    'analysis.safety.score': 'सुरक्षा स्कोर',
    'analysis.based.on': 'क्लिनिकल डेटा, दुष्प्रभाव और अंग प्रभाव विश्लेषण के आधार पर',
    'analysis.safety.rating': 'सुरक्षा रेटिंग',
    'analysis.organ.impact': 'अंग प्रभाव',
    'analysis.manufacturer': 'निर्माता',
    'analysis.safety.info': 'महत्वपूर्ण सुरक्षा जानकारी',
    'analysis.follow.dosage': 'हमेशा निर्धारित खुराक निर्देशों का पालन करें',
    'analysis.consult.conditions': 'यदि आपको लिवर या किडनी की समस्या है तो अपने डॉक्टर से सलाह लें',
    'analysis.max.dose': 'अधिकतम दैनिक खुराक से अधिक न लें',
    'analysis.inform.doctor': 'अन्य दवाओं के बारे में अपने स्वास्थ्य प्रदाता को सूचित करें',
    'analysis.potential.effects': 'संभावित प्रभाव',
    'analysis.advantages': 'फायदे',
    'analysis.consult.provider': 'अपने स्वास्थ्य प्रदाता से सलाह लें',
    'analysis.discuss.alternatives': 'अपने उपचार योजना में कोई भी बदलाव करने से पहले हमेशा अपने डॉक्टर या फार्मासिस्ट के साथ वैकल्पिक दवाओं पर चर्चा करें।',
    'analysis.understanding': 'समझना',
    'analysis.how.works': 'यह कैसे काम करता है',
    'analysis.safe.usage': 'सुरक्षित उपयोग दिशानिर्देश',
    'analysis.take.prescribed': 'अपने स्वास्थ्य प्रदाता द्वारा निर्धारित के अनुसार ही लें',
    'analysis.not.exceed': 'अनुशंसित खुराक से अधिक न लें',
    'analysis.take.food': 'यदि पेट खराब हो तो भोजन के साथ लें',
    'analysis.stay.hydrated': 'इस दवा का उपयोग करते समय हाइड्रेटेड रहें',
    'analysis.complete.course': 'बेहतर महसूस करने पर भी पूरा कोर्स पूरा करें',
    'analysis.contact.doctor': 'अपने डॉक्टर से कब संपर्क करें',
    'analysis.severe.effects': 'यदि आप गंभीर दुष्प्रभाव का अनुभव करते हैं',
    'analysis.symptoms.worsen': 'यदि लक्षण बिगड़ते हैं या सुधार नहीं होता',
    'analysis.drug.interactions': 'यदि आपके पास दवा इंटरैक्शन के बारे में प्रश्न हैं',
    'analysis.combining.medications': 'अन्य दवाओं के साथ मिलाने से पहले',
    'analysis.additional.resources': 'अतिरिक्त संसाधन',
    
    // Common
    'common.back': 'वापस',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    
    // Risk levels
    'risk.safe': 'सुरक्षित',
    'risk.moderate': 'मध्यम जोखिम',
    'risk.high': 'उच्च जोखिम',
    'risk.critical': 'गंभीर जोखिम',
    
    // Disclaimer
    'disclaimer.title': 'महत्वपूर्ण चिकित्सा अस्वीकरण',
    'disclaimer.text': 'यह उपकरण केवल शैक्षिक जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह का विकल्प नहीं होना चाहिए। अपनी दवा की दिनचर्या में बदलाव करने से पहले हमेशा स्वास्थ्य पेशेवरों से सलाह लें।'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    
    // Home page
    'home.title': 'Know Your Medicine, Protect Your Health',
    'home.subtitle': 'Analyze medicine safety, understand side effects, and discover safer alternatives with AI-powered insights',
    'home.scan': 'Scan Medicine',
    'home.scan.desc': 'Use your camera to scan medicine wrappers and get instant analysis',
    'home.search': 'Search by Name',
    'home.search.desc': 'Find medicine information by searching with the medicine name',
    'home.upload': 'Upload Photo',
    'home.upload.desc': 'Upload a photo of your medicine for detailed safety analysis',
    
    // Features
    'features.risk': 'Risk Assessment',
    'features.risk.desc': 'Get detailed risk analysis for different organ systems',
    'features.organ': 'Organ Impact',
    'features.organ.desc': 'Understand effects on heart, liver, kidneys, and more',
    'features.ai': 'AI-Powered',
    'features.ai.desc': 'Advanced AI analyzes medicine data and medical research',
    'features.easy': 'Easy to Understand',
    'features.easy.desc': 'Medical information explained in simple, clear language',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.language': 'Preferred Language',
    'auth.login.button': 'Sign In',
    'auth.register.button': 'Create Account',
    'auth.switch.register': "Don't have an account? Sign up",
    'auth.switch.login': 'Already have an account? Sign in',
    
    // History
    'history.title': 'Medicine History',
    'history.empty': 'No medicine history yet',
    'history.empty.desc': 'Start by scanning or searching for medicines to build your history',
    'history.searched': 'Searched',
    'history.scanned': 'Scanned',
    'history.uploaded': 'Uploaded',
    
    // Voice
    'voice.listening': 'Listening...',
    'voice.transcript': 'Transcript',
    'voice.use': 'Use',
    'voice.speak': 'Speak',
    'voice.speaking': 'Speaking...',
    'voice.search.placeholder': 'Say medicine name...',
    
    // Search
    'search.placeholder': 'Search by medicine name...',
    'search.results': 'Search Results',
    'search.no.results': 'No medicines found matching your search',
    'search.try.different': 'Try searching with generic name or brand name',
    'search.popular': 'Popular Searches',
    'search.recent': 'Recent Searches',
    
    // Analysis
    'analysis.overview': 'Overview',
    'analysis.organs': 'Organ Impact',
    'analysis.alternatives': 'Alternatives',
    'analysis.education': 'Learn More',
    'analysis.safety.score': 'Safety Score',
    'analysis.based.on': 'Based on clinical data, side effects, and organ impact analysis',
    'analysis.safety.rating': 'Safety Rating',
    'analysis.organ.impact': 'Organ Impact',
    'analysis.manufacturer': 'Manufacturer',
    'analysis.safety.info': 'Important Safety Information',
    'analysis.follow.dosage': 'Always follow prescribed dosage instructions',
    'analysis.consult.conditions': 'Consult your doctor if you have liver or kidney conditions',
    'analysis.max.dose': 'Do not exceed maximum daily dose',
    'analysis.inform.doctor': 'Inform your healthcare provider about other medications',
    'analysis.potential.effects': 'Potential Effects',
    'analysis.advantages': 'Advantages',
    'analysis.consult.provider': 'Consult Your Healthcare Provider',
    'analysis.discuss.alternatives': 'Always discuss alternative medications with your doctor or pharmacist before making any changes to your treatment plan.',
    'analysis.understanding': 'Understanding',
    'analysis.how.works': 'How it works',
    'analysis.safe.usage': 'Safe usage guidelines',
    'analysis.take.prescribed': 'Take exactly as prescribed by your healthcare provider',
    'analysis.not.exceed': 'Do not exceed the recommended dose',
    'analysis.take.food': 'Take with food if stomach upset occurs',
    'analysis.stay.hydrated': 'Stay hydrated while using this medication',
    'analysis.complete.course': 'Complete the full course even if you feel better',
    'analysis.contact.doctor': 'When to contact your doctor',
    'analysis.severe.effects': 'If you experience severe side effects',
    'analysis.symptoms.worsen': 'If symptoms worsen or don\'t improve',
    'analysis.drug.interactions': 'If you have questions about drug interactions',
    'analysis.combining.medications': 'Before combining with other medications',
    'analysis.additional.resources': 'Additional Resources',
    
    // Common
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    
    // Risk levels
    'risk.safe': 'Safe',
    'risk.moderate': 'Moderate Risk',
    'risk.high': 'High Risk',
    'risk.critical': 'Critical Risk',
    
    // Disclaimer
    'disclaimer.title': 'Important Medical Disclaimer',
    'disclaimer.text': 'This tool provides educational information only and should not replace professional medical advice. Always consult with healthcare professionals before making changes to your medication regimen.'
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.history': 'ইতিহাস',
    'nav.profile': 'প্রোফাইল',
    'nav.logout': 'লগ আউট',
    'nav.login': 'লগ ইন',
    
    // Home page
    'home.title': 'আপনার ওষুধ জানুন, আপনার স্বাস্থ্য রক্ষা করুন',
    'home.subtitle': 'AI-চালিত অন্তর্দৃষ্টি দিয়ে ওষুধের নিরাপত্তা বিশ্লেষণ করুন, পার্শ্বপ্রতিক্রিয়া বুঝুন এবং নিরাপদ বিকল্প আবিষ্কার করুন',
    'home.scan': 'ওষুধ স্ক্যান করুন',
    'home.scan.desc': 'ওষুধের মোড়ক স্ক্যান করতে এবং তাৎক্ষণিক বিশ্লেষণ পেতে আপনার ক্যামেরা ব্যবহার করুন',
    'home.search': 'নাম দিয়ে খুঁজুন',
    'home.search.desc': 'ওষুধের নাম দিয়ে খোঁজ করে ওষুধের তথ্য খুঁজে পান',
    'home.upload': 'ছবি আপলোড করুন',
    'home.upload.desc': 'বিস্তারিত নিরাপত্তা বিশ্লেষণের জন্য আপনার ওষুধের ছবি আপলোড করুন',
    
    // Features
    'features.risk': 'ঝুঁকি মূল্যায়ন',
    'features.risk.desc': 'বিভিন্ন অঙ্গ সিস্টেমের জন্য বিস্তারিত ঝুঁকি বিশ্লেষণ পান',
    'features.organ': 'অঙ্গের প্রভাব',
    'features.organ.desc': 'হৃদয়, লিভার, কিডনি এবং আরও অনেক কিছুর উপর প্রভাব বুঝুন',
    'features.ai': 'AI-চালিত',
    'features.ai.desc': 'উন্নত AI ওষুধের ডেটা এবং চিকিৎসা গবেষণা বিশ্লেষণ করে',
    'features.easy': 'বুঝতে সহজ',
    'features.easy.desc': 'চিকিৎসা তথ্য সহজ, স্পষ্ট ভাষায় ব্যাখ্যা করা হয়েছে',
    
    // Authentication
    'auth.login': 'লগ ইন',
    'auth.register': 'সাইন আপ',
    'auth.email': 'ইমেইল',
    'auth.password': 'পাসওয়ার্ড',
    'auth.name': 'পূর্ণ নাম',
    'auth.language': 'পছন্দের ভাষা',
    'auth.login.button': 'সাইন ইন',
    'auth.register.button': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.switch.register': 'অ্যাকাউন্ট নেই? সাইন আপ করুন',
    'auth.switch.login': 'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন',
    
    // History
    'history.title': 'ওষুধের ইতিহাস',
    'history.empty': 'এখনও কোন ওষুধের ইতিহাস নেই',
    'history.empty.desc': 'আপনার ইতিহাস তৈরি করতে ওষুধ স্ক্যান বা খোঁজ করা শুরু করুন',
    'history.searched': 'খোঁজা হয়েছে',
    'history.scanned': 'স্ক্যান করা হয়েছে',
    'history.uploaded': 'আপলোড করা হয়েছে',
    
    // Voice
    'voice.listening': 'শুনছি...',
    'voice.transcript': 'ট্রান্সক্রিপ্ট',
    'voice.use': 'ব্যবহার করুন',
    'voice.speak': 'বলুন',
    'voice.speaking': 'বলছি...',
    'voice.search.placeholder': 'ওষুধের নাম বলুন...',
    
    // Search
    'search.placeholder': 'ওষুধের নাম দিয়ে খুঁজুন...',
    'search.results': 'খোঁজার ফলাফল',
    'search.no.results': 'আপনার খোঁজার সাথে মিলে এমন কোন ওষুধ পাওয়া যায়নি',
    'search.try.different': 'জেনেরিক নাম বা ব্র্যান্ড নাম দিয়ে খোঁজার চেষ্টা করুন',
    'search.popular': 'জনপ্রিয় খোঁজ',
    'search.recent': 'সাম্প্রতিক খোঁজ',
    
    // Analysis
    'analysis.overview': 'সংক্ষিপ্ত বিবরণ',
    'analysis.organs': 'অঙ্গের প্রভাব',
    'analysis.alternatives': 'বিকল্প',
    'analysis.education': 'আরও জানুন',
    'analysis.safety.score': 'নিরাপত্তা স্কোর',
    'analysis.based.on': 'ক্লিনিক্যাল ডেটা, পার্শ্বপ্রতিক্রিয়া এবং অঙ্গের প্রভাব বিশ্লেষণের উপর ভিত্তি করে',
    'analysis.safety.rating': 'নিরাপত্তা রেটিং',
    'analysis.organ.impact': 'অঙ্গের প্রভাব',
    'analysis.manufacturer': 'প্রস্তুতকারক',
    'analysis.safety.info': 'গুরুত্বপূর্ণ নিরাপত্তা তথ্য',
    'analysis.follow.dosage': 'সর্বদা নির্ধারিত ডোজ নির্দেশাবলী অনুসরণ করুন',
    'analysis.consult.conditions': 'যদি আপনার লিভার বা কিডনির সমস্যা থাকে তাহলে আপনার ডাক্তারের সাথে পরামর্শ করুন',
    'analysis.max.dose': 'সর্বোচ্চ দৈনিক ডোজ অতিক্রম করবেন না',
    'analysis.inform.doctor': 'অন্যান্য ওষুধ সম্পর্কে আপনার স্বাস্থ্যসেবা প্রদানকারীকে জানান',
    'analysis.potential.effects': 'সম্ভাব্য প্রভাব',
    'analysis.advantages': 'সুবিধা',
    'analysis.consult.provider': 'আপনার স্বাস্থ্যসেবা প্রদানকারীর সাথে পরামর্শ করুন',
    'analysis.discuss.alternatives': 'আপনার চিকিৎসা পরিকল্পনায় কোনো পরিবর্তন করার আগে সর্বদা আপনার ডাক্তার বা ফার্মাসিস্টের সাথে বিকল্প ওষুধ নিয়ে আলোচনা করুন।',
    'analysis.understanding': 'বোঝা',
    'analysis.how.works': 'এটি কিভাবে কাজ করে',
    'analysis.safe.usage': 'নিরাপদ ব্যবহারের নির্দেশিকা',
    'analysis.take.prescribed': 'আপনার স্বাস্থ্যসেবা প্রদানকারীর নির্দেশ অনুযায়ী ঠিক নিন',
    'analysis.not.exceed': 'প্রস্তাবিত ডোজ অতিক্রম করবেন না',
    'analysis.take.food': 'পেট খারাপ হলে খাবারের সাথে নিন',
    'analysis.stay.hydrated': 'এই ওষুধ ব্যবহার করার সময় হাইড্রেটেড থাকুন',
    'analysis.complete.course': 'ভাল বোধ করলেও পূর্ণ কোর্স সম্পূর্ণ করুন',
    'analysis.contact.doctor': 'কখন আপনার ডাক্তারের সাথে যোগাযোগ করবেন',
    'analysis.severe.effects': 'যদি আপনি গুরুতর পার্শ্বপ্রতিক্রিয়া অনুভব করেন',
    'analysis.symptoms.worsen': 'যদি লক্ষণগুলি খারাপ হয় বা উন্নতি না হয়',
    'analysis.drug.interactions': 'যদি ড্রাগ ইন্টারঅ্যাকশন সম্পর্কে আপনার প্রশ্ন থাকে',
    'analysis.combining.medications': 'অন্যান্য ওষুধের সাথে একত্রিত করার আগে',
    'analysis.additional.resources': 'অতিরিক্ত সম্পদ',
    
    // Common
    'common.back': 'ফিরে যান',
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'ত্রুটি',
    'common.success': 'সফল',
    'common.cancel': 'বাতিল',
    'common.save': 'সংরক্ষণ',
    'common.delete': 'মুছে ফেলুন',
    'common.edit': 'সম্পাদনা',
    
    // Risk levels
    'risk.safe': 'নিরাপদ',
    'risk.moderate': 'মাঝারি ঝুঁকি',
    'risk.high': 'উচ্চ ঝুঁকি',
    'risk.critical': 'গুরুতর ঝুঁকি',
    
    // Disclaimer
    'disclaimer.title': 'গুরুত্বপূর্ণ চিকিৎসা দাবিত্যাগ',
    'disclaimer.text': 'এই টুলটি শুধুমাত্র শিক্ষামূলক তথ্য প্রদান করে এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প হওয়া উচিত নয়। আপনার ওষুধের নিয়মে পরিবর্তন করার আগে সর্বদা স্বাস্থ্যসেবা পেশাদারদের সাথে পরামর্শ করুন।'
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.history': 'చరిత్ర',
    'nav.profile': 'ప్రొఫైల్',
    'nav.logout': 'లాగ్ అవుట్',
    'nav.login': 'లాగిన్',
    
    // Home page
    'home.title': 'మీ మందును తెలుసుకోండి, మీ ఆరోగ్యాన్ని రక్షించుకోండి',
    'home.subtitle': 'AI-శక్తితో కూడిన అంతర్దృష్టులతో మందుల భద్రతను విశ్లేషించండి, దుష్ప్రభావాలను అర్థం చేసుకోండి మరియు సురక్షితమైన ప్రత్యామ్నాయాలను కనుగొనండి',
    'home.scan': 'మందు స్కాన్ చేయండి',
    'home.scan.desc': 'మందుల రేపర్లను స్కాన్ చేయడానికి మరియు తక్షణ విశ్లేషణ పొందడానికి మీ కెమెరాను ఉపయోగించండి',
    'home.search': 'పేరుతో వెతకండి',
    'home.search.desc': 'మందు పేరుతో వెతకడం ద్వారా మందుల సమాచారాన్ని కనుగొనండి',
    'home.upload': 'ఫోటో అప్‌లోడ్ చేయండి',
    'home.upload.desc': 'వివరణాత్మక భద్రతా విశ్లేషణ కోసం మీ మందు ఫోటోను అప్‌లోడ్ చేయండి',
    
    // Voice
    'voice.listening': 'వింటున్నాను...',
    'voice.transcript': 'ట్రాన్స్‌క్రిప్ట్',
    'voice.use': 'ఉపయోగించండి',
    'voice.speak': 'మాట్లాడండి',
    'voice.speaking': 'మాట్లాడుతున్నాను...',
    'voice.search.placeholder': 'మందు పేరు చెప్పండి...',
    
    // Search
    'search.placeholder': 'మందు పేరుతో వెతకండి...',
    'search.results': 'వెతుకులాట ఫలితాలు',
    'search.no.results': 'మీ వెతుకులాటకు సరిపోలే మందులు కనుగొనబడలేదు',
    'search.try.different': 'జెనెరిక్ పేరు లేదా బ్రాండ్ పేరుతో వెతకడానికి ప్రయత్నించండి',
    'search.popular': 'ప్రసిద్ధ వెతుకులాట',
    'search.recent': 'ఇటీవలి వెతుకులాట',
    
    // Analysis
    'analysis.overview': 'అవలోకనం',
    'analysis.organs': 'అవయవ ప్రభావం',
    'analysis.alternatives': 'ప్రత్యామ్నాయాలు',
    'analysis.education': 'మరింత తెలుసుకోండి',
    'analysis.safety.score': 'భద్రతా స్కోర్',
    'analysis.based.on': 'క్లినికల్ డేటా, దుష్ప్రభావాలు మరియు అవయవ ప్రభావ విశ్లేషణ ఆధారంగా',
    'analysis.safety.rating': 'భద్రతా రేటింగ్',
    'analysis.organ.impact': 'అవయవ ప్రభావం',
    'analysis.manufacturer': 'తయారీదారు',
    'analysis.safety.info': 'ముఖ్యమైన భద్రతా సమాచారం',
    'analysis.follow.dosage': 'ఎల్లప్పుడూ నిర్దేశించిన మోతాదు సూచనలను అనుసరించండి',
    'analysis.consult.conditions': 'మీకు కాలేయం లేదా మూత్రపిండాల పరిస్థితులు ఉంటే మీ వైద్యుడిని సంప్రదించండి',
    'analysis.max.dose': 'గరిష్ట దైనిక మోతాదును మించవద్దు',
    'analysis.inform.doctor': 'ఇతర మందుల గురించి మీ ఆరోగ్య సేవా ప్రదాతకు తెలియజేయండి',
    'analysis.potential.effects': 'సంభావ్య ప్రభావాలు',
    'analysis.advantages': 'ప్రయోజనాలు',
    'analysis.consult.provider': 'మీ ఆరోగ్య సేవా ప్రదాతను సంప్రదించండి',
    'analysis.discuss.alternatives': 'మీ చికిత్సా ప్రణాళికలో ఏవైనా మార్పులు చేయడానికి ముందు ఎల్లప్పుడూ మీ వైద్యుడు లేదా ఫార్మసిస్ట్‌తో ప్రత్యామ్నాయ మందుల గురించి చర్చించండి।',
    'analysis.understanding': 'అర్థం చేసుకోవడం',
    'analysis.how.works': 'ఇది ఎలా పనిచేస్తుంది',
    'analysis.safe.usage': 'సురక్షిత వాడుక మార్గదర్శకాలు',
    'analysis.take.prescribed': 'మీ ఆరోగ్య సేవా ప్రదాత నిర్దేశించిన విధంగా సరిగ్గా తీసుకోండి',
    'analysis.not.exceed': 'సిఫార్సు చేయబడిన మోతాదును మించవద్దు',
    'analysis.take.food': 'కడుపు నొప్పి వస్తే ఆహారంతో తీసుకోండి',
    'analysis.stay.hydrated': 'ఈ మందు వాడుతున్నప్పుడు హైడ్రేటెడ్‌గా ఉండండి',
    'analysis.complete.course': 'మంచిగా అనిపించినా పూర్తి కోర్సు పూర్తి చేయండి',
    'analysis.contact.doctor': 'మీ వైద్యుడిని ఎప్పుడు సంప్రదించాలి',
    'analysis.severe.effects': 'మీరు తీవ్రమైన దుష్ప్రభావాలను అనుభవిస్తే',
    'analysis.symptoms.worsen': 'లక్షణాలు దిగజారితే లేదా మెరుగుపడకపోతే',
    'analysis.drug.interactions': 'డ్రగ్ ఇంటరాక్షన్‌ల గురించి మీకు ప్రశ్నలు ఉంటే',
    'analysis.combining.medications': 'ఇతర మందులతో కలపడానికి ముందు',
    'analysis.additional.resources': 'అదనపు వనరులు',
    
    // Common
    'common.back': 'వెనుకకు',
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',
    'common.cancel': 'రద్దు చేయండి',
    'common.save': 'సేవ్ చేయండి',
    'common.delete': 'తొలగించండి',
    'common.edit': 'సవరించండి',
    
    // Risk levels
    'risk.safe': 'సురక్షితం',
    'risk.moderate': 'మధ్యస్థ రిస్క్',
    'risk.high': 'అధిక రిస్క్',
    'risk.critical': 'క్రిటికల్ రిస్క్',
    
    // Disclaimer
    'disclaimer.title': 'ముఖ్యమైన వైద్య నిరాకరణ',
    'disclaimer.text': 'ఈ సాధనం కేవలం విద్యా సమాచారాన్ని మాత్రమే అందిస్తుంది మరియు వృత్తిపరమైన వైద్య సలహాను భర్తీ చేయకూడదు. మీ మందుల నియమావళిలో మార్పులు చేయడానికి ముందు ఎల్లప్పుడూ ఆరోగ్య నిపుణులను సంప్రదించండి।'
  },
  mr: {
    // Navigation
    'nav.home': 'होम',
    'nav.history': 'इतिहास',
    'nav.profile': 'प्रोफाइल',
    'nav.logout': 'लॉग आउट',
    'nav.login': 'लॉग इन',
    
    // Home page
    'home.title': 'तुमची औषधे जाणून घ्या, तुमच्या आरोग्याचे रक्षण करा',
    'home.subtitle': 'AI-चालित अंतर्दृष्टीसह औषधांच्या सुरक्षिततेचे विश्लेषण करा, दुष्परिणाम समजून घ्या आणि सुरक्षित पर्याय शोधा',
    'home.scan': 'औषध स्कॅन करा',
    'home.scan.desc': 'औषधांचे रॅपर स्कॅन करण्यासाठी आणि तत्काळ विश्लेषण मिळवण्यासाठी तुमचा कॅमेरा वापरा',
    'home.search': 'नावाने शोधा',
    'home.search.desc': 'औषधाच्या नावाने शोधून औषधांची माहिती मिळवा',
    'home.upload': 'फोटो अपलोड करा',
    'home.upload.desc': 'तपशीलवार सुरक्षा विश्लेषणासाठी तुमच्या औषधाचा फोटो अपलोड करा',
    
    // Voice
    'voice.listening': 'ऐकत आहे...',
    'voice.transcript': 'ट्रान्सक्रिप्ट',
    'voice.use': 'वापरा',
    'voice.speak': 'बोला',
    'voice.speaking': 'बोलत आहे...',
    'voice.search.placeholder': 'औषधाचे नाव सांगा...',
    
    // Search
    'search.placeholder': 'औषधाच्या नावाने शोधा...',
    'search.results': 'शोध परिणाम',
    'search.no.results': 'तुमच्या शोधाशी जुळणारी कोणतीही औषधे सापडली नाहीत',
    'search.try.different': 'जेनेरिक नाव किंवा ब्रँड नावाने शोधण्याचा प्रयत्न करा',
    'search.popular': 'लोकप्रिय शोध',
    'search.recent': 'अलीकडील शोध',
    
    // Analysis
    'analysis.overview': 'विहंगावलोकन',
    'analysis.organs': 'अवयव प्रभाव',
    'analysis.alternatives': 'पर्याय',
    'analysis.education': 'अधिक जाणून घ्या',
    'analysis.safety.score': 'सुरक्षा स्कोअर',
    'analysis.based.on': 'क्लिनिकल डेटा, दुष्परिणाम आणि अवयव प्रभाव विश्लेषणावर आधारित',
    'analysis.safety.rating': 'सुरक्षा रेटिंग',
    'analysis.organ.impact': 'अवयव प्रभाव',
    'analysis.manufacturer': 'निर्माता',
    'analysis.safety.info': 'महत्त्वाची सुरक्षा माहिती',
    'analysis.follow.dosage': 'नेहमी निर्धारित डोस सूचनांचे पालन करा',
    'analysis.consult.conditions': 'तुम्हाला यकृत किंवा मूत्रपिंडाच्या समस्या असल्यास तुमच्या डॉक्टरांशी सल्लामसलत करा',
    'analysis.max.dose': 'कमाल दैनिक डोस ओलांडू नका',
    'analysis.inform.doctor': 'इतर औषधांबद्दल तुमच्या आरोग्य सेवा प्रदात्याला कळवा',
    'analysis.potential.effects': 'संभाव्य परिणाम',
    'analysis.advantages': 'फायदे',
    'analysis.consult.provider': 'तुमच्या आरोग्य सेवा प्रदात्याशी सल्लामसलत करा',
    'analysis.discuss.alternatives': 'तुमच्या उपचार योजनेत कोणतेही बदल करण्यापूर्वी नेहमी तुमच्या डॉक्टर किंवा फार्मासिस्टशी पर्यायी औषधांबद्दल चर्चा करा।',
    'analysis.understanding': 'समजून घेणे',
    'analysis.how.works': 'हे कसे कार्य करते',
    'analysis.safe.usage': 'सुरक्षित वापराची मार्गदर्शक तत्त्वे',
    'analysis.take.prescribed': 'तुमच्या आरोग्य सेवा प्रदात्याने सांगितल्याप्रमाणे नेमके घ्या',
    'analysis.not.exceed': 'शिफारस केलेला डोस ओलांडू नका',
    'analysis.take.food': 'पोट खराब झाल्यास अन्नासोबत घ्या',
    'analysis.stay.hydrated': 'ही औषध वापरताना हायड्रेटेड राहा',
    'analysis.complete.course': 'बरे वाटले तरी संपूर्ण कोर्स पूर्ण करा',
    'analysis.contact.doctor': 'तुमच्या डॉक्टरांशी कधी संपर्क साधावा',
    'analysis.severe.effects': 'तुम्हाला गंभीर दुष्परिणाम जाणवल्यास',
    'analysis.symptoms.worsen': 'लक्षणे बिघडली किंवा सुधारली नाहीत तर',
    'analysis.drug.interactions': 'ड्रग इंटरॅक्शनबद्दल तुमचे प्रश्न असल्यास',
    'analysis.combining.medications': 'इतर औषधांसोबत एकत्र करण्यापूर्वी',
    'analysis.additional.resources': 'अतिरिक्त संसाधने',
    
    // Common
    'common.back': 'परत',
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यश',
    'common.cancel': 'रद्द करा',
    'common.save': 'जतन करा',
    'common.delete': 'हटवा',
    'common.edit': 'संपादित करा',
    
    // Risk levels
    'risk.safe': 'सुरक्षित',
    'risk.moderate': 'मध्यम जोखीम',
    'risk.high': 'उच्च जोखीम',
    'risk.critical': 'गंभीर जोखीम',
    
    // Disclaimer
    'disclaimer.title': 'महत्त्वाचा वैद्यकीय अस्वीकरण',
    'disclaimer.text': 'हे साधन केवळ शैक्षणिक माहिती प्रदान करते आणि व्यावसायिक वैद्यकीय सल्ल्याची जागा घेऊ नये. तुमच्या औषधांच्या नियमात बदल करण्यापूर्वी नेहमी आरोग्य व्यावसायिकांशी सल्लामसलत करा.'
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.history': 'வரலாறு',
    'nav.profile': 'சுயவிவரம்',
    'nav.logout': 'வெளியேறு',
    'nav.login': 'உள்நுழை',
    
    // Home page
    'home.title': 'உங்கள் மருந்தை அறியுங்கள், உங்கள் ஆரோக்கியத்தைப் பாதுகாக்கவும்',
    'home.subtitle': 'AI-இயங்கும் நுண்ணறிவுகளுடன் மருந்து பாதுகாப்பை பகுப்பாய்வு செய்யுங்கள், பக்க விளைவுகளைப் புரிந்துகொள்ளுங்கள் மற்றும் பாதுகாப்பான மாற்றுகளைக் கண்டறியுங்கள்',
    'home.scan': 'மருந்தை ஸ்கேன் செய்யுங்கள்',
    'home.scan.desc': 'மருந்து ரேப்பர்களை ஸ்கேன் செய்ய மற்றும் உடனடி பகுப்பாய்வு பெற உங்கள் கேமராவைப் பயன்படுத்துங்கள்',
    'home.search': 'பெயரால் தேடுங்கள்',
    'home.search.desc': 'மருந்தின் பெயரால் தேடி மருந்து தகவலைக் கண்டறியுங்கள்',
    'home.upload': 'புகைப்படம் பதிவேற்றுங்கள்',
    'home.upload.desc': 'விரிவான பாதுகாப்பு பகுப்பாய்விற்காக உங்கள் மருந்தின் புகைப்படத்தைப் பதிவேற்றுங்கள்',
    
    // Voice
    'voice.listening': 'கேட்கிறேன்...',
    'voice.transcript': 'டிரான்ஸ்கிரிப்ட்',
    'voice.use': 'பயன்படுத்து',
    'voice.speak': 'பேசு',
    'voice.speaking': 'பேசுகிறேன்...',
    'voice.search.placeholder': 'மருந்தின் பெயரைச் சொல்லுங்கள்...',
    
    // Search
    'search.placeholder': 'மருந்தின் பெயரால் தேடுங்கள்...',
    'search.results': 'தேடல் முடிவுகள்',
    'search.no.results': 'உங்கள் தேடலுக்கு பொருந்தும் மருந்துகள் எதுவும் கிடைக்கவில்லை',
    'search.try.different': 'ஜெனெரிக் பெயர் அல்லது பிராண்ட் பெயரால் தேட முயற்சிக்கவும்',
    'search.popular': 'பிரபலமான தேடல்கள்',
    'search.recent': 'சமீபத்திய தேடல்கள்',
    
    // Analysis
    'analysis.overview': 'கண்ணோட்டம்',
    'analysis.organs': 'உறுப்பு தாக்கம்',
    'analysis.alternatives': 'மாற்றுகள்',
    'analysis.education': 'மேலும் அறிக',
    'analysis.safety.score': 'பாதுகாப்பு மதிப்பெண்',
    'analysis.based.on': 'மருத்துவ தரவு, பக்க விளைவுகள் மற்றும் உறுப்பு தாக்க பகுப்பாய்வின் அடிப்படையில்',
    'analysis.safety.rating': 'பாதுகாப்பு மதிப்பீடு',
    'analysis.organ.impact': 'உறுப்பு தாக்கம்',
    'analysis.manufacturer': 'உற்பத்தியாளர்',
    'analysis.safety.info': 'முக்கியமான பாதுகாப்பு தகவல்',
    'analysis.follow.dosage': 'எப்போதும் பரிந்துரைக்கப்பட்ட மருந்தளவு வழிமுறைகளைப் பின்பற்றவும்',
    'analysis.consult.conditions': 'உங்களுக்கு கல்லீரல் அல்லது சிறுநீரக நிலைமைகள் இருந்தால் உங்கள் மருத்துவரை அணுகவும்',
    'analysis.max.dose': 'அதிகபட்ச தினசரி மருந்தளவை மீற வேண்டாம்',
    'analysis.inform.doctor': 'மற்ற மருந்துகளைப் பற்றி உங்கள் சுகாதார வழங்குநரிடம் தெரிவிக்கவும்',
    'analysis.potential.effects': 'சாத்தியமான விளைவுகள்',
    'analysis.advantages': 'நன்மைகள்',
    'analysis.consult.provider': 'உங்கள் சுகாதார வழங்குநரை அணுகவும்',
    'analysis.discuss.alternatives': 'உங்கள் சிகிச்சை திட்டத்தில் ஏதேனும் மாற்றங்களைச் செய்வதற்கு முன் எப்போதும் உங்கள் மருத்துவர் அல்லது மருந்தாளருடன் மாற்று மருந்துகளைப் பற்றி விவாதிக்கவும்।',
    'analysis.understanding': 'புரிந்துகொள்ளுதல்',
    'analysis.how.works': 'இது எவ்வாறு செயல்படுகிறது',
    'analysis.safe.usage': 'பாதுகாப்பான பயன்பாட்டு வழிகாட்டுதல்கள்',
    'analysis.take.prescribed': 'உங்கள் சுகாதார வழங்குநர் பரிந்துரைத்தபடி சரியாக எடுத்துக்கொள்ளுங்கள்',
    'analysis.not.exceed': 'பரிந்துரைக்கப்பட்ட மருந்தளவை மீற வேண்டாம்',
    'analysis.take.food': 'வயிற்று வலி ஏற்பட்டால் உணவுடன் எடுத்துக்கொள்ளுங்கள்',
    'analysis.stay.hydrated': 'இந்த மருந்தைப் பயன்படுத்தும்போது நீரேற்றமாக இருங்கள்',
    'analysis.complete.course': 'நன்றாக உணர்ந்தாலும் முழு கோர்ஸையும் முடிக்கவும்',
    'analysis.contact.doctor': 'உங்கள் மருத்துவரை எப்போது தொடர்பு கொள்ள வேண்டும்',
    'analysis.severe.effects': 'நீங்கள் கடுமையான பக்க விளைவுகளை அனுபவித்தால்',
    'analysis.symptoms.worsen': 'அறிகுறிகள் மோசமடைந்தால் அல்லது மேம்படவில்லை என்றால்',
    'analysis.drug.interactions': 'மருந்து தொடர்புகளைப் பற்றி உங்களுக்கு கேள்விகள் இருந்தால்',
    'analysis.combining.medications': 'மற்ற மருந்துகளுடன் இணைப்பதற்கு முன்',
    'analysis.additional.resources': 'கூடுதல் வளங்கள்',
    
    // Common
    'common.back': 'பின்னால்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமி',
    'common.delete': 'நீக்கு',
    'common.edit': 'திருத்து',
    
    // Risk levels
    'risk.safe': 'பாதுகாப்பானது',
    'risk.moderate': 'மிதமான ஆபத்து',
    'risk.high': 'அதிக ஆபத்து',
    'risk.critical': 'முக்கியமான ஆபத்து',
    
    // Disclaimer
    'disclaimer.title': 'முக்கியமான மருத்துவ மறுப்பு',
    'disclaimer.text': 'இந்த கருவி கல்வி தகவலை மட்டுமே வழங்குகிறது மற்றும் தொழில்முறை மருத்துவ ஆலோசனையை மாற்றக்கூடாது. உங்கள் மருந்து முறையில் மாற்றங்களைச் செய்வதற்கு முன் எப்போதும் சுகாதார நிபுணர்களுடன் ஆலோசிக்கவும்.'
  },
  gu: {
    // Navigation
    'nav.home': 'હોમ',
    'nav.history': 'ઇતિહાસ',
    'nav.profile': 'પ્રોફાઇલ',
    'nav.logout': 'લૉગ આઉટ',
    'nav.login': 'લૉગ ઇન',
    
    // Home page
    'home.title': 'તમારી દવા જાણો, તમારા સ્વાસ્થ્યનું રક્ષણ કરો',
    'home.subtitle': 'AI-સંચાલિત અંતર્દૃષ્ટિ સાથે દવાની સુરક્ષાનું વિશ્લેષણ કરો, આડઅસરો સમજો અને સુરક્ષિત વિકલ્પો શોધો',
    'home.scan': 'દવા સ્કેન કરો',
    'home.scan.desc': 'દવાના રેપર્સ સ્કેન કરવા અને તાત્કાલિક વિશ્લેષણ મેળવવા માટે તમારા કેમેરાનો ઉપયોગ કરો',
    'home.search': 'નામથી શોધો',
    'home.search.desc': 'દવાના નામથી શોધીને દવાની માહિતી મેળવો',
    'home.upload': 'ફોટો અપલોડ કરો',
    'home.upload.desc': 'વિગતવાર સુરક્ષા વિશ્લેષણ માટે તમારી દવાનો ફોટો અપલોડ કરો',
    
    // Voice
    'voice.listening': 'સાંભળી રહ્યું છું...',
    'voice.transcript': 'ટ્રાન્સક્રિપ્ટ',
    'voice.use': 'ઉપયોગ કરો',
    'voice.speak': 'બોલો',
    'voice.speaking': 'બોલી રહ્યું છું...',
    'voice.search.placeholder': 'દવાનું નામ કહો...',
    
    // Search
    'search.placeholder': 'દવાના નામથી શોધો...',
    'search.results': 'શોધ પરિણામો',
    'search.no.results': 'તમારી શોધ સાથે મેળ ખાતી કોઈ દવાઓ મળી નથી',
    'search.try.different': 'જેનેરિક નામ અથવા બ્રાન્ડ નામથી શોધવાનો પ્રયાસ કરો',
    'search.popular': 'લોકપ્રિય શોધ',
    'search.recent': 'તાજેતરની શોધ',
    
    // Analysis
    'analysis.overview': 'વિહંગાવલોકન',
    'analysis.organs': 'અંગ પ્રભાવ',
    'analysis.alternatives': 'વિકલ્પો',
    'analysis.education': 'વધુ જાણો',
    'analysis.safety.score': 'સુરક્ષા સ્કોર',
    'analysis.based.on': 'ક્લિનિકલ ડેટા, આડઅસરો અને અંગ પ્રભાવ વિશ્લેષણના આધારે',
    'analysis.safety.rating': 'સુરક્ષા રેટિંગ',
    'analysis.organ.impact': 'અંગ પ્રભાવ',
    'analysis.manufacturer': 'ઉત્પાદક',
    'analysis.safety.info': 'મહત્વપૂર્ણ સુરક્ષા માહિતી',
    'analysis.follow.dosage': 'હંમેશા નિર્ધારિત ડોઝ સૂચનાઓનું પાલન કરો',
    'analysis.consult.conditions': 'જો તમને લીવર અથવા કિડનીની સ્થિતિ હોય તો તમારા ડૉક્ટરની સલાહ લો',
    'analysis.max.dose': 'મહત્તમ દૈનિક ડોઝ ઓળંગશો નહીં',
    'analysis.inform.doctor': 'અન્ય દવાઓ વિશે તમારા આરોગ્ય સેવા પ્રદાતાને જણાવો',
    'analysis.potential.effects': 'સંભવિત અસરો',
    'analysis.advantages': 'ફાયદા',
    'analysis.consult.provider': 'તમારા આરોગ્ય સેવા પ્રદાતાની સલાહ લો',
    'analysis.discuss.alternatives': 'તમારી સારવાર યોજનામાં કોઈપણ ફેરફાર કરતા પહેલા હંમેશા તમારા ડૉક્ટર અથવા ફાર્માસિસ્ટ સાથે વૈકલ્પિક દવાઓ વિશે ચર્ચા કરો।',
    'analysis.understanding': 'સમજવું',
    'analysis.how.works': 'તે કેવી રીતે કામ કરે છે',
    'analysis.safe.usage': 'સુરક્ષિત ઉપયોગ માર્ગદર્શિકા',
    'analysis.take.prescribed': 'તમારા આરોગ્ય સેવા પ્રદાતા દ્વારા નિર્ધારિત મુજબ બરાબર લો',
    'analysis.not.exceed': 'ભલામણ કરેલ ડોઝ ઓળંગશો નહીં',
    'analysis.take.food': 'પેટ ખરાબ થાય તો ખોરાક સાથે લો',
    'analysis.stay.hydrated': 'આ દવા વાપરતી વખતે હાઇડ્રેટેડ રહો',
    'analysis.complete.course': 'સારું લાગે તો પણ સંપૂર્ણ કોર્સ પૂરો કરો',
    'analysis.contact.doctor': 'તમારા ડૉક્ટરનો ક્યારે સંપર્ક કરવો',
    'analysis.severe.effects': 'જો તમે ગંભીર આડઅસરો અનુભવો છો',
    'analysis.symptoms.worsen': 'જો લક્ષણો બગડે અથવા સુધારો ન થાય',
    'analysis.drug.interactions': 'જો તમને ડ્રગ ઇન્ટરેક્શન વિશે પ્રશ્નો હોય',
    'analysis.combining.medications': 'અન્ય દવાઓ સાથે જોડતા પહેલા',
    'analysis.additional.resources': 'વધારાના સંસાધનો',
    
    // Common
    'common.back': 'પાછળ',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
    'common.error': 'ભૂલ',
    'common.success': 'સફળતા',
    'common.cancel': 'રદ કરો',
    'common.save': 'સેવ કરો',
    'common.delete': 'ડિલીટ કરો',
    'common.edit': 'એડિટ કરો',
    
    // Risk levels
    'risk.safe': 'સુરક્ષિત',
    'risk.moderate': 'મધ્યમ જોખમ',
    'risk.high': 'ઉચ્ચ જોખમ',
    'risk.critical': 'ગંભીર જોખમ',
    
    // Disclaimer
    'disclaimer.title': 'મહત્વપૂર્ણ તબીબી અસ્વીકરણ',
    'disclaimer.text': 'આ સાધન માત્ર શૈક્ષણિક માહિતી પ્રદાન કરે છે અને વ્યાવસાયિક તબીબી સલાહનો વિકલ્પ ન હોવો જોઈએ. તમારી દવાની દિનચર્યામાં ફેરફાર કરતા પહેલા હંમેશા આરોગ્ય વ્યાવસાયિકોની સલાહ લો.'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>('hi'); // Default to Hindi

  useEffect(() => {
    const storedLanguage = localStorage.getItem('medisafe_language');
    if (storedLanguage && translations[storedLanguage as keyof typeof translations]) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    if (translations[lang as keyof typeof translations]) {
      setLanguageState(lang);
      localStorage.setItem('medisafe_language', lang);
    }
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations];
    if (!currentTranslations) {
      return key;
    }
    
    const translation = currentTranslations[key as keyof typeof currentTranslations];
    return translation || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};