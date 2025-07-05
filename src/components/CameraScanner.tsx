import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Zap, CheckCircle, Loader, AlertCircle } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
  overallScore: number;
}

interface CameraScannerProps {
  onMedicineFound: (medicine: Medicine) => void;
  onBack: () => void;
}

function CameraScanner({ onMedicineFound, onBack }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const simulateScanning = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate OCR processing
    setTimeout(() => {
      setScanResult('PARACETAMOL 500mg - Detected from wrapper');
      setIsScanning(false);
      
      // Simulate medicine identification and analysis
      setTimeout(() => {
        const mockMedicine: Medicine = {
          id: '1',
          name: 'Paracetamol',
          genericName: 'Acetaminophen',
          manufacturer: 'Generic Pharma Ltd.',
          riskLevel: 'moderate',
          overallScore: 7.2
        };
        onMedicineFound(mockMedicine);
      }, 1500);
    }, 3000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-semibold mb-2">Camera Access Required</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Camera className="w-6 h-6 text-white" />
          <h1 className="text-white font-semibold text-sm sm:text-base">Scan Medicine</h1>
        </div>
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Camera View */}
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-[70vh] object-cover"
        />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Scanning Frame */}
          <div className="relative mb-6 sm:mb-8">
            <div className="w-72 sm:w-80 h-40 sm:h-48 border-2 border-dashed border-white/50 rounded-2xl relative overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-2xl"></div>
              
              {/* Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0">
                  <div className="h-full w-1 bg-blue-400 animate-pulse" style={{
                    animation: 'scan 2s linear infinite'
                  }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Status Messages */}
          <div className="text-center mb-6 sm:mb-8 px-4">
            {!isScanning && !scanResult && (
              <>
                <p className="text-white text-base sm:text-lg mb-2 font-medium">
                  Position medicine wrapper within frame
                </p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Ensure text is clear and well-lit for best results
                </p>
              </>
            )}
            
            {isScanning && (
              <div className="flex items-center space-x-3">
                <Loader className="w-6 h-6 text-blue-400 animate-spin" />
                <p className="text-white text-base sm:text-lg">Scanning and analyzing...</p>
              </div>
            )}

            {scanResult && (
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <p className="text-green-400 text-base sm:text-lg">{scanResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 sm:p-6">
        <div className="flex justify-center">
          <button
            onClick={simulateScanning}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 sm:p-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {isScanning ? (
              <Loader className="w-6 sm:w-8 h-6 sm:h-8 animate-spin" />
            ) : (
              <Zap className="w-6 sm:w-8 h-6 sm:h-8" />
            )}
          </button>
        </div>
        <p className="text-center text-white/80 text-xs sm:text-sm mt-2 sm:mt-3">
          Tap to scan medicine wrapper
        </p>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(0); }
          100% { transform: translateX(288px); }
        }
        @media (min-width: 640px) {
          @keyframes scan {
            0% { transform: translateX(0); }
            100% { transform: translateX(320px); }
          }
        }
      `}</style>
    </div>
  );
}

export default CameraScanner;