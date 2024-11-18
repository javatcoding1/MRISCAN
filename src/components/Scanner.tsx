import React, { useState } from 'react';
import { Card, Button, Progress } from "@nextui-org/react";
import { useDropzone } from 'react-dropzone';
import { Upload, ScanSearch, AlertCircle, CheckCircle2 } from 'lucide-react';

const API_URL = 'http://localhost:3000/api';

export default function Scanner() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { probability: number; detected: boolean }>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.dicom']
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const analyzeScan = async () => {
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('scan', file);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult({
        probability: data.analysis.probability,
        detected: data.analysis.detected
      });
    } catch (err) {
      setError('Failed to analyze scan. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="p-6 bg-white/90 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">MRI Scan Analysis</h2>
            <p className="text-gray-600">
              Upload an MRI scan to detect potential tumors using our advanced AI model.
            </p>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Drag & drop your MRI scan here, or click to select</p>
              <p className="text-sm text-gray-400 mt-2">Supports JPEG, PNG, and DICOM formats (max 50MB)</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {file && !analyzing && !result && (
              <Button
                className="w-full bg-primary-600 text-white"
                size="lg"
                onClick={analyzeScan}
              >
                <ScanSearch className="w-5 h-5 mr-2" />
                Analyze Scan
              </Button>
            )}

            {analyzing && (
              <div className="space-y-2">
                <Progress
                  size="sm"
                  isIndeterminate
                  aria-label="Analyzing..."
                  className="max-w-full"
                />
                <p className="text-center text-sm text-gray-600">Analyzing your scan...</p>
              </div>
            )}

            {result && (
              <div className={`p-4 rounded-lg ${result.detected ? 'bg-red-50' : 'bg-green-50'}`}>
                {result.detected ? (
                  <div className="flex items-center text-red-700">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>Anomaly detected ({(result.probability * 100).toFixed(1)}% confidence)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-700">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span>No anomalies detected</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="MRI Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full min-h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
                  alt="Sample MRI"
                  className="w-full h-full object-cover rounded-lg opacity-50"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}