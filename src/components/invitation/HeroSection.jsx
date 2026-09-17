import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Heart } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const HeroSection = ({ invitation, onScrollToRSVP }) => {
  const { t, language } = useLanguage()
  const { couple, date } = invitation

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', options)
  }

  const getInitials = () => {
    const groomInitial = couple.groomName?.charAt(0) || 'A'
    const brideInitial = couple.brideName?.charAt(0) || 'F'
    return `${groomInitial}&${brideInitial}`
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/wedding-venue.jpg)',
          filter: 'blur(2px)'
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(201, 162, 39, 0.1)' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(248, 187, 217, 0.1)' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Wedding day label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <p 
            className="text-sm tracking-widest uppercase font-light"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#8b7355',
              letterSpacing: '0.3em'
            }}
          >
            {language === 'ar' ? 'يوم الزفاف' : 'WEDDING DAY'}
          </p>
        </motion.div>

        {/* Names with script font */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4"
            style={{
              fontFamily: '"Alex Brush", cursive',
              color: '#4a4a4a',
              lineHeight: '1.2'
            }}
          >
            {language === 'ar' ? (
              <>
                {couple.groomName}
                <span className="mx-4" style={{ color: '#c9a227' }}>&</span>
                {couple.brideName}
              </>
            ) : (
              <>
                {couple.groomNameFr}
                <span className="mx-4" style={{ color: '#c9a227' }}>&</span>
                {couple.brideNameFr}
              </>
            )}
          </h1>
          
          {/* Decorative heart */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mt-4"
          >
            <Heart 
              className="w-6 h-6 mx-auto"
              style={{ 
                color: '#c9a227',
                fill: '#c9a227'
              }} 
            />
          </motion.div>
        </motion.div>

        {/* Date with decorative divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mb-8"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16" style={{ backgroundColor: 'rgba(201, 162, 39, 0.4)' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c9a227' }} />
            <div className="h-px w-16" style={{ backgroundColor: 'rgba(201, 162, 39, 0.4)' }} />
          </div>
          
          <p 
            className="text-lg sm:text-xl tracking-wider font-medium"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a',
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}
          >
            {formatDate(date)}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base sm:text-lg mb-12 max-w-2xl mx-auto"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: '#6b6b6b',
            fontStyle: 'italic'
          }}
        >
          {t('foreverStart')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          onClick={onScrollToRSVP}
          className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #c9a227 0%, #d6af59 50%, #c9a227 100%)',
            color: '#1a1a1a',
            fontFamily: '"Playfair Display", serif',
            boxShadow: '0 4px 20px rgba(201, 162, 39, 0.3)'
          }}
        >
          {t('confirmPresence')}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: '#8b7355' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
        <p 
          className="text-xs tracking-widest uppercase font-light"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            letterSpacing: '0.2em'
          }}
        >
          {language === 'ar' ? 'اضغط للتأكيد' : 'CONFIRM ATTENDANCE'}
        </p>
      </motion.div>
    </section>
  )
}

export default HeroSection
