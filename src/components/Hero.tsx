import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react";
import { Brain, Activity, Shield } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-primary-900 py-16">
      <div className="absolute inset-0">
        <ParticlesBackground />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Advanced AI-Powered</span>
            <span className="block text-primary-300">MRI Tumor Detection</span>
          </motion.h1>
          <motion.p 
            className="mt-3 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Harness the power of artificial intelligence for quick, accurate, and reliable tumor detection in MRI scans.
          </motion.p>
          <motion.div 
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-white text-primary-900 font-semibold hover:bg-primary-50 transition-all"
              endContent={<Activity className="w-5 h-5" />}
            >
              Start Scanning
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center">
              <Brain className="h-12 w-12 text-primary-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Advanced AI Model</h3>
            <p className="mt-2 text-base text-primary-100">
              State-of-the-art deep learning model trained on thousands of MRI scans
            </p>
          </motion.div>

          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center">
              <Activity className="h-12 w-12 text-primary-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Real-time Analysis</h3>
            <p className="mt-2 text-base text-primary-100">
              Get instant results with our high-performance processing system
            </p>
          </motion.div>

          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-primary-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">HIPAA Compliant</h3>
            <p className="mt-2 text-base text-primary-100">
              Secure, encrypted, and compliant with healthcare data regulations
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}