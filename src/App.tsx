/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RoutingProvider, useRouting } from './context/RoutingContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Modular Page Imports
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Rooms } from './pages/Rooms';
import { Dining } from './pages/Dining';
import { Amenities } from './pages/Amenities';
import { Location } from './pages/Location';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

const PageRenderer: React.FC = () => {
  const { page } = useRouting();

  // Robust path matching extracting base path without search params
  const basePath = page.split('?')[0];

  switch (basePath) {
    case '/':
      return <Home />;
    case '/about':
      return <About />;
    case '/rooms':
      return <Rooms />;
    case '/dining':
      return <Dining />;
    case '/amenities':
      return <Amenities />;
    case '/location':
      return <Location />;
    case '/reviews':
      return <Reviews />;
    case '/contact':
      return <Contact />;
    case '/admin':
      return <Admin />;
    default:
      return <Home />;
  }
};

export default function App() {
  return (
    <RoutingProvider>
      <div className="flex flex-col min-h-screen bg-stone-950 font-sans selection:bg-amber-500 selection:text-white">
        {/* Multilingual Header */}
        <Header />

        {/* Dynamic Main Body Content */}
        <main className="flex-grow">
          <PageRenderer />
        </main>

        {/* Informative Footer & Schema injection */}
        <Footer />

        {/* Sticky Pulsing Contact Trigger */}
        <WhatsAppButton />
      </div>
    </RoutingProvider>
  );
}
