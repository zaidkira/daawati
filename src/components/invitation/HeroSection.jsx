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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background video or image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-obsidian via-luxury-charcoal to-luxury-obsidian">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-luxury-gold-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-luxury-burgundy-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-luxury-champagne mb-4">
            {language === 'ar' ? (
              <>
                {couple.groomName}
                <span className="mx-4 text-luxury-gold-400">&</span>
                {couple.brideName}
              </>
            ) : (
              <>
                {couple.groomNameFr}
                <span className="mx-4 text-luxury-gold-400">&</span>
                {couple.brideNameFr}
              </>
            )}
          </h1>
          
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Heart className="w-8 h-8 text-luxury-burgundy-400 fill-luxury-burgundy-400 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-2xl sm:text-3xl text-luxury-gold-300 font-serif mb-6"
        >
          {formatDate(date)}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-lg sm:text-xl text-luxury-champagne/80 max-w-2xl mx-auto mb-12"
        >
          {t('foreverStart')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          onClick={onScrollToRSVP}
          className="luxury-button px-8 py-4 rounded-full font-semibold text-lg"
        >
          {t('confirmPresence')}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-luxury-gold-400"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
