import React, { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import Documentation from './components/Documentation';
import Auth from './components/Auth';
import useAuthStore from './store/authStore';

function App() {
  const { token, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <section id="hero">
            <Hero />
          </section>
          <section id="scanner" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-900 to-gray-50">
            {token ? <Scanner /> : <Auth />}
          </section>
          <section id="documentation">
            <Documentation />
          </section>
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App