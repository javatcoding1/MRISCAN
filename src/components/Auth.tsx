import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Divider } from "@nextui-org/react";
import { Mail, Lock, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, loading, error, initialize, initialized } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password);
    }
  };

  if (!initialized) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse">Initializing security...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <Card className="p-8 bg-white/90 backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <Fingerprint className="w-12 h-12 text-primary-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            isRequired
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startContent={<Lock className="w-4 h-4 text-gray-400" />}
            isRequired
          />

          <Button
            type="submit"
            className="w-full bg-primary-600 text-white"
            size="lg"
            isLoading={loading}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <Divider className="my-6" />

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-primary-600 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </Card>
    </motion.div>
  );
}