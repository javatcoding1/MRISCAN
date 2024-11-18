import React from 'react';
import { motion } from 'framer-motion';
import { Card, Divider } from "@nextui-org/react";
import { FileText, Users, Code2, Shield } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Documentation() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Documentation</h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about using NeuroScan AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Getting Started</h3>
                  <p className="mt-2 text-gray-600">
                    Learn how to upload and analyze your first MRI scan using our platform.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li>• Supported file formats: DICOM, JPEG, PNG</li>
                    <li>• Maximum file size: 50MB</li>
                    <li>• Recommended resolution: 512x512 pixels</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-start">
                <Users className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Team</h3>
                  <p className="mt-2 text-gray-600">
                    Meet the brilliant minds behind NeuroScan AI.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>• Jayanth - AI Model Architecture</p>
                    <p>• Vijay - Frontend Development</p>
                    <p>• Karthik - Backend Infrastructure</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-start">
                <Code2 className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">API Integration</h3>
                  <p className="mt-2 text-gray-600">
                    Integrate our AI model into your healthcare system.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>• RESTful API endpoints</p>
                    <p>• WebSocket support for real-time analysis</p>
                    <p>• Comprehensive API documentation</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Security & Compliance</h3>
                  <p className="mt-2 text-gray-600">
                    Understanding our security measures and compliance standards.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>• HIPAA compliance</p>
                    <p>• End-to-end encryption</p>
                    <p>• Data retention policies</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}