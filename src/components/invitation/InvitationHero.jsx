import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Heart, Languages } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const InvitationHero = ({ invitationData, onRSVPClick }) => {
  const { t, direction, toggleLanguage, language } = useLanguage()
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', options)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {invitationData?.media?.backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src={invitationData.media.backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${invitationData?.media?.backgroundImage || '/images/wedding-bg.jpg'})`
            }}
          />
        )}
      </div>

      {/* Language Toggle */}
      <motion.button
        initial={{ opacity: 0, x: direction === 'rtl' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={toggleLanguage}
        className={`fixed top-4 ${direction === 'rtl' ? 'right-4' : 'left-4'} z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all`}
      >
        <Languages className="w-5 h-5 text-white" />
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center" dir={direction}>
        {/* Decorative Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-amber-500/30 bg-amber-500/10">
            <span className="text-amber-300 text-sm font-medium">
              {invitationData?.tagline || t('beginningOfForever')}
            </span>
          </div>
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="text-amber-100">
            {invitationData?.coupleNames?.groom}
          </span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mx-4 text-amber-400"
          >
            <Heart className="w-8 h-8 md:w-12 md:h-12 fill-current" />
          </motion.span>
          <span className="text-amber-100">
            {invitationData?.coupleNames?.bride}
          </span>
        </motion.h1>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20">
            <span className="text-2xl">📅</span>
            <span className="text-xl md:text-2xl text-amber-200 font-medium">
              {formatDate(invitationData?.weddingDate)}
            </span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRSVPClick}
            className="px-8 py-4 rounded-full font-semibold transition-all duration-300 transform"
            style={{
              background: 'linear-gradient(135deg, #c99c2c 0%, #d6af59 50%, #c99c2c 100%)',
              color: '#1a1a1a',
              boxShadow: '0 0 30px rgba(201, 156, 44, 0.3)'
            }}
          >
            {t('confirmAttendance')}
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-400"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
    </section>
  )
}

export default InvitationHero
