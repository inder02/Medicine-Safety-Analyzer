import React, { useState, useRef } from 'react';
import { Upload, ArrowLeft, Image, X, CheckCircle, AlertCircle } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
  overallScore: number;
}

interface UploadPhotoProps {
  onMedicineFound: (medicine: Medicine) => void;
  onBack: () => void;
}

function UploadPhoto({ onMedicineFound, onBack }: UploadPhotoProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        processImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    setIsProcessing(true);
    
    // Simulate AI processing steps
    const steps = [
      'Analyzing image quality...',
      'Detecting medicine wrapper...',
      'Extracting text with OCR...',
      'Identifying medicine...',
      'Fetching safety data...',
      'Generating analysis...'
    ];

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setProcessingStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(stepInterval);
        setProcessingStep('Analysis complete!');
        
        setTimeout(() => {
          const mockMedicine: Medicine = {
            id: '3',
            name: 'Aspirin',
            genericName: 'Acetylsalicylic acid',
            manufacturer: 'Heart Care Ltd.',
            riskLevel: 'moderate',
            overallScore: 7.8
          };
          onMedicineFound(mockMedicine);
        }, 1000);
      }
    }, 800);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    setProcessingStep('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Upload Photo</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {!uploadedImage ? (
          // Upload Area
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragOver
                ? 'border-purple-400 bg-purple-50'
                : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-6">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Upload Medicine Photo
              </h2>
              <p className="text-gray-600 mb-6">
                Drag and drop your medicine photo here, or click to browse
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Choose Photo
            </button>

            <div className="mt-8 text-sm text-gray-500">
              <p className="mb-2">Supported formats: JPG, PNG, WEBP</p>
              <p>For best results, ensure the medicine wrapper or label is clearly visible</p>
            </div>
          </div>
        ) : (
          // Processing Area
          <div className="space-y-6">
            {/* Uploaded Image */}
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded medicine"
                className="w-full max-h-96 object-contain bg-gray-50 rounded-2xl"
              />
              {!isProcessing && (
                <button
                  onClick={clearImage}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="mb-4">
                    {processingStep === 'Analysis complete!' ? (
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    ) : (
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {processingStep === 'Analysis complete!' ? 'Processing Complete!' : 'Processing Image...'}
                  </h3>
                  <p className="text-purple-600 font-medium">{processingStep}</p>
                  
                  {processingStep !== 'Analysis complete!' && (
                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500" 
                           style={{ width: `${(processingStep.length / 6) * 100}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Photo Tips for Better Results</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Ensure good lighting and clear text visibility</li>
                    <li>• Include the full medicine wrapper or bottle label</li>
                    <li>• Avoid shadows or reflections on the text</li>
                    <li>• Hold the camera steady to prevent blur</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPhoto;