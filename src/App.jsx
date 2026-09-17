import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import Hero from './components/Hero'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import Pricing from './components/Pricing'
import TemplateGallery from './components/TemplateGallery'
import Comparison from './components/Comparison'
import Features from './components/Features'
import BilingualSupport from './components/BilingualSupport'
import CustomerTestimonials from './components/CustomerTestimonials'
import OrderForm from './components/OrderForm'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import InvitationPage from './pages/InvitationPage'
import HostDashboard from './components/dashboard/HostDashboard'

function LandingPage() {
  return (
    <div className="min-h-screen bg-luxury-obsidian">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -right-64 w-96 h-96 bg-luxury-gold-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 -left-64 w-80 h-80 bg-luxury-burgundy-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Skip to content */}
      <a
        href="#main-content"
        className="fixed top-0 left-0 z-50 px-6 py-3 bg-luxury-gold-500 text-luxury-obsidian font-semibold transition-all duration-300 -translate-y-full focus:translate-y-0 rounded-br-2xl"
      >
        انتقل إلى المحتوى الرئيسي
      </a>

      <main id="main-content" className="relative z-10">
        <Hero />
        <TestimonialsCarousel />
        <Pricing />
        <TemplateGallery />
        <Comparison />
        <Features />
        <BilingualSupport />
        <CustomerTestimonials />
        <OrderForm />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/i/:slug" element={<InvitationPage />} />
          <Route path="/dashboard/:invitationId" element={<HostDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
